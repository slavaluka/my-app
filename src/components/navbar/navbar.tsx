import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { signOut } from "next-auth/react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
// const navItems = ["Profile"];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" color="#fff" sx={{ my: 2 }}>
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
        <Toolbar>
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

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            <Button
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={() => signOut()}
              sx={{ ml: 1 }}
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
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#222",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
