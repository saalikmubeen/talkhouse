const { v4: uuidv4 } = require("uuid");

let activeRooms = [];

const addNewActiveRoom = (userId, username, socketId) => {
    const newActiveRoom = {
        roomCreator: {
            userId,
            socketId,
            username
        },
        participants: [
            {
                userId,
                username,
                socketId,
            },
        ],
        roomId: uuidv4(),
    };

    activeRooms = [...activeRooms, newActiveRoom];

    console.log(activeRooms);

    return newActiveRoom;
};

const getActiveRooms = () => {
    return [...activeRooms];
};

const getActiveRoom = (roomId) => {
    const activeRoom = activeRooms.find(
        (activeRoom) => activeRoom.roomId === roomId
    );

    if (activeRoom) {
        return {
            ...activeRoom,
        };
    } else {
        return null;
    }
};

const joinActiveRoom = (roomId, newParticipant) => {
    const room = activeRooms.find((room) => room.roomId === roomId);
    console.log("room has been found");

    activeRooms = activeRooms.filter((room) => room.roomId !== roomId);
    console.log(activeRooms);

    const updatedRoom = {
        ...room,
        participants: [...room.participants, newParticipant],
    };

    // const updatedRooms = activeRooms.map((room) => {
    //     if(room.roomId === roomId) {
    //         return {
    //             ...room,
    //             participants: [...room.participants, newParticipant]
    //         }
    //     } else {
    //         return room
    //     }
    // })

    // activeRooms = updatedRooms

    activeRooms.push(updatedRoom);
    console.log("joining")
    console.log(activeRooms);
};

const leaveActiveRoom = (roomId, participantSocketId) => {
    const activeRoom = activeRooms.find((room) => room.roomId === roomId);

    if (activeRoom) {
        const copyOfActiveRoom = { ...activeRoom };

        copyOfActiveRoom.participants = copyOfActiveRoom.participants.filter(
            (participant) => participant.socketId !== participantSocketId
        );

        activeRooms = activeRooms.filter((room) => room.roomId !== roomId);

        if (copyOfActiveRoom.participants.length > 0) {
            activeRooms.push(copyOfActiveRoom);
        }
    }

    // const updatedRooms = activeRooms.map((room) => {
    //     if(room.roomId === roomId) {
    //         return {
    //             ...room,
    //             participants: room.participants.filter((participant) => {
    //                 return participant.socketId !== participantSocketId
    //             })
    //         }
    //     } else {
    //         return room
    //     }
    // })

    // activeRooms = updatedRooms
    console.log("leaving")
    console.log(activeRooms);
};

const leaveAllRooms = (connectedSocketId) => {
    const updatedActiveRooms = activeRooms.map((room) => {
        return {
            ...room,
            participants: room.participants.filter((participant) => {
                return participant.socketId !== connectedSocketId;
            })
        }
    })

    activeRooms = updatedActiveRooms;
}

module.exports = {
    addNewActiveRoom,
    getActiveRooms,
    getActiveRoom,
    joinActiveRoom,
    leaveActiveRoom,
    leaveAllRooms
};
