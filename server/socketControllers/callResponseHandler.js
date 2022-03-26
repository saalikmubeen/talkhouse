const {
    getServerSocketInstance,
    getActiveConnections,
} = require("../socket/connectedUsers");

const callResponseHandler = (data) => {
    const { receiverUserId, accepted } = data;

    // const userId = socket.user.userId; // user id who accepted/rejected the call

    // active connections of the receiver user
    const activeConnections = getActiveConnections(receiverUserId);

    // send call response(accepted or rejected) to all the active connections of the receiver user
    const io = getServerSocketInstance();

    activeConnections.forEach((socketId) => {
        io.to(socketId).emit("call-response", {
            accepted,
        });
    });
};

module.exports = callResponseHandler;
