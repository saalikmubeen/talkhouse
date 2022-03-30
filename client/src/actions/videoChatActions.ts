import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import SimplePeer from "simple-peer";
import { actionTypes, CallStatus, ClearVideChatState } from "./types";
import { showAlert } from "./alertActions";
import { RootState } from "../store";
import { currentPeerConnection, setCurrentPeerConnection } from "../socket/socketConnection";

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

export const clearVideoChat = (
    message: string
): ThunkAction<void, RootState, unknown, ClearVideChatState> => {
    return (dispatch, getState) => {

        const {
            videoChat: { localStream, screenSharingStream },
        } = getState();

        localStream?.getTracks().forEach((track) => track.stop());
        screenSharingStream?.getTracks().forEach((track) => track.stop());

        // destroy the active peer connection with the other user that was established
        // if (currentPeerConnection) {
        //     currentPeerConnection.destroy();
        //     console.log("DESTROYED PEER CONNECTION");
        // }

        // setCurrentPeerConnection(null);

        dispatch({
            type: actionTypes.resetVideoChatState,
        });

        dispatch(showAlert(message) as any);
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
            isScreenSharing: !!stream,
        },
    };
};

export const setAudioOnly = (audioOnly: boolean) => {
    return {
        type: actionTypes.setAudioOnly,
        payload: {
            audioOnly,
        },
    };
};
