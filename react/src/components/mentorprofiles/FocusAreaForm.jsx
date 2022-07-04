import React, { useEffect, useState } from 'react';
import { Form, Card, Row, Col } from 'react-bootstrap';
import { withFormik, Field, ErrorMessage } from 'formik';
import { focusAreasFormSchema } from '../../schema/mentorProfileSchema';
import { mentorWizardPropTypes } from './MentorProfilePropTypes';
import './mentor-loki-form.css';

const FocusAreaForm = (props) => {
    const { values, onNext, onBack, isSubmitting, handleSubmit, cantBack, backLabel, nextLabel } = props;

    const [formCheckBox, setFormCheckBox] = useState({
        focusAreaOne: [],
        focusAreaTwo: [],
    });
    useEffect(() => {
        setFormCheckBox((prevState) => {
            const newOptions = { ...prevState };
            newOptions.focusAreaOne = createOptionBoxesOne('focusAreas', props.formOptions.focusAreas);
            newOptions.focusAreaTwo = createOptionBoxesTwo('focusAreas', props.formOptions.focusAreas);
            return newOptions;
        });
    }, [props.formOptions]);

    const createOptionBoxesOne = (arrName, optionArr) => {
        const mapOptionsToBox = (eachOption, index) => {
            if (index % 2 === 1) {
                return (
                    <div className="form-check" key={`${eachOption.name}_${eachOption.id}`}>
                        <label className="form-check-label">{eachOption.name}</label>
                        <Field
                            type="checkbox"
                            name={arrName}
                            value={String(eachOption.id)}
                            className="form-check-input"
                        />
                    </div>
                );
            } else {
                return;
            }
        };
        const optionCards = optionArr.map(mapOptionsToBox);
        return optionCards;
    };

    const createOptionBoxesTwo = (arrName, optionArr) => {
        const mapOptionsToBox = (eachOption, index) => {
            if (index % 2 === 0) {
                return (
                    <div className="form-check" key={`${eachOption.name}_${eachOption.id}`}>
                        <label className="form-check-label">{eachOption.name}</label>
                        <Field
                            type="checkbox"
                            name={arrName}
                            value={String(eachOption.id)}
                            className="form-check-input"
                        />
                    </div>
                );
            } else {
                return;
            }
        };
        const optionCards = optionArr.map(mapOptionsToBox);
        return optionCards;
    };

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
        <Form onSubmit={handleSubmit}>
            <Card className="mentor-card">
                <Card.Header>
                    <h1>Focus Areas</h1>
                    <h4>Please select the specific demographic of mentees you would like to work with.</h4>
                </Card.Header>
                <Card.Body>
                    <div className="form-group">
                        <label htmlFor="focusAreas">Focus Area</label>
                        <Row>
                            <Col>{formCheckBox?.focusAreaTwo}</Col>
                            <Col>{formCheckBox?.focusAreaOne}</Col>
                        </Row>

                        <ErrorMessage name="focusAreas" component="div" className="field-error" />
                    </div>
                </Card.Body>
                <Card.Footer>
                    <div className="button-group">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            disabled={isSubmitting || cantBack}
                            onClick={onBackClicked}>
                            {backLabel}
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting || !Boolean(values.focusAreas[0])}
                            onClick={onNextClicked}>
                            {nextLabel}
                        </button>
                    </div>
                </Card.Footer>
            </Card>
        </Form>
    );
};

FocusAreaForm.propTypes = mentorWizardPropTypes;

export default withFormik({
    mapPropsToValues: (props) => ({
        focusAreas: props.formData.focusAreas,
    }),
    validationSchema: focusAreasFormSchema,
    handleSubmit: (values, { props }) => {
        props.onNext(values);
    },
})(FocusAreaForm);
