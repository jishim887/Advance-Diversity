import React, { useEffect, useState } from 'react';
import SurveyBaseForm from './SurveyBaseForm';
import SurveySectionForm from './SurveySectionForm';
import SurveyQuestionForm from './SurveyQuestionForm';
import { SurveyIcon } from './SurveyIcons';
import Loki from 'react-loki';
import './survey-loki.css';
import debug from 'sabio-debug';
import surveysService from '../../services/surveysService';
import * as toastr from 'toastr';
import 'toastr/build/toastr.css';

const _logger = debug.extend('SurveyWizard');

const SurveyWizard = () => {
    const [surveyData, setSurveyData] = useState({
        id: 0,
        surveyName: '',
        surveyDescription: '',
        surveyTypeId: '',
        surveyStatusId: '',
        sections: [
            {
                tempId: 0,
                title: '',
                description: '',
                sortOrder: 1,
                questions: [
                    {
                        tempId: 0,
                        tempSectionId: 0,
                        question: '',
                        helpText: '',
                        isRequired: [],
                        questionTypeId: '',
                        isMultipleAllowed: [],
                        answerOptions: [
                            { tempSectionId: 0, tempQuestionId: 0, text: '', value: '', additionalInfo: '' },
                        ],
                        sortOrder: 1,
                        statusId: '',
                    },
                ],
            },
        ],
    });
    const [surveySelects, setSurveySelects] = useState({
        surveyTypes: [],
        surveyStatuses: [],
        questionTypes: [],
    });

    useEffect(() => {
        surveysService.getAllSurveySelects().then(onGetAllSuccess).catch(onGetAllError);
    }, []);

    const onGetAllSuccess = (response) => {
        const allTypeObjects = response.item;
        setSurveySelects((prevState) => {
            const newSelects = { ...prevState };
            newSelects.surveyTypes = allTypeObjects.surveyTypes;
            newSelects.surveyStatuses = allTypeObjects.surveyStatuses;
            newSelects.questionTypes = allTypeObjects.questionTypes;
            return newSelects;
        });
    };
    const onGetAllError = (response) => {
        _logger(response);
    };

    const onChange = (values) => {
        setSurveyData((prevState) => {
            const sd = { ...prevState, ...values };
            return sd;
        });
    };

    const onFinish = () => {
        let surveyCopy = JSON.parse(JSON.stringify(surveyData));
        let payload = {};
        surveyCopy.sections.map(mapOneSection);
        payload.name = surveyCopy.surveyName;
        payload.description = surveyCopy.surveyDescription;
        payload.surveyTypeId = Number(surveyCopy.surveyTypeId);
        payload.statusId = Number(surveyCopy.surveyStatusId);

        function mapOneSection(eachSection) {
            const moddedSection = eachSection.questions.map(modOneQuestion);
            function modOneQuestion(eachQuestion) {
                eachQuestion.isRequired = eachQuestion.isRequired[0] ? true : false;
                eachQuestion.isMultipleAllowed = eachQuestion.isMultipleAllowed[0] ? true : false;
                if (eachQuestion.questionTypeId !== '8') {
                    eachQuestion.answerOptions = [];
                }
                eachQuestion.questionTypeId = Number(eachQuestion.questionTypeId);
                eachQuestion.statusId = Number(eachQuestion.statusId);
                return eachQuestion;
            }
            return moddedSection;
        }
        let sectionsHolder = [];
        let questionsHolder = [];
        let optionsHolder = [];

        surveyCopy.sections.forEach((section) => {
            section.questions.forEach((question) => {
                if (question.answerOptions) {
                    question.answerOptions.forEach((option) => {
                        optionsHolder.push(option);
                    });
                }
                questionsHolder.push(question);
            });
            sectionsHolder.push(section);
        });
        payload.sections = sectionsHolder;
        payload.questions = questionsHolder;
        payload.answerOptions = optionsHolder;

        _logger('Wizard completion:', surveyCopy);
        _logger('Wizard completion:', payload);

        surveysService.addSurvey(payload).then(onAddSuccess).catch(onAddError);
    };
    const onAddSuccess = (response) => {
        _logger(response);
        toastr['success'](`Survey form submitted: Id ${response.item}`, 'Success');
        setTimeout(function () {
            window.location.replace('../surveys');
        }, 1000);
    };
    const onAddError = (response) => {
        _logger(response);
        toastr['error']('Please double check your responses', 'Error');
    };

    const wizardSteps = [
        {
            label: 'Step 1 - Create Survey Base',
            icon: <SurveyIcon />,
            component: <SurveyBaseForm surveyData={surveyData} surveySelects={surveySelects} onChange={onChange} />,
        },
        {
            label: 'Step 2 - Create Section(s)',
            icon: <SurveyIcon />,
            component: <SurveySectionForm surveyData={surveyData} surveySelects={surveySelects} onChange={onChange} />,
        },
        {
            label: 'Step 3 - Input Questions for Each Section',
            icon: <SurveyIcon />,
            component: <SurveyQuestionForm surveyData={surveyData} surveySelects={surveySelects} onChange={onChange} />,
        },
    ];

    return (
        <div className="surveyWizard">
            <Loki
                steps={wizardSteps}
                onNext={onChange}
                nextLabel={'Next'}
                onBack={onChange}
                onFinish={onFinish}
                finishLabel="Submit"
                noActions
            />
        </div>
    );
};

export default SurveyWizard;
