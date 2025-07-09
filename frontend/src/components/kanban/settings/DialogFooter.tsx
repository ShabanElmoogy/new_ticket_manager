// components/dialog/DialogFooter.tsx
import React from "react";
import { DialogActions, Button, useTheme, alpha } from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";

interface DialogFooterProps {
  onClose: () => void;
  onSave: () => void;
  loading: boolean;
}

export const DialogFooter: React.FC<DialogFooterProps> = ({
  onClose,
  onSave,
  loading,
}) => {
  const theme = useTheme();

  return (
    <DialogActions
      sx={{
        p: 4,
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.03
        )} 0%, ${alpha(theme.palette.secondary.main, 0.03)} 100%)`,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Button
        onClick={onClose}
        variant="outlined"
        size="large"
        sx={{
          borderRadius: 3,
          px: 4,
          py: 1.5,
          fontWeight: 600,
          borderWidth: 2,
          "&:hover": {
            borderWidth: 2,
          },
        }}
      >
        Cancel
      </Button>
      <Button
        onClick={onSave}
        variant="contained"
        disabled={loading}
        startIcon={loading ? null : <SaveIcon />}
        size="large"
        sx={{
          borderRadius: 3,
          px: 6,
          py: 1.5,
          fontWeight: 700,
          fontSize: "1rem",
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          boxShadow: theme.shadows[4],
          "&:hover": {
            boxShadow: theme.shadows[8],
            transform: "translateY(-1px)",
          },
          "&:disabled": {
            background: theme.palette.action.disabledBackground,
          },
        }}
      >
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </DialogActions>
  );
};
