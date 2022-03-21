const { addNewConnectedUser } = require("../socket/connectedUsers");

const newConnectionHandler = (socket, io) => {
    addNewConnectedUser({socketId: socket.id, userId: socket.user.userId});
}


module.exports = newConnectionHandler;