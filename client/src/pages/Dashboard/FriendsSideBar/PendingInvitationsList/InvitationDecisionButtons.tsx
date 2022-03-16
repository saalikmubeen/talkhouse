import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";



const InvitationDecisionButtons = ({color} : {color? : string}) => {
  return (
    <Box sx={{ display: "flex" }}>
      <IconButton
        style={{ color: color ? color : "white" }}
      >
        <CheckIcon />
      </IconButton>
      <IconButton
        style={{ color: color? color : "white" }}
      >
        <ClearIcon />
      </IconButton>
    </Box>
  );
};

export default InvitationDecisionButtons;
