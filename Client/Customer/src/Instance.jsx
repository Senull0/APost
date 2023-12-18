import axios from "axios";


const usersBASEURL = import.meta.env.VITE_APP_USERS_BASEURL;
const parcelsBASEURL = import.meta.env.VITE_APP_PARCELS_BASEURL;
const notificationsBASEURL = import.meta.env.VITE_APP_NOTIFICATIONS_BASEURL;

const createApiInstance = (baseURL) => {
    const api = axios.create({
        baseURL,
        timeout: 7500,
        headers: {
            'Content-Type': 'application/json',
        }
    });

    api.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return api;
};


export const usersAPI = createApiInstance(usersBASEURL);
export const parcelsAPI = createApiInstance(parcelsBASEURL);
export const notificationsAPI = createApiInstance(notificationsBASEURL);
