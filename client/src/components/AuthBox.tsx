import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const BoxWrapper = styled("div")({
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#5865F2",
});

const AuthBox: React.FC = (props) => {
    return (
        <BoxWrapper>
            <Box
                sx={{
                    maxWidth: 700,
                    width: "85%",
                    bgcolor: "#36393f",
                    borderRadius: "5px",
                    boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
                    display: "flex",
                    flexDirection: "column",
                    padding: "25px",
                }}
            >
                {props.children}
            </Box>
        </BoxWrapper>
    );
};

export default AuthBox;
