import { Reducer } from "redux";
import { ChatActions, actionTypes } from "../actions/types";


enum ChatTypes {
    direct = "DIRECT",
    group = "GROUP",
}

interface Message {
    _id: string;
    content: string;
    sameAuthor: boolean;
    author: {
        username: string;
    }
    date: string,
    sameDay: boolean
}


interface ChatState {
    chatType: ChatTypes;
    chosenChatDetails: {
        userId: string,
        username: string,
    } | null;
    messages: Array<Message>;
}


const initialState = {
    chosenChatDetails: null,
    chatType: ChatTypes.direct,
    messages: [],
};



const chatReducer: Reducer<ChatState, ChatActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {

        case actionTypes.setChosenChatDetails:
            return {
                ...state,
                chosenChatDetails: action.payload
            }

        default:
            return state
    }
};

export { chatReducer };
