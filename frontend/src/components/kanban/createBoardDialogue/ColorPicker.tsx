// ============================================================================
// COLOR PICKER COMPONENT
// ============================================================================

import React from "react";
import {
  Popover,
  Box,
  Typography,
  Grid,
  Paper,
  IconButton,
  Tooltip,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Palette as PaletteIcon,
  Close as CloseIcon,
  Check as CheckIcon,
} from "@mui/icons-material";
import { HexColorPicker } from "react-colorful";
import { MUI_COLORS, COLOR_KEYS } from "./types";
import { type ColumnData } from "./types";

interface ColorPickerProps {
  anchor: HTMLElement | null;
  columnIndex: number | null;
  columns: ColumnData[];
  onClose: () => void;
  onColorSelect: (index: number, colorKey: keyof typeof MUI_COLORS) => void;
  onCustomColorChange: (index: number, color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  anchor,
  columnIndex,
  columns,
  onClose,
  onColorSelect,
  onCustomColorChange,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const isOpen = Boolean(anchor) && columnIndex !== null;

  if (!isOpen || columnIndex === null) return null;

  const currentColumn = columns[columnIndex];

  return (
    <Popover
      open={isOpen}
      anchorEl={anchor}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      PaperProps={{
        sx: {
          p: 0,
          maxWidth: 420,
          borderRadius: 4,
          border: `2px solid ${alpha(
            theme.palette.divider,
            isDark ? 0.2 : 0.12
          )}`,
          backgroundColor: isDark
            ? alpha(theme.palette.background.paper, 0.95)
            : theme.palette.background.paper,
          backdropFilter: isDark ? "blur(20px)" : "none",
          boxShadow: isDark
            ? `0 16px 48px ${alpha(theme.palette.common.black, 0.4)}`
            : `0 12px 36px ${alpha(theme.palette.common.black, 0.15)}`,
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <PaletteIcon sx={{ color: theme.palette.primary.main }} />
            Choose Column Color
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              color: theme.palette.text.secondary,
              backgroundColor: alpha(theme.palette.action.hover, 0.1),
              "&:hover": {
                backgroundColor: alpha(theme.palette.action.hover, 0.2),
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Material Design Colors */}
        <Typography
          variant="subtitle1"
          sx={{
            color: theme.palette.text.primary,
            mb: 2,
            fontWeight: 600,
          }}
        >
          Material Design Palette
        </Typography>

        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2} mb={3}>
          {COLOR_KEYS.map((colorKey) => {
            const muiColor = MUI_COLORS[colorKey];
            const isSelected = currentColumn?.color === muiColor.light;

            return (
              <Tooltip
                key={colorKey}
                title={muiColor.name}
                arrow
                placement="top"
              >
                <Box
                  sx={{
                    position: "relative",
                    cursor: "pointer",
                    borderRadius: 3,
                    overflow: "hidden",
                    border: "3px solid",
                    borderColor: isSelected
                      ? theme.palette.primary.main
                      : "transparent",
                    "&:hover": {
                      borderColor: isSelected
                        ? theme.palette.primary.main
                        : alpha(theme.palette.primary.main, 0.5),
                      transform: "scale(1.05)",
                    },
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => {
                    onColorSelect(columnIndex, colorKey);
                    onClose();
                  }}
                >
                  {/* Gradient Preview */}
                  <Box
                    sx={{
                      width: "100%",
                      height: 60,
                      background:
                        muiColor.main ||
                        `linear-gradient(135deg, ${muiColor.light}, ${muiColor.main})`,
                    }}
                  />
                  {/* Color Bars */}
                  <Box
                    sx={{
                      width: "100%",
                      height: 20,
                      backgroundColor: muiColor.light,
                    }}
                  />
                  <Box
                    sx={{
                      width: "100%",
                      height: 20,
                      backgroundColor: muiColor.dark,
                    }}
                  />
                  {isSelected && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        backgroundColor: alpha(theme.palette.primary.main, 0.9),
                        borderRadius: "50%",
                        width: 32,
                        height: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 4px 12px ${alpha(
                          theme.palette.common.black,
                          0.4
                        )}`,
                      }}
                    >
                      <CheckIcon sx={{ fontSize: 20 }} />
                    </Box>
                  )}
                </Box>
              </Tooltip>
            );
          })}
        </Box>

        {/* Current Selection Display */}
        <Paper
          sx={{
            p: 2.5,
            backgroundColor: alpha(
              theme.palette.background.default,
              isDark ? 0.3 : 0.5
            ),
            border: `2px solid ${alpha(
              theme.palette.divider,
              isDark ? 0.2 : 0.12
            )}`,
            borderRadius: 3,
            mb: 3,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: theme.palette.text.primary,
              mb: 2,
              fontWeight: 700,
            }}
          >
            Current Selection
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  display: "block",
                  mb: 1,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Light Theme
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: 50,
                  backgroundColor: currentColumn?.color,
                  border: `2px solid ${alpha(theme.palette.divider, 0.3)}`,
                  borderRadius: 2,
                  boxShadow: `0 4px 12px ${alpha(
                    currentColumn?.color || "#000",
                    0.3
                  )}`,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  display: "block",
                  mb: 1,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Dark Theme
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: 50,
                  backgroundColor: currentColumn?.darkColor,
                  border: `2px solid ${alpha(theme.palette.divider, 0.3)}`,
                  borderRadius: 2,
                  boxShadow: `0 4px 12px ${alpha(
                    currentColumn?.darkColor || "#000",
                    0.3
                  )}`,
                }}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Custom Color Picker */}
        <Typography
          variant="subtitle1"
          sx={{
            color: theme.palette.text.primary,
            mb: 2,
            fontWeight: 600,
          }}
        >
          Custom Color
        </Typography>
        <Box
          sx={{
            "& .react-colorful": {
              width: "100% !important",
              height: "200px !important",
              borderRadius: "12px !important",
              boxShadow: `0 4px 20px ${alpha(
                theme.palette.common.black,
                0.1
              )} !important`,
            },
            "& .react-colorful__saturation": {
              borderRadius: "12px 12px 0 0 !important",
            },
            "& .react-colorful__hue": {
              height: "32px !important",
              borderRadius: "0 0 12px 12px !important",
            },
            "& .react-colorful__pointer": {
              width: "20px !important",
              height: "20px !important",
            },
          }}
        >
          <HexColorPicker
            color={currentColumn?.color || "#e3f2fd"}
            onChange={(color) => onCustomColorChange(columnIndex, color)}
          />
        </Box>
      </Box>
    </Popover>
  );
};
