import React, { useState } from "react";
import { styled } from "@mui/system";
import { useAppSelector } from "../../../store";

const MainContainer = styled("div")({
    height: "60px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const Input = styled("input")({
    backgroundColor: "#2f3136",
    width: "98%",
    height: "44px",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    padding: "0 10px",
});

const NewMessageInput = () => {
    const [message, setMessage] = useState("");

     const username = useAppSelector(
         (state) => state.chat.chosenChatDetails?.username
     );



    return (
        <MainContainer>
            <Input
                placeholder={`Write message to ${username}`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={() => {}}
            />
        </MainContainer>
    );
};

export default NewMessageInput;
