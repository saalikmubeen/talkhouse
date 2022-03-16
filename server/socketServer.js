const socket = require("socket.io");

const createSocketServer = (server) => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });


    io.on("connection", (socket) => {
        console.log("socket connected")
        console.log(socket)
    })
}


module.exports = createSocketServer;