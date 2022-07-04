import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { Badge, Card, Table, Row, Col } from 'react-bootstrap';

import * as toastr from 'toastr';
import 'toastr/build/toastr.css';

import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

import informationIcon from '../../assets/images/surveys/information.svg';
import editIcon from '../../assets/images/surveys/edit.svg';
import deleteIcon from '../../assets/images/surveys/delete.svg';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import surveysService from '../../services/surveysService';
import 'toastr/build/toastr.css';
import debug from 'sabio-debug';

const _logger = debug.extend('Surveys');

const basicSchema = Yup.object().shape({
    search: Yup.string().min(2).max(100),
});

const Surveys = () => {
    const [surveyData, setSurveyData] = useState({
        index: 0,
        size: 5,
        totalCount: 0,
        surveys: [],
    });
    const [searchBar] = useState({
        search: '',
    });
    const [isSearch, setIsSearch] = useState(false);
    useEffect(() => {
        const index = surveyData.index;
        const size = surveyData.size;
        surveysService.getAllSurveys(index, size).then(onGetSuccess);
    }, []);
    const onGetSuccess = (response) => {
        _logger(response);
        setSurveyData((prevData) => {
            const newData = { ...prevData };
            newData.surveys = response.item.pagedItems;
            newData.totalCount = response.item.totalCount;
            return newData;
        });
        setIsSearch(false);
    };

    const convertDate = (eventDate) => {
        var options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        var today = new Date(eventDate);
        return today.toLocaleDateString('en-US', options);
    };

    const handleSearch = (values) => {
        _logger(values.search);
        if (values.search) {
            surveysService.searchSurveys(0, surveyData.size, values.search).then(onSearchSuccess).catch(onSearchError);
        } else {
            surveysService.getAllSurveys(0, surveyData.size).then(onGetSuccess);
        }
    };
    const onSearchSuccess = (response) => {
        _logger(response);
        setSurveyData((prevData) => {
            const newData = { ...prevData };
            newData.surveys = response.item.pagedItems;
            newData.totalCount = response.item.totalCount;
            return newData;
        });
        setIsSearch(true);
    };

    const onSearchError = (response) => {
        _logger(response);
        toastr['error']('Please double check your responses', 'Error');
    };

    const onPageChange = (page) => {
        if (isSearch) {
            surveysService.searchSurveys(page - 1, surveyData.size, searchBar.search).then(onSearchSuccess);
        } else {
            surveysService.getAllSurveys(page - 1, surveyData.size).then(onGetSuccess);
        }
    };

    return (
        <Row style={{ marginTop: '50px' }}>
            <Col>
                <Card style={{ padding: '30px' }}>
                    <Card.Header>
                        <h1>Created Survey Forms</h1>
                    </Card.Header>
                    <Card.Body>
                        <Row className="mb-2 d-flex align-items-end">
                            <Col xs={6}>
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={searchBar}
                                    onSubmit={handleSearch}
                                    validationSchema={basicSchema}>
                                    <Form>
                                        <div className="form-group ">
                                            <label htmlFor="search">Search</label>
                                            <div className="d-flex justify-content between">
                                                <Field type="text" name="search" className="form-control" />
                                                <button type="submit" className="btn btn-primary">
                                                    Search
                                                </button>
                                            </div>
                                        </div>
                                    </Form>
                                </Formik>
                            </Col>
                            <Col xs={6} className="d-flex justify-content-end">
                                <Link to="./new" className="btn btn-success">
                                    Create Survey
                                </Link>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-center">
                            <Pagination
                                onChange={onPageChange}
                                current={surveyData.index}
                                pageSize={surveyData.size}
                                total={surveyData.totalCount}
                                className="pagination-rounded"
                            />
                        </div>

                        <Table responsive className="table-centered table-nowrap mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">Survey Name</th>
                                    <th scope="col">Date Created</th>
                                    <th scope="col">Survey Type</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(surveyData.surveys || []).map((survey, i) => {
                                    return (
                                        <tr key={i}>
                                            <td style={{ width: '25%' }}>
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-grow-1 ms-2">{survey.name}</div>
                                                </div>
                                            </td>
                                            <td>{convertDate(survey.dateCreated)}</td>
                                            <td>{survey.surveyType}</td>
                                            <td>
                                                <Badge
                                                    className={classNames({
                                                        'bg-primary-lighten text-primary': survey.status === 'Pending',
                                                        'bg-success-lighten text-success': survey.status === 'Active',
                                                        'bg-warning-lighten text-warning': survey.status === 'Flagged',
                                                        'bg-alert-lighten text-alert': survey.status === 'Deleted',
                                                    })}>
                                                    {survey.status}
                                                </Badge>
                                            </td>
                                            <td style={{ width: '15%' }}>
                                                <Link to="#" className="font-18 text-info me-2">
                                                    <img src={informationIcon} alt="" width="20"></img>
                                                </Link>
                                                <Link to="#" className="font-18 text-info me-2">
                                                    <img src={editIcon} alt="" width="20"></img>
                                                </Link>

                                                <Link to="#" className="font-18 text-danger">
                                                    <img src={deleteIcon} alt="" width="20"></img>
                                                </Link>
                                            </td>
                                            <td style={{ width: '10%' }}>
                                                <Link to={`./forms/${survey.id}`} className="btn btn-info">
                                                    Take Survey
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default Surveys;
