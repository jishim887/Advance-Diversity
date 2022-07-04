import axios from 'axios';
import { API_HOST_PREFIX, onGlobalSuccess, onGlobalError } from './serviceHelpers';
const surveyApi = `${API_HOST_PREFIX}/api/surveys`;

const getAllSurveySelects = () => {
    const config = {
        method: 'GET',
        url: `${surveyApi}/new`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const addSurvey = (payload) => {
    const config = {
        method: 'POST',
        url: `${surveyApi}/new`,
        data: payload,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAllSurveys = (index, size) => {
    const config = {
        method: 'GET',
        url: `${surveyApi}/?pageIndex=${index}&pageSize=${size}`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const searchSurveys = (index, size, query) => {
    query = query.replaceAll(' ', '%20');
    const config = {
        method: 'GET',
        url: `${surveyApi}/search/?pageIndex=${index}&pageSize=${size}&query=${query}`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const deleteSurvey = (id) => {
    const config = {
        method: 'DELETE',
        url: `${surveyApi}`,
        crossdomain: true,
        data: id,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const editSurvey = (payload) => {
    const config = {
        method: 'PUT',
        url: `${surveyApi}`,
        crossdomain: true,
        data: payload,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const surveysService = {
    getAllSurveySelects,
    addSurvey,
    getAllSurveys,
    searchSurveys,
    deleteSurvey,
    editSurvey,
};

export default surveysService;
