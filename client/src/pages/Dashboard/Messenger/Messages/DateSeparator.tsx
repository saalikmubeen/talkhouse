import React from "react";
import { styled } from "@mui/system";

const Separator = styled("div")({
    width: "95%",
    backgroundColor: "#b9bbbe",
    height: "1px",
    position: "relative",
    marginTop: "20px",
    marginBottom: "15px",
});

const DateLabel = styled("span")({
    backgroundColor: "#36393f",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#b9bbbe",
    padding: "0 5px",
    fontSize: "14px",
});

const DateSeparator = ({ date }: {date: string}) => {
    return (
        <Separator>
            <DateLabel>{new Date(date).toDateString()}</DateLabel>
        </Separator>
    );
};

export default DateSeparator;
