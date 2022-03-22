import React from "react";
import { Typography } from "@mui/material";
import { useAppSelector } from "../../../store"

const ChosenChatLabel = () => {
    const username = useAppSelector(state => state.chat.chosenChatDetails?.username)

    return (
        <Typography
            sx={{ fontSize: "16px", color: "white", fontWeight: "bold" }}
        >{`${username ? `Conversation with: ${username}` : ""}`}</Typography>
    );
};


export default ChosenChatLabel
