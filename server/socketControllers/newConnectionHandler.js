const { addNewConnectedUser, getOnlineUsers } = require("../socket/connectedUsers");
const { updateUsersInvitations, updateUsersFriendsList } = require("./notifyConnectedSockets");

const newConnectionHandler = (socket, io) => {
    addNewConnectedUser({ socketId: socket.id, userId: socket.user.userId });

    // emit online users to all connected users
    io.emit("online-users", getOnlineUsers());

    // send the list of invitations to all the active connections of this user(userId)
    updateUsersInvitations(socket.user.userId);

    // send user's friends to all the active connections of this user(userId)
    updateUsersFriendsList(socket.user.userId);
}


module.exports = newConnectionHandler;