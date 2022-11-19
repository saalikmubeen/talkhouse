import React from "react";
import { styled } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import Camera from "./Camera";
import Microphone from "./Microphone";
import CloseRoom from "./CloseRoom";
import ScreenShare from "./ScreenShare";
import {useAppSelector} from "../../../store"
import ResizeRoomButton from "../ResizeRoomButton";


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

const RoomButtons: React.FC<{
    isRoomMinimized: boolean;
    handleRoomResize: () => void;
}> = ({ isRoomMinimized, handleRoomResize }) => {
    const {videoChat, room} = useAppSelector((state) => state);
    const matches = useMediaQuery("(max-width:800px)");

    return (
        <>
            {videoChat.localStream ? (
                <MainContainer
                    sx={{
                        ...(matches &&
                            isRoomMinimized && {
                                height: "100%",
                                width: "15%",
                                flexDirection: "column",
                            }),
                    }}
                >
                    {!videoChat.audioOnly && (
                        <>
                            <ScreenShare
                                videoChat={videoChat}
                                type="DIRECT CALL"
                            />
                            <Camera localStream={videoChat.localStream} />
                        </>
                    )}
                    <Microphone localStream={videoChat.localStream} />
                    <CloseRoom type="DIRECT CALL" />
                    <ResizeRoomButton
                        isRoomMinimized={isRoomMinimized}
                        handleRoomResize={handleRoomResize}
                    />
                </MainContainer>
            ) : room.localStreamRoom ? (
                <MainContainer
                    sx={{
                        ...(matches &&
                            isRoomMinimized && {
                                height: "100%",
                                width: "15%",
                                flexDirection: "column",
                            }),
                    }}
                >
                    {!room.isUserJoinedWithOnlyAudio && (
                        <ScreenShare room={room} type="ROOM" />
                    )}
                    <Microphone localStream={room.localStreamRoom} />
                    {!room.isUserJoinedWithOnlyAudio && (
                        <Camera localStream={room.localStreamRoom} />
                    )}
                    <CloseRoom type="ROOM" />
                    <ResizeRoomButton
                        isRoomMinimized={isRoomMinimized}
                        handleRoomResize={handleRoomResize}
                    />
                </MainContainer>
            ) : null}
        </>
    );
};


export default RoomButtons

