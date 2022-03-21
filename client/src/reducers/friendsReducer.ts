interface PendingInvitation {
    _id: string,
    senderId: {
        username: string,
        email: string,
    }
}

interface Friend {
    id: string,
    username: string,
    isOnline: boolean,
}

const initialState = {
    friends: [],
    pendingInvitations: [],
    onlineUsers: []
};



interface FriendsState {
    friends: Array<Friend>,
    pendingInvitations: Array<PendingInvitation>,
    onlineUsers: Array<Friend>,
}

const friendsReducer = (state = initialState, action: any): FriendsState  => {
    return state;
};

export { friendsReducer };
