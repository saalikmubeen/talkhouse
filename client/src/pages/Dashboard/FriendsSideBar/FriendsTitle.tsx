import React from "react";
import { Typography } from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const FriendsTitle = ({ title }: {title: string}) => {
  return (
      <Typography
          sx={{
              textTransform: "uppercase",
              color: "#8e9297",
              fontSize: "14px",
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
          }}
      >
          {title === "Private Messages" ?  <MailIcon /> : <InboxIcon />}
           {title}
      </Typography>
  );
};

export default FriendsTitle;
