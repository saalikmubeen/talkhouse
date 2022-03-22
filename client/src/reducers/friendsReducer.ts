import { Reducer } from "redux";
import { FriendsActions, actionTypes, PendingInvitation, Friend, OnlineUser } from "../actions/types";


const initialState = {
    friends: [],
    pendingInvitations: [],
    onlineUsers: [],
};

interface FriendsState {
    friends: Array<Friend>;
    pendingInvitations: Array<PendingInvitation>;
    onlineUsers: Array<OnlineUser>;
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
                friends: action.payload,
            };

        case actionTypes.setOnlineUsers:
            return {
                ...state,
                onlineUsers: action.payload,
            };

        default:
            return state;
    }
};

export { friendsReducer };
