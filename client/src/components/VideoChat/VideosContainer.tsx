import React from "react";
import { styled } from "@mui/system";
import Video from "./Video";
import { useAppSelector } from "../../store" 
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import useVideoSize from "../../utils/hooks/useVideoSize";

const AR = 4 / 3;

const MainContainer = styled("div")({
    height: "85%",
    width: "100%",
    padding: "10px",
    overflowY: "scroll",
    display: "flex",
    margin: "0px",
    flexDirection: "row",
    justifyContent: "center",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap",
});

const VideosContainer: React.FC<{
    isRoomMinimized: boolean;
}> = ({
    isRoomMinimized
}) => {
    const {
        videoChat: {
            localStream,
            callStatus,
            remoteStream,
            screenSharingStream,
        },
        room: {
            localStreamRoom,
            remoteStreams,
            screenSharingStream: screenSharingStreamRoom,
        },
    } = useAppSelector((state) => state);

    const matches = useMediaQuery("(max-width:800px)");

    
    const { x, y, X } = useVideoSize(remoteStreams.length + 1, AR);
    const { x: xDirectCall, y: yDirectCall } = useVideoSize(2, AR);


    return (
        <MainContainer
            sx={{
                ...(matches &&
                    isRoomMinimized && {
                        height: "100%",
                        width: "85%",
                    }),
            }}
        >
            {localStream && (
                <Video
                    stream={
                        screenSharingStream ? screenSharingStream : localStream
                    }
                    isLocalStream={true}
                    dimensions={{ x: xDirectCall, y: yDirectCall }}
                />
            )}

            {localStreamRoom && (
                <Video
                    stream={
                        screenSharingStreamRoom
                            ? screenSharingStreamRoom
                            : localStreamRoom
                    }
                    isLocalStream={true}
                    dimensions={{ x, y }}
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
                        justifyContent: "center",
                    }}
                >
                    {callStatus === "ringing"
                        ? "Ringing...."
                        : callStatus === "rejected" && "Call Rejected"}
                </Typography>
            )}

            {remoteStream && (
                <Video
                    stream={remoteStream}
                    isLocalStream={false}
                    dimensions={{ x: xDirectCall, y: yDirectCall }}
                />
            )}

            {remoteStreams.map((stream) => (
                <Video
                    stream={stream}
                    key={stream.id}
                    isLocalStream={false}
                    dimensions={{ x, y }}
                />
            ))}
        </MainContainer>
    );
};


export default VideosContainer;
