import axios from "axios";
import { backendUrl } from "../Shared/backendUrl";

// import React from 'react';
const axiosPublic = axios.create({ 
    baseURL: backendUrl,
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic; 