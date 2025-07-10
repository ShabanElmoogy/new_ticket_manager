import React from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { Label } from "./types";
import MyChip2 from "../../common/MyChip2";

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
  onLabelToggle,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 2 }}>
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
              <MyChip2
                key={label.id}
                variant="deletable"
                id={label.id}
                name={label.name}
                color={label.color}
                onLabelToggle={() => onLabelToggle(label)}
              />
            ))}
          </Box>
        </Box>
      )}

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
              const isSelected = selectedLabels.some((l) => l.id === label.id);
              return (
                <MyChip2
                  key={label.id}
                  variant="selectable"
                  isSelected={isSelected}
                  id={label.id}
                  name={label.name}
                  color={label.color}
                  description={label.description}
                  createdAt={label.createdAt}
                  updatedAt={label.updatedAt}
                  onLabelToggle={() => onLabelToggle(label)}
                />
              );
            })}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default TicketLabelsSection;
