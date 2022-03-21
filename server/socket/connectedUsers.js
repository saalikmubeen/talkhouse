const connectedUsers = new Map();

const addNewConnectedUser = ({socketId, userId}) => {
    connectedUsers.set(socketId, {userId});
}


const removeConnectedUser = ({socketId}) => {

    if(connectedUsers.has(socketId)){
        connectedUsers.delete({ socketId });
    }
}


module.exports = {
    addNewConnectedUser,
    removeConnectedUser
}