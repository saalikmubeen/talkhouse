import React from 'react'
import { styled } from "@mui/system";
import Backdrop from '@mui/material/Backdrop';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";


const MainContainer = styled("div")({
    display: "block"
});

const IncomingCall = () => {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
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
          open={open}
          onClick={handleClose}
      >
          <Typography
              sx={{
                  color: "#b9bbbe",
                  marginBottom: "3px",
                  fontSize: "20px",
                  fontWeight: "bold",
              }}
          >
              Incoming Call from Andrew
          </Typography>

          <MainContainer>
              <IconButton style={{ color: "green" }}>
                  <PhoneInTalkIcon />
              </IconButton>

              <IconButton style={{ color: "red" }}>
                  <PhoneDisabledIcon />
              </IconButton>
          </MainContainer>
      </Backdrop>
  );
}

export default IncomingCall