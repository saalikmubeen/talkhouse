import React from "react";
import { styled } from "@mui/system";
import ActiveRoomButton from "./ActiveRoomButton";
import { useAppSelector } from "../../../store";

const MainContainer = styled("div")({
    flexGrow: 1,
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    width: "100%",
    margin: "20px 0",
});

const ActiveRooms = () => {
    const {
        room: { activeRooms, isUserInRoom },
        auth: { userDetails },
        videoChat: { localStream }
    } = useAppSelector((state) => state);
    console.log(activeRooms)
    return (
        <MainContainer>
            {activeRooms.map((room) => (
                <ActiveRoomButton
                    creatorUsername={
                        userDetails?._id === room.roomCreator.userId
                            ? "ME"
                            : room.roomCreator.username
                    }
                    key={room.roomId}
                    isUserInRoom={isUserInRoom}
                    room={room}
                    alreadyInDirectCall={!!localStream}
                />
            ))}
        </MainContainer>
    );
};


export default ActiveRooms;
