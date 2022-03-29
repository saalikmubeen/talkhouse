import axios from "axios";
import {
    LoginArgs,
    AuthResponse,
    RegisterArgs,
    inviteFriendArgs,
} from "./types";

const BASE_URL = "http://localhost:5000"; 
// const BASE_URL = "https://saliks-discord.herokuapp.com/";

const api = axios.create({
    baseURL: BASE_URL
});

api.interceptors.request.use(
    (config) => {
        const userDetails = localStorage.getItem("currentUser");

        if (userDetails) {
            const token = JSON.parse(userDetails).token;
            console.log(token);
            config.headers!["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);



const logOut = () => {
    localStorage.clear();
    window.location.pathname = "/login";
};

const checkForAuthorization = (error: any) => {
    const responseCode = error?.response?.status;

    if (responseCode) {
        (responseCode === 401 || responseCode === 403) && logOut();
    }
};

export const login = async ({ email, password }: LoginArgs) => {
    try {
        const res = await api.post<AuthResponse>("/api/auth/login", {
            email,
            password,
        });

        return res.data;
    } catch (err: any) {
        return {
            error: true,
            message: err.response.data,
        };
    }
};

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
            message: err.response.data,
        };
    }
};

// protected routes

export const inviteFriendRequest = async ({ email }: inviteFriendArgs) => {
    try {
        const res = await api.post("/api/invite-friend/invite", {
            email,
        });

        return res.data;
    } catch (err: any) {
        checkForAuthorization(err);
        return {
            error: true,
            message: err.response.data,
        };
    }
};




export const rejectFriendRequest = async (invitationId: string) => {
    try {
        const res = await api.post("/api/invite-friend/reject", {
            invitationId,
        });

        return res.data;
    } catch (err: any) {
        checkForAuthorization(err);
        return {
            error: true,
            message: err.response.data,
        };
    }
};


export const acceptFriendRequest = async (invitationId: string) => {
    try {
        const res = await api.post("/api/invite-friend/accept", {
            invitationId,
        });

        return res.data;
    } catch (err: any) {
        checkForAuthorization(err);
        return {
            error: true,
            message: err.response.data,
        };
    }
};