import React from "react";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import Avatar from "../../../../components/Avatar";

const MainContainer = styled("div")({
    width: "97%",
    display: "flex",
    marginTop: "10px",
});

const AvatarContainer = styled("div")({
    width: "70px",
});

const MessageContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
});

const MessageContent = styled("div")({
    color: "#DCDDDE",
});

const SameAuthorMessageContent = styled("div")({
    color: "#DCDDDE",
    width: "97%",
});

const SameAuthorMessageText = styled("span")({
    marginLeft: "70px",
});


interface MessageProps {
    content: string;
    sameAuthor: boolean;
    username: string;
    date: string;
}

const Message = ({ content, sameAuthor, username, date }: MessageProps) => {
    if (sameAuthor) {
        return (
            <SameAuthorMessageContent>
                <SameAuthorMessageText>{content}</SameAuthorMessageText>
            </SameAuthorMessageContent>
        );
    }

    return (
        <MainContainer>
            <AvatarContainer>
                <Avatar username={username} />
            </AvatarContainer>
            <MessageContainer>
                <Typography style={{ fontSize: "16px", color: "white" }}>
                    {username}{" "}
                    <span style={{ fontSize: "12px", color: "#72767d" }}>
                        {new Date(date).toLocaleTimeString()}
                    </span>
                </Typography>
                <MessageContent>{content}</MessageContent>
            </MessageContainer>
        </MainContainer>
    );
};

export default Message;
