import { Dispatch } from "redux";
import SimplePeer from "simple-peer";
import { actionTypes, CallStatus } from "./types";
import { showAlert } from "./alertActions";

export const setLocalStream = (stream: MediaStream | null) => {
    return {
        type: actionTypes.setLocalStream,
        payload: stream,
    };
};

export const setRemoteStream = (stream: MediaStream | null) => {
    return {
        type: actionTypes.setRemoteStream,
        payload: stream,
    };
};

export const setCallStatus = (status: CallStatus) => {
    return {
        type: actionTypes.setCallStatus,
        payload: {
            status,
        },
    };
};

export const setCallRequest = (
    callRequest: {
        callerName: string;
        audioOnly: boolean;
        callerUserId: string;
        signal: SimplePeer.SignalData;
    } | null
) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: actionTypes.setCallRequest,
            payload: callRequest,
        });

        if (callRequest?.callerUserId) {
            dispatch({
                type: actionTypes.setOtherUserId,
                payload: {
                    otherUserId: callRequest.callerUserId,
                },
            });
        }
    };
};

export const clearVideoChat = (message: string) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: actionTypes.resetVideoChatState,
        });

        dispatch(showAlert(message));
    };
};

export const setOtherUserId = (otherUserId: string) => {
    return {
        type: actionTypes.setOtherUserId,
        payload: {
            otherUserId,
        },
    };
};


export const setScreenSharingStream = (stream: MediaStream | null) => {
    return {
        type: actionTypes.setScreenSharingStream,
        payload: {
            stream,
            isScreenSharing: !!stream 
        },
    };
}