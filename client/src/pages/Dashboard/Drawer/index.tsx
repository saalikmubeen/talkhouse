import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import VideoChat from "../../../components/VideoChat";
import IncomingCall from "../../../components/IncomingCall";
import Messenger from "../Messenger/Messenger";
import AddFriendButton from "../FriendsSideBar/AddFriendButton";
import FriendsList from "../FriendsSideBar/FriendsList/FriendsList";
import FriendsTitle from "../FriendsSideBar/FriendsTitle";
import PendingInvitationsList from "../FriendsSideBar/PendingInvitationsList/PendingInvitationsList";
import DropDownMenu from "./DropdownMenu";
import CreateRoomButton from "./CreateRoomButton";
import CreateGroupChatButton from "./CreateGroupChatButton";
import GroupChatList from "../FriendsSideBar/GroupChatList";
import ActiveRooms from "../ActiveRooms";

const drawerWidth = 240;

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    localStream: MediaStream | null;
    isUserInRoom: boolean;
}

export default function ResponsiveDrawer(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div
            style={{
                backgroundColor: "#2F3136",
                height: "100%",
                overflowY: "auto",
                padding: "5px 15px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "10px 0",
                }}
            >
                <AddFriendButton />
                <DropDownMenu />
            </div>
            <Divider />
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    margin: "10px 0",
                }}
            >
                <CreateGroupChatButton />
                <CreateRoomButton isUserInRoom={props.isUserInRoom} />
            </div>
            <FriendsTitle title="Active Rooms" />
            <ActiveRooms />
            <Divider />
            <FriendsTitle title="Private Messages" />
            <FriendsList />
            <Divider />
            <FriendsTitle title="Group Chats" />
            <GroupChatList />
            <Divider />
            <FriendsTitle title="Invitations" />
            <PendingInvitationsList />

            <Divider />
        </div>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            <IconButton
                style={{
                    position: "fixed",
                    top: 10,
                    left: 17,
                    zIndex: 1000,
                    color: "white",
                }}
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
            >
                <MenuIcon />
            </IconButton>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    background: "red",
                    // width: { sm: `calc(100vw - ${drawerWidth}px)` },
                    width: {
                        xs: `calc(100vw)`,
                        sm: `calc(100vw - ${drawerWidth}px)`,
                    },

                }}
            >
                <Messenger />
                {props.localStream && <VideoChat />}
                <IncomingCall />
            </Box>
        </Box>
    );
}
