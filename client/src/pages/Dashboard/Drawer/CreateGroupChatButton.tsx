import React, { useState } from "react";
import Button from "@mui/material/Button";
import CreateGroupChatDialog from "./CreateGroupChatDialog";
// import AddIcon from "@mui/icons-material/Add";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

const CreateGroupChatButton = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenGroupChatDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseGroupChatDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <Button
                variant="contained"
                onClick={handleOpenGroupChatDialog}
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
                <GroupAddIcon />
            </Button>
            <CreateGroupChatDialog
                isDialogOpen={isDialogOpen}
                closeDialogHandler={handleCloseGroupChatDialog}
            />
        </>
    );
};

export default CreateGroupChatButton;
