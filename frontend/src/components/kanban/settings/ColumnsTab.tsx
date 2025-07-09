// components/tabs/ColumnsTab.tsx
import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Add as AddIcon,
  ViewColumn as ViewColumnIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import { ColumnCard } from "./ColumnCard";
import { ColorPicker } from "./ColorPicker";
import type { KanbanBoard, KanbanColumn } from "../../../types/kanban";
import type { ColumnForm } from "../../../types/BoardSettings";

interface ColumnsTabProps {
  board: KanbanBoard;
  editingColumn: KanbanColumn | null;
  setEditingColumn: (column: KanbanColumn | null) => void;
  columnForm: ColumnForm;
  setColumnForm: React.Dispatch<React.SetStateAction<ColumnForm>>;
  colorPickerAnchor: HTMLElement | null;
  setColorPickerAnchor: (anchor: HTMLElement | null) => void;
  loading: boolean;
  onEditColumn: (column: KanbanColumn) => void;
  onDeleteColumn: (columnId: string) => void;
  onSaveColumn: () => void;
  onColorPickerOpen: (event: React.MouseEvent<HTMLElement>) => void;
  onColorPickerClose: () => void;
}

export const ColumnsTab: React.FC<ColumnsTabProps> = ({
  board,
  editingColumn,
  setEditingColumn,
  columnForm,
  setColumnForm,
  colorPickerAnchor,
  setColorPickerAnchor,
  loading,
  onEditColumn,
  onDeleteColumn,
  onSaveColumn,
  onColorPickerOpen,
  onColorPickerClose,
}) => {
  const theme = useTheme();

  const handleColorChange = (lightColor: string, darkColor: string) => {
    setColumnForm((prev) => ({
      ...prev,
      color: lightColor,
      darkColor: darkColor,
    }));
  };

  // Calculate card count for a column
  const getCardCountForColumn = (column: KanbanColumn): number => {
    if (!board) return 0;
    
    // For TASKS boards, count tasks in this column
    if (board.type === "TASKS") {
      return board.tasks?.filter(task => task.columnId === column.id).length || 0;
    }
    
    // For TICKETS boards, count tickets with matching status
    // Map column name to ticket status
    const columnNameUpper = column.name.toUpperCase().replace(/\s+/g, "_");
    let status = columnNameUpper;
    
    // Handle common column name mappings
    if (column.name.toLowerCase().includes("todo") || column.name.toLowerCase().includes("open")) {
      status = "OPEN";
    } else if (column.name.toLowerCase().includes("progress")) {
      status = "IN_PROGRESS";
    } else if (column.name.toLowerCase().includes("review") || column.name.toLowerCase().includes("resolved")) {
      status = "RESOLVED";
    } else if (column.name.toLowerCase().includes("done") || column.name.toLowerCase().includes("closed")) {
      status = "CLOSED";
    }
    
    return board.tickets?.filter(ticket => ticket.status === status).length || 0;
  };

  return (
    <Box sx={{ px: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Workflow Columns
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your board's workflow stages and column settings
          </Typography>
        </Box>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          size="large"
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            fontWeight: 600,
            boxShadow: theme.shadows[4],
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            "&:hover": {
              boxShadow: theme.shadows[8],
              transform: "translateY(-1px)",
            },
          }}
        >
          Add Column
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, lg: editingColumn ? 6 : 12 }}>
          {board.columns && board.columns.length > 0 ? (
            <Stack spacing={2}>
              {board.columns.map((column) => (
                <ColumnCard
                  key={column.id}
                  column={column}
                  onEdit={onEditColumn}
                  onDelete={onDeleteColumn}
                  isLoading={loading}
                  cardCount={getCardCountForColumn(column)}
                />
              ))}
            </Stack>
          ) : (
            <Card
              sx={{
                borderRadius: 4,
                border: `2px dashed ${theme.palette.divider}`,
                backgroundColor: alpha(theme.palette.primary.main, 0.02),
                textAlign: "center",
                py: 8,
              }}
            >
              <CardContent>
                <ViewColumnIcon
                  sx={{
                    fontSize: 64,
                    color: "text.disabled",
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h5"
                  fontWeight={600}
                  gutterBottom
                  color="text.secondary"
                >
                  No columns yet
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={3}>
                  Create your first column to start organizing your workflow
                </Typography>
                <Button
                  startIcon={<AddIcon />}
                  variant="contained"
                  sx={{ borderRadius: 3 }}
                >
                  Create Column
                </Button>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Column Edit Form */}
        {editingColumn && (
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card
              sx={{
                borderRadius: 4,
                border: `2px solid ${theme.palette.primary.main}`,
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette.primary.main,
                  0.05
                )} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
                position: "sticky",
                top: 24,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    color: theme.palette.primary.main,
                  }}
                >
                  <EditIcon />
                  Edit Column
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={4}>
                  Customize the appearance and behavior of "{editingColumn.name}
                  "
                </Typography>

                <Stack spacing={3}>
                  <TextField
                    label="Column Name"
                    fullWidth
                    value={columnForm.name}
                    onChange={(e) =>
                      setColumnForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                      },
                    }}
                  />

                  <TextField
                    label="WIP Limit (Optional)"
                    type="number"
                    fullWidth
                    value={columnForm.wipLimit}
                    onChange={(e) =>
                      setColumnForm((prev) => ({
                        ...prev,
                        wipLimit: e.target.value,
                      }))
                    }
                    inputProps={{ min: 0 }}
                    helperText="Set a limit to prevent column overload"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                      },
                    }}
                  />

                  <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    value={columnForm.description}
                    onChange={(e) =>
                      setColumnForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                      },
                    }}
                  />

                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      gutterBottom
                    >
                      Column Color
                    </Typography>
                    <Paper
                      sx={{
                        display: "flex",
                        overflow: "hidden",
                        borderRadius: 3,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        border: `2px solid ${theme.palette.divider}`,
                        "&:hover": {
                          transform: "scale(1.02)",
                          boxShadow: theme.shadows[4],
                          borderColor: theme.palette.primary.main,
                        },
                      }}
                      onClick={onColorPickerOpen}
                    >
                      <Box
                        sx={{
                          flex: 1,
                          height: 60,
                          backgroundColor: columnForm.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRight: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: "white",
                            textShadow: "0 0 4px rgba(0,0,0,0.8)",
                            fontWeight: 700,
                          }}
                        >
                          LIGHT MODE
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          flex: 1,
                          height: 60,
                          backgroundColor: columnForm.darkColor,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: "white",
                            textShadow: "0 0 4px rgba(0,0,0,0.8)",
                            fontWeight: 700,
                          }}
                        >
                          DARK MODE
                        </Typography>
                      </Box>
                    </Paper>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      mt={1}
                    >
                      Click to customize colors. Dark mode color is
                      auto-generated.
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={2} pt={2}>
                    <Button
                      onClick={onSaveColumn}
                      variant="contained"
                      startIcon={<SaveIcon />}
                      fullWidth
                      sx={{
                        borderRadius: 3,
                        py: 1.5,
                        fontWeight: 600,
                      }}
                    >
                      Save Changes
                    </Button>
                    <Button
                      onClick={() => setEditingColumn(null)}
                      variant="outlined"
                      fullWidth
                      sx={{
                        borderRadius: 3,
                        py: 1.5,
                        fontWeight: 600,
                      }}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Color Picker */}
      <ColorPicker
        open={Boolean(colorPickerAnchor)}
        anchorEl={colorPickerAnchor}
        onClose={onColorPickerClose}
        color={columnForm.color}
        darkColor={columnForm.darkColor}
        onChange={handleColorChange}
      />
    </Box>
  );
};