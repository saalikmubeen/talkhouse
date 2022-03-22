import React from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {Tooltip} from "@mui/material"
import Typography from "@mui/material/Typography";
import OnlineIndicator from "./OnlineIndicator";
import Avatar from "../../../../components/Avatar";
import { setChosenChatDetails } from "../../../../actions/chatActions";


interface FriendsListItemProps {
    id: string;
    username: string;
    email: string;
    isOnline: boolean;
}

const FriendsListItem = ({ id, username, isOnline, email }: FriendsListItemProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const dispatch = useDispatch();

  return (
      <Tooltip title={email}>
          <Button
          onClick={() => {
              dispatch(setChosenChatDetails({userId: id, username}));
          }}
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
      </Tooltip>
  );
};

export default FriendsListItem;
