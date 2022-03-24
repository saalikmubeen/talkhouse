import { io, Socket } from "socket.io-client";
import { setFriends, setOnlineUsers, setPendingInvitations } from "../actions/friendActions";
import {setMessages, setTyping} from "../actions/chatActions";
import { Message } from "../actions/types";
import { store } from "../store";

export interface UserDetails {
    email: string;
    token: string;
    username: string;
}

interface PendingInvitation {
    _id: string;
    senderId: {
        username: string;
        email: string;
        _id: string
    };
}

interface Friend {
    id: string;
    username: string;
    email: string;
}

interface OnlineUser {
    userId: string;
    socketId: string;
}

interface ServerToClientEvents {
    "friend-invitations": (data: Array<PendingInvitation>) => void;
    "friends-list": (data: Array<Friend>) => void;
    "online-users": (data: Array<OnlineUser>) => void;

    "direct-chat-history": (data: {
        messages: Array<Message>,
        participants: Array<string>
    }) => void;

    "notify-typing": (data: {
        senderUserId: string;
        typing: boolean;
    }) => void;
}

interface ClientToServerEvents {
    helloFomClient: () => void;

    "direct-message": (data: {
        message: string;
        receiverUserId: string;
    }) => void;

    "direct-chat-history": (data: {
    receiverUserId: string
}) => void;

    "notify-typing": (data: {
        receiverUserId: string;
        typing: boolean;
    }) => void;
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

const connectWithSocketServer = (userDetails: UserDetails) => {
    socket = io(
        "http://localhost:5000",
        {
            auth: {
                token: userDetails.token,
            },
        }
    );

    socket.on("connect", () => {
        console.log(
            `Successfully connected to socket.io server. Connected socket.id: ${socket.id}`
        );
    });

    socket.emit("helloFomClient");


    socket.on("friend-invitations", (data) => {
        store.dispatch(setPendingInvitations(data) as any);
    })


    socket.on("friends-list", (data) => {
        store.dispatch(setFriends(data) as any);
    });

    socket.on("online-users", (data) => {
        store.dispatch(setOnlineUsers(data) as any);
    });


    socket.on("direct-chat-history", (data) => {
        // store.dispatch(setMessages(data.messages) as any);

        const { messages, participants } = data;
        console.log(participants);

        const receiverId = store.getState().chat.chosenChatDetails?.userId as string;
        const senderId = (store.getState().auth.userDetails as any)._id;

        // only update the store with messages if the participant is the one we are currently chatting with

        const isActive = participants.includes(receiverId) && participants.includes(senderId);

        if (isActive) {
            store.dispatch(setMessages(messages) as any);
        }

    })

    socket.on("notify-typing", (data) => {
        
        // const receiverId = store.getState().chat.chosenChatDetails
        //     ?.userId as string;
        
        // if (data.senderUserId === receiverId) {
        //     store.dispatch(setTyping(data.typing) as any);
        // }


        store.dispatch(setTyping({typing: data.typing, userId: data.senderUserId}) as any);
    });
};


const sendDirectMessage = (data: {message: string, receiverUserId: string}) => {
    socket.emit("direct-message", data)
}


const fetchDirectChatHistory = (data: {
    receiverUserId: string;
}) => {
    socket.emit("direct-chat-history", data);
};


const notifyTyping = (data: {
    receiverUserId: string;
    typing: boolean;
}) => {
    socket.emit("notify-typing", data);
};


export { connectWithSocketServer, sendDirectMessage, fetchDirectChatHistory, notifyTyping };
