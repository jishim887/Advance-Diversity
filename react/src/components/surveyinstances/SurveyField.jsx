import React from 'react';
import { ErrorMessage, Field } from 'formik';
import * as formPropTypes from './surveyFormPropTypes';

const SurveyField = (props) => {
    const answerField = () => {
        switch (props.typeId) {
            case 1:
                return (
                    <div className="form-group">
                        <div className="form-check">
                            <Field
                                type="radio"
                                className="form-check-input"
                                name={`sections.${props.index}.questions.${props.indexTwo}.answers.answerNumber`}
                                value="1"
                            />
                            <label className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check">
                            <Field
                                type="radio"
                                className="form-check-input"
                                name={`sections.${props.index}.questions.${props.indexTwo}.answers.answerNumber`}
                                value="0"
                            />
                            <label className="form-check-label">No</label>
                        </div>
                        <div className="form-check">
                            <Field
                                type="radio"
                                className="form-check-input"
                                name={`sections.${props.index}.questions.${props.indexTwo}.answers.answerNumber`}
                                value="2"
                            />
                            <label className="form-check-label">{"I don't know"}</label>
                        </div>
                        <ErrorMessage
                            component="div"
                            className="has-error"
                            name={`sections.${props.index}.questions.${props.indexTwo}.answers.answerNumber`}
                        />
                    </div>
                );
            case 2:
                return (
                    <div className="form-group">
                        <label>Response</label>
                        <Field
                            type="text"
                            name={`sections.${props.index}.questions.${props.indexTwo}.answers.answer`}
                            className="form-control"
                        />
                        <ErrorMessage
                            component="div"
                            className="has-error"
                            name={`sections.${props.index}.questions.${props.indexTwo}.answers.answer`}
                        />
                    </div>
                );
            case 3:
                return (
                    <div className="form-group">
                        <label htmlFor="answer">Response</label>
                        <Field
                            component="textarea"
                            name={`sections.${props.index}.questions.${props.indexTwo}.answers.answer`}
                            className="form-control"
                        />
                        <ErrorMessage
                            component="div"
                            className="has-error"
                            name={`sections.${props.index}.questions.${props.indexTwo}.answers.answer`}
                        />
                    </div>
                );
            case 4:
                return (
                    <div className="form-group">
                        <label>Response</label>
                        <Field
                            type="text"
                            name={`sections.${props.index}.questions.${props.indexTwo}.answers.answer`}
                            className="form-control"
                        />
                        <ErrorMessage
                            component="div"
                            className="has-error"
                            name={`sections.${props.index}.questions.${props.indexTwo}.answers.answer`}
                        />
                    </div>
                );
            case 5:
                return (
                    <div className="form-check">
                        <Field
                            type="checkbox"
                            name={`sections.${props.index}.questions.${props.indexTwo}.answers.answerNumber`}
                            className="form-check-input"
                            value="1"
                        />
                        <label htmlFor="answerNumber" className="form-check-label">
                            Yes
                        </label>
                        <ErrorMessage
                            component="div"
                            className="has-error"
                            name={`sections.${props.index}.questions.${props.indexTwo}.answers.answerNumber`}
                        />
                    </div>
                );
            case 6:
                return (
                    <div className="form-check">
                        <Field
                            type="checkbox"
                            name={`sections.${props.index}.questions.${props.indexTwo}.answers.answerNumber`}
                            className="form-check-input"
                            value="0"
                        />
                        <label htmlFor="answerNumber" className="form-check-label">
                            No
                        </label>
                        <ErrorMessage
                            component="div"
                            className="has-error"
                            name={`sections.${props.index}.questions.${props.indexTwo}.answers.answerNumber`}
                        />
                    </div>
                );
            case 7:
                return (
                    <div className="form-group">
                        <label>Response</label>
                        <Field
                            type="text"
                            name={`sections.${props.index}.questions.${props.indexTwo}.answers.answer`}
                            className="form-control"
                        />
                    </div>
                );
            case 8:
                return (
                    <div className="form-group">
                        {props.questionInfo.answerOptions?.map((eachOption) => (
                            <div key={`option_${eachOption.id}`} className="form-check">
                                {props.questionInfo.isMultipleAllowed ? (
                                    <Field
                                        type="checkbox"
                                        className="form-check-input"
                                        name={`sections.${props.index}.questions.${props.indexTwo}.answers.answerOptionId`}
                                        value={`${eachOption.id}`}
                                    />
                                ) : (
                                    <Field
                                        type="radio"
                                        className="form-check-input"
                                        name={`sections.${props.index}.questions.${props.indexTwo}.answers.answerOptionId`}
                                        value={`${eachOption.id}`}
                                    />
                                )}

                                <label className="form-check-label">
                                    {eachOption.text}
                                    <span className="additionalText">
                                        {eachOption.additionalInfo && `(${eachOption.additionalInfo})`}
                                    </span>
                                </label>
                            </div>
                        ))}
                        <ErrorMessage
                            component="div"
                            className="has-error"
                            name={`sections.${props.index}.questions.${props.indexTwo}.answers.answerOptionId`}
                        />
                    </div>
                );
            default:
                return (
                    <div className="form-group">
                        <label>Response</label>
                        <Field
                            type="text"
                            name={`sections.${props.index}.questions.${props.indexTwo}.answers.answer`}
                            className="form-control"
                        />
                        <ErrorMessage
                            component="div"
                            className="has-error"
                            name={`sections.${props.index}.questions.${props.indexTwo}.answers.answer`}
                        />
                    </div>
                );
        }
    };
    return <div>{answerField()}</div>;
};

SurveyField.propTypes = formPropTypes.surveyFormPropTypes;

export default SurveyField;
