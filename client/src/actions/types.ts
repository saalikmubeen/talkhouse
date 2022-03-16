export enum actionTypes {
    authenticate,
    logout,
    authError,
    showAlert,
    hideAlert
}


interface AuthSuccessAction {
    type: actionTypes.authenticate;
    payload: {
        email: string;
        token: string;
        username: string;
    };
}

interface AuthErrorAction {
    type: actionTypes.authError;
    payload: string;
}

interface LogoutAction {
    type: actionTypes.logout;
}

interface ShowAlertAction {
    type: actionTypes.showAlert,
    payload: string,
}

interface HideAlertAction {
    type: actionTypes.hideAlert
}

export type AuthActions = AuthSuccessAction | AuthErrorAction | LogoutAction; 
export type AlertActions = ShowAlertAction | HideAlertAction;