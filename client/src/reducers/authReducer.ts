import { Reducer } from "redux";
import { AuthActions, actionTypes } from "../actions/types";

interface AuthState {
    userDetails: {
        _id: string;
        email: string;
        token: string;
        username: string;
    } | null;
    error: boolean;
    errorMessage: string;
    loading: boolean;
}

const initialState: AuthState = {
    userDetails: null,
    error: false,
    errorMessage: "",
    loading: false,
};

const authReducer: Reducer<AuthState, AuthActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case actionTypes.authenticate:
            return {
                error: false,
                errorMessage: "",
                userDetails: action.payload,
                loading: false,
            };

        case actionTypes.authError:
            return {
                ...state,
                error: true,
                errorMessage: action.payload,
                loading: false,
            };

        case actionTypes.logout:
            return {
                error: false,
                errorMessage: "",
                userDetails: null,
                loading: false,
            };
        case actionTypes.authLoading:
            return {
                error: false,
                errorMessage: "",
                userDetails: null,
                loading: action.payload,
            };

        default:
            return state;
    }
};

export { authReducer };
