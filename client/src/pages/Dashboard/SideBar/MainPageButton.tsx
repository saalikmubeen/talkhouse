import React from "react";
import Button from "@mui/material/Button";
import GroupsIcon from "@mui/icons-material/Groups";

const MainPageButton = () => {
  return (
    <Button
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "16px",
        marginTop: 60,
        padding: 0,
        minWidth: 0,
        color: "white",
        backgroundColor: "#5865F2",
      }}
    >
      <GroupsIcon />
    </Button>
  );
};

export default MainPageButton;
