import {AuthActions, actionTypes} from "../actions/types"
const initialState = {
    userDetails:  {},
    error: false,
    errorMessage: "",
    loading: false
}


interface AuthState {
    userDetails: {
        _id: string,
        email: string,
        token: string,
        username: string
    } | {},
    error: boolean;
    errorMessage: string,
    loading: boolean
}

const authReducer = (state=initialState, action: AuthActions): AuthState => {

    switch (action.type) {
        case actionTypes.authenticate:
            return {
                error: false,
                errorMessage: "",
                userDetails: action.payload,
                loading: false
            }
        
        case actionTypes.authError:
            return {
                ...state,
                error: true,
                errorMessage: action.payload,
                loading: false
            }

        case actionTypes.logout:
            return {
                error: false,
                errorMessage: "",
                userDetails: {},
                loading: false
            }
        case actionTypes.authLoading:
            return {
                error: false,
                errorMessage: "",
                userDetails: {},
                loading: action.payload,
            };
        
        default:
            return state
    }
}


export {authReducer}
