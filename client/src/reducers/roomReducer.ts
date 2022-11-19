import { Reducer } from "redux";
import { actionTypes, RoomActions, ActiveRoom } from "../actions/types";


export interface RoomState {
    isUserInRoom: boolean;
    isUserRoomCreator: boolean;
    roomDetails: ActiveRoom | null;
    activeRooms: ActiveRoom[];
    localStreamRoom: MediaStream | null;
    remoteStreams: MediaStream[];
    audioOnly: boolean;
    screenSharingStream: MediaStream | null ;
    isScreenSharingActive: boolean;
    isUserJoinedWithOnlyAudio: boolean;
}

const initState = {
    isUserInRoom: false,
    isUserRoomCreator: false,
    roomDetails: null,
    activeRooms: [],
    localStreamRoom: null,
    remoteStreams: [],
    audioOnly: false,
    screenSharingStream: null,
    isScreenSharingActive: false,
    isUserJoinedWithOnlyAudio: false,
};

export const roomReducer: Reducer<RoomState, RoomActions> = (
    state = initState,
    action
) => {
    switch (action.type) {
        case actionTypes.openRoom:
            return {
                ...state,
                isUserInRoom: action.payload.isUserInRoom,
                isUserRoomCreator: action.payload.isUserRoomCreator,
            };
        case actionTypes.setRoomDetails:
            return {
                ...state,
                roomDetails: action.payload.roomDetails,
            };
        case actionTypes.setActiveRooms:
            return {
                ...state,
                activeRooms: action.payload.activeRooms,
            };
        case actionTypes.setLocalStreamRoom:
            return {
                ...state,
                localStreamRoom: action.payload.localStreamRoom,
            };
        case actionTypes.setAudioOnlyRoom:
            return {
                ...state,
                audioOnly: action.payload.audioOnly,
            };
        case actionTypes.setRemoteStreams:
            console.log(action.payload.remoteStreams)
            return {
                ...state,
                remoteStreams: action.payload.remoteStreams,
            };
        case actionTypes.setScreenSharingStreamRoom:
            return {
                ...state,
                screenSharingStream: action.payload.screenSharingStream,
                isScreenSharingActive: action.payload.isScreenSharingActive,
            };
        case actionTypes.setIsUserJoinedWithAudioOnly:
            return {
                ...state,
                isUserJoinedWithOnlyAudio:
                    action.payload.isUserJoinedWithOnlyAudio,
            };
        default:
            return state;
    }
};
