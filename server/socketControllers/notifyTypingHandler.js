const { getActiveConnections } = require("../socket/connectedUsers");


const notifyTypingHandler = (socket, io, data) => {

    const {receiverUserId, typing} = data;

    const activeConnections = getActiveConnections(receiverUserId?.toString());

    activeConnections.forEach((socketId) => {

        io.to(socketId).emit("notify-typing", {
            senderUserId: socket.user.userId,
            typing
        });
    }); 
}


module.exports = notifyTypingHandler;