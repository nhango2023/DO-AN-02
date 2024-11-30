import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080'
});

instance.defaults.withCredentials = true;

// import { useSelector } from "react-redux";
// const accessToken = useSelector(state=> state.user.data.accessToken);
// instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    let status = (error && error.response && error.response.status) || 500;
    switch (status) {
        // authentication (token related issues)
        case 401: {
            return error.response.data;
        }
        // forbidden (permission related issues)
        case 403: {
            return error.response.data;
        }
        // bad request
        case 400: {
            return error.response.data
        }

        // not found
        case 404: {
            return error.response.data
        }

        // generic api error (server related) unexpected
        default: {
            return Promise.reject(error);
        }
    }

});

export default instance;