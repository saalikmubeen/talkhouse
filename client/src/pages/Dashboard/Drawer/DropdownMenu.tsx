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
  unsubscribeUserToPush,
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

  const handleToggle = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    // If the user has checked the notification
    if (event.target.checked) {
      // Ask for permission for notifications
      askPermission().then((result) => {
        // if the user has granted permission to notifications, subscribe the user to push notifications
        if (result) {
          subscribeUserToPush(() => {
            setChecked(true);
          });
        } else {
          // if the user has denied permission to notifications, ask the user to enable notifications from the browser settings
          alert(
            "Can't turn on the notifications. First enable notifications from the browser settings and then try again!"
          );
        }
      });
    } else {
      unsubscribeUserToPush(() => {
        setChecked(false);
      });
    }
  };

  useEffect(() => {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.pushManager
        .getSubscription()
        .then(function (existingSubscription) {
          // console.log('existingSubscription', existingSubscription);
          // if both the user has granted permission to notifications and the user has an existing subscription
          // set the checked state to true, else set it to false
          if (
            Notification.permission === 'granted' &&
            existingSubscription
          ) {
            setChecked(true);
          } else {
            setChecked(false);
          }
        });
    });
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
