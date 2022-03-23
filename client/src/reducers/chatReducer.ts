import { Reducer } from "redux";
import { ChatActions, actionTypes } from "../actions/types";


enum ChatTypes {
    direct = "DIRECT",
    group = "GROUP",
}

interface Message {
    _id: string;
    content: string;
    author: {
        username: string;
        _id: string;
    }
    createdAt: string,
}


interface ChatState {
    chatType: ChatTypes;
    chosenChatDetails: {
        userId: string,
        username: string,
    } | null;
    messages: Array<Message>;
    participants: Array<string>
}


const initialState = {
    chosenChatDetails: null,
    chatType: ChatTypes.direct,
    messages: [],
    participants: []
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

        case actionTypes.setMessages:
            return {
                ...state,
                messages: action.payload
            }

        default:
            return state
    }
};

export { chatReducer };
