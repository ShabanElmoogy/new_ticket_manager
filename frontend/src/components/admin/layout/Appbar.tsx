import React from "react";
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { menuItems } from "./MenuItems";
import { useThemeStore } from "../../../stores";
import ThemeToggleButton from "../../dashboard/header/ThemeToggleButton";
import LanguageSwitcher from "../../common/LanguageSwitcher";

interface User {
  name: string;
}

interface AppBarProps {
  drawerWidth: number;
  handleDrawerToggle: () => void;
  handleBackToDashboard: () => void;
  selectedView: string;
  user?: User | null;
  isMobile?: boolean;
}

const Appbar: React.FC<AppBarProps> = ({
  drawerWidth,
  handleDrawerToggle,
  handleBackToDashboard,
  selectedView,
  isMobile,
}) => {
  const { mode, toggleTheme } = useThemeStore();
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={handleBackToDashboard}
          sx={{ mr: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {menuItems.find((item) => item.id === selectedView)?.label ||
            "Admin Panel"}
        </Typography>
        <Stack direction="row" spacing={2}>
          {/* Desktop Theme Toggle */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ThemeToggleButton mode={mode} onToggle={toggleTheme} />
            </Box>
          )}
          {/* Language Switcher - Desktop only, positioned after theme toggle */}
          {!isMobile && <LanguageSwitcher variant="full" size="small" />}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
