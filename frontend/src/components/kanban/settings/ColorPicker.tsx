// components/common/ColorPicker.tsx
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Popover,
  useTheme,
} from "@mui/material";
import { Palette as PaletteIcon } from "@mui/icons-material";
import { HexColorPicker } from "react-colorful";
import { getColorPair } from "../../../utils/colorContrast";

interface ColorPickerProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  color: string;
  darkColor: string;
  onChange: (lightColor: string, darkColor: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  open,
  anchorEl,
  onClose,
  color,
  darkColor,
  onChange,
}) => {
  const theme = useTheme();

  const handleColorChange = (newColor: string) => {
    const colorPair = getColorPair(newColor);
    onChange(colorPair.lightColor, colorPair.darkColor);
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 4,
            boxShadow: theme.shadows[16],
            p: 4,
            maxWidth: 360,
            background: theme.palette.background.paper,
          },
        },
      }}
    >
      <Box>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            color: theme.palette.primary.main,
            fontWeight: 700,
          }}
        >
          <PaletteIcon />
          Color Picker
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Choose a color for light mode. Dark mode variant will be automatically
          generated.
        </Typography>

        <Box
          sx={{
            mb: 4,
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: theme.shadows[4],
            "& .react-colorful": {
              width: "280px !important",
              height: "200px !important",
            },
            "& .react-colorful__saturation": {
              borderRadius: "12px 12px 0 0",
            },
            "& .react-colorful__hue": {
              height: "28px",
              borderRadius: "0 0 12px 12px",
            },
            "& .react-colorful__pointer": {
              width: "24px",
              height: "24px",
              borderWidth: "4px",
            },
          }}
        >
          <HexColorPicker color={color} onChange={handleColorChange} />
        </Box>

        <Grid container spacing={2} mb={4}>
          <Grid size={{ xs: 6 }}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                textAlign: "center",
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                mb={1}
              >
                Light Mode
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: 48,
                  backgroundColor: color,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  textShadow: "0 0 4px rgba(0,0,0,0.8)",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  mb: 1,
                }}
              >
                {color.toUpperCase()}
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                textAlign: "center",
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                mb={1}
              >
                Dark Mode
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: 48,
                  backgroundColor: darkColor,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  textShadow: "0 0 4px rgba(0,0,0,0.8)",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  mb: 1,
                }}
              >
                {darkColor.toUpperCase()}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          onClick={onClose}
          fullWidth
          sx={{
            borderRadius: 3,
            py: 1.5,
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          Apply Color
        </Button>
      </Box>
    </Popover>
  );
};
