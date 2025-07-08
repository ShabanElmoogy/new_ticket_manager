import React from "react";
import {
  Box,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
  Avatar,
  Chip,
  Stack,
  Divider,
  alpha,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Description as DescriptionIcon,
  Verified as VerifiedIcon,
} from "@mui/icons-material";
import type { KanbanBoard } from "../../../types/kanban";

interface BoardHeaderProps {
  currentBoard: KanbanBoard;
  children?: React.ReactNode;
}

const BoardHeader: React.FC<BoardHeaderProps> = ({
  currentBoard,
  children,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isDark = theme.palette.mode === "dark";

  // Generate board color based on name or type
  const getBoardColor = () => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.info.main,
    ];

    const hash = currentBoard.name.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);

    return colors[Math.abs(hash) % colors.length];
  };

  const boardColor = getBoardColor();

  // Generate board icon based on type or name
  const getBoardIcon = () => {
    const iconProps = {
      sx: {
        fontSize: { xs: "1.5rem", sm: "2rem" },
        color: theme.palette.getContrastText(boardColor),
      },
    };

    if (currentBoard.type === "TASKS") {
      return <VerifiedIcon {...iconProps} />;
    }
    return <DashboardIcon {...iconProps} />;
  };

  // Theme-aware styling helpers
  const getHeaderBackground = () => {
    const baseIntensity = isDark ? 0.12 : 0.08;
    const fadeIntensity = isDark ? 0.06 : 0.03;

    return `linear-gradient(135deg, ${alpha(
      boardColor,
      baseIntensity
    )} 0%, ${alpha(boardColor, fadeIntensity)} 100%)`;
  };

  const getAvatarBackground = () => {
    return isDark
      ? `linear-gradient(135deg, ${boardColor}, ${alpha(boardColor, 0.7)})`
      : `linear-gradient(135deg, ${boardColor}, ${alpha(boardColor, 0.8)})`;
  };

  const getAvatarShadow = () => {
    const shadowIntensity = isDark ? 0.4 : 0.3;
    const shadowSpread = isDark ? "0 6px 16px" : "0 4px 12px";
    return `${shadowSpread} ${alpha(boardColor, shadowIntensity)}`;
  };

  const getTopBorderBackground = () => {
    return isDark
      ? `linear-gradient(90deg, ${boardColor}, ${alpha(boardColor, 0.8)})`
      : `linear-gradient(90deg, ${boardColor}, ${alpha(boardColor, 0.7)})`;
  };

  const getPaperBackground = () => {
    return isDark
      ? alpha(theme.palette.background.paper, 0.8)
      : theme.palette.background.paper;
  };

  const getChipStyles = (variant: "outlined" | "filled" = "outlined") => {
    if (variant === "filled") {
      return {
        backgroundColor: alpha(boardColor, isDark ? 0.2 : 0.15),
        color: boardColor,
        border: `1px solid ${alpha(boardColor, isDark ? 0.3 : 0.2)}`,
      };
    }

    return {
      borderColor: alpha(boardColor, isDark ? 0.6 : 0.5),
      color: boardColor,
      backgroundColor: alpha(boardColor, isDark ? 0.1 : 0.05),
    };
  };

  const getSecondaryChipStyles = () => {
    return {
      borderColor: alpha(theme.palette.text.secondary, isDark ? 0.4 : 0.3),
      color: theme.palette.text.secondary,
      backgroundColor: alpha(theme.palette.text.secondary, isDark ? 0.1 : 0.05),
      "&:hover": {
        backgroundColor: alpha(
          theme.palette.text.secondary,
          isDark ? 0.15 : 0.08
        ),
      },
    };
  };

  return (
    <Paper
      elevation={isDark ? 8 : isMobile ? 1 : 2}
      sx={{
        p: 0,
        mb: 2,
        background: getHeaderBackground(),
        backgroundColor: getPaperBackground(),
        border: `1px solid ${alpha(boardColor, isDark ? 0.2 : 0.1)}`,
        borderRadius: { xs: 2, sm: 3 },
        overflow: "hidden",
        position: "relative",
        backdropFilter: isDark ? "blur(10px)" : "none",
        boxShadow: isDark
          ? `0 8px 32px ${alpha(theme.palette.common.black, 0.3)}`
          : undefined,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: { xs: 3, sm: 4 },
          background: getTopBorderBackground(),
          boxShadow: isDark
            ? `0 2px 8px ${alpha(boardColor, 0.3)}`
            : `0 1px 4px ${alpha(boardColor, 0.2)}`,
        },
      }}
    >
      {/* Main Header Content */}
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Board Title Section */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 3 }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          mb={{ xs: 2, sm: 3 }}
        >
          {/* Board Icon and Title */}
          <Stack
            direction="row"
            spacing={{ xs: 1.5, sm: 2 }}
            alignItems="center"
            sx={{ flex: 1, minWidth: 0 }}
          >
            {/* Board Avatar/Icon */}
            <Avatar
              sx={{
                width: { xs: 40, sm: 48, md: 56 },
                height: { xs: 40, sm: 48, md: 56 },
                background: getAvatarBackground(),
                boxShadow: getAvatarShadow(),
                border: isDark
                  ? `2px solid ${alpha(boardColor, 0.3)}`
                  : `1px solid ${alpha(boardColor, 0.2)}`,
              }}
            >
              {getBoardIcon()}
            </Avatar>

            {/* Title and Description */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                <Typography
                  variant="h5"
                  component="h1"
                  sx={{
                    fontSize: { xs: "1.1rem", sm: "1.4rem", md: "1.8rem" },
                    fontWeight: { xs: 700, sm: 600 },
                    lineHeight: 1.2,
                    color: theme.palette.text.primary,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: { xs: "nowrap", sm: "normal" },
                  }}
                >
                  {currentBoard.name}
                </Typography>

                {/* Board Type Chip */}
                <Chip
                  label={currentBoard.type === "TASKS" ? "Tasks" : "Tickets"}
                  size="small"
                  variant="outlined"
                  sx={{
                    height: { xs: 20, sm: 24 },
                    fontSize: { xs: "0.65rem", sm: "0.75rem" },
                    fontWeight: 600,
                    display: { xs: "none", sm: "flex" },
                    ...getChipStyles("outlined"),
                  }}
                />
              </Stack>

              {/* Description */}
              {currentBoard.description && (
                <Stack direction="row" spacing={1} alignItems="flex-start">
                  <DescriptionIcon
                    sx={{
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                      color: theme.palette.text.secondary,
                      mt: 0.1,
                      display: { xs: "none", sm: "block" },
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
                      lineHeight: { xs: 1.3, sm: 1.4 },
                      color: theme.palette.text.secondary,
                      display: "-webkit-box",
                      WebkitLineClamp: { xs: 2, sm: 2, md: 1 },
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      flex: 1,
                    }}
                  >
                    {currentBoard.description}
                  </Typography>
                </Stack>
              )}

              {/* Mobile Type Chip - Keep below description */}
              <Box sx={{ display: { xs: "block", sm: "none" }, mt: 1 }}>
                <Chip
                  label={
                    currentBoard.type === "TASKS"
                      ? "Tasks Board"
                      : "Tickets Board"
                  }
                  size="small"
                  variant="filled"
                  sx={{
                    height: 22,
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    ...getChipStyles("filled"),
                  }}
                />
              </Box>
            </Box>
          </Stack>

          {/* Quick Stats - Desktop Only */}
          {!isMobile && currentBoard.tickets && (
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Stack direction="row" spacing={1}>
                <Chip
                  label={`${currentBoard.tickets.length} Total`}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: "0.75rem",
                    height: 28,
                    fontWeight: 500,
                    ...getSecondaryChipStyles(),
                  }}
                />
                <Chip
                  label={`${currentBoard.columns?.length || 0} Columns`}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: "0.75rem",
                    height: 28,
                    fontWeight: 500,
                    ...getSecondaryChipStyles(),
                  }}
                />
              </Stack>
            </Box>
          )}
        </Stack>

        {/* Divider before children */}
        {children && (
          <Divider
            sx={{
              mb: { xs: 2, sm: 3 },
              borderColor: alpha(
                isDark ? theme.palette.divider : boardColor,
                isDark ? 0.2 : 0.1
              ),
              opacity: isDark ? 0.6 : 1,
            }}
          />
        )}

        {/* Children components (controls, filters, stats) */}
        {children}
      </Box>
    </Paper>
  );
};

export default BoardHeader;
