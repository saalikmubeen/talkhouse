import React from "react";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useAppSelector } from "../../../store";
import { setLocalStream } from "../../../actions/videoChatActions";

const CloseRoom = () => {
    const dispatch = useDispatch();
    const localStream = useAppSelector(state => state.videoChat.localStream);

    const handleLeaveRoom = () => {
        localStream?.getTracks().forEach(track => track.stop());
        dispatch(setLocalStream(null));
    };

    return (
        <IconButton onClick={handleLeaveRoom} style={{ color: "white" }}>
            <CloseIcon />
        </IconButton>
    );
};

export default CloseRoom;
