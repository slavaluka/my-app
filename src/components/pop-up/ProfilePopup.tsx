import React, { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { AccountCircle } from "@mui/icons-material";
import { signOut } from "next-auth/react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Avatar,
  IconButton,
} from "@mui/material";

interface ProfilePopupProps {
  userData: any;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({ userData }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        size="large"
        aria-haspopup="true"
        color="inherit"
        onClick={handleClickOpen}
      >
        <AccountCircle />
      </IconButton>

      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DialogTitle>Your Profile</DialogTitle>
            <Avatar
              src={userData?.image}
              sx={{
                width: 100,
                height: 100,
                mb: 2,
              }}
            />
            <Typography>
              Name: {userData.name ? userData.name : "Alien"}
            </Typography>
            <Typography>Email: {userData.email}</Typography>
            <Button
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={() => signOut()}
              sx={{ mt: 2 }}
            >
              Sign out
            </Button>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfilePopup;
