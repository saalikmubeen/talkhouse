import React from "react";
import { styled } from "@mui/system";
import Video from "./Video";
import { useAppSelector } from "../../store" 
import { Typography } from "@mui/material";

const MainContainer = styled("div")({
    height: "85%",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
});

const VideosContainer = () => {
    const {localStream, callStatus, remoteStream, screenSharingStream} = useAppSelector(state => state.videoChat);
    return (
        <MainContainer>
            {localStream && (
                <Video
                    stream={
                        screenSharingStream ? screenSharingStream : localStream
                    }
                    isLocalStream={true}
                />
            )}

            {callStatus !== "accepted" && (
                <Typography
                    sx={{
                        color: "#b9bbbe",
                        fontSize: "25px",
                        fontWeight: "bold",
                        textAlign: "center",
                        width: "100%",
                    }}
                >
                    {callStatus === "ringing"
                        ? "Ringing...."
                        : callStatus === "rejected" && "Call Rejected"}
                </Typography>
            )}

            {remoteStream && (
                <Video stream={remoteStream} isLocalStream={false} />
            )}
        </MainContainer>
    );
};


export default VideosContainer;
