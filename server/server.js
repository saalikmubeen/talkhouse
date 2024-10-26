require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
var webPush = require('web-push');

const authRoutes = require('./routes/authRoutes');
const friendInvitationRoutes = require('./routes/friendInvitationRoutes');
const groupChatRoutes = require('./routes/groupChatRoutes');

const { createSocketServer } = require('./socket/socketServer');

const PORT = process.env.PORT || 5000;

// const vapidKeys = webPush.generateVAPIDKeys();
// console.log(vapidKeys.publicKey); // Used in the frontend
// console.log(vapidKeys.privateKey); // Kept secret on your server
// console.log(JSON.stringify(vapidKeys));

webPush.setVapidDetails(
  process.env.WEB_PUSH_CONTACT,
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

const app = express();
app.use(express.json());
app.use(cors());

// register the routes
app.use('/api/auth', authRoutes);
app.use('/api/invite-friend', friendInvitationRoutes);
app.use('/api/group-chat', groupChatRoutes);

const server = http.createServer(app);

// socket connection
createSocketServer(server);

const MONGO_URI =
  process.env.NODE_ENV === 'production'
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
    console.log('database connection failed. Server not started');
    console.error(err);
  });
