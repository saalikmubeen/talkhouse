import React, { useEffect, useRef } from "react";
import { styled } from "@mui/system";

const MainContainer = styled("div")({
    height: "50%",
    width: "100%",
    backgroundColor: "black",
    borderRadius: "8px",
});

const VideoEl = styled("video")({
    width: "100%",
    height: "100%",
});

const Video: React.FC<{
    stream: MediaStream;
    isLocalStream: boolean;
}> = ({ stream, isLocalStream }) => {

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        video!.srcObject = stream;

        video!.onloadedmetadata = () => {
            video!.play();
        };

    }, [stream]);

    return (
        <MainContainer>
            <VideoEl
                ref={videoRef}
                autoPlay
                muted={isLocalStream ? true : false}
            />
        </MainContainer>
    );
};

export default Video;
