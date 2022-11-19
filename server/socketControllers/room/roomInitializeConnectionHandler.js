const roomInitializeConnectionHandler = (socket, data) => {
  const { connUserSocketId } = data;

  const initData = { connUserSocketId: socket.id };
  //3.
  socket.to(connUserSocketId).emit("conn-init", initData);
};

module.exports = roomInitializeConnectionHandler;
