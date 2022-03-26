import React from "react";
import { styled } from "@mui/system";
import Video from "./Video";
import { useAppSelector } from "../../store" 

const MainContainer = styled("div")({
    height: "85%",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
});

const VideosContainer = () => {
    const localStream = useAppSelector(state => state.videoChat.localStream);
    return (
        <MainContainer>
            <Video stream={localStream!} isLocalStream={true} />
        </MainContainer>
    );
};


export default VideosContainer;
