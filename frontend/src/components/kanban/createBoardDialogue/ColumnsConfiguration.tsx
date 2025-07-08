import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Grid,
  TextField,
  IconButton,
  Button,
  Paper,
  Chip,
  Tooltip,
  InputAdornment,
  Slide,
  Zoom,
  useTheme,
  alpha,
} from "@mui/material";
import {
  ColorLens as ColorIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  DragHandle as DragHandleIcon,
  Preview as PreviewIcon,
} from "@mui/icons-material";
import { type ColumnData, type ValidationErrors, type FormData } from "./types";
import MyTextField from "../../common/MyTextField";

interface ColumnsConfigurationProps {
  columns: ColumnData[];
  validationErrors: ValidationErrors;
  formData: FormData;
  showPreview: boolean;
  onColumnsChange: (columns: ColumnData[]) => void;
  onAddColumn: () => void;
  onRemoveColumn: (index: number) => void;
  onUpdateColumn: (
    index: number,
    field: keyof ColumnData,
    value: string
  ) => void;
  onColorPickerOpen: (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => void;
}

export const ColumnsConfiguration: React.FC<ColumnsConfigurationProps> = ({
  columns,
  validationErrors,
  formData,
  showPreview,
  onAddColumn,
  onRemoveColumn,
  onUpdateColumn,
  onColorPickerOpen,
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
          theme.palette.background.paper,
          0.6
        )} 0%, ${alpha(theme.palette.background.default, 0.4)} 100%)`
      : `linear-gradient(135deg, ${alpha(theme.palette.grey[50], 0.8)} 0%, ${
          theme.palette.background.paper
        } 100%)`,
    boxShadow: isDark
      ? `0 4px 20px ${alpha(theme.palette.common.black, 0.2)}`
      : `0 2px 12px ${alpha(theme.palette.common.black, 0.06)}`,
  });

  const getColumnCardStyles = (index: number) => ({
    p: 2.5,
    mb: 2,
    background: isDark
      ? `linear-gradient(135deg, ${alpha(
          theme.palette.background.paper,
          0.95
        )} 0%, ${alpha(theme.palette.background.default, 0.8)} 100%)`
      : `linear-gradient(135deg, ${alpha(
          theme.palette.background.paper,
          1
        )} 0%, ${alpha(theme.palette.grey[50], 0.5)} 100%)`,
    border: `2px solid ${alpha(theme.palette.divider, isDark ? 0.2 : 0.1)}`,
    borderRadius: 3,
    boxShadow: isDark
      ? `0 4px 20px ${alpha(theme.palette.common.black, 0.2)}`
      : `0 2px 12px ${alpha(theme.palette.common.black, 0.06)}`,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    "&:hover": {
      borderColor: alpha(theme.palette.primary.main, isDark ? 0.4 : 0.3),
      boxShadow: isDark
        ? `0 8px 32px ${alpha(theme.palette.common.black, 0.3)}`
        : `0 4px 20px ${alpha(theme.palette.primary.main, 0.12)}`,
      transform: "translateY(-2px)",
    },
  });

  const getTextFieldStyles = () => ({
    "& .MuiOutlinedInput-root": {
      backgroundColor: alpha(theme.palette.background.paper, isDark ? 0.8 : 1),
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
  });

  return (
    <Card sx={getCardStyles()}>
      <CardContent sx={{ p: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <ColorIcon
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
              Workflow Columns
            </Typography>
            <Chip
              label={`${columns.length} columns`}
              size="small"
              sx={{
                ml: 1,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                fontWeight: 600,
              }}
            />
          </Box>

          <Button
            startIcon={<AddIcon />}
            onClick={onAddColumn}
            variant="contained"
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.3)}`,
              "&:hover": {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                transform: "translateY(-2px)",
                boxShadow: `0 6px 20px ${alpha(
                  theme.palette.primary.main,
                  0.4
                )}`,
              },
              transition: "all 0.3s ease",
              textTransform: "none",
              fontWeight: 700,
              px: 3,
            }}
          >
            Add Column
          </Button>
        </Box>

        {/* Preview Section */}
        {showPreview && (
          <Slide direction="down" in={showPreview}>
            <Paper
              sx={{
                p: 2.5,
                mb: 3,
                borderRadius: 3,
                backgroundColor: alpha(
                  theme.palette.secondary.main,
                  isDark ? 0.08 : 0.03
                ),
                border: `2px solid ${alpha(
                  theme.palette.secondary.main,
                  isDark ? 0.2 : 0.1
                )}`,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: theme.palette.secondary.main,
                }}
              >
                <PreviewIcon />
                Board Preview
              </Typography>

              <Box
                sx={{
                  border: `2px solid ${alpha(theme.palette.divider, 0.2)}`,
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: alpha(theme.palette.background.default, 0.5),
                  minHeight: 160,
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  {formData.name || "Board Name"}
                </Typography>

                <Box display="flex" gap={2} sx={{ overflowX: "auto", pb: 2 }}>
                  {columns.map((column, index) => (
                    <Paper
                      key={index}
                      sx={{
                        minWidth: 140,
                        p: 1.5,
                        backgroundColor: alpha(column.color, 0.1),
                        border: `2px solid ${alpha(column.color, 0.3)}`,
                        borderRadius: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: 4,
                          backgroundColor: column.color,
                          borderRadius: 2,
                          mb: 2,
                        }}
                      />
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, mb: 1 }}
                      >
                        {column.name || `Column ${index + 1}`}
                      </Typography>
                      {column.wipLimit && (
                        <Chip
                          label={`WIP: ${column.wipLimit}`}
                          size="small"
                          sx={{
                            backgroundColor: alpha(column.color, 0.2),
                            color: column.darkColor,
                            fontSize: "0.7rem",
                          }}
                        />
                      )}
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", mt: 1 }}
                      >
                        {column.description || "No description"}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              </Box>
            </Paper>
          </Slide>
        )}

        {/* Column Cards */}
        {columns.map((column, index) => (
          <Zoom in key={index} style={{ transitionDelay: `${index * 100}ms` }}>
            <Paper sx={getColumnCardStyles(index)}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <MyTextField
                    label="Column Name"
                    fullWidth
                    required
                    value={column.name}
                    startIcon={
                      <DragHandleIcon
                        sx={{ color: theme.palette.text.secondary }}
                      />
                    }
                    onChange={(e) =>
                      onUpdateColumn(index, "name", e.target.value)
                    }
                    error={!!validationErrors.columns?.[index]?.name}
                    helperText={validationErrors.columns?.[index]?.name}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <MyTextField
                    label="Description"
                    fullWidth
                    value={column.description}
                    onChange={(e) =>
                      onUpdateColumn(index, "description", e.target.value)
                    }
                    placeholder="What happens here?"
                    sx={getTextFieldStyles()}
                  />
                </Grid>

                <Grid size={{ xs: 4, md: 2 }}>
                  <MyTextField
                    label="WIP Limit"
                    type="number"
                    fullWidth
                    value={column.wipLimit}
                    onChange={(e) =>
                      onUpdateColumn(index, "wipLimit", e.target.value)
                    }
                    error={!!validationErrors.columns?.[index]?.wipLimit}
                    helperText={
                      validationErrors.columns?.[index]?.wipLimit || "Optional"
                    }
                  />
                </Grid>

                <Grid
                  size={{ xs: 4, md: 1 }}
                  display="flex"
                  justifyContent="center"
                >
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 1,
                        color: theme.palette.text.primary,
                        fontWeight: 600,
                      }}
                    >
                      Colors
                    </Typography>
                    <Box display="flex" gap={0} mb={1}>
                      <Tooltip title="Light theme" arrow>
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            backgroundColor: column.color,
                            borderRadius: "6px 0 0 6px",
                            cursor: "pointer",
                            border: `2px solid ${alpha(
                              theme.palette.divider,
                              0.3
                            )}`,
                            borderRight: "none",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.1)",
                              zIndex: 2,
                              boxShadow: `0 4px 12px ${alpha(
                                column.color,
                                0.4
                              )}`,
                            },
                          }}
                          onClick={(e) => onColorPickerOpen(e, index)}
                        />
                      </Tooltip>
                      <Tooltip title="Dark theme" arrow>
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            backgroundColor: column.darkColor,
                            borderRadius: "0 6px 6px 0",
                            cursor: "pointer",
                            border: `2px solid ${alpha(
                              theme.palette.divider,
                              0.3
                            )}`,
                            borderLeft: "none",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.1)",
                              zIndex: 1,
                              boxShadow: `0 4px 12px ${alpha(
                                column.darkColor,
                                0.4
                              )}`,
                            },
                          }}
                          onClick={(e) => onColorPickerOpen(e, index)}
                        />
                      </Tooltip>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 4, md: 1 }}>
                  <Box display="flex" justifyContent="center" mt={2}>
                    <IconButton
                      onClick={() => onRemoveColumn(index)}
                      disabled={columns.length <= 1}
                      size="small"
                      sx={{
                        color: theme.palette.error.main,
                        backgroundColor: alpha(theme.palette.error.main, 0.1),
                        "&:hover": {
                          backgroundColor: alpha(theme.palette.error.main, 0.2),
                          transform: "scale(1.1)",
                        },
                        "&.Mui-disabled": {
                          color: theme.palette.action.disabled,
                          backgroundColor: alpha(
                            theme.palette.action.disabled,
                            0.05
                          ),
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Zoom>
        ))}

        {/* Empty State */}
        {columns.length === 0 && (
          <Paper
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 3,
              border: `2px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
              backgroundColor: alpha(theme.palette.primary.main, 0.02),
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
              }}
            >
              <AddIcon
                sx={{ fontSize: "2rem", color: theme.palette.primary.main }}
              />
            </Box>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              No columns yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Add your first column to start building your workflow
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onAddColumn}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Add First Column
            </Button>
          </Paper>
        )}
      </CardContent>
    </Card>
  );
};
