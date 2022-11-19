const { leaveAllRooms } = require("../socket/activeRooms");
const { removeConnectedUser, getOnlineUsers } = require("../socket/connectedUsers");
const { updateRooms } = require("./notifyConnectedSockets");

const disconnectHandler = (socket, io) => {
    removeConnectedUser({ socketId: socket.id });

    // emit online users to all connected users
    io.emit("online-users", getOnlineUsers());

    leaveAllRooms(socket.id)
    updateRooms();
}

module.exports = disconnectHandler;