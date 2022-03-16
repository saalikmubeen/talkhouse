import axios from "axios";
import { LoginArgs, AuthResponse, RegisterArgs } from "./types";

const BASE_URL = "http://localhost:5000"

const api = axios.create({
    baseURL: BASE_URL,

})



api.interceptors.request.use(
    (config) => {
        const userDetails = localStorage.getItem("currentUser");

        if (userDetails) {
            const token = JSON.parse(userDetails).token;
            config!.headers!.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);


export const login = async ({email, password}: LoginArgs) => {
    try{
        const res = await api.post<AuthResponse>("/api/auth/login", {email, password});
        
        return res.data;

    }catch(err: any) {
        return {
            error: true,
            message: err.response.data
        }
    }
}


export const register = async ({ email, password, username }: RegisterArgs) => {
    try {
        const res = await api.post<AuthResponse>("/api/auth/register", {
            email,
            password,
            username,
        });

        return res.data;
    } catch (err: any) {
        return {
            error: true,
            message: err.response.data
        };
    }
};