import { Dispatch,  } from "redux";
import { login, register, getMe } from "../api/api";
import { LoginArgs, RegisterArgs } from "../api/types";
import { showAlert } from "./alertActions";
import { resetChatAction } from "./chatActions";
import { resetFriendsAction } from "./friendActions";
import {actionTypes, CurrentUser} from "./types";


export const loginUser = (credentials: LoginArgs) => {
    return async (dispatch: Dispatch) => {
        const response = await login(credentials);

        if ("error" in response) {
            dispatch({
                type: actionTypes.authError,
                payload: response.message
            })

            dispatch(showAlert(response.message));
        } else {
            localStorage.setItem("currentUser", JSON.stringify(response.userDetails));
            dispatch({
                type: actionTypes.authenticate,
                payload: response.userDetails
            })

           dispatch(
               showAlert(
                   `Hi, ${response.userDetails.username} 👋. Welcome back.`
               )
           );
        }
    }
} 



export const registerUser = (credentials: RegisterArgs) => {
    return async (dispatch: Dispatch) => {
        const response = await register(credentials);

        if ("error" in response) {
            dispatch({
                type: actionTypes.authError,
                payload: response.message,
            });

            dispatch(showAlert(response.message));
        } else {
            localStorage.setItem(
                "currentUser",
                JSON.stringify(response.userDetails)
            );
            dispatch({
                type: actionTypes.authenticate,
                payload: response.userDetails,
            });

            dispatch(
                showAlert(
                    `Hi 👋 ${response.userDetails.username}. Welcome to TalkHouse. I'm Saalik, the creator of TalkHouse. You have me a as a friend till you invite and add your other friends 😊.`
                )
            );
        }
    };
}; 


export const autoLogin = () => {
    return async (dispatch: Dispatch) => {

        dispatch({
            type: actionTypes.authLoading,
            payload: true,
        });

        const currentUser: CurrentUser = JSON.parse(
            localStorage.getItem("currentUser") || "{}"
        );

        const response = await getMe();

        // token has expired
        if (response.statusCode === 401 || response.statusCode === 403) {
            localStorage.clear();
            dispatch({
                type: actionTypes.authLoading,
                payload: false,
            });

        } else {

            if (currentUser.token) {
                dispatch({
                    type: actionTypes.authenticate,
                    payload: {
                        ...response.me,
                        token: currentUser.token,
                    },
                });
            }

        }

    }
}


export const logoutUser = () => {
    return async (dispatch: Dispatch) => {
        localStorage.removeItem("currentUser");
        dispatch({
            type: actionTypes.logout,
        });

        dispatch(resetChatAction());
        dispatch(resetFriendsAction());

        dispatch({
            type: actionTypes.resetChat
        })
    }
}