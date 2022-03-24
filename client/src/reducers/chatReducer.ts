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
        typing: {
            userId : string; // id of the user who's typing;
            typing: boolean; 
        },
    } | null;
    messages: Array<Message>;
}


const initialState = {
    chosenChatDetails: null,
    chatType: ChatTypes.direct,
    messages: []
};



const chatReducer: Reducer<ChatState, ChatActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {

        case actionTypes.setChosenChatDetails:
            return {
                ...state,
                chosenChatDetails: {
                    ...action.payload,
                    typing: {
                        typing: false,
                        userId: ""
                    },
                },
            };

        case actionTypes.setMessages:
            return {
                ...state,
                messages: action.payload
            }

        case actionTypes.setTyping:
            return {
                ...state,
                chosenChatDetails: {
                    userId: state.chosenChatDetails?.userId!,
                    username: state.chosenChatDetails?.username!,
                    typing: action.payload
                }
            }

        default:
            return state
    }
};

export { chatReducer };
