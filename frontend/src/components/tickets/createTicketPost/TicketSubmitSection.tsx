import React from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  useTheme,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";

interface TicketSubmitSectionProps {
  title: string;
  description: string;
  isPosting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const TicketSubmitSection: React.FC<TicketSubmitSectionProps> = ({
  title,
  description,
  isPosting,
  onSubmit,
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundColor: alpha(theme.palette.background.paper, 0.9),
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="body2" fontWeight={500} color="textSecondary">
            🌟 This ticket will be visible to all team members
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Make sure to provide clear and detailed information
          </Typography>
        </Box>

        <Button
          variant="contained"
          endIcon={
            isPosting ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <SendIcon />
            )
          }
          onClick={onSubmit}
          disabled={!title.trim() || !description.trim() || isPosting}
          size="large"
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: 600,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`,
            transition: "all 0.3s ease",
            "&:hover": {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
              boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.5)}`,
              transform: "translateY(-2px)",
            },
            "&:disabled": {
              background: alpha(theme.palette.action.disabledBackground, 0.8),
              color: theme.palette.action.disabled,
              boxShadow: "none",
              transform: "none",
            },
          }}
        >
          {isPosting ? "Creating Ticket..." : "Create Ticket"}
        </Button>
      </Box>
    </Paper>
  );
};

export default TicketSubmitSection;
