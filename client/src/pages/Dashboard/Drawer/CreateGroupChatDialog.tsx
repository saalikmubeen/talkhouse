import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";
import { validateGroupName } from "../../../utils/validators";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { createGroupChatAction } from "../../../actions/groupChatActions";

const Wrapper = styled("div")({
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
});

const Label = styled("p")({
    color: "#b9bbbe",
    textTransform: "uppercase",
    fontWeight: "600",
    fontSize: "16px",
});

const Input = styled("input")({
    flexGrow: 1,
    height: "40px",
    border: "1px solid black",
    borderRadius: "5px",
    color: "#dcddde",
    background: "#35393f",
    margin: 0,
    fontSize: "16px",
    padding: "0 5px",
    outline: "none",
});

interface CreateGroupChatDialogProps {
    isDialogOpen: boolean;
    closeDialogHandler: () => void;
}

const CreateGroupChatDialog = ({
    isDialogOpen,
    closeDialogHandler,
}: CreateGroupChatDialogProps) => {
    const [name, setName] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    const dispatch = useDispatch();

    const handleCloseDialog = () => {
        closeDialogHandler();
        setName("");
    };

    const handleClick = () => {
        dispatch(createGroupChatAction(name, handleCloseDialog));
    };

    useEffect(() => {
        setIsFormValid(validateGroupName(name));
    }, [name, setIsFormValid]);

    return (
        <div>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>
                    <Typography>Create a Group Chat</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>
                            Enter name of the group
                        </Typography>
                    </DialogContentText>

                    <Wrapper>
                        <Label>Create a Group</Label>
                        <Input
                            type="name"
                            placeholder="Enter a group name."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Wrapper>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: "#5865F2",
                            color: "white",
                            textTransform: "none",
                            fontSize: "16px",
                            fontWeight: 500,
                            width: "100%",
                            height: "40px",
                            marginLeft: "15px",
                            marginRight: "15px",
                            marginBottom: "10px",
                        }}
                        disabled={!isFormValid}
                        onClick={handleClick}
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CreateGroupChatDialog;
