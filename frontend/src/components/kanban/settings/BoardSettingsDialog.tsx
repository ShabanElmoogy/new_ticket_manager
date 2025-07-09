// components/BoardSettingsDialog.tsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Alert,
  Tabs,
  Tab,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  ViewColumn as ViewColumnIcon,
  People as PeopleIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { useKanbanStore } from "../../../stores/kanbanStore";
import { getColorPair } from "../../../utils/colorContrast";

// Import separated components
import { TabPanel } from "./TabPanel";
import { DialogHeader } from "./DialogHeader";
import { DialogFooter } from "./DialogFooter";
import { OverviewTab } from "./OverviewTab";
import { ColumnsTab } from "./ColumnsTab";
import { TeamTab } from "./TeamTab";

// Import types
import type {
  BoardSettingsDialogProps,
  TabConfig,
  ColumnForm,
} from "../../../types/BoardSettings";
import type { KanbanColumn } from "../../../types/kanban";

const BoardSettingsDialog: React.FC<BoardSettingsDialogProps> = ({
  open,
  onClose,
  board,
}) => {
  const theme = useTheme();
  const { updateBoard, fetchBoard } = useKanbanStore();

  // Main state
  const [tabValue, setTabValue] = useState(0);
  const [boardName, setBoardName] = useState(board?.name || "");
  const [boardDescription, setBoardDescription] = useState(
    board?.description || ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(false);

  // Column editing state
  const [editingColumn, setEditingColumn] = useState<KanbanColumn | null>(null);
  const [columnForm, setColumnForm] = useState<ColumnForm>({
    name: "",
    description: "",
    color: "#e3f2fd",
    darkColor: "#1565c0",
    wipLimit: "",
  });
  const [colorPickerAnchor, setColorPickerAnchor] =
    useState<HTMLElement | null>(null);

  // Tab configuration
  const tabConfig: TabConfig[] = [
    {
      label: "Overview",
      icon: <DashboardIcon />,
      description: "Board settings & analytics",
    },
    {
      label: "Columns",
      icon: <ViewColumnIcon />,
      description: "Manage workflow stages",
    },
    {
      label: "Team",
      icon: <PeopleIcon />,
      description: "Members & permissions",
    },
  ];

  // Effects
  useEffect(() => {
    if (board) {
      setBoardName(board.name || "");
      setBoardDescription(board.description || "");
    }
  }, [board]);

  // Handlers
  const handleSaveBoard = async () => {
    if (!board?.id) {
      setError("Board ID is missing");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await updateBoard(board.id, {
        name: boardName,
        description: boardDescription,
      });
      onClose();
    } catch (error) {
      console.error("Error updating board:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update board"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditColumn = (column: KanbanColumn) => {
    setEditingColumn(column);
    const currentColor = column.color || "#e3f2fd";
    const colorPair = getColorPair(currentColor);

    setColumnForm({
      name: column.name,
      description: column.description || "",
      color: currentColor,
      darkColor: column.darkColor || colorPair.darkColor,
      wipLimit: column.wipLimit?.toString() || "",
    });
  };

  const handleSaveColumn = async () => {
    if (!editingColumn) return;

    setLoading(true);
    try {
      // Here you would call the API to update the column
      // For now, we'll just refresh the board
      await fetchBoard(board.id);
      setEditingColumn(null);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to update column"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteColumn = async (columnId: string) => {
    if (!confirm("Are you sure you want to delete this column?")) return;

    setLoading(true);
    try {
      // Here you would call the API to delete the column
      await fetchBoard(board.id);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to delete column"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleColorPickerOpen = (event: React.MouseEvent<HTMLElement>) => {
    setColorPickerAnchor(event.currentTarget);
  };

  const handleColorPickerClose = () => {
    setColorPickerAnchor(null);
  };

  const handleRemoveUser = (userId: string) => {
    // Implement user removal logic here
    console.log("Removing user:", userId);
  };

  // Safety check for board prop
  if (!board) {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            boxShadow: theme.shadows[24],
          },
        }}
      >
        <DialogHeader onClose={onClose} />
        <DialogContent sx={{ py: 4 }}>
          <Alert severity="error" sx={{ borderRadius: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <WarningIcon />
              <Typography>
                Board data is not available. Please try again.
              </Typography>
            </Box>
          </Alert>
        </DialogContent>
        <DialogFooter onClose={onClose} onSave={() => {}} loading={false} />
      </Dialog>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          boxShadow: theme.shadows[24],
          minHeight: "80vh",
          background: theme.palette.background.default,
        },
      }}
    >
      <DialogHeader onClose={onClose} />

      <Box sx={{ borderBottom: 1, borderColor: "divider", px: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          sx={{
            "& .MuiTabs-indicator": {
              height: 4,
              borderRadius: "4px 4px 0 0",
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            },
            "& .MuiTab-root": {
              minHeight: 80,
              fontWeight: 600,
              fontSize: "0.95rem",
              textTransform: "none",
              "&.Mui-selected": {
                color: theme.palette.primary.main,
              },
            },
          }}
        >
          {tabConfig.map((tab, index) => (
            <Tab
              key={index}
              id={`board-settings-tab-${index}`}
              aria-controls={`board-settings-tabpanel-${index}`}
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {tab.icon}
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="body1" sx={{ fontWeight: "inherit" }}>
                      {tab.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {tab.description}
                    </Typography>
                  </Box>
                </Box>
              }
            />
          ))}
        </Tabs>
      </Box>

      <DialogContent sx={{ p: 0, minHeight: 500 }}>
        {error && (
          <Alert
            severity="error"
            sx={{
              m: 3,
              borderRadius: 3,
              fontWeight: 500,
            }}
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        {/* Overview Tab */}
        <TabPanel value={tabValue} index={0}>
          <OverviewTab
            board={board}
            boardName={boardName}
            setBoardName={setBoardName}
            boardDescription={boardDescription}
            setBoardDescription={setBoardDescription}
            isPublic={isPublic}
            setIsPublic={setIsPublic}
          />
        </TabPanel>

        {/* Columns Tab */}
        <TabPanel value={tabValue} index={1}>
          <ColumnsTab
            board={board}
            editingColumn={editingColumn}
            setEditingColumn={setEditingColumn}
            columnForm={columnForm}
            setColumnForm={setColumnForm}
            colorPickerAnchor={colorPickerAnchor}
            setColorPickerAnchor={setColorPickerAnchor}
            loading={loading}
            onEditColumn={handleEditColumn}
            onDeleteColumn={handleDeleteColumn}
            onSaveColumn={handleSaveColumn}
            onColorPickerOpen={handleColorPickerOpen}
            onColorPickerClose={handleColorPickerClose}
          />
        </TabPanel>

        {/* Team Tab */}
        <TabPanel value={tabValue} index={2}>
          <TeamTab board={board} onRemoveUser={handleRemoveUser} />
        </TabPanel>
      </DialogContent>

      <DialogFooter
        onClose={onClose}
        onSave={handleSaveBoard}
        loading={loading}
      />
    </Dialog>
  );
};

export default BoardSettingsDialog;
