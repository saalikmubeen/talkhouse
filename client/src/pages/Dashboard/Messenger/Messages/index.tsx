import React, { useEffect, useRef }  from "react";
import { styled } from "@mui/system";
import MessagesHeader from "./Header";
import DUMMY_MESSAGES from "./DUMMY_MESSAGES";
import Message from "./Message";
import { useAppSelector } from "../../../../store";
import { fetchDirectChatHistory } from "../../../../socket/socketConnection";
import { Message as MessageType } from "../../../../actions/types";
import DateSeparator from "./DateSeparator";


const MainContainer = styled("div")({
    height: "calc(100% - 142px)",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});


const Messages = () => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const {chosenChatDetails: chatDetails, messages} = useAppSelector((state) => state.chat);

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
    
    useEffect(() => {

        if (chatDetails) {
            fetchDirectChatHistory({receiverUserId: chatDetails.userId});
        }

    }, [chatDetails]);


    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    return (
        <MainContainer>
            <MessagesHeader />
            {messages.map((message, index) => {
                const today = new Date(Date.now()).toDateString();
                const messageDate = new Date(message.createdAt).toDateString();
                const isSameDay = today === messageDate;
                const incomingMessage =
                    message.author._id === chatDetails?.userId;

                return (
                    <div key={message._id} style={{ width: "97%" }}>
                        {/* {(!isSameDay || index === 0) && (
                            <DateSeparator date={message.createdAt} />
                        )} */}

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
