import React from "react";
import { styled } from "@mui/system";
import Camera from "./Camera";
import Microphone from "./Microphone";
import CloseRoom from "./CloseRoom";
import ScreenShare from "./ScreenShare";
import {useAppSelector} from "../../../store"


const MainContainer = styled("div")({
    height: "15%",
    width: "100%",
    backgroundColor: "#5865f2",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const RoomButtons = () => {
    
    const videoChat = useAppSelector(state => state.videoChat);

    if (!videoChat.localStream) {
        return null;
    }

    return (
        <MainContainer>
            <ScreenShare videoChat={videoChat}/>
            <Microphone  localStream={videoChat.localStream}/>
            <CloseRoom />
            <Camera localStream={videoChat.localStream}/>
        </MainContainer>
    );
};


export default RoomButtons

