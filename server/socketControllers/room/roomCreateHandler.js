const { addNewActiveRoom } = require("../../socket/activeRooms");
const { updateRooms } = require("../notifyConnectedSockets");


const roomCreateHandler = (socket) => {
  console.log("handling room create event");
  const socketId = socket.id;
  const { userId, username } = socket.user;

  const roomDetails = addNewActiveRoom(userId, username, socketId);

  socket.emit("room-create", {
    roomDetails,
  });

  updateRooms();
};

module.exports = roomCreateHandler;
