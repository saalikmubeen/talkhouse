const GroupChat = require("../models/GroupChat");
const Message = require("../models/Message");
const {
    updateChatHistory,
    sendNewGroupMessage,
} = require("./notifyConnectedSockets");

const groupMessageHandler = async (socket, data) => {
    try {
        const { groupChatId, message } = data;
        const senderUserId = socket.user.userId;

        const newMessage = await Message.create({
            author: senderUserId,
            content: message,
            type: "GROUP",
        });

        // check if groupChat exists
        const groupChat = await GroupChat.findOne({ _id: groupChatId });

        if (!groupChat) {
            return;
        }

        // append the message to the conversation
        groupChat.messages = [...groupChat.messages, newMessage._id];
        await groupChat.save();

        // update the chat of the participants with newly sent message
        sendNewGroupMessage(groupChat._id.toString(), newMessage);

    } catch (err) {
        console.log(err);
    }
};

module.exports = groupMessageHandler;
