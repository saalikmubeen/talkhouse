import React from "react";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useAppSelector } from "../../../store";
import { clearVideoChat } from "../../../actions/videoChatActions";
import { notifyChatLeft } from "../../../socket/socketConnection";
import { leaveRoom } from "../../../socket/roomHandler";

type CallType = "DIRECT CALL" | "ROOM"


const CloseRoom = ({ type } : { type: CallType }) => {
    const dispatch = useDispatch();
    const {
        videoChat: { otherUserId  },
    } = useAppSelector((state) => state);

    const handleLeaveRoom = () => {

        // notify other user that I left the call
        if (type === "DIRECT CALL") {

            if(otherUserId) {
                notifyChatLeft(otherUserId);
            }
            dispatch(clearVideoChat("You left the chat"));
        }

        if(type === "ROOM") {
            leaveRoom();
        }
    };

    return (
        <IconButton onClick={handleLeaveRoom} style={{ color: "white" }}>
            <CloseIcon />
        </IconButton>
    );
};

export default CloseRoom;
