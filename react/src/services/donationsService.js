import axios from 'axios';
import { API_HOST_PREFIX, onGlobalSuccess, onGlobalError } from './serviceHelpers';
const donationApi = `${API_HOST_PREFIX}/api/donate`;
const emailApi = `${API_HOST_PREFIX}/api/emails/donation`;

const getCurrentUser = () => {
    const config = {
        method: 'GET',
        url: donationApi,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const addPayment = (payload) => {
    const config = {
        method: 'POST',
        url: donationApi,
        data: payload,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const emailReceipt = (payload) => {
    const config = {
        method: 'POST',
        url: emailApi,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
export { getCurrentUser, addPayment, emailReceipt };
