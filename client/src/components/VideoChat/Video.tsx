import React, { useEffect, useRef } from "react";
import { styled } from "@mui/system";

const MainContainer = styled("div")({
    borderRadius: "8px",
    width: "100%",
    height: "100%",
});

const VideoEl = styled("video")({
    height: "100%",
    borderRadius: "8px",
    display: "block",
    maxWidth: "100%",
    backgroundColor: "transparent",
});

const Video: React.FC<{
    stream: MediaStream;
    isLocalStream: boolean;
    dimensions: {
        x: number,
        y: number
    }
}> = ({ stream, isLocalStream, dimensions }) => {

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        video!.srcObject = stream;

        video!.onloadedmetadata = () => {
            video!.play()

            if (isLocalStream) {
                video!.muted = true;
                video!.volume = 0;
            }
        };

    }, [stream, isLocalStream]);

    return (
        <MainContainer style={{ height: dimensions.y, width: dimensions.x }}>
            <VideoEl
                ref={videoRef}
                autoPlay
                muted={isLocalStream}
            />
        </MainContainer>
    );
};

export default Video;
