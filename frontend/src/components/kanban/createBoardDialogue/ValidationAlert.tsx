// ============================================================================
// VALIDATION ALERT COMPONENT
// ============================================================================

import React from "react";
import { Alert, IconButton, useTheme, alpha, Zoom } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

interface ValidationAlertProps {
  error: string | null;
  onClose: () => void;
}

export const ValidationAlert: React.FC<ValidationAlertProps> = ({
  error,
  onClose,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  if (!error) return null;

  return (
    <Zoom in={Boolean(error)}>
      <Alert
        severity="error"
        sx={{
          mb: 3,
          borderRadius: 3,
          backgroundColor: alpha(
            theme.palette.error.main,
            isDark ? 0.15 : 0.05
          ),
          border: `2px solid ${alpha(
            theme.palette.error.main,
            isDark ? 0.3 : 0.2
          )}`,
          color: theme.palette.error.main,
          "& .MuiAlert-icon": {
            color: theme.palette.error.main,
          },
          boxShadow: `0 4px 20px ${alpha(theme.palette.error.main, 0.2)}`,
        }}
        action={
          <IconButton
            color="inherit"
            size="small"
            onClick={onClose}
            sx={{
              color: theme.palette.error.main,
              "&:hover": {
                backgroundColor: alpha(theme.palette.error.main, 0.1),
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        }
      >
        {error}
      </Alert>
    </Zoom>
  );
};
