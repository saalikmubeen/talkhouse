import React from "react";
import { styled } from "@mui/system";
import MainPageButton from "./MainPageButton";


const MainContainer = styled("div")({
    width: "72px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#202225",
    // eslint-disable-next-line no-useless-computed-key
    // "@media (max-width:568px)": {
    //     display: "none"
    // },
});

const SideBar = () => {
  return (
      <MainContainer sx={{ display: { xs: "none", sm: "flex" } }}>
          <MainPageButton />
      </MainContainer>
  );
};

export default SideBar;
