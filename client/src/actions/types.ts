import SimplePeer from "simple-peer";

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
    resetChat,
    
    setTyping,

    setLocalStream,
    setRemoteStream,
    setOtherUserId,
    setAudioOnly,
    setScreenSharingStream,
    setScreenSharing,
    setCallRequest,
    setCallStatus,
    resetVideoChatState
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

export interface ResetChat {
    type: actionTypes.resetChat
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

export interface SetTyping {
    type: actionTypes.setTyping;
    payload: {
        typing: boolean;
        userId: string;
    };
}

interface SetLocalStream {
    type: actionTypes.setLocalStream;
    payload: MediaStream | null;
}

interface SetRemoteStream {
    type: actionTypes.setRemoteStream;
    payload: MediaStream | null;
}

interface SetCallRequest {
    type: actionTypes.setCallRequest;
    payload: {
        callerName: string;
        audioOnly: boolean;
        callerUserId: string;
        signal: SimplePeer.SignalData;
    }
}

export type CallStatus = "ringing" | "accepted" | "rejected" | "left" | null 
export interface SetCallStatus {
    type: actionTypes.setCallStatus;
    payload: {
        status: CallStatus;
    }
}

interface ClearVideChatState {
    type: actionTypes.resetVideoChatState;
}

interface setOtherUserId {
    type: actionTypes.setOtherUserId;
    payload: {
        otherUserId: string | null;
    }
}

interface setScreenSharingStream {
    type: actionTypes.setScreenSharingStream;
    payload: {
        stream: MediaStream | null;
        isScreenSharing: boolean;
    }
}


export type AuthActions = AuthSuccessAction | AuthErrorAction | LogoutAction; 
export type AlertActions = ShowAlertAction | HideAlertAction;
export type FriendsActions = SetPendingInvitationAction | SetFriends | SetOnlineUsers;
export type ChatActions = SetChosenChatDetails | SetMessages | SetTyping | ResetChat;
export type VideoChatActions = SetLocalStream | SetRemoteStream | SetCallRequest | SetCallStatus | ClearVideChatState | setOtherUserId | setScreenSharingStream;
