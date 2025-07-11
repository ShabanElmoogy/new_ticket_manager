import React from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Badge,
  Chip,
  useTheme,
  alpha,
  Breadcrumbs,
  Link,
  Divider,
} from "@mui/material";
import {
  Notifications,
  Settings,
  Dashboard,
  Person,
  Search,
  Menu,
  NavigateNext,
  WbSunny,
  DarkMode,
} from "@mui/icons-material";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  userName?: string;
  userAvatar?: string;
  showBreadcrumbs?: boolean;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  notificationCount?: number;
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
  onMenuClick?: () => void;
  showUserMenu?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title = "Admin Dashboard",
  subtitle = "Welcome back! Here's what's happening today.",
  userName = "John Doe",
  userAvatar,
  showBreadcrumbs = true,
  notificationCount = 3,
  isDarkMode = false,
  onThemeToggle,
  onMenuClick,
  showUserMenu = true,
}) => {
  const theme = useTheme();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${
          theme.palette.background.paper
        } 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
        borderBottom: `1px solid ${theme.palette.divider}`,
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        zIndex: theme.zIndex.appBar,
        mb: 3,
      }}
    >
      {/* Main Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: { xs: 2, sm: 3, md: 4 },
          pb: showBreadcrumbs ? 2 : undefined,
        }}
      >
        {/* Left Section - Title and Greeting */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
          {/* Mobile Menu Button */}
          <IconButton
            onClick={onMenuClick}
            sx={{
              display: { xs: "flex", md: "none" },
              color: theme.palette.text.primary,
            }}
          >
            <Menu />
          </IconButton>

          <Box>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 2, mb: 0.5 }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1.2,
                }}
              >
                {title}
              </Typography>

              <Chip
                label="Live"
                size="small"
                sx={{
                  background: "linear-gradient(45deg, #4CAF50, #45a049)",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  height: "20px",
                  animation: "pulse 2s infinite",
                  "@keyframes pulse": {
                    "0%": { opacity: 1 },
                    "50%": { opacity: 0.7 },
                    "100%": { opacity: 1 },
                  },
                }}
              />
            </Box>

            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: { xs: "0.875rem", sm: "1rem" },
                fontWeight: 500,
                display: { xs: "none", sm: "block" },
              }}
            >
              {getGreeting()}, {userName.split(" ")[0]}! {subtitle}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
