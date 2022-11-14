import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const CreateRoomButton = () => {
    const createNewRoomHandler = () => {
        
    };

    const isUserInRoom = false

    return (
        <Button
            disabled={isUserInRoom}
            onClick={createNewRoomHandler}
            style={{
                width: "48px",
                height: "48px",
                borderRadius: "16px",
                margin: 0,
                padding: 0,
                minWidth: 0,
                color: "white",
                backgroundColor: "#5865F2",
            }}
        >
            <AddIcon />
        </Button>
    );
};

export default CreateRoomButton;
