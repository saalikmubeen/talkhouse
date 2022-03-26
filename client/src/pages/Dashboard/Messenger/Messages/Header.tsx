import React, { useRef} from "react";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import Avatar from "../../../../components/Avatar";
import { useAppSelector } from "../../../../store";

const MainContainer = styled("div")({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    // marginTop: "10px",
    position: "sticky",
    top: "0px",
    right: "0px",
    padding: "13px",
    borderRadius: "0px 0px 40px 40px",
    zIndex: "20",
    transition: "all 0.3s ease-in",
});


const NameWrapper = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10px",
});


const CallButtons = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
})

const MessagesHeader: React.FC<{
    scrollPosition: number;
}> = ({scrollPosition}) => {

    const navRef = useRef<HTMLDivElement>(null);
    let navPosition = navRef.current?.getBoundingClientRect().top;


    const username = useAppSelector(
        (state) => state.chat.chosenChatDetails?.username
    );

    const navActiveStyle = scrollPosition >= navPosition! ? { backgroundColor: "#202225" } : { backgroundColor: "transparent" }; 


    return (
        <MainContainer style={navActiveStyle} ref={navRef}>
            <NameWrapper>
                <Avatar username={username!} />
                <Typography
                    variant="h4"
                    sx={{
                        color: "white",
                        fontSize: "20px",
                        marginLeft: "10px",
                        marginRight: "5px",
                    }}
                >
                    {username}
                </Typography>
            </NameWrapper>

            <CallButtons>
                <IconButton style={{ color: "white" }}>
                    <AddIcCallIcon />
                </IconButton>

                <IconButton style={{ color: "white" }}>
                    <VideoCallIcon />
                </IconButton>
            </CallButtons>

        </MainContainer>
    );
};

export default MessagesHeader;
