// components/header/HeaderLogo.tsx
import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ConfirmationNumber as TicketIcon } from "@mui/icons-material";

interface HeaderLogoProps {
  mode: "light" | "dark";
  onNavigateHome?: () => void; // Optional callback for navigation
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({ mode, onNavigateHome }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogoClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    console.log("Logo clicked - navigating to dashboard");

    if (onNavigateHome) {
      onNavigateHome();
    } else {
      // Fallback if no handler provided
      console.log("No navigation handler provided");
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      onClick={handleLogoClick}
      role="button"
      tabIndex={0}
      aria-label="Go to dashboard"
      sx={{
        flexGrow: 1,
        cursor: "pointer",
        transition: "all 0.3s ease",
        outline: "none",
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleLogoClick(event as any);
        }
      }}
    >
      <TicketIcon
        sx={{
          mr: { xs: 1, sm: 2 },
          fontSize: { xs: 24, sm: 26, md: 28 },
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "rotate(5deg)",
          },
        }}
      />

      {/* Desktop Title */}
      <Typography
        variant={isSmallMobile ? "h6" : isMobile ? "h5" : "h5"}
        component="div"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
          background:
            mode === "light"
              ? "linear-gradient(45deg, #ffffff 30%, #f0f9ff 90%)"
              : "linear-gradient(45deg, #f1f5f9 30%, #e2e8f0 90%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: { xs: "none", sm: "block" },
          transition: "all 0.3s ease",
          userSelect: "none",
          "&:hover": {
            background:
              mode === "light"
                ? "linear-gradient(45deg, #ffffff 20%, #dbeafe 80%)"
                : "linear-gradient(45deg, #e2e8f0 20%, #cbd5e1 80%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          },
        }}
      >
        Ticket Management
      </Typography>

      {/* Mobile Title */}
      <Typography
        variant="h6"
        component="div"
        sx={{
          fontWeight: 700,
          fontSize: "1rem",
          background:
            mode === "light"
              ? "linear-gradient(45deg, #ffffff 30%, #f0f9ff 90%)"
              : "linear-gradient(45deg, #f1f5f9 30%, #e2e8f0 90%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: { xs: "block", sm: "none" },
          transition: "all 0.3s ease",
          userSelect: "none",
          "&:hover": {
            background:
              mode === "light"
                ? "linear-gradient(45deg, #ffffff 20%, #dbeafe 80%)"
                : "linear-gradient(45deg, #e2e8f0 20%, #cbd5e1 80%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          },
        }}
      >
        Tickets
      </Typography>
    </Box>
  );
};

export default HeaderLogo;
