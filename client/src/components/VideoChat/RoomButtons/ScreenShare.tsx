import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";

const constraints = {
    audio: false,
    video: true,
};

const ScreenShare = () => {

    const [screenShareEnabled, setScreenShareEnabled] = useState(false);

    const handleScreenShareToggle = async () => {
        setScreenShareEnabled(!screenShareEnabled);
    };

    return (
        <IconButton
            onClick={handleScreenShareToggle}
            style={{ color: "white" }}
        >
            {screenShareEnabled ? (
                <StopScreenShareIcon />
            ) : (
                <ScreenShareIcon />
            )}
        </IconButton>
    );
};

export default ScreenShare;
