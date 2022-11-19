import {
    setOpenRoom,
    setRoomDetails,
    setActiveRooms,
    setLocalStreamRoom,
    setRemoteStreams,
    setScreenSharingStreamRoom,
    setIsUserJoinedOnlyWithAudio,
} from "../actions/roomActions";
import { ActiveRoom } from "../actions/types";
import { store } from "../store";
import * as socketConnection from "./socketConnection";
import { closeAllConnections, getLocalStreamPreview } from "./webRTC";

export const createNewRoom = () => {
    const successCallbackFunc = () => {
        store.dispatch(setOpenRoom(true, true) as any);

        const audioOnly = store.getState().room.audioOnly;
        store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly) as any);
        socketConnection.createNewRoom();
    };

    const audioOnly = store.getState().room.audioOnly;
    getLocalStreamPreview(audioOnly, successCallbackFunc, true);
};

export const newRoomCreated = (data: { roomDetails: ActiveRoom }) => {
    const { roomDetails } = data;
    store.dispatch(setRoomDetails(roomDetails) as any);
};

export const updateActiveRooms = (data: { activeRooms: ActiveRoom[] }) => {
    const { activeRooms } = data;
    console.log("Active ROOMS", activeRooms);

    const {
        friends: { friends },
        auth: { userDetails },
        room: { roomDetails },
    } = store.getState();
    const rooms: ActiveRoom[] = [];

    const userId = userDetails?._id;

    activeRooms.forEach((room: ActiveRoom) => {
        const isRoomCreatedByMe = room.roomCreator.userId === userId;

        if (isRoomCreatedByMe) {
            rooms.push(room);
        } else {
            friends.forEach((f) => {
                if (f.id === room.roomCreator.userId) {
                    rooms.push(room);
                }
            });
        }

        if(room.roomId === roomDetails?.roomId) {
            store.dispatch(setRoomDetails(room) as any);
        }
        
    });

    store.dispatch(setActiveRooms(rooms) as any);
};

export const initialRoomsUpdate = (data: { activeRooms: ActiveRoom[] }) => {
    const { activeRooms } = data;

    store.dispatch(setActiveRooms(activeRooms) as any);
};

export const joinRoom = (room: ActiveRoom) => {
    const successCallbackFunc = () => {
        store.dispatch(setRoomDetails(room) as any);
        store.dispatch(setOpenRoom(false, true) as any);
        const audioOnly = store.getState().room.audioOnly;
        store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly) as any);
        socketConnection.joinRoom({ roomId: room.roomId });
    };

    const audioOnly = store.getState().room.audioOnly;
    getLocalStreamPreview(audioOnly, successCallbackFunc, true);
};

export const leaveRoom = () => {
    const roomId = store.getState().room.roomDetails?.roomId;

    const localStream = store.getState().room.localStreamRoom;
    if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
        store.dispatch(setLocalStreamRoom(null) as any);
    }

    const screenSharingStream = store.getState().room.screenSharingStream;
    if (screenSharingStream) {
        screenSharingStream.getTracks().forEach((track) => track.stop());
        store.dispatch(setScreenSharingStreamRoom(null) as any);
    }

    store.dispatch(setRemoteStreams([]) as any);
    closeAllConnections();

    if (roomId) {
        socketConnection.leaveRoom({ roomId });
    }
    store.dispatch(setRoomDetails(null) as any);
    store.dispatch(setOpenRoom(false, false) as any);
};
