// ============================================================================
// PROGRESS HEADER COMPONENT
// ============================================================================

import React from "react";
import {
  DialogTitle,
  Box,
  Typography,
  LinearProgress,
  Avatar,
  useTheme,
  alpha,
} from "@mui/material";
import {
  AutoAwesome as AutoAwesomeIcon,
  Speed as SpeedIcon,
} from "@mui/icons-material";

interface ProgressHeaderProps {
  completionProgress: number;
}

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({
  completionProgress,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <DialogTitle
      sx={{
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          isDark ? 0.15 : 0.08
        )} 0%, ${alpha(
          theme.palette.secondary.main,
          isDark ? 0.1 : 0.05
        )} 100%)`,
        borderBottom: `1px solid ${alpha(
          theme.palette.divider,
          isDark ? 0.2 : 0.12
        )}`,
        color: theme.palette.text.primary,
        p: 4,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
        },
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: "1.8rem", color: "white" }} />
          </Avatar>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 0.5,
              }}
            >
              Create New Board
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 500,
              }}
            >
              Design your perfect workflow in minutes
            </Typography>
          </Box>
        </Box>

        {/* Progress Indicator */}
        <Box sx={{ minWidth: 200 }}>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <SpeedIcon
              sx={{ color: theme.palette.primary.main, fontSize: "1.2rem" }}
            />
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}
            >
              {completionProgress}% Complete
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={completionProgress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              },
            }}
          />
        </Box>
      </Box>
    </DialogTitle>
  );
};
