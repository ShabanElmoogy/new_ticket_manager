import React from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  alpha,
  Typography,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Archive as ArchiveIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";

interface BoardMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onRefresh: () => void;
  onSettings: () => void;
  onAnalytics: () => void;
  onEdit?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
  onExport?: () => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

const BoardMenu: React.FC<BoardMenuProps> = ({
  anchorEl,
  open,
  onClose,
  onRefresh,
  onSettings,
  onAnalytics,
  onEdit,
  onArchive,
  onDelete,
  onShare,
  onExport,
  canEdit = true,
  canDelete = false,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleMenuItemClick = (action: () => void) => {
    action();
    onClose();
  };

  // Theme-aware styling helpers
  const getMenuItemStyles = (
    variant: "default" | "primary" | "danger" = "default"
  ) => {
    const baseStyles = {
      py: 1.2,
      px: 2,
      borderRadius: 1,
      mx: 0.5,
      my: 0.25,
      minHeight: 44,
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    };

    switch (variant) {
      case "primary":
        return {
          ...baseStyles,
          "&:hover": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              isDark ? 0.2 : 0.08
            ),
            color: theme.palette.primary.main,
            transform: "translateX(4px)",
            "& .MuiListItemIcon-root": {
              color: theme.palette.primary.main,
            },
          },
        };

      case "danger":
        return {
          ...baseStyles,
          color: theme.palette.error.main,
          "&:hover": {
            backgroundColor: alpha(
              theme.palette.error.main,
              isDark ? 0.2 : 0.08
            ),
            color: theme.palette.error.main,
            transform: "translateX(4px)",
            "& .MuiListItemIcon-root": {
              color: theme.palette.error.main,
            },
          },
          "& .MuiListItemIcon-root": {
            color: theme.palette.error.main,
          },
        };

      default:
        return {
          ...baseStyles,
          color: theme.palette.text.primary,
          "&:hover": {
            backgroundColor: alpha(
              theme.palette.text.primary,
              isDark ? 0.12 : 0.04
            ),
            color: theme.palette.text.primary,
            transform: "translateX(4px)",
            "& .MuiListItemIcon-root": {
              color: theme.palette.text.primary,
            },
          },
          "& .MuiListItemIcon-root": {
            color: theme.palette.text.secondary,
          },
        };
    }
  };

  const getIconStyles = () => ({
    minWidth: 36,
    "& .MuiSvgIcon-root": {
      fontSize: "1.1rem",
      transition: "color 0.2s ease-in-out",
    },
  });

  const getTextStyles = () => ({
    "& .MuiTypography-root": {
      fontSize: "0.875rem",
      fontWeight: 500,
      letterSpacing: "0.025em",
    },
  });

  const getDividerStyles = () => ({
    borderColor: alpha(theme.palette.divider, isDark ? 0.2 : 0.12),
    mx: 1,
    my: 0.5,
  });

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      PaperProps={{
        elevation: isDark ? 12 : 6,
        sx: {
          minWidth: 220,
          maxWidth: 280,
          borderRadius: 2,
          border: `1px solid ${alpha(
            theme.palette.divider,
            isDark ? 0.2 : 0.08
          )}`,
          backgroundColor: isDark
            ? alpha(theme.palette.background.paper, 0.9)
            : theme.palette.background.paper,
          backdropFilter: isDark ? "blur(20px)" : "none",
          boxShadow: isDark
            ? `0 8px 32px ${alpha(theme.palette.common.black, 0.4)}`
            : `0 4px 20px ${alpha(theme.palette.common.black, 0.08)}`,
          py: 1,
          "& .MuiList-root": {
            py: 0,
          },
        },
      }}
      MenuListProps={{
        sx: {
          py: 0,
        },
      }}
    >
      {/* Primary Actions Section */}
      <MenuItem
        onClick={() => handleMenuItemClick(onRefresh)}
        sx={getMenuItemStyles("primary")}
      >
        <ListItemIcon sx={getIconStyles()}>
          <RefreshIcon />
        </ListItemIcon>
        <ListItemText primary="Refresh Board" sx={getTextStyles()} />
      </MenuItem>

      <Divider sx={getDividerStyles()} />

      {/* Settings & Analytics Section */}
      <MenuItem
        onClick={() => handleMenuItemClick(onSettings)}
        sx={getMenuItemStyles("default")}
      >
        <ListItemIcon sx={getIconStyles()}>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Board Settings" sx={getTextStyles()} />
      </MenuItem>

      <MenuItem
        onClick={() => handleMenuItemClick(onAnalytics)}
        sx={getMenuItemStyles("default")}
      >
        <ListItemIcon sx={getIconStyles()}>
          <AnalyticsIcon />
        </ListItemIcon>
        <ListItemText primary="Analytics" sx={getTextStyles()} />
      </MenuItem>

      {/* Edit Actions Section */}
      {canEdit && (
        <>
          <Divider sx={getDividerStyles()} />

          {onEdit && (
            <MenuItem
              onClick={() => handleMenuItemClick(onEdit)}
              sx={getMenuItemStyles("default")}
            >
              <ListItemIcon sx={getIconStyles()}>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Edit Board" sx={getTextStyles()} />
            </MenuItem>
          )}

          {onShare && (
            <MenuItem
              onClick={() => handleMenuItemClick(onShare)}
              sx={getMenuItemStyles("default")}
            >
              <ListItemIcon sx={getIconStyles()}>
                <ShareIcon />
              </ListItemIcon>
              <ListItemText primary="Share Board" sx={getTextStyles()} />
            </MenuItem>
          )}

          {onExport && (
            <MenuItem
              onClick={() => handleMenuItemClick(onExport)}
              sx={getMenuItemStyles("default")}
            >
              <ListItemIcon sx={getIconStyles()}>
                <DownloadIcon />
              </ListItemIcon>
              <ListItemText primary="Export Board" sx={getTextStyles()} />
            </MenuItem>
          )}

          {onArchive && (
            <MenuItem
              onClick={() => handleMenuItemClick(onArchive)}
              sx={getMenuItemStyles("default")}
            >
              <ListItemIcon sx={getIconStyles()}>
                <ArchiveIcon />
              </ListItemIcon>
              <ListItemText primary="Archive Board" sx={getTextStyles()} />
            </MenuItem>
          )}
        </>
      )}

      {/* Danger Zone Section */}
      {canDelete && onDelete && (
        <>
          <Divider
            sx={{
              ...getDividerStyles(),
              borderColor: alpha(theme.palette.error.main, isDark ? 0.3 : 0.2),
              mt: 1,
              mb: 0.5,
            }}
          />

          {/* Danger Zone Label */}
          <Typography
            variant="caption"
            sx={{
              px: 2.5,
              py: 0.5,
              color: theme.palette.text.secondary,
              fontSize: "0.7rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              display: "block",
            }}
          >
            Danger Zone
          </Typography>

          <MenuItem
            onClick={() => handleMenuItemClick(onDelete)}
            sx={getMenuItemStyles("danger")}
          >
            <ListItemIcon sx={getIconStyles()}>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Delete Board" sx={getTextStyles()} />
          </MenuItem>
        </>
      )}
    </Menu>
  );
};

export default BoardMenu;
