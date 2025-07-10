import React from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Collapse,
  CircularProgress,
  Paper,
  useTheme,
} from "@mui/material";
import { Palette as PaletteIcon } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import type { Label } from "./types";

interface TicketLabelsSectionProps {
  selectedLabels: Label[];
  labels: Label[];
  labelsLoading: boolean;
  showLabelSelector: boolean;
  onToggleLabelSelector: () => void;
  onLabelToggle: (label: Label) => void;
}

const TicketLabelsSection: React.FC<TicketLabelsSectionProps> = ({
  selectedLabels,
  labels,
  labelsLoading,
  showLabelSelector,
  onToggleLabelSelector,
  onLabelToggle,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 2 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="subtitle2" fontWeight={600}>
          Labels & Tags
        </Typography>
        <Button
          startIcon={<PaletteIcon />}
          onClick={onToggleLabelSelector}
          size="small"
          variant="outlined"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          {showLabelSelector ? "Hide Labels" : "Select Labels"}
        </Button>
      </Box>

      {/* Selected Labels Display */}
      {selectedLabels.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ mb: 1, display: "block" }}
          >
            Selected Labels ({selectedLabels.length}):
          </Typography>
          <Box display="flex" gap={1} flexWrap="wrap">
            {selectedLabels.map((label) => (
              <Chip
                key={label.id}
                label={label.name}
                size="small"
                onDelete={() => onLabelToggle(label)}
                sx={{
                  backgroundColor: `${label.color}20`,
                  color: label.color,
                  fontWeight: 600,
                  border: `1px solid ${label.color}40`,
                  "& .MuiChip-deleteIcon": {
                    color: label.color,
                    "&:hover": {
                      color: alpha(label.color, 0.8),
                    },
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Enhanced Label Selector */}
      <Collapse in={showLabelSelector}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.background.default, 0.5),
            border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
          }}
        >
          {labelsLoading ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              py={2}
            >
              <CircularProgress size={24} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Loading labels...
              </Typography>
            </Box>
          ) : (
            <Box display="flex" gap={1} flexWrap="wrap">
              {labels.map((label) => {
                const isSelected = selectedLabels.some(
                  (l) => l.id === label.id
                );
                return (
                  <Chip
                    key={label.id}
                    label={label.name}
                    size="small"
                    clickable
                    onClick={() => onLabelToggle(label)}
                    sx={{
                      backgroundColor: isSelected
                        ? `${label.color}30`
                        : `${label.color}10`,
                      color: label.color,
                      fontWeight: isSelected ? 700 : 500,
                      border: `2px solid ${
                        isSelected ? label.color : `${label.color}30`
                      }`,
                      transform: isSelected ? "scale(1.05)" : "scale(1)",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: `${label.color}25`,
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                );
              })}
            </Box>
          )}
        </Paper>
      </Collapse>
    </Box>
  );
};

export default TicketLabelsSection;
