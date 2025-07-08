import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Collapse,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Info as InfoIcon,
  Palette as PaletteIcon,
  CheckCircle as CheckCircleIcon,
  Security as SecurityIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import { type FormData, type ValidationErrors } from "./types";
import MyTextField from "../../common/MyTextField";

interface BoardDetailsFormProps {
  formData: FormData;
  validationErrors: ValidationErrors;
  showAdvanced: boolean;
  onFormDataChange: (data: Partial<FormData>) => void;
  onToggleAdvanced: () => void;
}

export const BoardDetailsForm: React.FC<BoardDetailsFormProps> = ({
  formData,
  validationErrors,
  showAdvanced,
  onFormDataChange,
  onToggleAdvanced,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const getCardStyles = () => ({
    mb: 3,
    borderRadius: 3,
    border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.2 : 0.12)}`,
    backdropFilter: isDark ? "blur(20px)" : "none",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    background: isDark
      ? `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.08
        )} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`
      : `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.02
        )} 0%, ${theme.palette.background.paper} 100%)`,
    borderColor: alpha(theme.palette.primary.main, isDark ? 0.2 : 0.1),
    boxShadow: isDark
      ? `0 8px 32px ${alpha(theme.palette.common.black, 0.3)}`
      : `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 4,
      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      borderRadius: "3px 3px 0 0",
    },
  });

  const getTextFieldStyles = () => ({
    "& .MuiOutlinedInput-root": {
      backgroundColor: alpha(theme.palette.background.paper, isDark ? 0.7 : 1),
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
      "&.Mui-error .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.error.main,
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: theme.palette.primary.main,
    },
    "& .MuiInputLabel-root.Mui-error": {
      color: theme.palette.error.main,
    },
  });

  return (
    <Card sx={getCardStyles()}>
      <CardContent sx={{ p: 3 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <InfoIcon
              sx={{
                color: theme.palette.primary.main,
                fontSize: "1.3rem",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 700,
              }}
            >
              Board Information
            </Typography>
          </Box>

          <Button
            startIcon={showAdvanced ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            onClick={onToggleAdvanced}
            size="small"
            sx={{
              color: theme.palette.primary.main,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            {showAdvanced ? "Hide" : "Show"} Advanced
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* Board Name Row */}
          <Grid size={{ xs: 12, md: 4 }}>
            <MyTextField
              label="Board Name"
              fullWidth
              value={formData.name}
              startIcon={
                <PaletteIcon
                  sx={{
                    fontSize: "1.1rem",
                    color: theme.palette.primary.main,
                  }}
                />
              }
              onChange={(e) => onFormDataChange({ name: e.target.value })}
              error={!!validationErrors.name}
              helperText={validationErrors.name}
              placeholder="Enter a descriptive board name..."
            />
          </Grid>

          {/* Description Row - Full Width */}
          <Grid size={{ xs: 12, md: 8 }}>
            <MyTextField
              label="Description"
              fullWidth
              value={formData.description}
              startIcon={
                <DescriptionIcon
                  sx={{
                    fontSize: "1.1rem",
                    color: theme.palette.primary.main,
                  }}
                />
              }
              onChange={(e) =>
                onFormDataChange({ description: e.target.value })
              }
              placeholder="Describe the purpose and goals of this board..."
            />
          </Grid>

          {/* Advanced Options */}
          <Collapse in={showAdvanced} sx={{ width: "100%" }}>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth sx={getTextFieldStyles()}>
                  <InputLabel id="board-type-label">Board Type</InputLabel>
                  <Select
                    labelId="board-type-label"
                    value={formData.type}
                    label="Board Type"
                    onChange={(e) => onFormDataChange({ type: e.target.value })}
                  >
                    <MenuItem value="tickets">
                      <Box display="flex" alignItems="center" gap={1}>
                        <SecurityIcon
                          sx={{
                            fontSize: "1.1rem",
                            color: theme.palette.primary.main,
                          }}
                        />
                        Tickets (Support & Issues)
                      </Box>
                    </MenuItem>
                    <MenuItem value="tasks">
                      <Box display="flex" alignItems="center" gap={1}>
                        <CheckCircleIcon
                          sx={{
                            fontSize: "1.1rem",
                            color: theme.palette.secondary.main,
                          }}
                        />
                        Tasks (Workflow & Agile)
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isDefault}
                      onChange={(e) =>
                        onFormDataChange({ isDefault: e.target.checked })
                      }
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: theme.palette.primary.main,
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: theme.palette.primary.main,
                          },
                      }}
                    />
                  }
                  label={
                    <Box>
                      <Typography
                        sx={{
                          color: theme.palette.text.primary,
                          fontWeight: 600,
                          fontSize: "0.875rem",
                        }}
                      >
                        Set as default board
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: theme.palette.text.secondary,
                          display: "block",
                          lineHeight: 1.3,
                        }}
                      >
                        Opens automatically when you visit the app
                      </Typography>
                    </Box>
                  }
                />
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      </CardContent>
    </Card>
  );
};
