import axios from 'axios';
import { API_HOST_PREFIX, onGlobalSuccess, onGlobalError } from './serviceHelpers';

const surveyFormApi = `${API_HOST_PREFIX}/api/surveys/forms`;

const CreateInstance = (id) => {
    const config = {
        method: 'POST',
        url: `${surveyFormApi}/instance/${id}`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const GetSurvey = (id) => {
    const config = {
        method: 'GET',
        url: `${surveyFormApi}/${id}`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const AddAnswers = (payload) => {
    const config = {
        method: 'POST',
        url: `${surveyFormApi}`,
        data: payload,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const surveyInstancesService = {
    CreateInstance,
    GetSurvey,
    AddAnswers,
};

export default surveyInstancesService;
