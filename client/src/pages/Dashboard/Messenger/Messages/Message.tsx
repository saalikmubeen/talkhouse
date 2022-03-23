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
    width: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

const MessageContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    maxWidth: "50%",
});


interface MessageProps {
    content: string;
    sameAuthor: boolean;
    username: string;
    date: string;
    incomingMessage: boolean;
}

const Message = ({ content, sameAuthor, username, date, incomingMessage }: MessageProps) => {

    if (!incomingMessage) {
        return (
            <MainContainer>
                <MessageContainer sx={{ marginLeft: "auto" }}>
                    <div>

                        <Typography sx={{ color: "#b9bbbe", textAlign: "right", marginBottom: "3px"}}>
                            {new Date(date).toLocaleTimeString()}
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "16px",
                                color: "white",
                                backgroundColor: "#5865f2",
                                borderRadius: "13px",
                                padding: "7px 10px",
                            }}
                        >
                            {content}
                        </Typography>
                    </div>
                </MessageContainer>
            </MainContainer>
        );
    }


    return (
        <MainContainer>
            {!sameAuthor && (
                <AvatarContainer>
                    <Avatar username={username} />
                </AvatarContainer>
            )}

            <MessageContainer
                sx={{
                    marginLeft: sameAuthor ? "60px" : "0px",
                }}
            >
                <Typography
                    sx={{
                        color: "#b9bbbe",
                        marginBottom: "4px",
                    }}
                >
                    {new Date(date).toLocaleTimeString()}
                </Typography>
                <Typography
                    sx={{
                        fontSize: "16px",
                        color: "black",
                        backgroundColor: "#fafafa",
                        borderRadius: "13px",
                        padding: "7px 10px",
                    }}
                >
                    {content}
                </Typography>
            </MessageContainer>
        </MainContainer>
    );
};

export default Message;