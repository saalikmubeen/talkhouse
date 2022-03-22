export enum actionTypes {
    authenticate,
    logout,
    authError,
    showAlert,
    hideAlert,
    setFriends,
    setPendingInvitations,
    setOnlineUsers,
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


export interface PendingInvitation {
    _id: string;
    senderId: {
        username: string;
        email: string;
        _id: string
    };
}


export interface Friend {
    id: string;
    username: string;
    email: string;
    isOnline?: boolean;
}

interface SetPendingInvitationAction  {
    type: actionTypes.setPendingInvitations,
    payload: Array<PendingInvitation>
}


interface SetFriends {
    type: actionTypes.setFriends;
    payload: Array<Friend>;
}

export type AuthActions = AuthSuccessAction | AuthErrorAction | LogoutAction; 
export type AlertActions = ShowAlertAction | HideAlertAction;
export type FriendsActions = SetPendingInvitationAction | SetFriends;