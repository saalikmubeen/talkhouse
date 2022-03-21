import { io, Socket } from "socket.io-client";

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

interface ServerToClientEvents {
    "friend-invitations": (data: Array<PendingInvitation>) => void
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
        console.log(data)
    })
};

export { connectWithSocketServer };
