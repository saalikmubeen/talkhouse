const roomSignalingDataHandler = (socket, data) => {
  const { connUserSocketId, signal } = data;

  // 5.
  const signalingData = { signal, connUserSocketId: socket.id };
  socket.to(connUserSocketId).emit("conn-signal", signalingData);
};

module.exports = roomSignalingDataHandler;
