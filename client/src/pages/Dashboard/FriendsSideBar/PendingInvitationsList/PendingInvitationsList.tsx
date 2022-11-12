import React from "react";
import { styled } from "@mui/system";
import PendingInvitationsListItem from "./PendingInvitationsListItem";
import { useAppSelector } from "../../../../store";

const DUMMY_INVITATIONS = [
    {
        _id: "1",
        senderId: {
            username: "Mark",
            email: "dummy@ad.com",
        },
    },
    {
        _id: "2",
        senderId: {
            username: "John",
            email: "John@ad.com",
        },
    },
    {
        _id: "3",
        senderId: {
            username: "Stephen",
            email: "stephen@ad.com",
        },
    },
    {
        _id: "4",
        senderId: {
            username: "Colt",
            email: "colt@ad.com",
        },
    },
    {
        _id: "5",
        senderId: {
            username: "Andrew",
            email: "andrew@ad.com",
        },
    },
];

const MainContainer = styled("div")({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "10px 0",
});

const PendingInvitationsList = () => {
  const { pendingInvitations } = useAppSelector((state) => state.friends);

  return (
    <MainContainer>
      {pendingInvitations.map((invitation) => (
        <PendingInvitationsListItem
          key={invitation._id}
          id={invitation._id}
          username={invitation.senderId.username}
          email={invitation.senderId.email}
        />
      ))}
    </MainContainer>
  );
};

export default PendingInvitationsList;
