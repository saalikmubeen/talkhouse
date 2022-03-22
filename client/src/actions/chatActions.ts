// import { Dispatch } from "redux";
import { actionTypes, SetChosenChatDetails } from "./types";

export const setChosenChatDetails = (chatDetails: {
    userId: string;
    username: string;
}): SetChosenChatDetails => {
    return {
        type: actionTypes.setChosenChatDetails,
        payload: chatDetails,
    };
};
