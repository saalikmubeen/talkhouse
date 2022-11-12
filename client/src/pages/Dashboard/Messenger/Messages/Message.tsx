import React from "react";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import Avatar from "../../../../components/Avatar";

function formatDate(date: Date) {
    let hours = date.getHours();
    let minutes: string | number = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;

    return strTime;
}


const MainContainer = styled("div")({
    width: "99%",
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
                            {formatDate(new Date(date))}
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
                    {formatDate(new Date(date))}
                </Typography>
            </MessageContainer>
        </MainContainer>
    );
};

export default Message;