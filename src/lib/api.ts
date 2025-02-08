import {getCookie} from "cookies-next";
import axios from "axios";

const getToken = ()=>{
    if(typeof window === 'undefined'){
        return getCookie('session', {req: undefined})
    }
    return null;
}

export const Api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers:{
        'Content-Type': 'application/json'
    },
});

Api.interceptors.request.use(
    async(config)=>{
        const token = getToken();
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error)=> Promise.reject(error)
)

Api.interceptors.response.use(
    (response)=> response,
    (error)=>{
        if(error.response?.status === 401){
            console.warn('Session expired, redirecting to verify...')
        }
        return Promise.reject(error);
    }
)