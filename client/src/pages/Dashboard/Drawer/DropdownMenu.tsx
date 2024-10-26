import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { logoutUser } from '../../../actions/authActions';
import { useAppSelector } from '../../../store';
import { setAudioOnlyRoom } from '../../../actions/roomActions';
import RoomParticipantsDialog from './RoomParticipantsDialog';
import {
  askPermission,
  subscribeUserToPush,
} from '../../../notifications';

export default function DropDownMenu() {
  const [checked, setChecked] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const {
    auth: { userDetails },
    room: { audioOnly, roomDetails, isUserInRoom },
  } = useAppSelector((state) => state);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    dispatch(logoutUser());
  };

  const handleAudioOnlyChange = () => {
    dispatch(setAudioOnlyRoom(!audioOnly));
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleToggle = () => {
    askPermission().then((result) => {
      setChecked(result);

      if (result) {
        subscribeUserToPush();
      }
    });
  };

  useEffect(() => {
    if (Notification.permission === 'granted') {
      setChecked(true);
    }
  }, []);

  return (
    <div>
      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        style={{ color: 'white', marginLeft: '20px' }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleAudioOnlyChange}>
          {audioOnly
            ? 'Audio Only Enabled (for Rooms)'
            : 'Audio Only Disabled (for Rooms)'}
        </MenuItem>
        {isUserInRoom && roomDetails && (
          <MenuItem onClick={handleOpenDialog}>
            Active Room ({roomDetails.roomCreator.username})
          </MenuItem>
        )}

        <MenuItem>
          Notifications{' '}
          <Switch checked={checked} onChange={handleToggle} />
        </MenuItem>
        <MenuItem onClick={handleClick}>
          Logout ({userDetails?.username})
        </MenuItem>
      </Menu>

      {roomDetails && userDetails && (
        <RoomParticipantsDialog
          isDialogOpen={isDialogOpen}
          closeDialogHandler={handleCloseDialog}
          roomDetails={roomDetails}
          currentUserId={userDetails._id}
        />
      )}
    </div>
  );
}
