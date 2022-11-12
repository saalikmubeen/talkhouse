import React from "react";
import { styled } from "@mui/system";
import Video from "./Video";
import { useAppSelector } from "../../store" 
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const MainContainer = styled("div")({
    height: "85%",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
});

const VideosContainer: React.FC<{
    isRoomMinimized: boolean;
}> = ({
    isRoomMinimized
}) => {
    const { localStream, callStatus, remoteStream, screenSharingStream } =
        useAppSelector((state) => state.videoChat);

    const matches = useMediaQuery("(max-width:800px)");

    return (
        <MainContainer sx={{
            ...(matches && isRoomMinimized && {
                height: "100%",
                width: "85%",
                flexDirection: "column",
            }),
        }}>
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
                        fontSize: "15px",
                        fontWeight: "bold",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
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
