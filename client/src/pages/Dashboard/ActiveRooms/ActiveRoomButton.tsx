import React from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { joinRoom } from "../../../socket/roomHandler";
import Avatar from "../../../components/Avatar";
import { ActiveRoom } from "../../../actions/types";


interface Props {
    creatorUsername: string;
    isUserInRoom: boolean;
    room: ActiveRoom;
    alreadyInDirectCall: boolean
}

const ActiveRoomButton = ({
    creatorUsername,
    isUserInRoom,
    room,
    alreadyInDirectCall
}: Props) => {

    const handleJoinActiveRoom = () => {
        // if (amountOfParticipants < 4) {
        //     joinRoom(room);
        // }

        joinRoom(room);
    };

    const amountOfParticipants = room.participants.length;
    const activeRoomButtonDisabled = alreadyInDirectCall // || amountOfParticipants > 3;
    const roomTitle = `Creator: ${creatorUsername}. Connected: ${amountOfParticipants}`;


    return (
        <Tooltip title={roomTitle}>
            <div>
                <Button
                    style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "16px",
                        margin: 0,
                        padding: 0,
                        minWidth: 0,
                        marginTop: "10px",
                        color: "white",
                        backgroundColor: "#5865F2",
                    }}
                    disabled={activeRoomButtonDisabled || isUserInRoom}
                    onClick={handleJoinActiveRoom}
                >
                    <Avatar username={creatorUsername} />
                </Button>
            </div>
        </Tooltip>
    );
}

export default ActiveRoomButton;
