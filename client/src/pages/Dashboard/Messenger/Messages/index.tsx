import React  from "react";
import { styled } from "@mui/system";
import MessagesHeader from "./Header";
import DUMMY_MESSAGES from "./DUMMY_MESSAGES";
import Message from "./Message";


const MainContainer = styled("div")({
    height: "calc(100% - 60px)",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});


const Messages = () => {
    return (
        <MainContainer>
            <MessagesHeader />
            {DUMMY_MESSAGES.map((message, index) => {

                return (
                    <div key={message._id} style={{ width: "97%" }}>

                        <Message
                            content={message.content}
                            username={message.author.username}
                            sameAuthor={false}
                            date={message.date}
                        />
                    </div>
                );
            })}
        </MainContainer>
    );
};

export default Messages;
