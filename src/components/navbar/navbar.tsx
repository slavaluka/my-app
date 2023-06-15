import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { AccountCircle } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";

import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

function PopUpButton({ userData }: { userData: any }) {
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
            <DialogTitle>User Profile</DialogTitle>
            <Avatar
              src={userData.image}
              sx={{
                width: 100,
                height: 100,
                mb: 2,
              }}
            />
            <Typography>Name: {userData.name}</Typography>
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
}

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ⚡ Github Wiki
      </Typography>
      <Divider />

      <Button
        variant="outlined"
        startIcon={<LogoutIcon />}
        onClick={() => signOut()}
        sx={{ mt: 3 }}
      >
        Sign out
      </Button>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar sx={{ justifyContent: { xs: "space-between" } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            ⚡ Github Wiki
          </Typography>

          <Box sx={{ display: { sm: "block" } }}>
            <PopUpButton userData={session?.user} />

            <Button
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={() => signOut()}
              sx={{ ml: 1, display: { xs: "none" } }}
            >
              Sign out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
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
      </Box>
    </Box>
  );
}
