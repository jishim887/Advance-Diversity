import axios from 'axios';
import { API_HOST_PREFIX, onGlobalSuccess, onGlobalError } from './serviceHelpers';

const mentorProfileApi = `${API_HOST_PREFIX}/api/mentorprofiles`;
const lookUpApi = `${API_HOST_PREFIX}/api/lookups`;

const getAllMentorProfileSelects = (payload) => {
    const config = {
        method: 'POST',
        url: lookUpApi,
        data: payload,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getMentorProfile = () => {
    const config = {
        method: 'GET',
        url: mentorProfileApi,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const addMentorProfile = (payload) => {
    const config = {
        method: 'POST',
        url: mentorProfileApi,
        data: payload,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const updateMentorProfile = (payload, id) => {
    const config = {
        method: 'PUT',
        url: mentorProfileApi + '/' + id,
        data: payload,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAllMentors = (index, size) => {
    const config = {
        method: 'GET',
        url: mentorProfileApi + `/paginate/?pageIndex=${index}&pageSize=${size}`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const searchMentors = (index, size, query) => {
    query = query.replaceAll(' ', '%20');
    const config = {
        method: 'GET',
        url: mentorProfileApi + `/search/?pageIndex=${index}&pageSize=${size}&query=${query}`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getMentorsByOptions = (index, size, payload) => {
    const config = {
        method: 'POST',
        url: mentorProfileApi + `/options/?pageIndex=${index}&pageSize=${size}`,
        data: payload,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const mentorProfile = {
    getAllMentorProfileSelects,
    getMentorProfile,
    addMentorProfile,
    updateMentorProfile,
    getAllMentors,
    searchMentors,
    getMentorsByOptions,
};

export default mentorProfile;
