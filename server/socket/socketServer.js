const socket = require("socket.io");
const requireSocketAuth = require("../middlewares/requireSocketAuth");
const disconnectHandler = require("../socketControllers/disconnectHandler");
const newConnectionHandler = require("../socketControllers/newConnectionHandler");

const createSocketServer = (server) => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
        },
    });


    // check authentication of user
    io.use((socket, next) => {
        requireSocketAuth(socket, next);
    })

    io.on("connection", (socket) => {
        // console.log(socket.user)
        console.log(`New socket connection connected: ${socket.id}`);
        newConnectionHandler(socket, io)

        
        socket.on("disconnect", () => {
            console.log(`Connected socket disconnected: ${socket.id}`);
            disconnectHandler(socket, io);
        })

    });
};

module.exports = createSocketServer;
