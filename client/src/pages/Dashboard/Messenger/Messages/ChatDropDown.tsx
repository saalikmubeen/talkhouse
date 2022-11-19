import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddMembersToGroupDialog from "./AddMembersToGroupDialog";
import { useAppSelector } from "../../../../store";
import GroupParticipantsDialog from "./GroupParticipantsDialog";
import { deleteGroupAction, leaveGroupAction } from "../../../../actions/groupChatActions";
import { removeFriendAction } from "../../../../actions/friendActions";

export default function ChatDropDown() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [participantsDialogOpen, setParticipantsDialogOpen] = useState(false);

    const {
        chat: { chosenGroupChatDetails, chosenChatDetails },
        auth: {userDetails}
    } = useAppSelector((state) => state);
    const dispatch = useDispatch();

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleParticipantsOpenDialog = () => {
        setParticipantsDialogOpen(true);
    };

    const handleParticipantsCloseDialog = () => {
        setParticipantsDialogOpen(false);
    };

    const handleLeaveGroup = () => {
        
        if(chosenGroupChatDetails) {
            dispatch(leaveGroupAction({
            groupChatId: chosenGroupChatDetails.groupId
        }))
        }
    };

    const handleDeleteGroup = () => {
        if (chosenGroupChatDetails) {
            dispatch(
                deleteGroupAction({
                    groupChatId: chosenGroupChatDetails.groupId,
                    groupChatName: chosenGroupChatDetails.groupName
                })
            );
        }
    };


    const handleRemoveFriend = () => {
        
        if(chosenChatDetails) {
            dispatch(removeFriendAction({
                friendId: chosenChatDetails.userId,
                friendName: chosenChatDetails.username
            }));
        }
    }

    return (
        <>
            <div>
                <IconButton
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    style={{ color: "white", marginLeft: "0px" }}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >
                    {chosenGroupChatDetails &&
                        (chosenGroupChatDetails.admin._id ===
                        userDetails?._id ? (
                            <>
                                <MenuItem onClick={handleOpenDialog}>
                                    Add Members
                                </MenuItem>
                                <MenuItem onClick={handleDeleteGroup}>
                                    Delete Group
                                </MenuItem>
                            </>
                        ) : (
                            <MenuItem onClick={handleLeaveGroup}>
                                Leave Group
                            </MenuItem>
                        ))}

                    {chosenGroupChatDetails && (
                        <MenuItem onClick={handleParticipantsOpenDialog}>
                            View Participants (
                            {chosenGroupChatDetails.participants.length})
                        </MenuItem>
                    )}

                    {chosenChatDetails && (
                        <MenuItem onClick={handleRemoveFriend}>
                            Remove Friend
                        </MenuItem>
                    )}
                </Menu>
            </div>

            {chosenGroupChatDetails && userDetails && (
                <>
                    <AddMembersToGroupDialog
                        isDialogOpen={isDialogOpen}
                        closeDialogHandler={handleCloseDialog}
                    />
                    <GroupParticipantsDialog
                        isDialogOpen={participantsDialogOpen}
                        closeDialogHandler={handleParticipantsCloseDialog}
                        groupDetails={chosenGroupChatDetails}
                        currentUserId={userDetails._id}
                    />
                </>
            )}
        </>
    );
}
