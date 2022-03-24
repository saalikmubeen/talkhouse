import React from "react";
import { styled } from "@mui/system";

const AvatarPreview = styled("div")({
    height: "42px",
    width: "42px",
    backgroundColor: "#5865f2",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "700",
    marginLeft: "5px",
    color: "white",
});

const Avatar = ({ username, large }: {
    username: string,
    large?: boolean,
}) => {
    return (
        <AvatarPreview style={large ? { height: "80px", width: "80px" } : {}}>
            {username?.substring(0, 2)}
        </AvatarPreview>
    );
};

export default Avatar;
