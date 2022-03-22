import { Reducer } from "redux";
import { FriendsActions, actionTypes } from "../actions/types";

interface PendingInvitation {
    _id: string;
    senderId: {
        username: string;
        email: string;
        _id: string;
    };
}

interface Friend {
    id: string;
    username: string;
    email: string;
    isOnline?: boolean;
}

const initialState = {
    friends: [],
    pendingInvitations: [],
    onlineUsers: [],
};

interface FriendsState {
    friends: Array<Friend>;
    pendingInvitations: Array<PendingInvitation>;
    onlineUsers: Array<Friend>;
}

const friendsReducer: Reducer<FriendsState, FriendsActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case actionTypes.setPendingInvitations:
            return {
                ...state,
                pendingInvitations: action.payload,
            };

        case actionTypes.setFriends:
            return {
                ...state,
                friends: action.payload
            }

        default:
            return state;
    }
};

export { friendsReducer };
