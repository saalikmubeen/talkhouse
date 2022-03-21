export type LoginArgs = {
    email: string;
    password: string;
};

export type RegisterArgs = {
    email: string;
    password: string;
    username: string;
};

export type inviteFriendArgs = {
    email: string;
}


export type AuthResponse = {
    userDetails: {
        email: string;
        token: string;
        username: string;
    };
};