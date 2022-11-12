import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { useAppSelector } from "../../../store";
import { notifyTyping, sendDirectMessage } from "../../../socket/socketConnection";

const MainContainer = styled("div")({
    height: "60px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const Input = styled("input")({
    backgroundColor: "#2f3136",
    width: "98%",
    height: "44px",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    padding: "0 10px",
});

const NewMessageInput = () => {
    const [message, setMessage] = useState("");
    const [focused, setFocused] = useState(false);

    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    const chatDetails = useAppSelector((state) => state.chat.chosenChatDetails);

    const handleSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
        
        if (e.key === "Enter") {
            sendDirectMessage({
                message,
                receiverUserId: chatDetails?.userId!,
            });

            setMessage("");
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    };


    useEffect(() => {
        // notify the receiverUser that the user(sender) is typing
        notifyTyping({ receiverUserId: chatDetails?.userId!, typing: focused });
    }, [focused, chatDetails?.userId]);

    return (
        <MainContainer>
            <Input
                placeholder={`Write message to ${chatDetails?.username}`}
                value={message}
                onChange={handleChange}
                onKeyDown={handleSendMessage}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </MainContainer>
    );
};

export default NewMessageInput;
