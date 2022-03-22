import { io, Socket } from "socket.io-client";
import { setFriends, setPendingInvitations } from "../actions/friendActions";
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
    isOnline?: boolean;
}

interface ServerToClientEvents {
    "friend-invitations": (data: Array<PendingInvitation>) => void;
    "friends-list": (data: Array<Friend>) => void;
}

interface ClientToServerEvents {
    helloFomClient: () => void;
}

const connectWithSocketServer = (userDetails: UserDetails) => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
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
};

export { connectWithSocketServer };
