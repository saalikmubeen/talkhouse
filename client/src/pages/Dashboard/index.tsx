import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import SideBar from "./SideBar/SideBar";
import FriendsSideBar from "./FriendsSideBar/FriendsSideBar";
import Messenger from "./Messenger/Messenger";
import AppBar from "./AppBar/AppBar";
import { connectWithSocketServer, UserDetails } from "../../socket/socketConnection";
import { useAppSelector } from "../../store";
import VideoChat from "../../components/VideoChat";
import IncomingCall from "../../components/IncomingCall"

const Wrapper = styled("div")({
    width: "100%",
    height: "100vh",
    display: "flex",
});

const Dashboard = () => {
    const {auth: {userDetails}, videoChat: {localStream}} = useAppSelector((state) => state);
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = "token" in userDetails;

        if (!isLoggedIn) {
            navigate("/login");
        } else {
            // connect to socket server
            connectWithSocketServer(userDetails as UserDetails);
        }

    }, [userDetails, navigate]);


    return (
        <Wrapper>
            <SideBar />
            <FriendsSideBar />
            <Messenger />
            <AppBar />
            {localStream && <VideoChat />}
            <IncomingCall/>
        </Wrapper>
    );
};

export default Dashboard;
