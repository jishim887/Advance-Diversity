import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Card } from 'react-bootstrap';
import surveyInstancesService from '../../services/surveyInstancesService';
import './surveyinstance.css';
import { surveyFormSchema } from '../../schema/surveyFormSchema';
import SurveyField from './SurveyField';
import * as toastr from 'toastr';
import 'toastr/build/toastr.css';

import debug from 'sabio-debug';
const _logger = debug.extend('SurveyForm');

const SurveyForm = () => {
    const { surveyId } = useParams();
    const [formId] = useState(surveyId);
    const [surveyData, setSurveyData] = useState({
        id: 0,
        name: '',
        description: '',
        surveyType: '',
        createdBy: 1,
        dateCreated: '',
        dateModified: '',
        status: '',
        sections: [
            {
                id: 0,
                surveyId: 0,
                title: '',
                description: '',
                sortOrder: 1,
                dateCreated: '',
                dateModified: '',
                questions: [
                    {
                        id: 0,
                        userId: 0,
                        question: '',
                        helpText: '',
                        isRequired: false,
                        isMultipleAllowed: false,
                        questionTypeId: 2,
                        sectionId: 0,
                        statusId: 0,
                        sortOrder: 1,
                        dateCreated: '',
                        dateModified: '',
                        answerOptions: [
                            {
                                id: 0,
                                questionId: 0,
                                text: '',
                                value: '',
                                additionalInfo: '',
                                createdBy: 1,
                                dateCreated: '',
                                dateModified: '',
                            },
                        ],
                        answers: {
                            questionId: 0,
                            answerOptionId: 0,
                            answerNumber: 0,
                            answer: '',
                        },
                    },
                ],
            },
        ],
        questions: [
            {
                id: 0,
                userId: 0,
                question: '',
                helpText: '',
                isRequired: false,
                isMultipleAllowed: false,
                questionTypeId: 2,
                sectionId: 0,
                statusId: 0,
                sortOrder: 1,
                dateCreated: '',
                dateModified: '',
                answerOptions: [
                    {
                        id: 0,
                        questionId: 0,
                        text: '',
                        value: '',
                        additionalInfo: '',
                        createdBy: 1,
                        dateCreated: '',
                        dateModified: '',
                    },
                ],
                answers: {
                    questionId: 0,
                    answerOptionId: 0,
                    answerNumber: 0,
                    answer: '',
                },
            },
        ],
        answerOptions: [
            {
                id: 0,
                questionId: 0,
                text: '',
                value: '',
                additionalInfo: '',
                createdBy: 0,
                dateCreated: '',
                dateModified: '',
            },
        ],
        surveyCards: [<div key="1"></div>],
    });
    const [instanceId, setInstanceId] = useState(0);

    useEffect(() => {
        surveyInstancesService.CreateInstance(formId).then(onCreateInstanceSuccess).catch(onCreateInstanceError);
        surveyInstancesService.GetSurvey(Number(formId)).then(onGetSurveySucess).catch(onGetSurveyError);
    }, []);

    const onCreateInstanceSuccess = (response) => {
        _logger('survey instance created:', response);
        setInstanceId(response.item);
    };

    const onCreateInstanceError = (response) => {
        _logger(response);
    };

    const onGetSurveySucess = (response) => {
        _logger('retrieving survey info');
        setSurveyData((prevState) => {
            const newSurvey = { ...prevState, ...response.item };
            newSurvey.sections = response.item.sections.map(mapQuestionsToSection);
            newSurvey.surveyCards = newSurvey.sections.map(cardEachSection);
            return newSurvey;
        });

        function mapQuestionsToSection(eachSection) {
            eachSection.questions = response.item.questions.filter((eachQuestion) => {
                return eachQuestion.sectionId === eachSection.id && eachQuestion.statusId === 1 ? true : false;
            });

            if (response.item.answerOptions) {
                eachSection.questions.forEach((questionObj) => {
                    questionObj.answerOptions = response.item.answerOptions.filter(getOptionByQuestionId);

                    function getOptionByQuestionId(eachOption) {
                        return questionObj.id === eachOption.questionId ? true : false;
                    }
                });
            }
            eachSection.questions.forEach((questionObj) => {
                if (
                    questionObj.questionTypeId === 1 ||
                    questionObj.questionTypeId === 5 ||
                    questionObj.questionTypeId === 6
                ) {
                    questionObj.answers = {
                        isRequired: questionObj.isRequired,
                        questionTypeId: questionObj.questionTypeId,
                        questionId: questionObj.id,
                        answerNumber: '',
                    };
                } else if (questionObj.questionTypeId === 8) {
                    questionObj.answers = {
                        isRequired: questionObj.isRequired,
                        questionTypeId: questionObj.questionTypeId,
                        questionId: questionObj.id,
                        answerOptionId: '',
                    };
                } else {
                    questionObj.answers = {
                        isRequired: questionObj.isRequired,
                        questionTypeId: questionObj.questionTypeId,
                        questionId: questionObj.id,
                        answer: '',
                    };
                }
            });
            return eachSection;
        }
    };

    const onGetSurveyError = (response) => {
        _logger(response);
    };

    const cardEachSection = (eachSection, index) => {
        return (
            <Card key={`section_${index}`} className="questionCard">
                <Card.Body>
                    <h2>{eachSection.title}</h2>
                    <div>{eachSection.description}</div>
                    <hr />
                    {eachSection.questions.map((eachQuestion, indexTwo) => (
                        <Card key={`question_${indexTwo}`} className="questionCard">
                            <h4>{eachQuestion.question}</h4>
                            <div>{eachQuestion.helpText}</div>
                            <SurveyField
                                typeId={eachQuestion.questionTypeId || 2}
                                questionInfo={eachQuestion}
                                index={index || 0}
                                indexTwo={indexTwo || 0}
                            />
                        </Card>
                    ))}
                </Card.Body>
            </Card>
        );
    };

    const handleSubmit = (values) => {
        _logger(values);
        const answerJson = JSON.stringify(values.sections);
        const answerCopy = JSON.parse(answerJson);
        let payload = [];

        answerCopy.forEach((section) => {
            section.questions.forEach((question) => {
                if (question.answers.answerOptionId) {
                    if (Array.isArray(question.answers.answerOptionId)) {
                        question.answers.answerOptionId.forEach((eachOption) => {
                            const newAnswer = {
                                instanceId: instanceId,
                                questionId: question.id,
                                answerOptionId: Number(eachOption),
                            };
                            payload.push(newAnswer);
                        });
                    } else {
                        const newAnswer = {
                            instanceId: instanceId,
                            questionId: question.id,
                            answerOptionId: Number(question.answers.answerOptionId),
                        };
                        payload.push(newAnswer);
                    }
                } else if (question.answers.answerNumber) {
                    if (Array.isArray(question.answers.answerNumber)) {
                        question.answers.answerNumber.forEach((eachAnswerNum) => {
                            const newAnswer = {
                                instanceId: instanceId,
                                questionId: question.id,
                                answerNumber: Number(eachAnswerNum),
                            };
                            payload.push(newAnswer);
                        });
                    } else {
                        const newAnswer = {
                            instanceId: instanceId,
                            questionId: question.id,
                            answerNumber: Number(question.answers.answerNumber),
                        };
                        payload.push(newAnswer);
                    }
                } else {
                    const newAnswer = {
                        instanceId: instanceId,
                        questionId: question.id,
                        answer: question.answers.answer,
                    };
                    payload.push(newAnswer);
                }
            });
        });

        _logger('answers to send', payload);

        surveyInstancesService.AddAnswers(payload).then(onAddAnswersSuccess).catch(onAddAnswersError);
    };

    const onAddAnswersSuccess = (response) => {
        _logger(response);
        toastr['success'](`Survey submitted`, 'Success');
        setTimeout(function () {
            window.location.replace('../');
        }, 1000);
    };

    const onAddAnswersError = (response) => {
        _logger(response);
        toastr['error']('Please double check your responses', 'Error');
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Formik
                        enableReinitialize={true}
                        initialValues={surveyData}
                        onSubmit={handleSubmit}
                        validationSchema={surveyFormSchema}>
                        <Form>
                            <Card className="form-title-card">
                                <Card.Body>
                                    <h1>{surveyData.name}</h1>
                                    <h4>{surveyData.description}</h4>
                                </Card.Body>
                            </Card>
                            {surveyData.surveyCards}
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default SurveyForm;
