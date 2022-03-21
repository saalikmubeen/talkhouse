const FriendInvitation = require("../models/FriendInvitation"); 
const { getActiveConnections } = require("../socket/connectedUsers");
const  { getServerSocketInstance } = require("../socket/connectedUsers");


const updateUsersInvitations = async (userId) => {

    // get the user's pending invitations
    const invitations = await FriendInvitation.find({
        receiverId: userId
    }).populate("senderId", { username: 1, email: 1, _id: 1 });


    // get the users's active socket connections(socket ids)
    const activeConnections = getActiveConnections(userId);

    // send the list of invitations to all the active connections of this user(userId)

    const io = getServerSocketInstance();

    activeConnections.forEach(socketId => {
        io.to(socketId).emit("friend-invitations", invitations);
    })

}


module.exports = {
    updateUsersInvitations
}