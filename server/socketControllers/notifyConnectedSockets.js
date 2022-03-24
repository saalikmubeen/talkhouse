const mongoose = require("mongoose");
const Conversation = require("../models/Conversation");
const FriendInvitation = require("../models/FriendInvitation"); 
const User = require("../models/User");
const { getActiveConnections } = require("../socket/connectedUsers");
const  { getServerSocketInstance } = require("../socket/connectedUsers");


const updateUsersInvitations = async (userId, isNew) => {

    if ( isNew === "new" ) {
        console.log("new invitation");
    }


    // get the user's pending invitations
    const invitations = await FriendInvitation.find({
        receiverId: userId,
    }).populate("senderId", { username: 1, email: 1, _id: 1 });


    // get the users's active socket connections(socket ids)
    const activeConnections = getActiveConnections(userId);

    // send the list of invitations to all the active connections of this user(userId)

    const io = getServerSocketInstance();

    activeConnections.forEach(socketId => {
        io.to(socketId).emit("friend-invitations", invitations);
    })

}


const updateUsersFriendsList = async (userId) => {

    // get the user's friends list
    const user = await User.findById(userId).populate("friends", { username: 1, email: 1, _id: 1 });

    if (!user) {
        return;
    }

    const friends = user.friends ? user.friends.map((friend) => {
        return {
            id: friend._id,
            username: friend.username,
            email: friend.email
        }
    }): []

    // get the users's active socket connections(socket ids)
    const activeConnections = getActiveConnections(userId);

    // send user's friends to all the active connections of this user(userId)

    const io = getServerSocketInstance();

    activeConnections.forEach((socketId) => {
        io.to(socketId).emit("friends-list", friends || []);
    });
};



const updateChatHistory = async (conversationId, toSpecificSocketId=null) => {

    // get the conversation's chat history
    const conversation = await Conversation.findById(conversationId).populate({
        path: "messages",
        model: "Message",
        populate: {
            path: "author",
            select: "username _id",
            model: "User"
        }
    });

    if (!conversation) {
        return;
    }

    const io = getServerSocketInstance();

    if (toSpecificSocketId) {

        // initial chat history update
        return io.to(toSpecificSocketId).emit("direct-chat-history", {
            messages: conversation.messages,
            participants: conversation.participants
        });
    }
    

    // get the participant's active socket connections(socket ids)
    conversation.participants.forEach((participantId) => {
        
        const activeConnections = getActiveConnections(participantId.toString());

        // send the updated chat history to all the active connections of this user(participantId)
        activeConnections.forEach((socketId) => {
            io.to(socketId).emit("direct-chat-history", {
                messages: conversation.messages,
                participants: conversation.participants
            });
        });
    })
}


module.exports = {
    updateUsersInvitations,
    updateUsersFriendsList,
    updateChatHistory
}