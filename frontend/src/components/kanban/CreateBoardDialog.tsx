// ============================================================================
// MAIN CREATE BOARD DIALOG COMPONENT
// ============================================================================

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  CircularProgress,
  useTheme,
  alpha,
  Fade,
} from "@mui/material";
import { CheckCircle as CheckCircleIcon } from "@mui/icons-material";
import { useKanbanStore } from "../../stores/kanbanStore";
import { getColorPair } from "../../utils/colorContrast";

// Import all components
import { ProgressHeader } from "./createBoardDialogue/ProgressHeader";
import { ValidationAlert } from "./createBoardDialogue/ValidationAlert";
import { BoardTemplates } from "./createBoardDialogue/BoardTemplates";
import { BoardDetailsForm } from "./createBoardDialogue/BoardDetailsForm";
import { ColumnsConfiguration } from "./createBoardDialogue/ColumnsConfiguration";
import { ColorPicker } from "./createBoardDialogue/ColorPicker";

// Import types and constants
import {
  MUI_COLORS,
  BOARD_TEMPLATES,
  type ColumnData,
  type ValidationErrors,
  type FormData,
} from "./createBoardDialogue/types";

interface CreateBoardDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateBoardDialog: React.FC<CreateBoardDialogProps> = ({
  open,
  onClose,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { createBoard, loading } = useKanbanStore();

  // State management
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [completionProgress, setCompletionProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    isDefault: false,
    type: "tickets",
  });

  const [columns, setColumns] = useState<ColumnData[]>(() => {
    const template = BOARD_TEMPLATES.kanban;
    return template.columns.map((col) => ({
      name: col.name,
      description: col.description,
      color: MUI_COLORS[col.color as keyof typeof MUI_COLORS].light,
      darkColor: MUI_COLORS[col.color as keyof typeof MUI_COLORS].dark,
      wipLimit: col.wipLimit,
    }));
  });

  const [colorPickerAnchor, setColorPickerAnchor] =
    useState<HTMLElement | null>(null);
  const [colorPickerIndex, setColorPickerIndex] = useState<number | null>(null);

  // Calculate completion progress
  useEffect(() => {
    let progress = 0;
    if (formData.name.trim()) progress += 30;
    if (formData.description.trim()) progress += 10;
    if (columns.length > 0) progress += 30;
    if (columns.every((col) => col.name.trim())) progress += 30;
    setCompletionProgress(progress);
  }, [formData, columns]);

  // Real-time validation
  const validateForm = () => {
    const errors: ValidationErrors = {};

    if (!formData.name.trim()) {
      errors.name = "Board name is required";
    } else if (formData.name.length < 3) {
      errors.name = "Board name must be at least 3 characters";
    }

    const columnErrors: {
      [key: number]: { name?: string; wipLimit?: string };
    } = {};
    columns.forEach((column, index) => {
      if (!column.name.trim()) {
        columnErrors[index] = {
          ...columnErrors[index],
          name: "Column name is required",
        };
      }
      if (
        column.wipLimit &&
        (isNaN(Number(column.wipLimit)) || Number(column.wipLimit) < 0)
      ) {
        columnErrors[index] = {
          ...columnErrors[index],
          wipLimit: "WIP limit must be a positive number",
        };
      }
    });

    if (Object.keys(columnErrors).length > 0) {
      errors.columns = columnErrors;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (formData.name || columns.some((col) => col.name)) {
      validateForm();
    }
  }, [formData, columns]);

  // Event handlers
  const handleFormDataChange = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleTemplateSelect = (templateKey: string) => {
    const template = BOARD_TEMPLATES[templateKey];
    setFormData((prev) => ({
      ...prev,
      name: template.name,
      description: template.description,
    }));

    setColumns(
      template.columns.map((col) => ({
        name: col.name,
        description: col.description,
        color: MUI_COLORS[col.color as keyof typeof MUI_COLORS].light,
        darkColor: MUI_COLORS[col.color as keyof typeof MUI_COLORS].dark,
        wipLimit: col.wipLimit,
      }))
    );
  };

  const handleAddColumn = () => {
    const newColumn: ColumnData = {
      name: "",
      description: "",
      color: MUI_COLORS.grey.light,
      darkColor: MUI_COLORS.grey.dark,
      wipLimit: "",
    };
    setColumns([...columns, newColumn]);
  };

  const handleRemoveColumn = (index: number) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  const handleUpdateColumn = (
    index: number,
    field: keyof ColumnData,
    value: string
  ) => {
    const updatedColumns = [...columns];

    if (field === "color") {
      const colorPair = getColorPair(value);
      updatedColumns[index] = {
        ...updatedColumns[index],
        color: colorPair.lightColor,
        darkColor: colorPair.darkColor,
      };
    } else {
      updatedColumns[index] = { ...updatedColumns[index], [field]: value };
    }

    setColumns(updatedColumns);
  };

  const handleColorPickerOpen = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setColorPickerAnchor(event.currentTarget);
    setColorPickerIndex(index);
  };

  const handleColorPickerClose = () => {
    setColorPickerAnchor(null);
    setColorPickerIndex(null);
  };

  const handleColorSelect = (
    index: number,
    colorKey: keyof typeof MUI_COLORS
  ) => {
    const updatedColumns = [...columns];
    const muiColor = MUI_COLORS[colorKey];
    updatedColumns[index] = {
      ...updatedColumns[index],
      color: muiColor.light,
      darkColor: muiColor.dark,
    };
    setColumns(updatedColumns);
  };

  const handleCustomColorChange = (index: number, color: string) => {
    handleUpdateColumn(index, "color", color);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setError("Please fix the validation errors before submitting");
      return;
    }

    if (columns.length === 0) {
      setError("At least one column is required");
      return;
    }

    setError(null);

    try {
      const boardData = {
        name: formData.name,
        description: formData.description,
        isDefault: formData.isDefault,
        type: formData.type,
        columns: columns.map((col, index) => ({
          name: col.name,
          description: col.description,
          color: col.color,
          darkColor: col.darkColor,
          position: index,
          wipLimit: col.wipLimit ? parseInt(col.wipLimit) : undefined,
        })),
      };

      await createBoard(boardData);
      handleClose();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to create board"
      );
    }
  };

  const handleClose = () => {
    // Reset all state
    setFormData({
      name: "",
      description: "",
      isDefault: false,
      type: "tickets",
    });
    setColumns(
      BOARD_TEMPLATES.kanban.columns.map((col) => ({
        name: col.name,
        description: col.description,
        color: MUI_COLORS[col.color as keyof typeof MUI_COLORS].light,
        darkColor: MUI_COLORS[col.color as keyof typeof MUI_COLORS].dark,
        wipLimit: col.wipLimit,
      }))
    );
    setError(null);
    setValidationErrors({});
    setShowAdvanced(false);
    setShowPreview(false);
    setColorPickerAnchor(null);
    setColorPickerIndex(null);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          border: isDark
            ? `1px solid ${alpha(theme.palette.divider, 0.2)}`
            : "none",
          backgroundColor: isDark
            ? alpha(theme.palette.background.paper, 0.95)
            : theme.palette.background.paper,
          backgroundImage: isDark
            ? `linear-gradient(135deg, ${alpha(
                theme.palette.primary.main,
                0.05
              )}, transparent)`
            : "none",
          backdropFilter: isDark ? "blur(20px)" : "none",
          maxHeight: "95vh",
        },
      }}
      TransitionComponent={Fade}
      transitionDuration={400}
    >
      {/* Header with Progress */}
      <ProgressHeader completionProgress={completionProgress} />

      {/* Main Content */}
      <DialogContent
        sx={{ p: 3, maxHeight: "calc(95vh - 200px)", overflowY: "auto" }}
      >
        {/* Error Alert */}
        <ValidationAlert error={error} onClose={() => setError(null)} />

        {/* Templates Section */}
        <BoardTemplates
          onSelectTemplate={handleTemplateSelect}
          showPreview={showPreview}
        />

        {/* Board Details Form */}
        <BoardDetailsForm
          formData={formData}
          validationErrors={validationErrors}
          showAdvanced={showAdvanced}
          onFormDataChange={handleFormDataChange}
          onToggleAdvanced={() => setShowAdvanced(!showAdvanced)}
        />

        {/* Columns Configuration */}
        <ColumnsConfiguration
          columns={columns}
          validationErrors={validationErrors}
          formData={formData}
          showPreview={showPreview}
          onColumnsChange={setColumns}
          onAddColumn={handleAddColumn}
          onRemoveColumn={handleRemoveColumn}
          onUpdateColumn={handleUpdateColumn}
          onColorPickerOpen={handleColorPickerOpen}
        />

        {/* Color Picker Popover */}
        <ColorPicker
          anchor={colorPickerAnchor}
          columnIndex={colorPickerIndex}
          columns={columns}
          onClose={handleColorPickerClose}
          onColorSelect={handleColorSelect}
          onCustomColorChange={handleCustomColorChange}
        />
      </DialogContent>

      {/* Footer Actions */}
      <DialogActions
        sx={{
          p: 3,
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.background.default,
            isDark ? 0.8 : 0.95
          )} 0%, ${alpha(
            theme.palette.background.paper,
            isDark ? 0.9 : 1
          )} 100%)`,
          borderTop: `2px solid ${alpha(
            theme.palette.divider,
            isDark ? 0.2 : 0.12
          )}`,
          gap: 2,
        }}
      >
        <Box display="flex" alignItems="center" gap={1} mr="auto">
          <Typography variant="body2" color="text.secondary">
            {columns.length} columns configured
          </Typography>
          {completionProgress === 100 && (
            <Chip
              icon={<CheckCircleIcon />}
              label="Ready to create"
              size="small"
              color="success"
              sx={{ fontWeight: 600 }}
            />
          )}
        </Box>

        <Button
          onClick={handleClose}
          sx={{
            color: theme.palette.text.secondary,
            borderColor: alpha(theme.palette.text.secondary, 0.3),
            "&:hover": {
              borderColor: theme.palette.text.secondary,
              backgroundColor: alpha(theme.palette.action.hover, 0.1),
            },
            textTransform: "none",
            fontWeight: 600,
            px: 4,
          }}
          variant="outlined"
        >
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !formData.name.trim() || completionProgress < 60}
          startIcon={
            loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <CheckCircleIcon />
            )
          }
          sx={{
            background: loading
              ? theme.palette.action.disabledBackground
              : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            boxShadow: loading
              ? "none"
              : `0 4px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
            "&:hover": {
              background: loading
                ? theme.palette.action.disabledBackground
                : `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
              transform: loading ? "none" : "translateY(-2px)",
              boxShadow: loading
                ? "none"
                : `0 6px 24px ${alpha(theme.palette.primary.main, 0.5)}`,
            },
            "&:disabled": {
              background: theme.palette.action.disabledBackground,
              color: theme.palette.action.disabled,
            },
            transition: "all 0.3s ease",
            textTransform: "none",
            fontWeight: 700,
            px: 6,
            py: 1.5,
          }}
        >
          {loading ? "Creating Board..." : "Create Amazing Board"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBoardDialog;
