import SimplePeer from "simple-peer";

export enum actionTypes {
    authenticate,
    logout,
    authError,
    authLoading,

    showAlert,
    hideAlert,

    setFriends,
    setPendingInvitations,
    setOnlineUsers,
    setGroupChatList,
    resetFriends,

    setChatType,
    setChosenChatDetails,
    setMessages,
    addNewMessage,
    resetChat,
    setChosenGroupChatDetails,

    setTyping,
    setInitialTypingStatus,

    setLocalStream,
    setRemoteStream,
    setOtherUserId,
    setAudioOnly,
    setScreenSharingStream,
    setScreenSharing,
    setCallRequest,
    setCallStatus,
    resetVideoChatState,

    openRoom,
    setRoomDetails,
    setActiveRooms,
    setLocalStreamRoom,
    setRemoteStreams,
    setAudioOnlyRoom,
    setScreenSharingStreamRoom,
    setIsUserJoinedWithAudioOnly,
}

export interface CurrentUser {
    _id: string;
    email: string;
    token: string;
    username: string;
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

interface AuthLoadingAction {
    type: actionTypes.authLoading;
    payload: boolean;
}

interface ShowAlertAction {
    type: actionTypes.showAlert;
    payload: string;
}

interface HideAlertAction {
    type: actionTypes.hideAlert;
}

export interface PendingInvitation {
    _id: string;
    senderId: {
        username: string;
        email: string;
        _id: string;
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

export interface GroupChatDetails {
    groupId: string;
    groupName: string;
    participants: Array<{
        _id: string;
        username: string;
        email: string;
    }>;
    admin: {
        _id: string;
        username: string;
        email: string;
    };
}

interface SetPendingInvitationAction {
    type: actionTypes.setPendingInvitations;
    payload: Array<PendingInvitation>;
}

interface SetFriends {
    type: actionTypes.setFriends;
    payload: Array<Friend>;
}

interface SetOnlineUsers {
    type: actionTypes.setOnlineUsers;
    payload: Array<OnlineUser>;
}

export interface SetGroupChatList {
    type: actionTypes.setGroupChatList;
    payload: Array<GroupChatDetails>;
}

export interface SetChosenChatDetails {
    type: actionTypes.setChosenChatDetails;
    payload: {
        userId: string;
        username: string;
    };
}

export interface SetChosenGroupChatDetails {
    type: actionTypes.setChosenGroupChatDetails;
    payload: GroupChatDetails;
}

export interface ResetChat {
    type: actionTypes.resetChat;
}

export interface ResetFriends {
    type: actionTypes.resetFriends;
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

export interface Typing {
    typing: boolean;
    userId: string;
}

export interface SetMessages {
    type: actionTypes.setMessages;
    payload: Array<Message>;
}

export interface AddNewMessage {
    type: actionTypes.addNewMessage;
    payload: Message;
}

export interface SetTyping {
    type: actionTypes.setTyping;
    payload: {
        typing: boolean;
        userId: string;
    };
}

export interface SetInitialTypingStatus {
    type: actionTypes.setInitialTypingStatus;
    payload: Array<Typing>;
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
    };
}

export type CallStatus = "ringing" | "accepted" | "rejected" | "left" | null;
export interface SetCallStatus {
    type: actionTypes.setCallStatus;
    payload: {
        status: CallStatus;
    };
}

export interface ClearVideChatState {
    type: actionTypes.resetVideoChatState;
}

interface setOtherUserId {
    type: actionTypes.setOtherUserId;
    payload: {
        otherUserId: string | null;
    };
}

interface setScreenSharingStream {
    type: actionTypes.setScreenSharingStream;
    payload: {
        stream: MediaStream | null;
        isScreenSharing: boolean;
    };
}

interface SetAudioOnly {
    type: actionTypes.setAudioOnly;
    payload: {
        audioOnly: boolean;
    };
}

export type ActiveRoom = {
    roomCreator: {
        userId: string;
        username: string;
        socketId: string;
    };
    participants: {
        userId: string;
        socketId: string;
        username: string;
    }[];
    roomId: string;
};

interface SetIsUserJoinedOnlyWithAudio {
    type: actionTypes.setIsUserJoinedWithAudioOnly;
    payload: {
        isUserJoinedWithOnlyAudio: boolean;
    };
}

interface SetScreenSharingStreamRoom {
    type: actionTypes.setScreenSharingStreamRoom;
    payload: {
        isScreenSharingActive: boolean;
        screenSharingStream: MediaStream | null;
    };
}

interface SetRemoteStreams {
    type: actionTypes.setRemoteStreams;
    payload: {
        remoteStreams: MediaStream[];
    };
}

interface SetAudioOnlyRoom {
    type: actionTypes.setAudioOnlyRoom;
    payload: {
        audioOnly: boolean;
    };
}

interface SetLocalStreamRoom {
    type: actionTypes.setLocalStreamRoom;
    payload: {
        localStreamRoom: MediaStream | null;
    };
}

interface SetActiveRooms {
    type: actionTypes.setActiveRooms;
    payload: {
        activeRooms: ActiveRoom[];
    };
}

interface SetOpenRoom {
    type: actionTypes.openRoom;
    payload: {
        isUserRoomCreator: boolean;
        isUserInRoom: boolean;
    };
}

interface SetRoomDetails {
    type: actionTypes.setRoomDetails;
    payload: {
        roomDetails: any;
    };
}

export type AuthActions =
    | AuthSuccessAction
    | AuthErrorAction
    | LogoutAction
    | AuthLoadingAction;
export type AlertActions = ShowAlertAction | HideAlertAction;
export type FriendsActions =
    | SetPendingInvitationAction
    | SetFriends
    | SetOnlineUsers
    | SetGroupChatList
    | ResetFriends;
export type ChatActions =
    | SetChosenChatDetails
    | SetChosenGroupChatDetails
    | SetMessages
    | AddNewMessage
    | SetTyping
    | SetInitialTypingStatus
    | ResetChat;
export type VideoChatActions =
    | SetLocalStream
    | SetRemoteStream
    | SetCallRequest
    | SetCallStatus
    | ClearVideChatState
    | setOtherUserId
    | setScreenSharingStream
    | SetAudioOnly;

export type RoomActions =
    | SetIsUserJoinedOnlyWithAudio
    | SetActiveRooms
    | SetAudioOnlyRoom
    | SetLocalStreamRoom
    | SetRemoteStreams
    | SetOpenRoom
    | SetRoomDetails
    | SetScreenSharingStreamRoom;
