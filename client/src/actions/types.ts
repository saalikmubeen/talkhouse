export enum actionTypes {
    authenticate,
    logout,
    authError,

    showAlert,
    hideAlert,

    setFriends,
    setPendingInvitations,
    setOnlineUsers,

    setChatType,
    setChosenChatDetails,
    setMessages,

}


interface AuthSuccessAction {
    type: actionTypes.authenticate;
    payload: {
        _id: string;
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
}

export interface OnlineUser {
    userId: string;
    socketId: string;
}

interface SetPendingInvitationAction  {
    type: actionTypes.setPendingInvitations,
    payload: Array<PendingInvitation>
}


interface SetFriends {
    type: actionTypes.setFriends;
    payload: Array<Friend>;
}


interface SetOnlineUsers {
    type: actionTypes.setOnlineUsers;
    payload: Array<OnlineUser>;
}


export interface SetChosenChatDetails {
    type: actionTypes.setChosenChatDetails,
    payload: {
        userId: string,
        username: string
    }
}


export interface Message {
    _id: string;
    content: string;
    author: {
        username: string;
        _id: string;
    };
    createdAt: string;
}

export interface SetMessages {
    type: actionTypes.setMessages;
    payload: Array<Message>;
}

export type AuthActions = AuthSuccessAction | AuthErrorAction | LogoutAction; 
export type AlertActions = ShowAlertAction | HideAlertAction;
export type FriendsActions = SetPendingInvitationAction | SetFriends | SetOnlineUsers;
export type ChatActions = SetChosenChatDetails | SetMessages;