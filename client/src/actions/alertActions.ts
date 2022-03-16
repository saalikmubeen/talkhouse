import { actionTypes } from "./types"

export const showAlert = (message: string) => {
    return {
        type: actionTypes.showAlert,
        payload: message
    }
}


export const hideAlert = () => {
    return {
        type: actionTypes.hideAlert
    }
}