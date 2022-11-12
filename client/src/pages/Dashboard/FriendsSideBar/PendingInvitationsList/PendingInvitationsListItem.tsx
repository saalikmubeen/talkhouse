import React from "react";
import { Tooltip, Typography, Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import InvitationDecisionButtons from "./InvitationDecisionButtons";
import Avatar from "../../../../components/Avatar";
import PendingInvitationListItemSmall from "./PendingInvitationListItemSmall";


interface FriendsListItemProps {
  id: string;
  username: string;
  email: string;
}

const PendingInvitationsListItem = ({
  id,
  username,
  email,
}: FriendsListItemProps) => {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));


  return (
      <Tooltip title={email}>
          <div style={{ width: "100%" }}>
              <Box
                  sx={{
                      width: "100%",
                      height: "42px",
                      marginTop: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                  }}
              >
                  <Avatar username={username} />
                  <Typography
                      sx={{
                          marginLeft: "7px",
                          fontWeight: 700,
                          color: "#8e9297",
                          flexGrow: 1,
                      }}
                  >
                      {username}
                  </Typography>
                  <InvitationDecisionButtons invitationId={id} />
              </Box>
          </div>
      </Tooltip>
  );

//    if (matches ) {
//      return (
//          <Tooltip title={email}>
//              <div style={{ width: "100%" }}>
//                  <Box
//                      sx={{
//                          width: "100%",
//                          height: "42px",
//                          marginTop: "10px",
//                          display: "flex",
//                          alignItems: "center",
//                          justifyContent: "space-between",
//                      }}
//                  >
//                      <Avatar username={username} />
//                      <Typography
//                          sx={{
//                              marginLeft: "7px",
//                              fontWeight: 700,
//                              color: "#8e9297",
//                              flexGrow: 1,
//                          }}
//                          variant="subtitle1"
//                      >
//                          {username}
//                      </Typography>
//                      <InvitationDecisionButtons invitationId={id}/>
//                  </Box>
//              </div>
//          </Tooltip>
//      );
//    } else {
//        return <PendingInvitationListItemSmall username={username} invitationId={id}/>;
//    }
};

export default PendingInvitationsListItem;
