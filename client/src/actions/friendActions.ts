import { Dispatch } from "redux";
import { acceptFriendRequest, inviteFriendRequest, rejectFriendRequest } from "../api/api";
import { showAlert } from "./alertActions";
import { actionTypes, PendingInvitation, Friend } from "./types";


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