import {AuthActions, actionTypes} from "../actions/types"
const initialState = {
    userDetails:  {},
    error: false,
    errorMessage: "",
}


interface AuthState {
    userDetails: {
        email: string,
        token: string,
        username: string
    } | {},
    error: boolean;
    errorMessage: string
}

const authReducer = (state=initialState, action: AuthActions): AuthState => {

    switch (action.type) {
        case actionTypes.authenticate:
            return {
                error: false,
                errorMessage: "",
                userDetails: action.payload
            }
        
        case actionTypes.authError:
            return {
                ...state,
                error: true,
                errorMessage: action.payload,
            }

        case actionTypes.logout:
            return {
                error: false,
                errorMessage: "",
                userDetails: {}
            }
        
        default:
            return state
    }
}


export {authReducer}
