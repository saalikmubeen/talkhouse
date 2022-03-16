import React from "react";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import OnlineIndicator from "./OnlineIndicator";
import Avatar from "../../../../components/Avatar";

interface FriendsListItemProps {
    id: string;
    username: string;
    isOnline: boolean;
}

const FriendsListItem = ({ id, username, isOnline }: FriendsListItemProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
      <Button
          style={{
              width: "100%",
              height: "42px",
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              textTransform: "none",
              color: "black",
              position: "relative",
          }}
      >
          {matches && <Avatar username={username} />}
          <Typography
              style={{
                  marginLeft: "7px",
                  fontWeight: 700,
                  color: "#8e9297",
              }}
              variant="subtitle1"
              align="left"
          >
              {username}
          </Typography>
          {isOnline && <OnlineIndicator />}
      </Button>
  );
};

export default FriendsListItem;
