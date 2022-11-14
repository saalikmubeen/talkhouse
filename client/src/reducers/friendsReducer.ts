import { Reducer } from "redux";
import { FriendsActions, actionTypes, PendingInvitation, Friend, OnlineUser, GroupChatDetails } from "../actions/types";


const initialState = {
    friends: [],
    pendingInvitations: [],
    onlineUsers: [],
    groupChatList: []
};

interface FriendsState {
    friends: Array<Friend>;
    pendingInvitations: Array<PendingInvitation>;
    onlineUsers: Array<OnlineUser>;
    groupChatList: Array<GroupChatDetails>;
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

        case actionTypes.setGroupChatList:
            return {
                ...state,
                groupChatList: action.payload,
            };

        case actionTypes.resetFriends:
            return {
                ...initialState
            };

        default:
            return state;
    }
};

export { friendsReducer };
