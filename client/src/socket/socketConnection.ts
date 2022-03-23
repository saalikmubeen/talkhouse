import { io, Socket } from "socket.io-client";
import { setFriends, setOnlineUsers, setPendingInvitations } from "../actions/friendActions";
import {setMessages} from "../actions/chatActions";
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
        store.dispatch(setMessages(data.messages) as any);
    })
};


const sendDirectMessage = (data: {message: string, receiverUserId: string}) => {
    socket.emit("direct-message", data)
}


const fetchDirectChatHistory = (data: {
    receiverUserId: string;
}) => {
    socket.emit("direct-chat-history", data);
};

export { connectWithSocketServer, sendDirectMessage, fetchDirectChatHistory };
