import React from "react";
import {
  Box,
  Avatar,
  Typography,
  useTheme,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Fade,
} from "@mui/material";
import {
  AutoAwesome as AutoAwesomeIcon,
  Star as StarIcon,
  Help as HelpIcon,
  AdminPanelSettings as AdminIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";

interface UserConfig {
  name?: string;
  role?: "ADMIN" | "EMPLOYEE" | "USER" | "GUEST";
  avatar?: string;
}

interface RoleConfig {
  gradient: string;
  color: string;
  icon: React.ReactNode;
  label: string;
}

interface EnhancedCardProps {
  // User information
  user?: UserConfig | null;

  // Header content
  title?: string;
  subtitle?: string;

  // Visual customization
  headerIcon?: React.ReactNode;
  showWelcome?: boolean;
  showProgress?: boolean;
  progressValue?: number;
  progressMax?: number;

  // Help/actions
  helpTooltip?: string;
  onHelpClick?: () => void;

  // Card styling
  elevation?: number;
  showTopBorder?: boolean;
  showDecorative?: boolean;

  // Content
  children?: React.ReactNode;

  // Additional props
  sx?: any;
  className?: string;
  inputTitle?: string;
}

const MyCard: React.FC<EnhancedCardProps> = ({
  user,
  title,
  subtitle,
  headerIcon = <StarIcon />,
  showWelcome = true,
  showProgress = false,
  progressValue = 0,
  progressMax = 100,
  helpTooltip = "Need help?",
  onHelpClick,
  elevation = 0,
  showTopBorder = true,
  showDecorative = true,
  children,
  sx,
  className,
  inputTitle,
}) => {
  const theme = useTheme();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const userRoleConfig: Record<string, RoleConfig> = {
    ADMIN: {
      gradient: `linear-gradient(135deg, #ef4444, #dc2626)`,
      color: "#ef4444",
      icon: <AdminIcon />,
      label: "Admin",
    },
    EMPLOYEE: {
      gradient: `linear-gradient(135deg, #10b981, #059669)`,
      color: "#10b981",
      icon: <PersonIcon />,
      label: "Employee",
    },
    USER: {
      gradient: `linear-gradient(135deg, #3b82f6, #2563eb)`,
      color: "#3b82f6",
      icon: <PersonIcon />,
      label: "User",
    },
    GUEST: {
      gradient: `linear-gradient(135deg, #6b7280, #4b5563)`,
      color: "#6b7280",
      icon: <PersonIcon />,
      label: "Guest",
    },
  };

  const config = userRoleConfig[user?.role || "USER"];

  return (
    <Paper
      elevation={elevation}
      className={className}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 4,
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.03
        )} 0%, ${alpha(theme.palette.secondary.main, 0.03)} 100%)`,
        border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        position: "relative",
        overflow: "hidden",
        ...(showTopBorder && {
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          },
        }),
        ...sx,
      }}
    >
      {/* Decorative Elements */}
      {showDecorative && (
        <Box
          sx={{
            position: "absolute",
            top: -20,
            right: -20,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.primary.main,
              0.1
            )}, ${alpha(theme.palette.secondary.main, 0.1)})`,
            filter: "blur(20px)",
          }}
        />
      )}

      <Box display="flex" gap={3} alignItems="flex-start">
        {/* Avatar Section */}
        {user && (
          <Box position="relative">
            <Avatar
              src={user.avatar}
              sx={{
                width: 64,
                height: 64,
                background: config.gradient,
                fontSize: "1.2rem",
                fontWeight: 700,
                boxShadow: `0 8px 32px ${alpha(config.color, 0.3)}`,
                border: `3px solid ${alpha(
                  theme.palette.background.paper,
                  0.8
                )}`,
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: -2,
                  borderRadius: "50%",
                  background: `linear-gradient(45deg, ${config.color}, ${alpha(
                    config.color,
                    0.7
                  )})`,
                  zIndex: -1,
                },
              }}
            >
              {!user.avatar && getInitials(user.name || "U")}
            </Avatar>

            {/* Role Badge */}
            <Chip
              icon={config.icon}
              label={config.label}
              size="small"
              sx={{
                position: "absolute",
                bottom: -8,
                right: -8,
                backgroundColor: theme.palette.background.paper,
                color: config.color,
                border: `2px solid ${config.color}`,
                fontWeight: 600,
                fontSize: "0.7rem",
                height: 24,
                "& .MuiChip-icon": {
                  fontSize: "0.9rem",
                  color: config.color,
                },
                boxShadow: `0 4px 12px ${alpha(config.color, 0.2)}`,
              }}
            />
          </Box>
        )}

        {/* Content Section */}
        <Box flexGrow={1}>
          {/* Header */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Box>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Box
                  sx={{
                    fontSize: "1.2rem",
                    color: theme.palette.primary.main,
                    animation: "sparkle 2s ease-in-out infinite",
                    "@keyframes sparkle": {
                      "0%, 100%": { opacity: 1, transform: "scale(1)" },
                      "50%": { opacity: 0.7, transform: "scale(1.1)" },
                    },
                  }}
                >
                  {headerIcon}
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {title}
                </Typography>
              </Box>

              {/* Welcome Message or Subtitle */}
              {(showWelcome && user) || subtitle ? (
                <Typography
                  variant="body1"
                  sx={{
                    color: alpha(theme.palette.text.primary, 0.7),
                    fontWeight: 500,
                    fontSize: "1rem",
                  }}
                >
                  {showWelcome && user ? (
                    <>
                      Hello{" "}
                      <span
                        style={{
                          color: config.color,
                          fontWeight: 600,
                        }}
                      >
                        {user.name?.split(" ")[0]}
                      </span>
                      ! 👋 {subtitle || "Welcome back"}
                    </>
                  ) : (
                    subtitle
                  )}
                </Typography>
              ) : null}
            </Box>

            {/* Help Button */}
            {onHelpClick && (
              <Tooltip title={helpTooltip} arrow>
                <IconButton
                  size="small"
                  onClick={onHelpClick}
                  sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.2),
                      transform: "scale(1.05)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <HelpIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>

          {/* Progress Indicator */}
          {showProgress && (
            <Fade in={progressValue > 0}>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Box
                  sx={{
                    flex: 1,
                    height: 3,
                    backgroundColor: alpha(theme.palette.divider, 0.2),
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      width: `${Math.min(
                        (progressValue / progressMax) * 100,
                        100
                      )}%`,
                      height: "100%",
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      borderRadius: 2,
                      transition: "width 0.3s ease",
                    }}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {progressValue}/{progressMax}
                </Typography>
              </Box>
            </Fade>
          )}

          <Typography
            variant="subtitle2"
            fontWeight={600}
            sx={{
              mb: 1.5,
              color: theme.palette.text.primary,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <AutoAwesomeIcon
              sx={{ fontSize: "1rem", color: theme.palette.primary.main }}
            />
            {inputTitle}
          </Typography>
          {/* Card Content */}
          {children}
        </Box>
      </Box>
    </Paper>
  );
};

export default MyCard;
