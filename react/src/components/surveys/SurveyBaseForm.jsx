import React, { useEffect } from 'react';
import { withFormik } from 'formik';
import { surveyBaseSchema } from '../../schema/surveyFormSchema';
import * as wizardPropTypes from './surveyWizardPropTypes';
import { Card, Form } from 'react-bootstrap';

const SurveyBaseForm = (props) => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        onNext,
        onBack,
        isSubmitting,
        cantBack,
        backLabel,
        nextLabel,
    } = props;

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
        <Form className="p-1 formWizard">
            <Card className="wizardCard col-sm-9">
                <Card.Header>
                    <h2 className="text-center">Create A Survey</h2>
                </Card.Header>
                <div className="text-center ">
                    <h4 className="text-dark-50 text-center mt-2 fw-bold">Please fill in survey information below:</h4>
                    <p className="text-muted mb-4"></p>
                </div>

                <div className="form-group">
                    <label htmlFor="surveyName" style={{ fontSize: '2em' }}>
                        Survey Name
                    </label>
                    <div className="form-group my-3">
                        <Form.Control
                            name="surveyName"
                            id="surveyName"
                            value={values.surveyName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined"
                            placeholder="Enter a Survey Name"
                            className="form-control"
                        />
                        {errors.surveyName && touched.surveyName && (
                            <div id="feedback" style={{ color: 'red' }}>
                                {errors.surveyName}
                            </div>
                        )}
                    </div>

                    <label htmlFor="surveyDescription">Survey Description</label>
                    <div className="form-group my-3">
                        <Form.Control
                            name="surveyDescription"
                            id="surveyDescription"
                            value={values.surveyDescription}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined"
                            placeholder="Enter a Survey Description"
                            className="form-control"
                        />
                        {errors.surveyDescription && touched.surveyDescription && (
                            <div id="feedback" style={{ color: 'red' }}>
                                {errors.surveyDescription}
                            </div>
                        )}
                    </div>

                    <label htmlFor="surveyTypeId">Survey Type</label>
                    <div className="form-group my-3">
                        <Form.Select
                            name="surveyTypeId"
                            id="surveyTypeId"
                            value={values.surveyTypeId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined">
                            <option value="0"> Select the Survey Type</option>
                            {props.surveySelects.surveyTypes?.map((eachOption, index) => (
                                <option key={index} value={eachOption.id}>
                                    {eachOption.name}
                                </option>
                            ))}
                        </Form.Select>
                        {errors.surveyTypeId && touched.surveyTypeId && (
                            <div id="feedback" style={{ color: 'red' }}>
                                {errors.surveyTypeId}
                            </div>
                        )}
                    </div>

                    <label htmlFor="surveyStatusId">Survey Status</label>
                    <div className="form-group my-3">
                        <Form.Select
                            name="surveyStatusId"
                            id="surveyStatusId"
                            value={values.surveyStatusId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined">
                            <option value="0"> Select the Survey Status</option>
                            {props.surveySelects.surveyStatuses?.map((eachOption, index) => (
                                <option key={index} value={eachOption.id}>
                                    {eachOption.name}
                                </option>
                            ))}
                        </Form.Select>
                        {errors.surveyStatusId && touched.surveyStatusId && (
                            <div id="feedback" style={{ color: 'red' }}>
                                {errors.surveyStatusId}
                            </div>
                        )}
                    </div>
                </div>

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
                        disabled={
                            !values.surveyName ||
                            !!errors.surveyName ||
                            !values.surveyDescription ||
                            !!errors.surveyDescription ||
                            !values.surveyTypeId ||
                            !!errors.surveyTypeId ||
                            !values.surveyStatusId ||
                            !!errors.surveyStatusId
                        }
                        onClick={onNextClicked}>
                        {nextLabel}
                    </button>
                </div>
            </Card>
        </Form>
    );
};

SurveyBaseForm.propTypes = wizardPropTypes.surveyWizardPropTypes;

export default withFormik({
    mapPropsToValues: (props) => ({
        surveyName: props.surveyData.surveyName,
        surveyDescription: props.surveyData.surveyDescription,
        surveyTypeId: props.surveyData.surveyTypeId,
        surveyStatusId: props.surveyData.surveyStatusId,
    }),

    validationSchema: surveyBaseSchema,

    handleSubmit: (values, { props }) => {
        props.onNext(values);
    },
})(SurveyBaseForm);
