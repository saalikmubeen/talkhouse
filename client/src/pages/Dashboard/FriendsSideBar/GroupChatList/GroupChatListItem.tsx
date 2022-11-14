import React from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import { setChosenGroupChatDetails } from "../../../../actions/chatActions";
import { useAppSelector } from "../../../../store";
import { GroupChatDetails } from "../../../../actions/types";

interface GroupChatListItemProps {
    chat: GroupChatDetails
}

const GroupChatListItem = ({ chat }: GroupChatListItemProps) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));
    const dispatch = useDispatch();

    const { chosenGroupChatDetails } = useAppSelector((state) => state.chat);

    const isChatActive = chosenGroupChatDetails?.groupId === chat.groupId;

    return (
        <Tooltip title={chat.groupName}>
            <Button
                onClick={() => {
                    dispatch(setChosenGroupChatDetails(chat));
                }}
                style={{
                    width: "100%",
                    height: "42px",
                    marginTop: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    textTransform: "none",
                    color: "black",
                    position: "relative",
                    backgroundColor: isChatActive ? "#36393f" : "transparent",
                }}
            >
                {/* {matches && <Avatar username={username} />} */}

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                    }}
                >
                    <Typography
                        style={{
                            marginLeft: "7px",
                            fontWeight: 700,
                            color: "#8e9297",
                        }}
                        variant="subtitle1"
                        align="left"
                    >
                        {chat.groupName}
                    </Typography>
                </div>
            </Button>
        </Tooltip>
    );
};

export default GroupChatListItem;
