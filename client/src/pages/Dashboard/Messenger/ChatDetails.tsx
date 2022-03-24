import React from "react";
import { styled } from "@mui/system";
import Messages from "./Messages";
import NewMessageInput from "./NewMessageInput";
import Typing from "./Typing";

const Wrapper = styled("div")({
    flexGrow: 1,
});


const ChatDetails = () => {
    
    return (
        <Wrapper>
            <Messages />
            <Typing/>
            <NewMessageInput />
        </Wrapper>
    );
};

export default ChatDetails
