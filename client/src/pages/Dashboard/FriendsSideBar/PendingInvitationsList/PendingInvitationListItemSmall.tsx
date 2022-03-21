import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Typography, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import InvitationDecisionButtons from "./InvitationDecisionButtons";

interface ComponentProps {
    username: string,
    invitationId: string,
}

export default function PendingInvitationListItemSmall({username, invitationId}: ComponentProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Box
                sx={{
                    width: "100%",
                    height: "42px",
                    marginTop: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
                onClick={(e) => setAnchorEl(e.currentTarget)}
            >
                <Typography
                    sx={{
                        marginLeft: "7px",
                        fontWeight: 700,
                        color: "#8e9297",
                        flexGrow: 1,
                    }}
                    variant="subtitle1"
                >
                    {username}
                </Typography>
            </Box>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem>
                    <InvitationDecisionButtons color="#8e9297" invitationId={invitationId}/>
                </MenuItem>
            </Menu>
        </div>
    );
}
