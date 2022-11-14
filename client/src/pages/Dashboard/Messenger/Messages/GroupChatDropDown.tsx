import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddMembersToGroupDialog from "./AddMembersToGroupDialog";
import { useAppSelector } from "../../../../store";
import GroupParticipantsDialog from "./GroupParticipantsDialog";
import { leaveGroupAction } from "../../../../actions/groupChatActions";

export default function GroupChatDropDown() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [participantsDialogOpen, setParticipantsDialogOpen] = useState(false);

    const {
        chat: { chosenGroupChatDetails },
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

    return (
        <>
            <div>
                <IconButton
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    style={{ color: "white", marginLeft: "20px" }}
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
                    {chosenGroupChatDetails?.admin?._id === userDetails?._id ? (
                        <MenuItem onClick={handleOpenDialog}>
                            Add Members
                        </MenuItem>
                    ) : (
                        <MenuItem onClick={handleLeaveGroup}>
                            Leave Group
                        </MenuItem>
                    )}

                    <MenuItem onClick={handleParticipantsOpenDialog}>
                        View Participants (
                        {chosenGroupChatDetails?.participants.length})
                    </MenuItem>

                    {/* <MenuItem onClick={handleOpenDialog}>Add Members</MenuItem> */}
                </Menu>
            </div>
            <AddMembersToGroupDialog
                isDialogOpen={isDialogOpen}
                closeDialogHandler={handleCloseDialog}
            />

            {chosenGroupChatDetails && userDetails && (
                <GroupParticipantsDialog
                    isDialogOpen={participantsDialogOpen}
                    closeDialogHandler={handleParticipantsCloseDialog}
                    groupDetails={chosenGroupChatDetails}
                    currentUserId={userDetails._id}
                />
            )}
        </>
    );
}
