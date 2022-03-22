import React from "react";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import Avatar from "../../../../components/Avatar";
import { useAppSelector } from "../../../../store";

const MainContainer = styled("div")({
    width: "98%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10px",
});

const MessagesHeader = () => {
    const username = useAppSelector(
        (state) => state.chat.chosenChatDetails?.username
    );
    return (
        <MainContainer>

            <Avatar large username={username!} />
            <Typography
                variant="h4"
                sx={{
                    fontWeight: "bold",
                    color: "white",
                    marginLeft: "5px",
                    marginRight: "5px",
                }}
            >
                {username}
            </Typography>
            <Typography
                sx={{
                    color: "#b9bbbe",
                    marginLeft: "5px",
                    marginRight: "5px",
                }}
            >
                This is the beginning of your conversation with {username}
            </Typography>
        </MainContainer>
    );
};

export default MessagesHeader;
