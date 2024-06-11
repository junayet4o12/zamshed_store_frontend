import { signOut } from "firebase/auth";
import axios from 'axios';
import { backendUrl } from '../Shared/backendUrl';
import auth from '../../firebase/firebase.config';

const axiosSecure = axios.create({
    baseURL: backendUrl
});
axiosSecure.interceptors.request.use((res) => {
    const token = localStorage.getItem('token');
    if (token) {
        res.headers.authorization = `bearer ${token}`;
    }
    return res;
}, (err) => {
    return Promise.reject(err);
});

axiosSecure.interceptors.response.use((res) => {
    return res;
}, (err) => {
    const status = err.response.status;
    if (status === 401 || status === 403) {
        signOut(auth);
    }
    return Promise.reject(err);
});

// const useAxiosSecure = () => {
//     const navigate = useNavigate();
//     axiosSecure.interceptors.request.use((res) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             res.headers.authorization = `bearer ${token}`;
//         }
//         return res;
//     }, (err) => {
//         return Promise.reject(err);
//     });

//     axiosSecure.interceptors.response.use((res) => {
//         return res;
//     }, (err) => {
//         const status = err.response.status;
//         if (status === 401 || status === 403) {
//             signOut(auth);
//             navigate('/login');
//         }
//         return Promise.reject(err);
//     });

//     return axiosSecure;
// };

const axiosBaseQuery = ({ baseUrl }) => async ({ url, method, body: data, params }) => {
    console.log(baseUrl + url, method, data);
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
        console.log(result);
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