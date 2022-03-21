import { Dispatch } from "redux";
import { inviteFriendRequest } from "../api/api";
import { showAlert } from "./alertActions";


export const inviteFriend = (email: string, closeDialogHandler: () => void) => {
    return async (dispatch: Dispatch) => {
        const response = await inviteFriendRequest({ email });

        if ("error" in response) {
            dispatch(showAlert(response.message));
            closeDialogHandler();
        } else {
            closeDialogHandler();
            dispatch(showAlert(response));
        }
    };
};
