import React, { useState, useEffect } from 'react';
import Loki from 'react-loki';
import './mentor-loki.css';
import * as toastr from 'toastr';
import 'toastr/build/toastr.css';
import { Container } from 'react-bootstrap';
import { SurveyIcon } from '../surveys/SurveyIcons';
import PersonalInfoForm from './PersonalInfoForm';
import MentorLocationForm from './MentorLocationForm';
import FocusAreaForm from './FocusAreaForm';
import MentorOptionsForm from './MentorOptionsForm';
import profileService from '../../services/mentorProfileService';
import { useNavigate } from 'react-router-dom';

import debug from 'sabio-debug';
const _logger = debug.extend('MentorForm');

const MentorWizard = () => {
    const navigate = useNavigate();
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

    const [lokiStatus, setLokiStatus] = useState(false);
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
        profileService
            .getAllMentorProfileSelects(profileTables)
            .then(onGetSelectsSuccess)
            .catch(onGetSelectsError)
            .then(profileService.getMentorProfile)
            .then(onGetProfileSuccess)
            .catch(onGetProfileError);
    }, []);
    const onGetSelectsSuccess = (response) => {
        setFormOptions((prevState) => {
            const newOptions = { ...prevState };
            newOptions.locationTypes = response.item.locationTypes;
            newOptions.states = response.item.states;
            newOptions.focusAreas = response.item.focusAreas;
            newOptions.ages = response.item.ages;
            newOptions.grades = response.item.grades;
            newOptions.mentoringTypes = response.item.mentoringTypes;
            newOptions.genderTypes = response.item.genderTypes;
            newOptions.specialties = response.item.specialties;
            return newOptions;
        });
    };

    const onGetSelectsError = (response) => {
        _logger(response);
        toastr['error'](`Error retrieving dropdown lists`, 'Error');
    };
    const onGetProfileSuccess = (response) => {
        setFormData((prevState) => {
            const profileData = { ...prevState, ...response.item };
            profileData.location.locationTypeId = response.item.location.locationType.id;
            profileData.location.stateId = response.item.location.state.id;
            profileData.imageUrl = profileData.imageUrl || 'https://bit.ly/3wSLYqv';
            profileData.focusAreas = profileData.focusAreas.map(mapOptionIds);
            profileData.ages = profileData.ages.map(mapOptionIds);
            profileData.grades = profileData.grades.map(mapOptionIds);
            profileData.mentoringTypes = profileData.mentoringTypes.map(mapOptionIds);
            profileData.genderTypes = profileData.genderTypes.map(mapOptionIds);
            profileData.specialties = profileData.specialties.map(mapOptionIds);
            return profileData;
        });
        setLokiStatus(true);
        toastr['info']('Profile records retrieved.');
    };
    const mapOptionIds = (eachObj) => {
        return String(eachObj.id);
    };
    const onGetProfileError = () => {
        _logger('wizard for a new profile');
        toastr['info']('Create your profile by filling out this form.');
        setFormData((prevState) => {
            const profileData = { ...prevState };
            profileData.imageUrl = 'https://bit.ly/3wSLYqv';
            return profileData;
        });
        setLokiStatus(true);
    };

    const onChange = (values) => {
        setFormData((prevState) => {
            const fd = { ...prevState, ...values };
            return fd;
        });
    };

    const onFinish = () => {
        _logger('raw data', formData);
        const payload = JSON.parse(JSON.stringify(formData));
        payload.focusAreas = payload.focusAreas.map((opNum) => Number(opNum));
        payload.ages = payload.ages.map((opNum) => Number(opNum));
        payload.grades = payload.grades.map((opNum) => Number(opNum));
        payload.mentoringTypes = payload.mentoringTypes.map((opNum) => Number(opNum));
        payload.genderTypes = payload.genderTypes.map((opNum) => Number(opNum));
        payload.specialties = payload.specialties.map((opNum) => Number(opNum));
        payload.location.locationTypeId = Number(payload.location.locationTypeId);
        payload.location.stateId = Number(payload.location.stateId);
        _logger('to submit', payload);
        if (payload.id) {
            profileService
                .updateMentorProfile(payload, payload.id)
                .then(onUpdateMentorSuccess)
                .catch(onUpdateMentorError);
        } else {
            profileService.addMentorProfile(payload).then(onAddMentorSuccess).catch(onAddMentorError);
        }
    };
    const onUpdateMentorSuccess = (response) => {
        _logger(response);
        toastr['success'](`Profile updated successfully`, 'Success');
        setTimeout(function () {
            navigate('/mentor');
        }, 1000);
    };
    const onUpdateMentorError = (response) => {
        _logger(response);
        toastr['error'](`Submission failed. Please double check your responses.`, 'Error');
    };
    const onAddMentorSuccess = (response) => {
        _logger(response);
        toastr['success'](`Profile added successfully`, 'Success');
        setTimeout(function () {
            navigate('/mentor');
        }, 1000);
    };
    const onAddMentorError = (response) => {
        _logger(response);
        toastr['error'](`Submission failed. Please double check your responses. `, 'Error');
    };

    const mentorSteps = [
        {
            label: 'Step 1 - Personal Information',
            icon: <SurveyIcon />,
            component: <PersonalInfoForm formData={formData} formOptions={formOptions} onChange={onChange} />,
        },
        {
            label: 'Step 2 - Location Information',
            icon: <SurveyIcon />,
            component: <MentorLocationForm formData={formData} formOptions={formOptions} onChange={onChange} />,
        },
        {
            label: 'Step 3 - Focus Area Information',
            icon: <SurveyIcon />,
            component: <FocusAreaForm formData={formData} formOptions={formOptions} onChange={onChange} />,
        },
        {
            label: 'Step 4 - Mentor Options Information',
            icon: <SurveyIcon />,
            component: <MentorOptionsForm formData={formData} formOptions={formOptions} onChange={onChange} />,
        },
    ];
    return (
        <div className="MentorProfileWizard">
            {lokiStatus ? (
                <Container>
                    <Loki steps={mentorSteps} onNext={onChange} onBack={onChange} onFinish={onFinish} noActions />
                </Container>
            ) : (
                'Retrieving form...'
            )}
        </div>
    );
};

export default MentorWizard;
