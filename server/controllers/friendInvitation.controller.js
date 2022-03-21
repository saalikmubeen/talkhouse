const FriendInvitation = require("../models/FriendInvitation");
const User = require("../models/User");
const { updateUsersInvitations } = require("../socketControllers/notifyConnectedSockets");

const inviteFriend = async (req, res) => {

    const {email: senderEmailAddress, userId} = req.user
    const { email: receiverEmailAddress } = req.body;

    // check if user is inviting himself
    if (senderEmailAddress === receiverEmailAddress) {
        return res.status(400).send("Sorry, you can't invite yourself");
    }

    // check if the invited user exists in the database
    const targetUser = await User.findOne({email: receiverEmailAddress});

    if (!targetUser) {
        return res.status(404).send("Sorry, the user you are trying to invite doesn't exist. Please check the email address");
    }

    // check if invitation has already been sent
    const invitationAlreadyExists = await FriendInvitation.findOne({
        senderId: userId,
        receiverId: targetUser._id
    })

    if (invitationAlreadyExists) {
        return res.status(409).send("You have already sent an invitation to this user");
    }

    // check if the invited user is already a friend of the sender
    const isAlreadyFriend = targetUser.friends.some(friend => friend.toString() === userId.toString());
    
    if (isAlreadyFriend) {
        return res.status(409).send("You are already friends with this user. Please check your friend first");
    }

    // create invitation

    await FriendInvitation.create({
        senderId: userId,
        receiverId: targetUser._id
    });

    // after successfully creating the invitation, update the target user's pending invitation list
    // with the new invitation in real time using sockets if the target user is online
    // TODO: implement real time sockets

    updateUsersInvitations(targetUser._id.toString(), "new");
    
    return res.status(201).send("Invitation has been sent successfully");

}


module.exports = {
    inviteFriend
}