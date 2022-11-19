import React, { useState } from "react";
import {useDispatch} from "react-redux";
import IconButton from "@mui/material/IconButton";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import { VideoChatState } from "../../../reducers/videoChatReducer";
import { setScreenSharingStream } from "../../../actions/videoChatActions";
import { currentPeerConnection } from "../../../socket/socketConnection";
import { RoomState } from "../../../reducers/roomReducer";
import { switchOutgoingTracks } from "../../../socket/webRTC";
import { setScreenSharingStreamRoom } from "../../../actions/roomActions";

type CallType = "DIRECT CALL" | "ROOM";

const ScreenShare: React.FC<{
    videoChat?: VideoChatState;
    room?: RoomState;
    type: CallType
}> = ({ videoChat, type, room }) => {

    const dispatch = useDispatch();
    const [screenShareEnabled, setScreenShareEnabled] = useState(false);

    const handleScreenShareToggle = async () => {

        if(type === "DIRECT CALL") {
            handleDirectCall();
        }

        if(type === "ROOM") {
            handleRoomCall()
        }
    };


    const handleDirectCall = async () => {

        if(!videoChat) {
            return
        }

        if (screenShareEnabled) {
            try {
                currentPeerConnection?.replaceTrack(
                    videoChat.screenSharingStream?.getVideoTracks()[0],
                    currentPeerConnection.streams[0].getVideoTracks()[0],
                    videoChat?.localStream
                );
            } catch (err) {
                console.log(err);
            }

            videoChat.screenSharingStream
                ?.getTracks()
                .forEach((track) => track.stop());
            dispatch(setScreenSharingStream(null));
            setScreenShareEnabled(false);
        } else {
            const mediaDevices = navigator.mediaDevices as any;
            const screenShareStream = await mediaDevices.getDisplayMedia({
                video: true,
                audio: false,
            });
            dispatch(setScreenSharingStream(screenShareStream));
            setScreenShareEnabled(true);

            // replace outgoing local stream with screen share stream
            // replaceTrack (oldTrack, newTrack, oldStream);
            currentPeerConnection?.replaceTrack(
                currentPeerConnection.streams[0].getVideoTracks()[0],
                screenShareStream.getTracks()[0],
                currentPeerConnection.streams[0]
            );

            // const screenTrack = screenShareStream.getVideoTracks()[0];

            // screenTrack.onended = function () {
            //     currentPeerConnection?.replaceTrack(screenTrack, videoChat.localStream?.getTracks()[0], currentPeerConnection.streams[0]);
            // };
        }
    }


    const handleRoomCall = async () => {

        console.log("hi")
        console.log(room)
        if(!room || !room.localStreamRoom) {
            return 
        }

        console.log("hi2");
        if (!screenShareEnabled) {
            console.log("hi3");
            let stream = null;
            try {
                const mediaDevices = navigator.mediaDevices as any;
                stream = await mediaDevices.getDisplayMedia({
                    video: true,
                    audio: false,
                });
            } catch (err) {
                console.log(
                    "error occurred when trying to get an access to screen share stream"
                );
            }

            if (stream) {
                setScreenSharingStreamRoom(stream);
                switchOutgoingTracks(stream);
                setScreenShareEnabled(true);
            }
        } else {
            switchOutgoingTracks(room.localStreamRoom);
            room.screenSharingStream?.getTracks().forEach((t) => t.stop());
            setScreenSharingStreamRoom(null);
            setScreenShareEnabled(false);
        }
    }

    return (
        <IconButton
            onClick={handleScreenShareToggle}
            style={{ color: "white" }}
        >
            {screenShareEnabled ? (
                <StopScreenShareIcon />
            ) : (
                <ScreenShareIcon />
            )}
        </IconButton>
    );
};

export default ScreenShare;
