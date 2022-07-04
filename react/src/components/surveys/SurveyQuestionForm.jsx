import React, { useEffect, useState } from 'react';
import { withFormik, FieldArray, Field } from 'formik';
import { surveyQuestionSchema } from '../../schema/surveyFormSchema';
import * as wizardPropTypes from './surveyWizardPropTypes';
import { Card, Form } from 'react-bootstrap';
import { Nav, NavItem, NavLink, Tab } from 'react-bootstrap';
import './survey-loki.css';
import debug from 'sabio-debug';
import classnames from 'classnames';

const _logger = debug.extend('Questions');

const SurveyQuestionForm = (props) => {
    const { values, errors, touched, onBack, handleSubmit, isSubmitting, cantBack, backLabel, nextLabel } = props;
    const [currentActiveTab, setCurrentActiveTab] = useState('0');

    useEffect(() => {
        onChange();
    }, [values]);

    const onChange = () => {
        props.onChange(values);
    };
    const onBackClicked = () => {
        onBack(values);
    };
    const toggle = (tab) => {
        _logger(`Switching to tab ${tab}`);
        if (currentActiveTab !== tab) setCurrentActiveTab(tab);
    };
    return (
        <Form onSubmit={handleSubmit} className="p-1 formWizard">
            <Card className="wizardCard col-sm-9 ">
                <Card.Header>
                    <h2 className="text-center">Create Questions for Survey</h2>
                </Card.Header>
                <div className="text-center ">
                    <h4 className="text-dark-50 text-center mt-2 fw-bold">
                        Please add questions for each of the sections created:
                    </h4>
                    <p className="text-muted mb-4"></p>
                </div>
                <div>
                    <Tab.Container defaultActiveKey="Profile">
                        <Nav variant="tabs" className="nav-bordered" as="ul">
                            {values.sections.map((section, index) => (
                                <NavItem key={index} as="li">
                                    <NavLink
                                        className={classnames({
                                            active: currentActiveTab === index.toString(),
                                        })}
                                        onClick={() => {
                                            toggle(index.toString());
                                        }}>
                                        {values.sections[index].title}
                                    </NavLink>
                                </NavItem>
                            ))}
                        </Nav>
                    </Tab.Container>
                </div>

                <FieldArray
                    name={`sections[${currentActiveTab}].questions`}
                    id={`sections[${currentActiveTab}].questions`}
                    render={(arrayHelpers) => (
                        <div>
                            {values.sections[currentActiveTab].questions &&
                            values.sections[currentActiveTab].questions.length > 0 ? (
                                values.sections[currentActiveTab].questions.map((question, index) => (
                                    <div key={index} className="section-container">
                                        <h4>Question {`${index + 1}`}</h4>
                                        <label
                                            htmlFor={`sections[${currentActiveTab}].questions[${index}].question`}
                                            className="section-label">
                                            Question
                                        </label>
                                        <Field
                                            name={`sections[${currentActiveTab}].questions[${index}].question`}
                                            className="section-field  form-control"
                                        />
                                        {errors?.sections?.[currentActiveTab]?.questions?.[index]?.question &&
                                            touched?.sections?.[currentActiveTab]?.questions?.[index]?.question && (
                                                <div id="feedback" style={{ color: 'red' }}>
                                                    {errors?.sections?.[currentActiveTab]?.questions?.[index].question}
                                                </div>
                                            )}
                                        <br />
                                        <label
                                            htmlFor={`sections[${currentActiveTab}].questions[${index}].helpText`}
                                            className="section-label">
                                            Help Text
                                        </label>
                                        <Field
                                            name={`sections[${currentActiveTab}].questions[${index}].helpText`}
                                            className="section-field form-control"
                                        />
                                        {errors?.sections?.[currentActiveTab]?.questions?.[index]?.helpText &&
                                            touched?.sections?.[currentActiveTab]?.questions?.[index]?.helpText && (
                                                <div id="feedback" style={{ color: 'red' }}>
                                                    {errors?.sections?.[currentActiveTab]?.questions?.[index].helpText}
                                                </div>
                                            )}
                                        <br />
                                        <label
                                            htmlFor={`sections[${currentActiveTab}].questions[${index}].isRequired`}
                                            className="section-label">
                                            Is this a required question?
                                        </label>
                                        {'    '}
                                        <Field
                                            type="checkbox"
                                            name={`sections[${currentActiveTab}].questions[${index}].isRequired`}
                                            value="1"
                                        />
                                        <br />
                                        <label
                                            htmlFor={`sections[${currentActiveTab}].questions[${index}].isMultipleAllowed`}
                                            className="section-label">
                                            Are multiple answers allowed?
                                        </label>
                                        {'    '}
                                        <Field
                                            type="checkbox"
                                            name={`sections[${currentActiveTab}].questions[${index}].isMultipleAllowed`}
                                            value="1"
                                        />
                                        <br />
                                        <label
                                            htmlFor={`sections[${currentActiveTab}].questions[${index}].questionTypeId`}
                                            className="section-label">
                                            Question Type
                                        </label>
                                        <Field
                                            className="section-field form-control"
                                            variant="outlined"
                                            name={`sections[${currentActiveTab}].questions[${index}].questionTypeId`}
                                            as="select">
                                            <option value="0"> Select a Question Type</option>
                                            {props.surveySelects.questionTypes?.map((eachOption, index) => (
                                                <option key={index} value={eachOption.id}>
                                                    {eachOption.name}
                                                </option>
                                            ))}
                                        </Field>
                                        {errors?.sections?.[currentActiveTab]?.questions?.[index]?.questionTypeId &&
                                            touched?.sections?.[currentActiveTab]?.questions?.[index]
                                                ?.questionTypeId && (
                                                <div id="feedback" style={{ color: 'red' }}>
                                                    {
                                                        errors?.sections?.[currentActiveTab]?.questions?.[index]
                                                            .questionTypeId
                                                    }
                                                </div>
                                            )}

                                        <br />
                                        {values.sections[currentActiveTab].questions[index].questionTypeId === '8' && (
                                            <FieldArray
                                                name={`sections[${currentActiveTab}].questions[${index}].answerOptions`}
                                                id={`sections[${currentActiveTab}].questions[${index}].answerOptions`}
                                                render={(optionHelpers) => (
                                                    <div style={{ marginLeft: '50px' }}>
                                                        {values.sections[currentActiveTab].questions[index]
                                                            .answerOptions?.length > 0 ? (
                                                            values.sections[currentActiveTab].questions[
                                                                index
                                                            ].answerOptions.map((text, indexTwo) => (
                                                                <div key={indexTwo}>
                                                                    <h5>Answer Option {`${indexTwo + 1}`}</h5>
                                                                    <label
                                                                        htmlFor={`sections[${currentActiveTab}].questions[${index}].answerOptions[${indexTwo}].text`}
                                                                        className="section-label">
                                                                        Option Text
                                                                    </label>
                                                                    <Field
                                                                        name={`sections[${currentActiveTab}].questions[${index}].answerOptions[${indexTwo}].text`}
                                                                        className="section-field form-control"
                                                                    />
                                                                    <label
                                                                        htmlFor={`sections[${currentActiveTab}].questions[${index}].answerOptions[${indexTwo}].value`}
                                                                        className="section-label">
                                                                        Value
                                                                    </label>
                                                                    <Field
                                                                        name={`sections[${currentActiveTab}].questions[${index}].answerOptions[${indexTwo}].value`}
                                                                        className="section-field form-control"
                                                                    />
                                                                    <label
                                                                        htmlFor={`sections[${currentActiveTab}].questions[${index}].answerOptions[${indexTwo}].additionalInfo`}
                                                                        className="section-label">
                                                                        Additional Info
                                                                    </label>
                                                                    <Field
                                                                        name={`sections[${currentActiveTab}].questions[${index}].answerOptions[${indexTwo}].additionalInfo`}
                                                                        className="section-field form-control"
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-danger btn-sm"
                                                                        style={{ marginTop: '5px' }}
                                                                        onClick={() => optionHelpers.remove(indexTwo)}>
                                                                        - Option
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-success btn-sm"
                                                                        style={{ marginTop: '5px' }}
                                                                        onClick={() => {
                                                                            optionHelpers.push({
                                                                                tempSectionId: Number(currentActiveTab),
                                                                                tempQuestionId: index,
                                                                                text: '',
                                                                                value: '',
                                                                                additionalInfo: '',
                                                                            });
                                                                        }}>
                                                                        + Option
                                                                    </button>
                                                                    <p />
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                className="btn btn-success btn-sm"
                                                                onClick={() =>
                                                                    optionHelpers.push({
                                                                        tempSectionId: Number(currentActiveTab),
                                                                        tempQuestionId: index,
                                                                        text: '',
                                                                        value: '',
                                                                        additionalInfo: '',
                                                                    })
                                                                }>
                                                                Add a Question
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                        )}

                                        <label
                                            htmlFor={`sections[${currentActiveTab}].questions[${index}].sortOrder`}
                                            className="section-label">
                                            Sort Order
                                        </label>
                                        <Field
                                            name={`sections[${currentActiveTab}].questions.${index}.sortOrder`}
                                            className="section-field form-control"
                                        />
                                        {errors?.sections?.[currentActiveTab]?.questions?.[index]?.sortOrder &&
                                            touched?.sections?.[currentActiveTab]?.questions?.[index]?.sortOrder && (
                                                <div id="feedback" style={{ color: 'red' }}>
                                                    {errors?.sections?.[currentActiveTab]?.questions?.[index].sortOrder}
                                                </div>
                                            )}
                                        <br />
                                        <label
                                            htmlFor={`sections[${currentActiveTab}].questions[${index}].statusId`}
                                            className="section-label">
                                            Question Status
                                        </label>
                                        <Field
                                            name={`sections[${currentActiveTab}].questions[${index}].statusId`}
                                            as="select"
                                            className="form-control">
                                            <option value="0"> Select the Question Status</option>
                                            {props.surveySelects.surveyStatuses?.map((eachOption, index) => (
                                                <option key={index} value={eachOption.id}>
                                                    {eachOption.name}
                                                </option>
                                            ))}
                                        </Field>
                                        {errors?.sections?.[currentActiveTab]?.questions?.[index]?.statusId &&
                                            touched?.sections?.[currentActiveTab]?.questions?.[index]?.statusId && (
                                                <div id="feedback" style={{ color: 'red' }}>
                                                    {errors?.sections?.[currentActiveTab]?.questions?.[index].statusId}
                                                </div>
                                            )}
                                        <br />
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            style={{ marginTop: '5px' }}
                                            onClick={() => arrayHelpers.remove(index)}>
                                            Remove Question
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-success btn-sm"
                                            style={{ marginTop: '5px' }}
                                            onClick={() => {
                                                arrayHelpers.push({
                                                    tempId: index + 1,
                                                    tempSectionId: Number(currentActiveTab),
                                                    question: '',
                                                    helpText: '',
                                                    isRequired: [],
                                                    questionTypeId: '',
                                                    isMultipleAllowed: [],
                                                    answerOptions: [
                                                        {
                                                            tempSectionId: Number(currentActiveTab),
                                                            tempQuestionId: index + 1,
                                                            text: '',
                                                            value: '',
                                                            additionalInfo: '',
                                                        },
                                                    ],
                                                    sortOrder: index + 2,
                                                    statusId: '',
                                                });
                                            }}>
                                            Add Question
                                        </button>
                                        <hr className="style1" />
                                    </div>
                                ))
                            ) : (
                                <button
                                    type="button"
                                    className="btn btn-success btn-sm"
                                    onClick={() =>
                                        arrayHelpers.push({
                                            tempId: 0,
                                            tempSectionId: Number(currentActiveTab),
                                            question: '',
                                            helpText: '',
                                            isRequired: [],
                                            questionTypeId: '',
                                            isMultipleAllowed: [],
                                            answerOptions: [
                                                {
                                                    tempSectionId: Number(currentActiveTab),
                                                    tempQuestionId: 0,
                                                    text: '',
                                                    value: '',
                                                    additionalInfo: '',
                                                },
                                            ],
                                            sortOrder: 1,
                                            statusId: '',
                                        })
                                    }>
                                    Add Question
                                </button>
                            )}
                        </div>
                    )}
                />
                <div className="button-group pt-3">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        disabled={isSubmitting || cantBack}
                        onClick={onBackClicked}>
                        {backLabel}
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary ml-2"
                        disabled={!values.sections[currentActiveTab].questions.length >= 1 || Boolean(errors.sections)}>
                        {nextLabel}
                    </button>
                </div>
            </Card>
        </Form>
    );
};

SurveyQuestionForm.propTypes = wizardPropTypes.surveyWizardPropTypes;

export default withFormik({
    mapPropsToValues: (props) => ({
        sections: props.surveyData.sections,
    }),

    validationSchema: surveyQuestionSchema,

    handleSubmit: (values, { props }) => {
        props.onNext(values);
    },
})(SurveyQuestionForm);
