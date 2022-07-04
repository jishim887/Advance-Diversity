import React, { useState, useEffect } from 'react';
import { Form, Card, Row, Col } from 'react-bootstrap';
import { withFormik, Field, ErrorMessage } from 'formik';
import { mentorLocationFormSchema } from '../../schema/mentorProfileSchema';
import { mentorWizardPropTypes } from './MentorProfilePropTypes';
import AddressAutoComplete from '../locations/AddressAutoComplete';
import './mentor-loki-form.css';
import * as toastr from 'toastr';
import 'toastr/build/toastr.css';

const MentorLocationForm = (props) => {
    const {
        values,
        setFieldValue,
        setTouched,
        errors,
        onNext,
        onBack,
        isSubmitting,
        handleSubmit,
        cantBack,
        backLabel,
        nextLabel,
    } = props;

    const [formSelect, setFormSelect] = useState({
        locationTypes: [],
        states: [],
    });

    useEffect(() => {
        setFormSelect((prevState) => {
            const newSelects = { ...prevState };
            newSelects.locationTypes = props.formOptions.locationTypes.map(mapOptionsToSelect);
            newSelects.states = props.formOptions.states.map(mapOptionsToSelect);
            return newSelects;
        });
        setTouched({ location: { city: true } });
    }, [props.formOptions]);

    const mapOptionsToSelect = (eachOption) => {
        if (eachOption.name === 'Vending Location' || eachOption.name === 'Shipping' || eachOption.name === 'Billing') {
            return;
        } else {
            return (
                <option key={eachOption.name + eachOption.id} value={eachOption.id}>
                    {eachOption.name}
                </option>
            );
        }
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

    const addressFromAuto = (addressComponents, streetAddress, coordinates) => {
        let result = {};
        for (let i = 2; i < addressComponents.length; i++) {
            const thisComponent = addressComponents[i];
            result.lineOne = streetAddress;
            if (thisComponent.types.includes('locality')) {
                result.city = thisComponent.long_name;
                continue;
            }
            if (thisComponent.types.includes('administrative_area_level_1')) {
                for (let i = 0; i < props.formOptions.states.length; i++) {
                    const aState = props.formOptions.states[i];
                    if (aState.name === thisComponent.long_name.toUpperCase()) {
                        result.stateId = aState.id;
                        break;
                    }
                }
                continue;
            }
            if (thisComponent.types.includes('postal_code')) {
                result.zip = thisComponent.long_name;
                continue;
            }
        }
        if (result.city && result.stateId && result.lineOne && result.zip) {
            setFieldValue('location.lineOne', result.lineOne);
            setFieldValue('location.lineTwo', result.lineTwo || '');
            setFieldValue('location.stateId', result.stateId);
            setFieldValue('location.zip', result.zip);
            setFieldValue('location.city', result.city);
            setFieldValue('location.latitude', coordinates.lat);
            setFieldValue('location.longitude', coordinates.lng);
            values.location = {
                ...result,
            };
            values.location.lineTwo = result.lineTwo;
            values.location.latituide = coordinates.lat;
            values.location.latitude = coordinates.lng;
            toastr['success']('Address verified.');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Card className="mentor-card">
                <Card.Header>
                    <h1>Location Selection</h1>
                    <h4>
                        Search for the address you would like to add to your profile. Select whether it is your home
                        address or business address.
                    </h4>
                </Card.Header>
                <Card.Body>
                    <div className="form-group">
                        <Row>
                            <Col md={9}>
                                <label>Search Address</label>
                                <AddressAutoComplete addressFromAuto={addressFromAuto} />
                            </Col>
                            <Col md={3}>
                                <div className="form-group">
                                    <label htmlFor="location.locationTypeId">Location Type</label>
                                    <Field component="select" name="location.locationTypeId" className="form-control">
                                        <option value="0">Please select a location type</option>
                                        {formSelect?.locationTypes}
                                    </Field>
                                    <ErrorMessage
                                        name="location.locationTypeId"
                                        component="div"
                                        className="field-error"
                                    />
                                </div>
                            </Col>
                            <h4 className="mt-3">Address Selected</h4>
                        </Row>
                        <label htmlFor="location.lineOne">Street Address 1</label>
                        <Field type="text" name="location.lineOne" readOnly={true} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location.lineTwo">Street Address 2</label>
                        <Field type="text" name="location.lineTwo" readOnly={true} className="form-control" />
                    </div>
                    <Row>
                        <Col md={6}>
                            <div className="form-group">
                                <label htmlFor="location.city">City</label>
                                <Field type="text" name="location.city" readOnly={true} className="form-control" />
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="form-group">
                                <label htmlFor="location.stateId">State</label>
                                <Field
                                    component="select"
                                    name="location.stateId"
                                    className="form-control"
                                    readOnly={true}
                                    disabled={true}>
                                    <option value="0">Please select the state</option>
                                    {formSelect?.states}
                                </Field>
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className="form-group">
                                <label htmlFor="location.zip">Zip Code</label>
                                <Field type="text" name="location.zip" readOnly={true} className="form-control" />
                            </div>
                        </Col>
                    </Row>
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
                            disabled={
                                isSubmitting ||
                                Boolean(
                                    errors.location?.lineOne ||
                                        errors.location?.city ||
                                        errors.location?.state ||
                                        errors.location?.zip ||
                                        errors.location?.locationTypeId
                                )
                            }
                            onClick={onNextClicked}>
                            {nextLabel}
                        </button>
                    </div>
                </Card.Footer>
            </Card>
        </Form>
    );
};
MentorLocationForm.propTypes = mentorWizardPropTypes;

export default withFormik({
    mapPropsToValues: (props) => ({
        location: props.formData.location,
    }),
    validationSchema: mentorLocationFormSchema,
    handleSubmit: (values, { props }) => {
        props.onNext(values);
    },
})(MentorLocationForm);
