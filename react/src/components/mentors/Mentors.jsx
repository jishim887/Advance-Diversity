import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import Select from 'react-select';
import * as Yup from 'yup';
import profileService from '../../services/mentorProfileService';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import * as toastr from 'toastr';
import 'toastr/build/toastr.css';
import './mentors.css';
import MentorCard from './MentorCard';

import debug from 'sabio-debug';
const _logger = debug.extend('Mentors');

const basicSchema = Yup.object().shape({
    search: Yup.string().min(2).max(100),
});

const Mentors = () => {
    const [mentors, setMentors] = useState({
        index: 0,
        size: 3,
        totalCount: 1,
        mentorProfiles: [],
        mentorCards: [],
    });
    const [options, setOptions] = useState({
        focusAreas: [],
        ages: [],
        grades: [],
        mentoringTypes: [],
        genderTypes: [],
        specialties: [],
    });
    const [searchBar, setSearchBar] = useState({
        search: '',
    });
    const [isSearch, setIsSearch] = useState(false);
    const [selectFocusArea, setSelectFocusArea] = useState([]);
    const [selectAge, setSelectAge] = useState([]);
    const [selectGrade, setSelectGrade] = useState([]);
    const [selectMentoringType, setSelectMentoringType] = useState([]);
    const [selectGenderType, setSelectGenderType] = useState([]);
    const [selectSpecialty, setSelectSpecialty] = useState([]);

    useEffect(() => {
        setSearchBar({ search: '' });
        const size = mentors.size;
        if (
            !selectAge[0] &&
            !selectGrade[0] &&
            !selectFocusArea[0] &&
            !selectMentoringType[0] &&
            !selectGenderType[0] &&
            !selectSpecialty[0]
        ) {
            _logger('loading all mentors');
            profileService.getAllMentors(0, size).then(onGetAllSuccess).catch(onGetAllError);
        } else {
            getAllMentorsByOptions(0);
        }
    }, [selectFocusArea, selectAge, selectGrade, selectMentoringType, selectGenderType, selectSpecialty]);

    const getAllMentorsByOptions = (index) => {
        let payload = {};
        payload.focusAreas = selectFocusArea.map((obj) => obj.value);
        payload.ages = selectAge.map((obj) => obj.value);
        payload.grades = selectGrade.map((obj) => obj.value);
        payload.mentoringTypes = selectMentoringType.map((obj) => obj.value);
        payload.genderTypes = selectGenderType.map((obj) => obj.value);
        payload.specialties = selectSpecialty.map((obj) => obj.value);
        profileService
            .getMentorsByOptions(index, mentors.size, payload)
            .then(onGetAllSuccess)
            .catch(onGetMentorByOptionError);
    };

    const onGetMentorByOptionError = (response) => {
        _logger(response);
        setMentors((prevState) => {
            const newMentors = { ...prevState };
            newMentors.totalCount = 1;
            newMentors.mentorProfiles = [];
            newMentors.mentorCards = [];
            return newMentors;
        });
        setIsSearch(false);
    };

    useEffect(() => {
        const profileTables = ['Ages', 'FocusAreas', 'Grades', 'GenderTypes', 'Specialties', 'MentoringTypes'];
        profileService.getAllMentorProfileSelects(profileTables).then(onGetSelectsSuccess).catch(onGetSelectsError);
    }, []);

    const onGetSelectsError = (response) => {
        _logger(response);
        toastr['error'](`Error retrieving dropdown lists`, 'Error');
    };
    const onGetSelectsSuccess = (response) => {
        setOptions((prevState) => {
            const newOptions = { ...prevState };
            newOptions.focusAreas = response.item.focusAreas.map(mapOptionsToReactSelect);
            newOptions.ages = response.item.ages.map(mapOptionsToReactSelect);
            newOptions.grades = response.item.grades.map(mapOptionsToReactSelect);
            newOptions.mentoringTypes = response.item.mentoringTypes.map(mapOptionsToReactSelect);
            newOptions.genderTypes = response.item.genderTypes.map(mapOptionsToReactSelect);
            newOptions.specialties = response.item.specialties.map(mapOptionsToReactSelect);
            return newOptions;
        });
    };
    const mapOptionsToReactSelect = (eachOption) => {
        return { value: eachOption.id, label: eachOption.name };
    };

    const onGetAllSuccess = (response) => {
        _logger(response);
        setMentors((prevState) => {
            const newMentors = { ...prevState };
            newMentors.totalCount = response.item.totalCount;
            newMentors.mentorProfiles = response.item.pagedItems;
            newMentors.mentorCards = response.item.pagedItems.map(mapEachCard);
            return newMentors;
        });
        setIsSearch(false);
    };
    const mapEachCard = (eachMentor, index) => {
        return <MentorCard key={eachMentor.id} mentor={eachMentor} cardNum={index % 4} />;
    };
    const onGetAllError = (response) => {
        _logger(response);
        toastr['error'](`Failed to retrieve mentors.`);
    };

    const handleSearch = (values) => {
        if (values.search) {
            profileService.searchMentors(0, mentors.size, values.search).then(onSearchSuccess).catch(onSearchError);
            setSearchBar((prevState) => {
                const newSearch = { ...prevState };
                newSearch.search = values.search;
                return newSearch;
            });
        } else {
            profileService.getAllMentors(0, mentors.size).then(onGetAllSuccess);
            setSearchBar((prevState) => {
                const newSearch = { ...prevState };
                newSearch.search = '';
                return newSearch;
            });
        }
    };
    const onSearchSuccess = (response) => {
        _logger(response);
        setMentors((prevState) => {
            const newMentors = { ...prevState };
            newMentors.totalCount = response.item.totalCount;
            newMentors.mentorProfiles = response.item.pagedItems;
            newMentors.mentorCards = response.item.pagedItems.map(mapEachCard);
            return newMentors;
        });
        setIsSearch(true);
    };
    const onSearchError = (response) => {
        _logger(response);
        toastr['warning'](`No search results`);
    };

    const onPageChange = (page) => {
        if (isSearch) {
            profileService.searchMentors(page - 1, mentors.size, searchBar.search).then(onSearchSuccess);
        } else {
            if (
                !selectAge[0] &&
                !selectGrade[0] &&
                !selectFocusArea[0] &&
                !selectMentoringType[0] &&
                !selectGenderType[0] &&
                !selectSpecialty[0]
            ) {
                profileService.getAllMentors(page - 1, mentors.size).then(onGetAllSuccess);
            } else {
                getAllMentorsByOptions(page - 1);
            }
        }
    };

    return (
        <div className="container">
            <Row>
                <Col md={3}>
                    <Card className="mentors-card">
                        <Formik
                            enableReinitialize={true}
                            initialValues={searchBar}
                            onSubmit={handleSearch}
                            validationSchema={basicSchema}>
                            <Form>
                                <Row className="align-items-start">
                                    <Col>
                                        <div className="form-group ">
                                            <div className="d-flex justify-content between">
                                                <Field
                                                    type="text"
                                                    name="search"
                                                    className="form-control"
                                                    placeholder="Search"
                                                />
                                                <button type="submit" className="btn btn-primary submit-button">
                                                    Search
                                                </button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </Formik>
                        <Row className="mt-2 mb-2">
                            <Col>
                                <div className="mentor-options-label">
                                    <label>Focus Areas</label>
                                    <Select
                                        isMulti
                                        defaultValue={selectFocusArea}
                                        name="focusAreas"
                                        options={options.focusAreas}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        onChange={setSelectFocusArea}
                                    />
                                </div>
                                <div className="mentor-options-label">
                                    <label>Ages</label>
                                    <Select
                                        isMulti
                                        name="ages"
                                        options={options.ages}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        defaultValue={selectAge}
                                        onChange={setSelectAge}
                                    />
                                </div>
                                <div className="mentor-options-label">
                                    <label>Grades</label>
                                    <Select
                                        isMulti
                                        name="grades"
                                        options={options.grades}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        defaultValue={selectGrade}
                                        onChange={setSelectGrade}
                                    />
                                </div>
                                <div className="mentor-options-label">
                                    <label>Mentoring Types</label>
                                    <Select
                                        isMulti
                                        name="mentoringTypes"
                                        options={options.mentoringTypes}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        defaultValue={selectMentoringType}
                                        onChange={setSelectMentoringType}
                                    />
                                </div>
                                <div className="mentor-options-label">
                                    <label>Gender Types</label>
                                    <Select
                                        isMulti
                                        name="grades"
                                        options={options.grades}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        defaultValue={selectGenderType}
                                        onChange={setSelectGenderType}
                                    />
                                </div>
                                <div className="mentor-options-label">
                                    <label>Specialties</label>
                                    <Select
                                        isMulti
                                        name="specialties"
                                        options={options.specialties}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        defaultValue={selectSpecialty}
                                        onChange={setSelectSpecialty}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col md={9}>
                    <Card className="mentors-card">
                        <Card.Header className="mentors-header">
                            <h1>Our Mentors</h1>
                        </Card.Header>
                        <Card.Body>
                            <Row
                                className="d-flex justify-content-between"
                                style={{ marginTop: '24px', marginBottom: '24px' }}>
                                {mentors.mentorCards}
                            </Row>

                            <Row>
                                <div className="d-flex justify-content-center">
                                    <Pagination
                                        onChange={onPageChange}
                                        current={mentors.index}
                                        pageSize={mentors.size}
                                        total={mentors.totalCount}
                                        className="pagination-rounded"
                                    />
                                </div>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
export default Mentors;
