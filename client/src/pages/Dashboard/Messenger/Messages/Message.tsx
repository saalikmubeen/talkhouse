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
                    <div
                        style={{
                            color: "white",
                            backgroundColor: "#5865f2",
                            borderRadius: "13px",
                            padding: "8px 12px",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "16px",
                                color: "white",
                                marginBottom: "2px",
                            }}
                        >
                            {content}
                        </Typography>

                        <Typography
                            sx={{
                                color: "#b9bbbe",
                                textAlign: "right",
                                fontSize: "10px",
                            }}
                        >
                            {new Date(date).toLocaleTimeString()}
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
                    backgroundColor: "#fafafa",
                    borderRadius: "13px",
                    padding: "8px 12px",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "16px",
                        color: "black",
                        marginBottom: "2px",
                    }}
                >
                    {content}
                </Typography>

                <Typography
                    sx={{
                        color: "#7f8183",
                        fontSize: "10px",
                    }}
                >
                    {new Date(date).toLocaleTimeString()}
                </Typography>
            </MessageContainer>
        </MainContainer>
    );
};

export default Message;