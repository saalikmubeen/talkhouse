import { Reducer } from "redux";
import SimplePeer from "simple-peer";
import { VideoChatActions, actionTypes } from "../actions/types";



interface VideoChatState {
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    audioOnly: boolean;
    screenSharingStream: MediaStream | null;
    screenSharing: boolean;

    // what caller will see
    callStatus: "ringing" | "accepted" | "rejected" | null;

    // what receiver will see
    callRequest: {
        callerName: string;
        audioOnly: boolean;
        callerUserId: string;
        signal: SimplePeer.SignalData;
    } | null;
}

const initialState: VideoChatState = {
    localStream: null,
    remoteStream: null,
    audioOnly: false,
    screenSharingStream: null,
    screenSharing: false,
    callRequest: null,
    callStatus: null,
};

const videoChatReducer: Reducer<VideoChatState, VideoChatActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case actionTypes.setLocalStream:
            return {
                ...state,
                localStream: action.payload,
            };

        case actionTypes.setRemoteStream:
            return {
                ...state,
                remoteStream: action.payload,
            };

        case actionTypes.setCallRequest:
            return {
                ...state,
                callRequest: action.payload,
            };

        case actionTypes.setCallStatus:
            console.log("hello")
            return {
                ...state,
                callStatus: action.payload.status,
            };
        
        default:
            return state;
    }
};

export default videoChatReducer;
