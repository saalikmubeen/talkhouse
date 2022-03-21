const { removeConnectedUser } = require("../socket/connectedUsers")

const disconnectHandler = (socket, io) => {
    removeConnectedUser({ socketId: socket.id });
}

module.exports = disconnectHandler;