import React from "react";
import { styled } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

const MainContainer = styled("div")({
    position: "absolute",
    top: "10px",
    left: "10px",
});



const ResizeRoomButton: React.FC<{
    isRoomMinimized: boolean;
    handleRoomResize: () => void;
}> = ({ isRoomMinimized, handleRoomResize }) => {
    return (
        <MainContainer>
            <IconButton style={{ color: "white" }} onClick={handleRoomResize}>
                {isRoomMinimized ? <OpenInFullIcon /> : <CloseFullscreenIcon />}
            </IconButton>
        </MainContainer>
    );
};

export default ResizeRoomButton;
