import { AlertActions, actionTypes } from "../actions/types";

const initialState = {
    open: false,
    message: ""
}


interface AlertState {
    open: boolean;
    message: string;
}


export const alertReducer = (state=initialState, action: AlertActions): AlertState => {
    switch (action.type) {
        case actionTypes.showAlert:
            return {
                open: true,
                message: action.payload
            }
        
        case actionTypes.hideAlert:
            return {
                open: false,
                message: ""
            }
        
        default:
            return state;
    }
}