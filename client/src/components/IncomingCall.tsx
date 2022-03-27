import React from 'react'
import {useDispatch} from "react-redux";
import { styled } from "@mui/system";
import Backdrop from '@mui/material/Backdrop';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import VideocamIcon from "@mui/icons-material/Videocam";
import { useAppSelector } from '../store';
import { callResponse } from '../socket/socketConnection';


const MainContainer = styled("div")({
    display: "block"
});

const IncomingCall = () => {
    const callRequest = useAppSelector(state => state.videoChat.callRequest);


    const handleCall = (accepted: boolean, audioOnly: boolean) => {

        callResponse({
            receiverUserId: callRequest!.callerUserId,
            accepted,
            audioOnly
        });
       
    };
   


  return (
      <Backdrop
          sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
          }}
          open={!!callRequest?.callerUserId}
      >
          <Typography
              sx={{
                  color: "#b9bbbe",
                  marginBottom: "3px",
                  fontSize: "20px",
                  fontWeight: "bold",
              }}
          >
              Incoming Call from {callRequest?.callerName}
          </Typography>

          <MainContainer>
              <IconButton
                  style={{ color: "green" }}
                  onClick={() => {
                      handleCall(true, false);
                  }}
              >
                  <VideocamIcon />
              </IconButton>

              <IconButton
                  style={{ color: "green" }}
                  onClick={() => {
                      handleCall(true, true);
                  }}
              >
                  <PhoneInTalkIcon />
              </IconButton>

              <IconButton
                  style={{ color: "red" }}
                  onClick={() => {
                      handleCall(false, true);
                  }}
              >
                  <PhoneDisabledIcon />
              </IconButton>
          </MainContainer>
      </Backdrop>
  );
}

export default IncomingCall