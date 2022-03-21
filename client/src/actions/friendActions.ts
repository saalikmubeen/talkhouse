import { Dispatch } from "redux";
import { inviteFriendRequest, rejectFriendRequest } from "../api/api";
import { showAlert } from "./alertActions";
import { actionTypes, PendingInvitation } from "./types";


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