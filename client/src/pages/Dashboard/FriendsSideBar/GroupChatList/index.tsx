import React from "react";
import { styled } from "@mui/system";
import { useAppSelector } from "../../../../store";
import GroupChatListItem from "./GroupChatListItem";


const MainContainer = styled("div")({
    flexGrow: 1,
    width: "100%",
    margin: "20px 0",
});

const GroupChatList = () => {
    const { groupChatList } = useAppSelector((state) => state.friends);

    return (
        <MainContainer>
            {groupChatList.map((chat) => (
                <GroupChatListItem
                    chat={chat}
                    key={chat.groupId}
                />
            ))}
        </MainContainer>
    );
};

export default GroupChatList;
