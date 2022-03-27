import SimplePeer from "simple-peer";
import { actionTypes, CallStatus } from "./types";

export const setLocalStream = (stream: MediaStream | null) => {
    return {
        type: actionTypes.setLocalStream,
        payload: stream,
    };
}

export const setRemoteStream = (stream: MediaStream | null) => {
    return {
        type: actionTypes.setRemoteStream,
        payload: stream,
    };
}


export const setCallStatus = (status: CallStatus) => {
    return {
        type: actionTypes.setCallStatus,
        payload: {
            status,
        },  
    };
}


export const setCallRequest = (callRequest: {
    callerName: string;
    audioOnly: boolean;
    callerUserId: string;
    signal: SimplePeer.SignalData;
} | null) => {
    return {
        type: actionTypes.setCallRequest,
        payload: callRequest,
    };
}
