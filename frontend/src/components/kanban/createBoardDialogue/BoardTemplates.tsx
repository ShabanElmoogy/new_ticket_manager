import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Paper,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Lightbulb as LightbulbIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { BOARD_TEMPLATES } from "./types";

interface BoardTemplatesProps {
  onSelectTemplate: (templateKey: string) => void;
}

export const BoardTemplates: React.FC<BoardTemplatesProps> = ({
  onSelectTemplate,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const getCardStyles = () => ({
    mb: 2,
    borderRadius: 2,
    border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.2 : 0.12)}`,
    backdropFilter: isDark ? "blur(10px)" : "none",
    background: isDark
      ? `linear-gradient(135deg, ${alpha(
          theme.palette.secondary.main,
          0.08
        )} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`
      : `linear-gradient(135deg, ${alpha(
          theme.palette.secondary.main,
          0.02
        )} 0%, ${theme.palette.background.paper} 100%)`,
    borderColor: alpha(theme.palette.secondary.main, isDark ? 0.2 : 0.1),
    boxShadow: isDark
      ? `0 4px 16px ${alpha(theme.palette.common.black, 0.2)}`
      : `0 2px 8px ${alpha(theme.palette.secondary.main, 0.08)}`,
  });

  return (
    <Card sx={(getCardStyles(), { my: 1 })}>
      <CardContent sx={{ p: 2 }}>
        {/* Header */}
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <LightbulbIcon
            sx={{
              color: theme.palette.secondary.main,
              fontSize: "1.1rem",
            }}
          />
          <Typography
            variant="subtitle1"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 600,
            }}
          >
            Quick Templates
          </Typography>
        </Box>

        {/* Templates Row */}
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            overflowX: "auto",
            pb: 1,
            "&::-webkit-scrollbar": {
              height: "4px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: alpha(theme.palette.action.hover, 0.1),
              borderRadius: "2px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: alpha(theme.palette.action.selected, 0.3),
              borderRadius: "2px",
              "&:hover": {
                backgroundColor: alpha(theme.palette.action.selected, 0.5),
              },
            },
          }}
        >
          {Object.entries(BOARD_TEMPLATES).map(([key, template]) => (
            <Paper
              key={key}
              sx={{
                minWidth: 140,
                maxWidth: 140,
                p: 1.5,
                textAlign: "center",
                cursor: "pointer",
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                borderRadius: 2,
                transition: "all 0.2s ease",
                background: isDark
                  ? `linear-gradient(135deg, ${alpha(
                      theme.palette.background.paper,
                      0.9
                    )}, ${alpha(theme.palette.background.default, 0.7)})`
                  : `linear-gradient(135deg, ${
                      theme.palette.background.paper
                    }, ${alpha(theme.palette.grey[50], 0.8)})`,
                "&:hover": {
                  borderColor: theme.palette.secondary.main,
                  transform: "translateY(-2px)",
                  boxShadow: `0 4px 12px ${alpha(
                    theme.palette.secondary.main,
                    0.15
                  )}`,
                },
              }}
              onClick={() => onSelectTemplate(key)}
            >
              {/* Icon */}
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 1,
                  color: "white",
                  boxShadow: `0 2px 6px ${alpha(
                    theme.palette.secondary.main,
                    0.2
                  )}`,
                }}
              >
                <CheckCircleIcon sx={{ fontSize: "1rem" }} />
              </Box>

              {/* Title */}
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  mb: 0.5,
                  fontSize: "0.8rem",
                  lineHeight: 1.2,
                }}
              >
                {template.name}
              </Typography>

              {/* Columns Chip */}
              <Chip
                label={`${template.columns.length} cols`}
                size="small"
                sx={{
                  height: 18,
                  fontSize: "0.65rem",
                  backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                  color: theme.palette.secondary.main,
                  fontWeight: 500,
                  border: `1px solid ${alpha(
                    theme.palette.secondary.main,
                    0.2
                  )}`,
                  "& .MuiChip-label": {
                    px: 0.5,
                  },
                }}
              />
            </Paper>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
