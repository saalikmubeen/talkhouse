import { Dispatch } from "redux";
import { createGroupChat, addMembersToGroup, leaveGroup } from "../api/api";
import { AddMembersToGroupArgs, LeaveGroupArgs } from "../api/types";
import { showAlert } from "./alertActions";
import { resetChatAction } from "./chatActions";
// import { actionTypes, CurrentUser } from "./types";

export const createGroupChatAction = (
    name: string,
    closeDialogHandler: () => void
) => {
    return async (dispatch: Dispatch) => {
        const response = await createGroupChat(name);

        if (response === "Group created successfully") {
            closeDialogHandler();
            dispatch(showAlert(response));
        } else {
            dispatch(showAlert(response.message));
        }
    };
};

export const addMembersToGroupAction = (
    args: AddMembersToGroupArgs,
    closeDialogHandler: () => void
) => {
    return async (dispatch: Dispatch) => {
        const response = await addMembersToGroup(args);

        if (response === "Members added successfully!") {
            closeDialogHandler();
            dispatch(showAlert(response));
        } else {
            dispatch(showAlert(response.message));
        }
    };
};

export const leaveGroupAction = (
    args: LeaveGroupArgs,
) => {
    return async (dispatch: Dispatch) => {
        const response = await leaveGroup(args);

        if (response === "You have left the group!") {
            dispatch(showAlert(response));
            dispatch(resetChatAction())
        } else {
            dispatch(showAlert(response.message));
        }
    };
};