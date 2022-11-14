import React, { useState, useEffect, useRef }  from "react";
import { styled } from "@mui/system";
import MessagesHeader from "./Header";
// import DUMMY_MESSAGES from "./DUMMY_MESSAGES";
import Message from "./Message";
import { useAppSelector } from "../../../../store";
import { fetchDirectChatHistory, fetchGroupChatHistory } from "../../../../socket/socketConnection";
import { Message as MessageType } from "../../../../actions/types";
import DateSeparator from "./DateSeparator";
import { Typography } from "@mui/material";


const MainContainer = styled("div")({
    height: "calc(100% - 142px)",
    overflow: "auto",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});


const Messages = () => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const {chat, auth: {userDetails}} = useAppSelector((state) => state);

    const { chosenChatDetails, messages, chosenGroupChatDetails } = chat;

    const sameAuthor = (message: MessageType, index: number) => {

        if (index === 0) {
            return false;
        }
        return message.author._id === messages[index - 1].author._id;
    }

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef?.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        setScrollPosition(e.currentTarget.scrollTop);
    };
    
    useEffect(() => {
        if (chosenChatDetails) {
            fetchDirectChatHistory({
                receiverUserId: chosenChatDetails.userId,
            });
        }

        if(chosenGroupChatDetails) {
            fetchGroupChatHistory({
                groupChatId: chosenGroupChatDetails.groupId
            })
        }
    }, [chosenChatDetails, chosenGroupChatDetails]);


    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    return (
        <MainContainer onScroll={handleScroll}>
            <MessagesHeader scrollPosition={scrollPosition} />

            <Typography
                sx={{
                    color: "#b9bbbe",
                    marginTop: "15px",
                    fontSize: "13px",
                }}
            >
                {chat.chosenChatDetails?.userId
                    ? `This is the beginning of your conversation with ${chat.chosenChatDetails?.username}`
                    : "This is the beginning of the conversation with your friends!"}
            </Typography>

            {messages.map((message, index) => {
                const thisMessageDate = new Date(
                    message.createdAt
                ).toDateString();
                const prevMessageDate =
                    index > 0 &&
                    new Date(messages[index - 1]?.createdAt).toDateString();

                const isSameDay =
                    index > 0 ? thisMessageDate === prevMessageDate : true;

                const incomingMessage =
                    message.author._id !== (userDetails as any)._id;

                return (
                    <div key={message._id} style={{ width: "97%" }}>
                        {(!isSameDay || index === 0) && (
                            <DateSeparator date={message.createdAt} />
                        )}

                        <Message
                            content={message.content}
                            username={message.author.username}
                            sameAuthor={sameAuthor(message, index)}
                            date={message.createdAt}
                            incomingMessage={incomingMessage}
                        />
                    </div>
                );
            })}
            <div ref={messagesEndRef} />
        </MainContainer>
    );
};

export default Messages;
