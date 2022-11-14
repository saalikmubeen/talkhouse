const GroupChat = require("../models/GroupChat");
const { getServerSocketInstance } = require("../socket/connectedUsers");

const groupChatHistoryHandler = async (socket, groupChatId) => {
    try {
        // get the group chat
        const groupChat = await GroupChat.findById(groupChatId).populate({
        path: "messages",
        model: "Message",
        populate: {
            path: "author",
            select: "username _id",
            model: "User"
        }
    });

        if (!groupChat) {
            return;
        }

        const io = getServerSocketInstance();

        // initial chat history update
        return io.to(socket.id).emit("group-chat-history", {
            messages: groupChat.messages,
            groupChatId: groupChat._id.toString(),
        });

    } catch (err) {
        console.log(err);
    }
};

module.exports = groupChatHistoryHandler;
