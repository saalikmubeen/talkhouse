const User = require('../models/User');
const GroupChat = require('../models/GroupChat');
const {
  updateUsersGroupChatList,
} = require('../socketControllers/notifyConnectedSockets');
const sendPushNotification = require('../socketControllers/notification');

const createGroupChat = async (req, res) => {
  try {
    const { email, userId } = req.user;
    const { name } = req.body;

    // create group
    const chat = await GroupChat.create({
      name: name,
      participants: [userId],
      admin: userId,
    });

    const currentUser = await User.findById(userId);
    currentUser.groupChats.push(chat._id);
    await currentUser.save();

    updateUsersGroupChatList(userId.toString());

    return res.status(201).send('Group created successfully');
  } catch (err) {
    return res
      .status(500)
      .send('Sorry, something went wrong. Please try again later');
  }
};

const addMemberToGroup = async (req, res) => {
  try {
    const { email, userId } = req.user;
    const { friendIds, groupChatId } = req.body;

    // check if groupChat exists
    const groupChat = await GroupChat.findOne({ _id: groupChatId });

    if (!groupChat) {
      return res
        .status(404)
        .send("Sorry, the group chat doesn't exist");
    }

    if (groupChat.admin.toString() !== userId) {
      return res
        .status(403)
        .send(
          'Forbidden. Only group admin can add members to the group.'
        );
    }

    // add friends to the group

    const friendsToAdd = [];

    friendIds.forEach((id) => {
      if (!groupChat.participants.includes(id)) {
        friendsToAdd.push(id);
      }
    });

    groupChat.participants = [
      ...groupChat.participants,
      ...friendsToAdd,
    ];
    await groupChat.save();

    const currentUser = await User.findById(userId);

    // update groupChat list of all the participants
    friendsToAdd.forEach(async (friendId) => {
      const participant = await User.findById(friendId);

      if (participant) {
        participant.groupChats.push(groupChatId);
        await participant.save();

        // update the user's(user who has been added to the group) chat list
        updateUsersGroupChatList(friendId.toString());

        // send push notification to all the users who have been added to the group.
        sendPushNotification({
          sender: currentUser,
          receiver: participant,
          message: {
            content: `${currentUser.username} has added you to the group "${groupChat.name}"`,
            _id: `${userId}-${participant._id}-${groupChat._id}-added`,
          },
        });
      }
    });

    // update the admin's chat list
    updateUsersGroupChatList(groupChat.admin.toString());

    return res.status(200).send('Members added successfully!');
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send('Sorry, something went wrong. Please try again later');
  }
};

const leaveGroup = async (req, res) => {
  try {
    const { userId } = req.user;
    const { groupChatId } = req.body;

    // check if groupChat exists
    const groupChat = await GroupChat.findOne({ _id: groupChatId });

    if (!groupChat) {
      return res
        .status(404)
        .send("Sorry, the group chat doesn't exist");
    }

    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return res.status(404).send('User not found');
    }

    // remove user from the group
    groupChat.participants = groupChat.participants.filter(
      (participant) => {
        return participant.toString() !== currentUser._id.toString();
      }
    );
    await groupChat.save();

    // remove groupChat from the list of user's groupChats
    currentUser.groupChats = currentUser.groupChats.filter((chat) => {
      return chat.toString() !== groupChat._id.toString();
    });

    await currentUser.save();

    // update the chat list of user who left the chat.
    updateUsersGroupChatList(currentUser._id.toString());

    groupChat.participants.forEach((participant) => {
      // update the participants chat list
      updateUsersGroupChatList(participant.toString());

      const receiver = User.findById(participant);
      // send notification to all the participants of the group except the user who left the group
      sendPushNotification({
        sender: currentUser,
        receiver: receiver,
        message: {
          content: `${currentUser.username} has left the group!`,
          _id: `${currentUser._id}-${participant}-${groupChat._id}-left`,
        },
      });
    });

    return res.status(200).send('You have left the group!');
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send('Sorry, something went wrong. Please try again later');
  }
};

const deleteGroup = async (req, res) => {
  try {
    const { userId } = req.user;
    const { groupChatId } = req.body;

    // check if groupChat exists
    const groupChat = await GroupChat.findOne({ _id: groupChatId });

    if (!groupChat) {
      return res
        .status(404)
        .send("Sorry, the group chat doesn't exist");
    }

    if (groupChat.admin.toString() !== userId) {
      return res
        .status(403)
        .send('Forbidden. Only group admins can delete a group.');
    }

    // update groupChat list of all the participants
    groupChat.participants.forEach(async (friendId) => {
      const participant = await User.findById(friendId);

      if (participant) {
        participant.groupChats = participant.groupChats.filter(
          (chat) => chat.toString() !== groupChat._id.toString()
        );
        await participant.save();

        // update the users group chat list
        updateUsersGroupChatList(friendId.toString());
      }
    });

    // lastly delete the groupChat
    groupChat.remove();

    return res.status(200).send('Group deleted successfully!');
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send('Sorry, something went wrong. Please try again later');
  }
};

module.exports = {
  createGroupChat,
  addMemberToGroup,
  leaveGroup,
  deleteGroup,
};
