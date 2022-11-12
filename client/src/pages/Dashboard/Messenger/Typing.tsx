import React from "react";
import { styled } from "@mui/system";
import gif from "./dots.gif";
import { useAppSelector } from "../../../store";
import Avatar from "../../../components/Avatar";

const GifContainer = styled("div")({
    display: "flex",
    alignItems: "center",
    height: "82px",
    width: "82px",
    marginLeft: "10px",
});

const Typing = () => {
    const {chosenChatDetails, typing} = useAppSelector(state => state.chat);

    const isTyping = typing.find((item) => item.userId === chosenChatDetails?.userId)
    
    return (
        <GifContainer>
            {(isTyping && isTyping.typing) && (
                <>
                    <Avatar username={chosenChatDetails?.username!} />
                    <img
                        src={gif}
                        alt="dots"
                        style={{
                            height: "50%",
                            width: "50%",
                            marginLeft: "3px",
                        }}
                    />
                </>
            )}
        </GifContainer>
    );
};

export default Typing;
