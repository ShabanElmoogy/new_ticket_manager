// components/board/ColumnCard.tsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
  Chip,
  Button,
  Stack,
  Collapse,
  LinearProgress,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  MoreVert as MoreVertIcon,
  DragIndicator as DragIcon,
  Timeline as TimelineIcon,
  Warning as WarningIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
import { type ColumnCardProps } from "../../../types/BoardSettings";

export const ColumnCard: React.FC<ColumnCardProps> = ({
  column,
  onEdit,
  onDelete,
  isLoading = false,
  cardCount = 0,
}) => {
  const theme = useTheme();
  const [showActions, setShowActions] = useState(false);

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 3,
        background: `linear-gradient(135deg, ${alpha(
          column.color || "#e3f2fd",
          0.08
        )} 0%, ${alpha(column.color || "#e3f2fd", 0.03)} 100%)`,
        border: `2px solid ${alpha(column.color || "#e3f2fd", 0.2)}`,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: theme.shadows[6],
          borderColor: alpha(column.color || "#e3f2fd", 0.4),
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="flex-start" gap={2}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${
                column.color || "#e3f2fd"
              } 0%, ${alpha(column.color || "#e3f2fd", 0.8)} 100%)`,
              boxShadow: `0 4px 12px ${alpha(column.color || "#e3f2fd", 0.3)}`,
              color: "white",
              fontSize: "1.2rem",
              fontWeight: 700,
            }}
          >
            {column.name.charAt(0).toUpperCase()}
          </Box>

          <Box flex={1}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={1}
            >
              <Typography variant="h6" fontWeight={700} color="text.primary">
                {column.name}
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <DragIcon sx={{ color: "text.disabled", cursor: "grab" }} />
                <IconButton
                  size="small"
                  onClick={() => setShowActions(!showActions)}
                  sx={{
                    color: "text.secondary",
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    },
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Box>

            {column.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2, lineHeight: 1.5 }}
              >
                {column.description}
              </Typography>
            )}

            <Box display="flex" gap={1} flexWrap="wrap" alignItems="center">
              <Chip
                icon={<TimelineIcon />}
                label={`${cardCount} cards`}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: alpha(column.color || "#e3f2fd", 0.5),
                  color: column.color || "#e3f2fd",
                  fontWeight: 600,
                }}
              />
              {column.wipLimit && (
                <Chip
                  icon={<WarningIcon />}
                  label={`WIP: ${column.wipLimit}`}
                  size="small"
                  color={
                    cardCount > column.wipLimit
                      ? "error"
                      : "success"
                  }
                  variant="filled"
                  sx={{ fontWeight: 600 }}
                />
              )}
              <Chip
                icon={<ScheduleIcon />}
                label="Recently updated"
                size="small"
                variant="outlined"
                sx={{ color: "text.secondary" }}
              />
            </Box>

            <Collapse in={showActions}>
              <Box
                mt={2}
                pt={2}
                borderTop={`1px solid ${theme.palette.divider}`}
              >
                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => onEdit(column)}
                    variant="outlined"
                    sx={{ borderRadius: 2 }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    startIcon={<VisibilityIcon />}
                    variant="outlined"
                    sx={{ borderRadius: 2 }}
                  >
                    View Details
                  </Button>
                  <Button
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => onDelete(column.id)}
                    color="error"
                    variant="outlined"
                    sx={{ borderRadius: 2 }}
                  >
                    Delete
                  </Button>
                </Stack>
              </Box>
            </Collapse>
          </Box>
        </Box>

        {isLoading && (
          <Box mt={2}>
            <LinearProgress
              sx={{
                borderRadius: 1,
                height: 3,
                backgroundColor: alpha(column.color || "#e3f2fd", 0.2),
                "& .MuiLinearProgress-bar": {
                  backgroundColor: column.color || "#e3f2fd",
                },
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};