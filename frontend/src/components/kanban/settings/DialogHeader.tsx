// components/dialog/DialogHeader.tsx
import React from "react";
import {
  DialogTitle,
  Box,
  Typography,
  IconButton,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

interface DialogHeaderProps {
  onClose: () => void;
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({ onClose }) => {
  const theme = useTheme();

  return (
    <DialogTitle
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        color: "white",
        py: 4,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23ffffff" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>\')',
          opacity: 0.1,
        },
      }}
    >
      <Box position="relative" zIndex={1}>
        <Box display="flex" alignItems="center" gap={3}>
          <Box
            sx={{
              p: 2,
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.common.white, 0.2),
              backdropFilter: "blur(10px)",
            }}
          >
            <SettingsIcon sx={{ fontSize: 32 }} />
          </Box>
          <Box>
            <Typography variant="h4" fontWeight={800} gutterBottom>
              Board Settings
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Configure your board preferences, workflow, and team access
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "white",
            backgroundColor: alpha(theme.palette.common.white, 0.1),
            backdropFilter: "blur(10px)",
            "&:hover": {
              backgroundColor: alpha(theme.palette.common.white, 0.2),
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </DialogTitle>
  );
};
