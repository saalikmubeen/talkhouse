import React, { Fragment } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import { ActiveRoom } from "../../../actions/types";
import Avatar from "../../../components/Avatar";



interface Props {
    isDialogOpen: boolean;
    closeDialogHandler: () => void;
    roomDetails: ActiveRoom;
    currentUserId: string;
}

const RoomParticipantsDialog = ({
    isDialogOpen,
    closeDialogHandler,
    roomDetails,
    currentUserId,
}: Props) => {
    const handleCloseDialog = () => {
        closeDialogHandler();
    };

    return (
        <div>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>
                    <Typography>{`${roomDetails.roomCreator.username}'s Room`}</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>
                            {roomDetails.participants.length}{" "}
                            {roomDetails.participants.length > 1
                                ? "Participants"
                                : "Participant"}
                        </Typography>
                    </DialogContentText>
                    <List
                        sx={{
                            width: "100%",
                            maxWidth: 300,
                            bgcolor: "background.paper",
                        }}
                    >
                        {roomDetails.participants.map((participant) => {
                            return (
                                <Fragment key={participant.userId}>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar
                                                username={participant.username}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={`${participant.username} ${
                                                participant.userId ===
                                                currentUserId
                                                    ? "(You)"
                                                    : ""
                                            }`}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{
                                                            display: "inline",
                                                        }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {` ${
                                                            participant.userId ===
                                                            roomDetails
                                                                .roomCreator
                                                                ?.userId
                                                                ? " — Host"
                                                                : ""
                                                        }`}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </Fragment>
                            );
                        })}
                    </List>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default RoomParticipantsDialog;
