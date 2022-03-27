const { getServerSocketInstance, getActiveConnections } = require("../socket/connectedUsers");

const callRequestHandler = (socket, data) => {
    const { receiverUserId, callerName, audioOnly, signal } = data;
    const callerUserId = socket.user.userId;

    // active connections of the receiver user
    const activeConnections = getActiveConnections(receiverUserId);

    // send call request to all the active connections of the receiver user
    const io = getServerSocketInstance();

    activeConnections.forEach((socketId) => {
        io.to(socketId).emit("call-request", { callerName, callerUserId, audioOnly, signal });
    }
    );

}


module.exports = callRequestHandler