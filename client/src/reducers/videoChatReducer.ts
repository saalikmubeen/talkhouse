import { Reducer } from "redux";
import { VideoChatActions, actionTypes } from "../actions/types";

interface VideoChatState {
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    audioOnly: boolean;
    screenSharingStream: MediaStream | null;
    screenSharing: boolean;
}

const initialState: VideoChatState = {
    localStream: null,
    remoteStream: null,
    audioOnly: false,
    screenSharingStream: null,
    screenSharing: false,
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

        default:
            return state;
    }
};

export default videoChatReducer;
