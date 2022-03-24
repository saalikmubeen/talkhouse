import React from "react";
import { styled } from "@mui/system";
import DropdownMenu from "./DropdownMenu";

const MainContainer = styled("div")({
  position: "absolute",
  right: "0",
  top: "0",
  height: "48px",
  borderBottom: "1px solid black",
  backgroundColor: "#36393f",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: "0 15px",
});

// sx={{ width: { xs: "100%", sm: "calc(100% - 326px)", } }}

const AppBar = () => {
  return (
      <MainContainer >
        <DropdownMenu />
      </MainContainer>
  );
};

export default AppBar;
