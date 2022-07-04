import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Card, Container, Row, Col } from 'react-bootstrap';
import debug from 'sabio-debug';
import profileService from '../../services/mentorProfileService';
import { mentorProfileSchema } from '../../schema/mentorProfileSchema';
import FileUploader from '../files/FileUploader';
import locationService from '../../services/locationService';
import AddressAutoComplete from '../locations/AddressAutoComplete';

import './mentorprofiles.css';
import * as toastr from 'toastr';
import 'toastr/build/toastr.css';

const _logger = debug.extend('MentorForm');

const MentorProfileForm = () => {
    const [formData, setFormData] = useState({
        id: 0,
        userId: 0,
        firstName: '',
        lastName: '',
        imageUrl: '',
        description: '',
        phoneNumber: '',
        socialMediaLink: '',
        location: {
            id: 0,
            locationTypeId: 0,
            lineOne: '',
            lineTwo: '',
            city: '',
            zip: '',
            stateId: 0,
            latitude: 0,
            longitude: 0,
        },
        focusAreas: [],
        ages: [],
        grades: [],
        mentoringTypes: [],
        genderTypes: [],
        specialties: [],
    });
    const [formOptions, setFormOptions] = useState({
        locationTypes: [],
        states: [],
        focusAreas: [],
        ages: [],
        grades: [],
        mentoringTypes: [],
        genderTypes: [],
        specialties: [],
    });
    const [statesData, setStatesData] = useState([]);
    const [profileImage, setProfileImage] = useState('https://bit.ly/3wSLYqv');

    useEffect(() => {
        const profileTables = [
            'Ages',
            'FocusAreas',
            'Grades',
            'GenderTypes',
            'Specialties',
            'MentoringTypes',
            'LocationTypes',
            'States',
        ];
        profileService.getAllMentorProfileSelects(profileTables).then(onGetSelectsSuccess).catch(onGetSelectsError);
        profileService.getMentorProfile().then(onGetProfileSuccess).catch(onGetProfileError);
    }, []);

    const onGetSelectsSuccess = (response) => {
        _logger(response.item);
        setFormOptions((prevState) => {
            const newOptions = { ...prevState };
            newOptions.locationTypes = response.item.locationTypes.map(mapOptionsToSelect);
            newOptions.states = response.item.states.map(mapOptionsToSelect);
            newOptions.focusAreas = createOptionCards('focusAreas', response.item.focusAreas);
            newOptions.ages = createOptionCards('ages', response.item.ages);
            newOptions.grades = createOptionCards('grades', response.item.grades);
            newOptions.mentoringTypes = createOptionCards('mentoringTypes', response.item.mentoringTypes);
            newOptions.genderTypes = createOptionCards('genderTypes', response.item.genderTypes);
            newOptions.specialties = createOptionCards('specialties', response.item.specialties);
            return newOptions;
        });
        setStatesData(response.item.states);
    };

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
    const createOptionCards = (arrName, optionArr) => {
        const mapOptionsToCard = (eachOption) => {
            return (
                <div className="form-check" key={`${eachOption.name}_${eachOption.id}`}>
                    <label className="form-check-label">{eachOption.name}</label>
                    <Field type="checkbox" name={arrName} value={String(eachOption.id)} className="form-check-input" />
                </div>
            );
        };
        const optionCards = optionArr.map(mapOptionsToCard);
        return optionCards;
    };

    const onGetSelectsError = (response) => {
        _logger(response);
        toastr['error'](`Error retrieving dropdown lists`, 'Error');
    };
    const onGetProfileSuccess = (response) => {
        _logger(response);
        locationService
            .getCreatedByLocations(response.item.userId, 0, 1000)
            .then(onGetLocationSuccess)
            .catch(onGetLocationError);

        setFormData((prevState) => {
            const profileData = { ...prevState, ...response.item };
            profileData.focusAreas = profileData.focusAreas.map(mapOptionIds);
            profileData.ages = profileData.ages.map(mapOptionIds);
            profileData.grades = profileData.grades.map(mapOptionIds);
            profileData.mentoringTypes = profileData.mentoringTypes.map(mapOptionIds);
            profileData.genderTypes = profileData.genderTypes.map(mapOptionIds);
            profileData.specialties = profileData.specialties.map(mapOptionIds);
            return profileData;
        });
        toastr['info']('Profile records retrieved.');
    };
    const mapOptionIds = (eachObj) => {
        return String(eachObj.id);
    };
    const onGetProfileError = (response) => {
        _logger(response);
        toastr['info']('Create your profile by filling out this form.');
    };

    const onGetLocationSuccess = (response) => {
        _logger('retrieved location connected to user', response.data.item);
        const locationData = response.data.item;
        setFormData((prevState) => {
            const locData = { ...prevState };
            locData.location = {
                ...prevState.location,
                ...locationData.pagedItems[locationData.pagedItems.length - 1],
            };
            return locData;
        });
    };
    const onGetLocationError = (response) => {
        _logger(response);
    };

    const handleUpload = (urlList) => {
        const imageUrl = urlList[0].url;
        setProfileImage(imageUrl);
        toastr['success']('Profile image added.');
    };

    const handleSubmit = (values) => {
        _logger(values);
        const answerCopy = JSON.parse(JSON.stringify(values));
        let payload = answerCopy;
        payload.imageUrl = answerCopy.imageUrl ? answerCopy.imageUrl : profileImage;
        payload.focusAreas = payload.focusAreas.map((optionStr) => Number(optionStr));
        payload.ages = payload.ages.map((optionStr) => Number(optionStr));
        payload.grades = payload.grades.map((optionStr) => Number(optionStr));
        payload.mentoringTypes = payload.mentoringTypes.map((optionStr) => Number(optionStr));
        payload.genderTypes = payload.genderTypes.map((optionStr) => Number(optionStr));
        payload.specialties = payload.specialties.map((optionStr) => Number(optionStr));
        payload.locationTypeId = Number(payload.locationTypeId);
        payload.stateId = Number(payload.stateId);

        _logger(payload);

        if (!payload.id) {
            profileService.addMentorProfile(payload).then(onAddMentorProfileSuccess).catch(onAddMentorProfileError);
        } else {
            profileService
                .updateMentorProfile(payload, payload.id)
                .then(onUpdateMentorSuccess)
                .catch(onUpdateMentorError);
        }
    };
    const onAddMentorProfileSuccess = (response) => {
        _logger(response);
        toastr['success']('Your profile has been created.', 'Success');
    };

    const onAddMentorProfileError = (response) => {
        _logger(response);
        toastr['error']('Profile submission failed. Please double check your responses', 'Error');
    };
    const onUpdateMentorSuccess = (response) => {
        _logger(response);
        toastr['success']('Your profile has been updated.', 'Success');
    };

    const onUpdateMentorError = (response) => {
        _logger(response);
        toastr['error']('Profile update failed. Please double check your responses', 'Error');
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
                for (let i = 0; i < statesData.length; i++) {
                    const aState = statesData[i];
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
            setFormData((prevState) => {
                let newLocation = { ...prevState };
                newLocation.location.lineOne = result.lineOne;
                newLocation.location.city = result.city;
                newLocation.location.stateId = result.stateId;
                newLocation.location.zip = result.zip;
                newLocation.location.latitude = coordinates.lat;
                newLocation.location.longitude = coordinates.lng;
                return newLocation;
            });
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Card className="profile-card">
                        <Card.Header>
                            <h1>Mentor Profile Form</h1>
                            <h4>
                                Thank you for expressing your interest in becoming a mentor for our organization! We
                                would like to know more information about yourself in order to better match you with
                                mentees.
                            </h4>
                        </Card.Header>
                        <Card.Body>
                            <Formik
                                enableReinitialize={true}
                                initialValues={formData}
                                onSubmit={handleSubmit}
                                validationSchema={mentorProfileSchema}>
                                <Form>
                                    <div className="form-group">
                                        <Row>
                                            <Col md={6}>
                                                <label htmlFor="firstName">First Name</label>
                                                <Field type="text" name="firstName" className="form-control" />
                                                <ErrorMessage
                                                    name="firstName"
                                                    component="div"
                                                    className="field-error"
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <label htmlFor="lastName">Last Name</label>
                                                <Field type="text" name="lastName" className="form-control" />
                                                <ErrorMessage name="lastName" component="div" className="field-error" />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="imageUrl">Profile Image</label>
                                        <ErrorMessage name="imageUrl" component="div" className="field-error" />
                                        <Row className="d-flex align-items-center">
                                            <Col md="3" className="text-center">
                                                <img
                                                    src={formData.imageUrl || profileImage}
                                                    alt=""
                                                    className="profile-image rounded-circle"
                                                />
                                            </Col>
                                            <Col md="9">
                                                <span>
                                                    <FileUploader
                                                        onHandleUploadSuccess={handleUpload}
                                                        isMultiple={false}
                                                        className="file-box"
                                                    />
                                                </span>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <Field type="text" name="description" className="form-control" />
                                        <ErrorMessage name="description" component="div" className="field-error" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phoneNumber">Phone Number {'(optional)'}</label>
                                        <Field type="text" name="phoneNumber" className="form-control" />
                                        <ErrorMessage name="phoneNumber" component="div" className="field-error" />
                                    </div>{' '}
                                    <div className="form-group">
                                        <label htmlFor="socialMediaLink">Social Media Link {'(optional)'}</label>
                                        <Field type="text" name="socialMediaLink" className="form-control" />
                                        <ErrorMessage name="socialMediaLink" component="div" className="field-error" />
                                    </div>
                                    <hr />
                                    <label>Location</label>
                                    <div className="form-group">
                                        <label htmlFor="location.lineOne">Street Address 1</label>
                                        <AddressAutoComplete
                                            addressFromAuto={addressFromAuto}
                                            lineOne={'location.lineOne'}
                                        />
                                        <ErrorMessage name="location.lineOne" component="div" className="field-error" />
                                    </div>
                                    <Row>
                                        <Col md={9}>
                                            <div className="form-group">
                                                <label htmlFor="location.lineTwo">Street Address 2</label>
                                                <Field type="text" name="location.lineTwo" className="form-control" />
                                                <ErrorMessage
                                                    name="location.lineTwo"
                                                    component="div"
                                                    className="field-error"
                                                />
                                            </div>
                                        </Col>
                                        <Col md={3}>
                                            <div className="form-group">
                                                <label htmlFor="location.locationTypeId">Location Type</label>
                                                <Field
                                                    component="select"
                                                    name="location.locationTypeId"
                                                    className="form-control">
                                                    <option value="0">Please select a location type</option>
                                                    {formOptions.locationTypes}
                                                </Field>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="location.city">City</label>
                                                <Field type="text" name="location.city" className="form-control" />
                                                <ErrorMessage
                                                    name="location.city"
                                                    component="div"
                                                    className="field-error"
                                                />
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div className="form-group">
                                                <label htmlFor="location.stateId">State</label>
                                                <Field
                                                    component="select"
                                                    name="location.stateId"
                                                    className="form-control">
                                                    <option value="0">Please select the state</option>
                                                    {formOptions.states}
                                                </Field>
                                            </div>
                                        </Col>
                                        <Col md={2}>
                                            <div className="form-group">
                                                <label htmlFor="location.zip">Zip Code</label>
                                                <Field type="text" name="location.zip" className="form-control" />
                                                <ErrorMessage
                                                    name="location.zip"
                                                    component="div"
                                                    className="field-error"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                        <Col md="4">
                                            <div role="group" className="form-group">
                                                <label htmlFor="focusAreas">Focus Area</label>
                                                {formOptions.focusAreas}
                                                <ErrorMessage
                                                    name="focusAreas"
                                                    component="div"
                                                    className="field-error"
                                                />
                                            </div>
                                        </Col>
                                        <Col sm="4">
                                            <div className="form-group">
                                                <label htmlFor="ages">Age Group</label>
                                                {formOptions.ages}
                                                <ErrorMessage name="ages" component="div" className="field-error" />
                                            </div>
                                            <hr />
                                            <div className="form-group">
                                                <label htmlFor="grades">Grades</label>
                                                {formOptions.grades}
                                                <ErrorMessage name="grades" component="div" className="field-error" />
                                            </div>
                                            <hr />
                                            <div className="form-group">
                                                <label htmlFor="mentoringTypes">Mentoring Type</label>
                                                {formOptions.mentoringTypes}
                                                <ErrorMessage
                                                    name="mentoringTypes"
                                                    component="div"
                                                    className="field-error"
                                                />
                                            </div>
                                        </Col>
                                        <Col sm="4">
                                            <div className="form-group">
                                                <label htmlFor="genderTypes">Gender Type</label>
                                                {formOptions.genderTypes}
                                                <ErrorMessage
                                                    name="genderTypes"
                                                    component="div"
                                                    className="field-error"
                                                />
                                            </div>
                                            <hr />
                                            <div className="form-group">
                                                <label htmlFor="specialties">Specialty</label>
                                                {formOptions.specialties}
                                                <ErrorMessage
                                                    name="specialties"
                                                    component="div"
                                                    className="field-error"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <button type="submit" className="btn btn-primary mt-3">
                                        Submit
                                    </button>
                                </Form>
                            </Formik>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default MentorProfileForm;
