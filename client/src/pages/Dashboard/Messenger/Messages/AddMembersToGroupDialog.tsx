import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppSelector } from "../../../../store";
import { addMembersToGroupAction } from "../../../../actions/groupChatActions";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
];

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


interface Props {
    isDialogOpen: boolean;
    closeDialogHandler: () => void;
}

const AddMembersToGroupDialog = ({
    isDialogOpen,
    closeDialogHandler,
}: Props) => {
    const {
        friends: { friends },
        chat: { chosenGroupChatDetails },
    } = useAppSelector((state) => state);
    
    const currentGroupMembers = chosenGroupChatDetails?.participants.map(
        (participant) => {
            return participant._id.toString();
        }
    );
    const theme = useTheme();
    const [friendIds, setFriendIds] = React.useState<string[]>(
        currentGroupMembers || []
    );


    const handleChange = (event: SelectChangeEvent<typeof friendIds>) => {
        const {
            target: { value },
        } = event;
        setFriendIds(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    const dispatch = useDispatch();

    const handleCloseDialog = () => {
        closeDialogHandler();
    };

    const handleClick = () => {
        dispatch(addMembersToGroupAction({
            friendIds,
            groupChatId: chosenGroupChatDetails?.groupId as string
        }, handleCloseDialog));
    };


    return (
        <div>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>
                    <Typography>Add friends to "{chosenGroupChatDetails?.groupName}" group</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>Select friends to add</Typography>
                    </DialogContentText>

                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-name-label">
                            Name
                        </InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={friendIds}
                            onChange={handleChange}
                            input={<OutlinedInput label="Name" />}
                            MenuProps={MenuProps}
                        >
                            {friends.map((friend) => (
                                <MenuItem
                                    key={friend.id}
                                    value={friend.id}
                                    style={getStyles(friend.username, friendIds, theme)}
                                >
                                    {friend.username}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                        onClick={handleClick}
                        disabled={friendIds.length === 0}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddMembersToGroupDialog;
