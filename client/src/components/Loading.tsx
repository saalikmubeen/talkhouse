import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "@emotion/styled";

const Wrapper = styled("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    backgroundColor: "#2F3136",
});

export default function Loading() {
    return (
        <Wrapper>
            <CircularProgress />
        </Wrapper>
    );
}