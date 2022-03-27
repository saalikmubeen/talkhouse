const socket = require("socket.io");
const requireSocketAuth = require("../middlewares/requireSocketAuth");
const callRequestHandler = require("../socketControllers/callRequestHandler");
const callResponseHandler = require("../socketControllers/callResponseHandler");
const directChatHistoryHandler = require("../socketControllers/directChatHistoryHandler");
const directMessageHandler = require("../socketControllers/directMessageHandler");
const disconnectHandler = require("../socketControllers/disconnectHandler");
const newConnectionHandler = require("../socketControllers/newConnectionHandler");
const notifyTypingHandler = require("../socketControllers/notifyTypingHandler");
const { setServerSocketInstance, getOnlineUsers } = require("./connectedUsers");


const createSocketServer = (server) => {
    const io = socket(server, {
        cors: {
            origin: ["http://localhost:3000", "https://talkhouse-tv.netlify.app"],
            methods: ["GET", "POST"],
        },
    });

    setServerSocketInstance(io);

    // check authentication of user
    io.use((socket, next) => {
        requireSocketAuth(socket, next);
    });

    io.on("connection", (socket) => {
        // console.log(socket.user)
        console.log(`New socket connection connected: ${socket.id}`);
        newConnectionHandler(socket, io);


        socket.on("direct-message", (data) => {
            directMessageHandler(socket, data);
        })

        socket.on("direct-chat-history", (data) => {
            directChatHistoryHandler(socket, data.receiverUserId);
        });


        socket.on("notify-typing", (data) => {
            notifyTypingHandler(socket, io, data);
        });

        socket.on("call-request", (data) => {
            callRequestHandler(socket, data);
        })

        socket.on("call-response", (data) => {
            callResponseHandler(data);
        })

        socket.on("disconnect", () => {
            console.log(`Connected socket disconnected: ${socket.id}`);
            disconnectHandler(socket, io);
        });
    });

    // emit online users to all connected users every 10 seconds
    // setInterval(() => {
    //     io.emit("online-users", getOnlineUsers());
    // }, 10 * 1000)
};

module.exports = {
    createSocketServer,
}
