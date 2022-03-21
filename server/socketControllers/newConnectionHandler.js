const { addNewConnectedUser } = require("../socket/connectedUsers");
const { updateUsersInvitations } = require("./notifyConnectedSockets");

const newConnectionHandler = (socket, io) => {
    
    addNewConnectedUser({socketId: socket.id, userId: socket.user.userId});

    // send the list of invitations to all the active connections of this user(userId)
    updateUsersInvitations(socket.user.userId);
}


module.exports = newConnectionHandler;