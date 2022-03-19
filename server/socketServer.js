const socket = require("socket.io");
const requireSocketAuth = require("./middlewares/requireSocketAuth");

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
        console.log(`socket connected: ${socket.id}`);

    });
};

module.exports = createSocketServer;
