import React from 'react'
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "15px 20px",
    borderRadius: "30px",
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
          <MainContainer>
              <Typography
                  sx={{
                      color: "black",
                      marginBottom: "3px",
                      fontSize: "16px",
                      fontWeight: "bold",
                  }}
              >
                  Incoming {callRequest?.audioOnly ? "audio" : "video"} call from{" "}
                  {callRequest?.callerName}
              </Typography>

              <div>
                  {!callRequest?.audioOnly && (
                      <IconButton
                          color="success"
                          onClick={() => {
                              handleCall(true, false);
                          }}
                      >
                          <VideocamIcon />
                      </IconButton>
                  )}

                  {/* <IconButton
                      color="success"
                      onClick={() => {
                          handleCall(true, false);
                      }}
                  >
                      <VideocamIcon />
                  </IconButton> */}

                  <IconButton
                      color="success"
                      onClick={() => {
                          handleCall(true, true);
                      }}
                  >
                      <PhoneInTalkIcon />
                  </IconButton>

                  <IconButton
                      color="error"
                      onClick={() => {
                          handleCall(false, true);
                      }}
                  >
                      <PhoneDisabledIcon />
                  </IconButton>
              </div>
          </MainContainer>
      </Backdrop>
  );
}

export default IncomingCall