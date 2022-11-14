import React from "react";
import { styled } from "@mui/system";
import { useAppSelector } from "../../../store";
import WelcomeMessage from "./WelcomeMessage";
import ChatDetails from "./ChatDetails";

const MainContainer = styled("div")({
  flexGrow: 1,
  backgroundColor: "#36393f",
  display: "flex",
});

const Messenger = () => {
  const { chosenChatDetails, chosenGroupChatDetails } = useAppSelector((state) => state.chat);

  return <MainContainer>
    {chosenChatDetails?.userId || chosenGroupChatDetails?.groupId ?  <ChatDetails/> : <WelcomeMessage/>}
  </MainContainer>;
};

export default Messenger;
