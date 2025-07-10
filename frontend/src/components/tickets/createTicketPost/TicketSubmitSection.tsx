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
            borderRadius: 4,
            px: 5,
            py: 2,
            fontSize: "1.1rem",
            fontWeight: 700,
            textTransform: "none",
            minWidth: 180,
            position: "relative",
            overflow: "hidden",
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            boxShadow: `0 8px 24px ${alpha(
              theme.palette.primary.main,
              0.35
            )}, 0 2px 8px ${alpha(theme.palette.common.black, 0.1)}`,
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(135deg, ${alpha(
                theme.palette.common.white,
                0.2
              )} 0%, transparent 50%, ${alpha(
                theme.palette.common.black,
                0.1
              )} 100%)`,
              opacity: 0,
              transition: "opacity 0.3s ease",
            },
            "&:hover": {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
              boxShadow: `0 12px 32px ${alpha(
                theme.palette.primary.main,
                0.5
              )}, 0 4px 16px ${alpha(theme.palette.common.black, 0.15)}`,
              transform: "translateY(-3px) scale(1.02)",
              "&::before": {
                opacity: 1,
              },
            },
            "&:active": {
              transform: "translateY(-1px) scale(0.98)",
              transition: "all 0.1s ease",
            },
            "&:disabled": {
              background: `linear-gradient(135deg, ${alpha(
                theme.palette.action.disabledBackground,
                0.7
              )} 0%, ${alpha(
                theme.palette.action.disabledBackground,
                0.5
              )} 100%)`,
              color: theme.palette.action.disabled,
              boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.05)}`,
              transform: "none",
              "&::before": {
                opacity: 0,
              },
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
