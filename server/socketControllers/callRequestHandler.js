const User = require('../models/User');
const {
  getServerSocketInstance,
  getActiveConnections,
} = require('../socket/connectedUsers');
const sendPushNotification = require('./notification');

const callRequestHandler = async (socket, data) => {
  const { receiverUserId, callerName, audioOnly, signal } = data;
  const callerUserId = socket.user.userId;

  // active connections of the receiver user
  const activeConnections = getActiveConnections(receiverUserId);

  // send call request to all the active connections of the receiver user
  const io = getServerSocketInstance();

  activeConnections.forEach((socketId) => {
    io.to(socketId).emit('call-request', {
      callerName,
      callerUserId,
      audioOnly,
      signal,
    });
  });

  const sender = await User.findById(callerUserId);
  const receiver = await User.findById(receiverUserId);

  // Send the push notification to the receiver of the call
  try {
    sendPushNotification({
      sender,
      receiver,
      message: {
        content: `${sender.username} is calling you!`,
        _id: `${callerUserId}-${receiverUserId}-call`,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = callRequestHandler;
