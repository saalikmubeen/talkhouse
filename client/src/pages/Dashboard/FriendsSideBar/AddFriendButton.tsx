import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddFriendDialog from "./AddFriendDialog";

const AddFriendButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenAddFriendDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseAddFriendDialog = () => {
    setIsDialogOpen(false);
  };

  return (
      <>
          <Button
              variant="contained"
              sx={{
                  bgcolor: "#5865F2",
                  color: "white",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: 500,
                  // margin: "20px 0px",
                  // marginTop: "10px",
                  // marginLeft: "10px",
                  width: "120px",
                  height: "30px",
                  background: "#3ba55d",
                  // zIndex: 100,
                  // position: "absolute",
                  // top: "0",
                  left: "0",
              }}
              onClick={handleOpenAddFriendDialog}
          >
              Add friend
          </Button>
          <AddFriendDialog
              isDialogOpen={isDialogOpen}
              closeDialogHandler={handleCloseAddFriendDialog}
          />
      </>
  );
};

export default AddFriendButton;
