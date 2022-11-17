import { Dispatch } from "redux";
import { acceptFriendRequest, inviteFriendRequest, rejectFriendRequest, removeFriend } from "../api/api";
import { showAlert } from "./alertActions";
import { resetChatAction } from "./chatActions";
import { actionTypes, PendingInvitation, Friend, OnlineUser, GroupChatDetails, ResetFriends } from "./types";


export const inviteFriend = (email: string, closeDialogHandler: () => void) => {
    return async (dispatch: Dispatch) => {
        const response = await inviteFriendRequest({ email });

        if (response === "Invitation has been sent successfully") {
            closeDialogHandler();
            dispatch(showAlert(response));
        } else {
            dispatch(showAlert(response.message));
        }
    };
};


export const setPendingInvitations = (pendingInvitations: PendingInvitation[]) => {
    return {
        type: actionTypes.setPendingInvitations,
        payload: pendingInvitations,
    };
}



export const setFriends = (
    friends: Friend[]
) => {
    return {
        type: actionTypes.setFriends,
        payload: friends,
    };
};


export const setOnlineUsers = (
    onlineUsers: OnlineUser[]
) => {
    return {
        type: actionTypes.setOnlineUsers,
        payload: onlineUsers,
    };
};


export const setGroupChatList = (chatList: GroupChatDetails[]) => {
    return {
        type: actionTypes.setGroupChatList,
        payload: chatList,
    };
};


export const rejectInvitation = (invitationId: string) => {
    return async (dispatch: Dispatch) => {
        const response = await rejectFriendRequest(invitationId);

        if (response === "Invitation rejected successfully!") {;
            dispatch(showAlert(response));
        } else {
            dispatch(showAlert(response.message));
        }
    };
};


export const acceptInvitation = (invitationId: string) => {
    return async (dispatch: Dispatch) => {
        const response = await acceptFriendRequest(invitationId);

        if (response === "Invitation accepted successfully!") {
            dispatch(showAlert(response));
        } else {
            dispatch(showAlert(response.message));
        }
    };
};

export const removeFriendAction = ({friendId, friendName}: { friendId: string; friendName: string }) => {
    return async (dispatch: Dispatch) => {
        const response = await removeFriend({
            friendId,
        });

        if (response === "Friend removed successfully!") {
            dispatch(showAlert(`You removed ${friendName} from your list of friends!`));
            dispatch(resetChatAction())
        } else {
            dispatch(showAlert(response.message));
        }
    };
};


export const resetFriendsAction = (): ResetFriends => {
    return {
        type: actionTypes.resetFriends,
    };
};