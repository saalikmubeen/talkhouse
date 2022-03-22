import React from "react";
import { styled } from "@mui/system";
import { useAppSelector } from "../../../store";
import WelcomeMessage from "./WelcomeMessage";
import ChatDetails from "./ChatDetails";

const MainContainer = styled("div")({
  flexGrow: 1,
  backgroundColor: "#36393f",
  marginTop: "48px",
  display: "flex",
});

const Messenger = () => {
  const chosenChatDetails = useAppSelector((state) => state.chat.chosenChatDetails);

  return <MainContainer>
    {chosenChatDetails ?  <ChatDetails/> : <WelcomeMessage/>}
  </MainContainer>;
};

export default Messenger;
