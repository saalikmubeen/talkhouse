const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const {
    updateChatHistory,
    sendNewDirectMessage,
} = require("./notifyConnectedSockets");

const directMessageHandler = async (socket, data) => {
    try {
        const { receiverUserId, message } = data;
        const senderUserId = socket.user.userId;

        const newMessage = await Message.create({
            author: senderUserId,
            content: message,
            type: "DIRECT",
        });

        // check if conversation between sender and receiver already exists

        const conversation = await Conversation.findOne({
            participants: { $all: [receiverUserId, senderUserId] },
        });

        // if conversation exists, append the message to the conversation
        if (conversation) {
            console.log("conversation already exists");

            conversation.messages = [...conversation.messages, newMessage._id];
            await conversation.save();

            // update the chat history of the participants
            // updateChatHistory(conversation._id.toString());

            // update the chat of the participants with newly sent message
            sendNewDirectMessage(conversation._id.toString(), newMessage);
        } else {
            console.log("creating new conversation");
            // create conversation
            const newConversation = await Conversation.create({
                participants: [senderUserId, receiverUserId],
                messages: [newMessage._id],
            });

            // update the chat history of the participants
            // updateChatHistory(newConversation._id.toString());

            // update the chat of the participants with newly sent message
            sendNewDirectMessage(newConversation._id.toString(), newMessage);
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = directMessageHandler;
