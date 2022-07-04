import React, { useEffect } from 'react';
import { withFormik, FieldArray, Field } from 'formik';
import { surveySectionSchema } from '../../schema/surveyFormSchema';
import * as wizardPropTypes from './surveyWizardPropTypes';
import { Card, Form, Nav, NavItem, NavLink, Tab } from 'react-bootstrap';
import './survey-loki.css';

const SurveySectionForm = (props) => {
    const { values, errors, touched, handleSubmit, onNext, onBack, isSubmitting, cantBack, backLabel, nextLabel } =
        props;

    useEffect(() => {
        onChange();
    }, [values]);

    const onChange = () => {
        props.onChange(values);
    };

    const onNextClicked = () => {
        onNext(values);
    };
    const onBackClicked = () => {
        onBack(values);
    };

    return (
        <Form onSubmit={handleSubmit} className="p-1 formWizard">
            <Card className=" wizardCard col-sm-9 ">
                <Card.Header>
                    <h2 className="text-center">Create Survey Sections for Survey </h2>
                </Card.Header>
                <div className="text-center ">
                    <h4 className="text-dark-50 text-center mt-2 fw-bold">Please fill in section information below:</h4>
                    <p className="text-muted mb-4"></p>
                </div>
                <div>
                    <Tab.Container defaultActiveKey="Profile">
                        <Nav variant="tabs" className="nav-bordered" as="ul">
                            {values.sections?.map((section, index) => (
                                <NavItem key={index} as="li">
                                    <NavLink>{values.sections[index].title}</NavLink>
                                </NavItem>
                            ))}
                        </Nav>
                    </Tab.Container>
                </div>

                <FieldArray
                    name="sections"
                    id="sections"
                    render={(arrayHelpers) => (
                        <div>
                            {values.sections && values.sections.length > 0 ? (
                                values.sections.map((section, index) => (
                                    <div key={index} className="section-container">
                                        <h4>Section {index + 1}</h4>
                                        <label htmlFor={`sections[${index}].title`} className="section-label">
                                            Section Title
                                        </label>
                                        <Field
                                            name={`sections[${index}].title`}
                                            className="section-field form-control"
                                        />
                                        {errors?.sections?.[index]?.title && touched?.sections?.[index]?.title && (
                                            <div id="feedback" style={{ color: 'red' }}>
                                                {errors.sections[index].title}
                                            </div>
                                        )}

                                        <br />
                                        <label htmlFor={`sections[${index}].description`} className="section-label">
                                            Description
                                        </label>
                                        <Field
                                            name={`sections[${index}].description`}
                                            className="section-field  form-control"
                                        />
                                        {errors?.sections?.[index]?.description &&
                                            touched?.sections?.[index]?.description && (
                                                <div id="feedback" style={{ color: 'red' }}>
                                                    {errors.sections[index].description}
                                                </div>
                                            )}
                                        <br />
                                        <label htmlFor={`sections[${index}].sortOrder`} className="section-label">
                                            Sort Order
                                        </label>
                                        <Field
                                            name={`sections.${index}.sortOrder`}
                                            className="section-field  form-control"
                                        />
                                        {errors?.sections?.[index]?.sortOrder && touched?.sections?.[index]?.sortOrder && (
                                            <div id="feedback" style={{ color: 'red' }}>
                                                {errors.sections[index].sortOrder}
                                            </div>
                                        )}
                                        <br />
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            style={{ marginTop: '5px' }}
                                            onClick={() => arrayHelpers.remove(index)}>
                                            Remove Section
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-success btn-sm"
                                            style={{ marginTop: '5px' }}
                                            onClick={() => {
                                                arrayHelpers.push({
                                                    tempId: index + 1,
                                                    title: '',
                                                    description: '',
                                                    sortOrder: index + 2,
                                                    questions: [
                                                        {
                                                            tempId: 0,
                                                            tempSectionId: index + 1,
                                                            question: '',
                                                            helpText: '',
                                                            isRequired: [],
                                                            questionTypeId: '',
                                                            isMultipleAllowed: [],
                                                            answerOptions: [
                                                                {
                                                                    tempSectionId: index + 1,
                                                                    tempQuestionId: 0,
                                                                    text: '',
                                                                    value: '',
                                                                    additionalInfo: '',
                                                                },
                                                            ],
                                                            sortOrder: 1,
                                                            statusId: '',
                                                        },
                                                    ],
                                                });
                                            }}>
                                            Add Section
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
                                                        {
                                                            tempSectionId: 0,
                                                            tempQuestionId: 0,
                                                            text: '',
                                                            value: '',
                                                            additionalInfo: '',
                                                        },
                                                    ],
                                                    sortOrder: 1,
                                                    statusId: '',
                                                },
                                            ],
                                        })
                                    }>
                                    Add a section
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
                        disabled={!values.sections.length >= 1 || Boolean(errors.sections)}
                        onClick={onNextClicked}>
                        {nextLabel}
                    </button>
                </div>
            </Card>
        </Form>
    );
};

SurveySectionForm.propTypes = wizardPropTypes.surveyWizardPropTypes;

export default withFormik({
    mapPropsToValues: (props) => ({
        sections: props.surveyData.sections,
    }),

    validationSchema: surveySectionSchema,

    handleSubmit: (values, { props }) => {
        props.onNext(values);
    },
})(SurveySectionForm);
