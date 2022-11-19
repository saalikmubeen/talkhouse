const { addNewConnectedUser, getOnlineUsers } = require("../socket/connectedUsers");
const { updateUsersInvitations, updateUsersFriendsList, updateUsersGroupChatList, updateRooms, initialRoomsUpdate } = require("./notifyConnectedSockets");

const newConnectionHandler = (socket, io) => {
    addNewConnectedUser({ socketId: socket.id, userId: socket.user.userId });

    // emit online users to all connected users
    io.emit("online-users", getOnlineUsers());

    // send the list of invitations to all the active connections of this user(userId)
    updateUsersInvitations(socket.user.userId);

    // send user's friends to all the active connections of this user(userId)
    updateUsersFriendsList(socket.user.userId);

    // send user's groupChats to all the active connections of this user(userId)
    updateUsersGroupChatList(socket.user.userId);

    // emit active rooms to the new active connection of this user
    initialRoomsUpdate(socket.user.userId, socket.id);
}


module.exports = newConnectionHandler;