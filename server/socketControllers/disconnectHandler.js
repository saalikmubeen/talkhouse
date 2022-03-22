const { removeConnectedUser, getOnlineUsers } = require("../socket/connectedUsers")

const disconnectHandler = (socket, io) => {
    removeConnectedUser({ socketId: socket.id });

    // emit online users to all connected users
    io.emit("online-users", getOnlineUsers());
}

module.exports = disconnectHandler;