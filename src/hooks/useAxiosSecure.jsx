import { signOut } from "firebase/auth";
import axios from 'axios';
import { backendUrl } from '../Shared/backendUrl';
import auth from '../../firebase/firebase.config';
import { removeUserData } from "../Redux/features/userSlice/userSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const axiosSecure = axios.create({
    baseURL: backendUrl
});

// Adding request interceptor
axiosSecure.interceptors.request.use(
    (config) => {


        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Correct capitalization
            // console.log('Token added to headers:', config.headers.Authorization);
        } else {
            // console.log('No token found in localStorage');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Adding response interceptor
axiosSecure.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const dispatch = useDispatch()
        const status = error.response ? error.response.status : null;
        if (status === 401 || status === 403) {
           const toastId = toast.loading("Logging Out...");
            signOut(auth)
                .then(res => {

                    dispatch(removeUserData())
                    toast.success("Logged Out!!", { id: toastId });
                })
                .catch(err => {
                    toast.error(err?.message, { id: toastId });
                })
        }
        return Promise.reject(error);
    }
);

// Custom axios base query function
const axiosBaseQuery = ({ baseUrl }) => async ({ url, method, body: data, params }) => {
    try {
        const config = {
            url: baseUrl + url,
            method,
        };

        if (method === 'GET') {
            config.params = params;
        } else {
            config.data = data;
        }

        const result = await axiosSecure(config);
        return { data: result.data };
    } catch (axiosError) {
        let err = axiosError;
        return {
            error: {
                status: err.response?.status,
                data: err.response?.data || err.message,
            },
        };
    }
};

export { axiosBaseQuery, axiosSecure };