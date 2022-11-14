import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { useAppSelector } from "../../../store";
import { notifyTyping, sendDirectMessage, sendGroupMessage } from "../../../socket/socketConnection";

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

const NewMessageInput: React.FC = () => {
    const [message, setMessage] = useState("");
    const [focused, setFocused] = useState(false);

    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    const { chosenChatDetails, chosenGroupChatDetails } = useAppSelector((state) => state.chat);



    const handleSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
        
        if (e.key === "Enter") {
            
            if(chosenChatDetails) {
                sendDirectMessage({
                    message,
                    receiverUserId: chosenChatDetails.userId!,
                });
            }
            
            if(chosenGroupChatDetails) {
                sendGroupMessage({
                    message,
                    groupChatId: chosenGroupChatDetails.groupId
                })
            }


            setMessage("");
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    };


    useEffect(() => {
        // notify the receiverUser that the user(sender) is typing
        if (chosenChatDetails?.userId) {
            notifyTyping({
                receiverUserId: chosenChatDetails.userId!,
                typing: focused,
            });
        }
    }, [focused, chosenChatDetails?.userId]);

    return (
        <MainContainer>
            <Input
                placeholder={chosenChatDetails  ? `Write message to ${chosenChatDetails.username}` : "Your message..."}
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
