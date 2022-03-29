require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const friendInvitationRoutes = require("./routes/friendInvitationRoutes");

const { createSocketServer } = require("./socket/socketServer");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

// register the routes
app.use("/api/auth", authRoutes);
app.use("/api/invite-friend", friendInvitationRoutes);

const server = http.createServer(app);

// socket connection
createSocketServer(server);

const MONGO_URI =
    process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI
        : process.env.MONGO_URI_DEV;


mongoose
    .connect(MONGO_URI)
    .then(() => {

        server.listen(PORT, () => {
            console.log(`SERVER STARTED ON ${PORT}.....!`);
        });
    })
    .catch((err) => {
        console.log("database connection failed. Server not started");
        console.error(err);
    });
