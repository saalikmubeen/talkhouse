import React, { useState } from "react";
import { styled } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import ResizeRoomButton from "./ResizeRoomButton";
import VideosContainer from "./VideosContainer";
import RoomButtons from "./RoomButtons";

const drawerWidth = 240;

const MainContainer = styled("div")({
    position: "absolute",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#202225",
    transition: "all 0.5s ease-in-out",
});

const fullScreenRoomStyle = {
    height: "100vh",
    zIndex: 200,
};

const minimizedRoomStyle = {
    zIndex: 200,
    top: "0px",
    right: "0px",
    width: "30%",
    height: "40vh",
};

const VideoChat = () => {
    const [isRoomMinimized, setIsRoomMinimized] = useState(true);

    const roomResizeHandler = () => {
        setIsRoomMinimized(!isRoomMinimized);
    };

    const matches = useMediaQuery("(max-width:800px)");

    return (
        <MainContainer
            sx={{
                ...(isRoomMinimized
                    ? {
                          ...minimizedRoomStyle,
                          ...(matches && { width: "70%" }),
                      }
                    : {
                          ...fullScreenRoomStyle,
                          width: {
                              xs: `calc(100vw)`,
                              sm: `calc(100vw - ${drawerWidth}px)`,
                          },
                      }),
                ...(matches &&
                    isRoomMinimized && {
                        flexDirection: "row",
                    }),
            }}
        >
            <VideosContainer isRoomMinimized={isRoomMinimized} />
            <RoomButtons
                isRoomMinimized={isRoomMinimized}
                handleRoomResize={roomResizeHandler}
            />
        </MainContainer>
    );
};

export default VideoChat;
