import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

const Camera: React.FC<{
    localStream: MediaStream;
}> = ({localStream}) => {
    const [cameraEnabled, setCameraEnabled] = useState(true);

    const handleToggleCamera = () => {
        localStream.getVideoTracks().forEach((track) => track.enabled = !track.enabled);
        setCameraEnabled(!cameraEnabled);
    };

    return (
        <IconButton onClick={handleToggleCamera} style={{ color: "white" }}>
            {cameraEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
        </IconButton>
    );
};

export default Camera;
