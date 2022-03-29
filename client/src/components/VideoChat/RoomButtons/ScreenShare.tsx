import React, { useState } from "react";
import {useDispatch} from "react-redux";
import IconButton from "@mui/material/IconButton";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import { VideoChatState } from "../../../reducers/videoChatReducer";
import { setScreenSharingStream } from "../../../actions/videoChatActions";
import { currentPeerConnection } from "../../../socket/socketConnection";


const ScreenShare: React.FC<{
    videoChat: VideoChatState;
}> = ({ videoChat }) => {

    const dispatch = useDispatch();
    const [screenShareEnabled, setScreenShareEnabled] = useState(false);

    const handleScreenShareToggle = async () => {

        if (screenShareEnabled) {

            try{
                currentPeerConnection?.replaceTrack(
                    videoChat.screenSharingStream?.getVideoTracks()[0],
                    currentPeerConnection.streams[0].getVideoTracks()[0],
                    videoChat?.localStream
                );
            }catch(err){
                console.log(err);
            }


            videoChat.screenSharingStream?.getTracks().forEach((track) => track.stop());
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
    };

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
