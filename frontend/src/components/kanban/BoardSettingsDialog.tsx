import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Alert,
  Tabs,
  Tab,
  Grid,
  Popover,
  Card,
  CardContent,
  Avatar,
  Divider,
  Switch,
  FormControlLabel,
  Tooltip,
  Fade,
  Paper,
  Stack,
  useTheme,
  alpha,
  Slide,
  Collapse,
  MenuList,
  MenuItem,
  ListItemIcon,
  Badge,
  LinearProgress,
  Skeleton,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Settings as SettingsIcon,
  People as PeopleIcon,
  ViewColumn as ViewColumnIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  Palette as PaletteIcon,
  Info as InfoIcon,
  DragIndicator as DragIcon,
  Security as SecurityIcon,
  Visibility as VisibilityIcon,
  MoreVert as MoreVertIcon,
  PersonAdd as PersonAddIcon,
  Lock as LockIcon,
  Public as PublicIcon,
  Dashboard as DashboardIcon,
  Timeline as TimelineIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import { HexColorPicker } from "react-colorful";
import { useKanbanStore } from "../../stores/kanbanStore";
import type { KanbanBoard, KanbanColumn } from "../../types/kanban";
import { getColorPair } from "../../utils/colorContrast";

interface BoardSettingsDialogProps {
  open: boolean;
  onClose: () => void;
  board: KanbanBoard;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <Box
    role="tabpanel"
    hidden={value !== index}
    id={`board-settings-tabpanel-${index}`}
    aria-labelledby={`board-settings-tab-${index}`}
  >
    {value === index && (
      <Slide direction="left" in={value === index} mountOnEnter unmountOnExit>
        <Box sx={{ py: 3 }}>{children}</Box>
      </Slide>
    )}
  </Box>
);

const StatCard: React.FC<{
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
  trend?: number;
}> = ({ title, value, icon, color, subtitle, trend }) => {
  const theme = useTheme();
  
  return (
    <Card
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 3,
        background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(color, 0.05)} 100%)`,
        border: `1px solid ${alpha(color, 0.2)}`,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: theme.shadows[8],
          borderColor: alpha(color, 0.4),
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between">
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: color,
                lineHeight: 1,
                mb: 0.5,
              }}
            >
              {value}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 600, mb: 0.5 }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.disabled">
                {subtitle}
              </Typography>
            )}
            {trend !== undefined && (
              <Box display="flex" alignItems="center" mt={1}>
                <TrendingUpIcon
                  sx={{
                    fontSize: 16,
                    color: trend > 0 ? "success.main" : "error.main",
                    mr: 0.5,
                  }}
                />
                <Typography
                  variant="caption"
                  color={trend > 0 ? "success.main" : "error.main"}
                  fontWeight={600}
                >
                  {trend > 0 ? "+" : ""}{trend}%
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              backgroundColor: alpha(color, 0.15),
              color: color,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const ColumnCard: React.FC<{
  column: KanbanColumn;
  onEdit: (column: KanbanColumn) => void;
  onDelete: (columnId: string) => void;
  isLoading?: boolean;
}> = ({ column, onEdit, onDelete, isLoading = false }) => {
  const theme = useTheme();
  const [showActions, setShowActions] = useState(false);

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 3,
        background: `linear-gradient(135deg, ${alpha(column.color || "#e3f2fd", 0.08)} 0%, ${alpha(
          column.color || "#e3f2fd",
          0.03
        )} 100%)`,
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
              background: `linear-gradient(135deg, ${column.color || "#e3f2fd"} 0%, ${alpha(
                column.color || "#e3f2fd",
                0.8
              )} 100%)`,
              boxShadow: `0 4px 12px ${alpha(column.color || "#e3f2fd", 0.3)}`,
              color: "white",
              fontSize: "1.2rem",
              fontWeight: 700,
            }}
          >
            {column.name.charAt(0).toUpperCase()}
          </Box>

          <Box flex={1}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
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
                    "&:hover": { backgroundColor: alpha(theme.palette.primary.main, 0.1) },
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
                label={`${column.cards?.length || 0} cards`}
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
                    (column.cards?.length || 0) > column.wipLimit ? "error" : "success"
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
              <Box mt={2} pt={2} borderTop={`1px solid ${theme.palette.divider}`}>
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

const UserCard: React.FC<{
  permission: any;
  onRemove?: (id: string) => void;
}> = ({ permission, onRemove }) => {
  const theme = useTheme();

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return theme.palette.error.main;
      case "EDITOR":
        return theme.palette.warning.main;
      case "VIEWER":
        return theme.palette.info.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "ADMIN":
        return <SecurityIcon />;
      case "EDITOR":
        return <EditIcon />;
      case "VIEWER":
        return <VisibilityIcon />;
      default:
        return <PersonAddIcon />;
    }
  };

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: theme.shadows[4],
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Badge
            badgeContent={getRoleIcon(permission.role)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: getRoleColor(permission.role),
                color: "white",
                width: 24,
                height: 24,
                borderRadius: "50%",
                border: `2px solid ${theme.palette.background.paper}`,
              },
            }}
          >
            <Avatar
              sx={{
                width: 56,
                height: 56,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                fontWeight: 700,
                fontSize: "1.25rem",
              }}
            >
              {permission.user.name.charAt(0).toUpperCase()}
            </Avatar>
          </Badge>

          <Box flex={1}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              {permission.user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {permission.user.email}
            </Typography>
            <Box display="flex" gap={1} alignItems="center">
              <Chip
                label={permission.role}
                size="small"
                sx={{
                  backgroundColor: alpha(getRoleColor(permission.role), 0.1),
                  color: getRoleColor(permission.role),
                  fontWeight: 600,
                  border: `1px solid ${alpha(getRoleColor(permission.role), 0.3)}`,
                }}
              />
              <Typography variant="caption" color="text.disabled">
                • Last active 2h ago
              </Typography>
            </Box>
          </Box>

          <Stack direction="row" spacing={1}>
            <Tooltip title="Edit permissions">
              <IconButton
                sx={{
                  color: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            {onRemove && (
              <Tooltip title="Remove user">
                <IconButton
                  onClick={() => onRemove(permission.id)}
                  sx={{
                    color: theme.palette.error.main,
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.error.main, 0.1),
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

const BoardSettingsDialog: React.FC<BoardSettingsDialogProps> = ({
  open,
  onClose,
  board,
}) => {
  const theme = useTheme();
  const { updateBoard, fetchBoard } = useKanbanStore();

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
  const [columnForm, setColumnForm] = useState({
    name: "",
    description: "",
    color: "#e3f2fd",
    darkColor: "#1565c0",
    wipLimit: "",
  });
  const [colorPickerAnchor, setColorPickerAnchor] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    if (board) {
      setBoardName(board.name || "");
      setBoardDescription(board.description || "");
    }
  }, [board]);

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

  // Get tab configuration
  const tabConfig = [
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
        <DialogTitle
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`,
            color: "white",
            py: 3,
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <WarningIcon />
            <Typography variant="h6">Board Settings</Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ py: 4 }}>
          <Alert severity="error" sx={{ borderRadius: 2 }}>
            Board data is not available. Please try again.
          </Alert>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} variant="contained">
            Close
          </Button>
        </DialogActions>
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
      <DialogTitle
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: "white",
          py: 4,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"25\" cy=\"25\" r=\"1\" fill=\"%23ffffff\" opacity=\"0.1\"/><circle cx=\"75\" cy=\"75\" r=\"1\" fill=\"%23ffffff\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>')",
            opacity: 0.1,
          },
        }}
      >
        <Box position="relative" zIndex={1}>
          <Box display="flex" alignItems="center" gap={3}>
            <Box
              sx={{
                p: 2,
                borderRadius: 3,
                backgroundColor: alpha(theme.palette.common.white, 0.2),
                backdropFilter: "blur(10px)",
              }}
            >
              <SettingsIcon sx={{ fontSize: 32 }} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight={800} gutterBottom>
                Board Settings
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Configure your board preferences, workflow, and team access
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "white",
              backgroundColor: alpha(theme.palette.common.white, 0.1),
              backdropFilter: "blur(10px)",
              "&:hover": {
                backgroundColor: alpha(theme.palette.common.white, 0.2),
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

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
          <Box sx={{ px: 3 }}>
            <Grid container spacing={4}>
              {/* Board Information */}
              <Grid item xs={12} lg={8}>
                <Card
                  sx={{
                    borderRadius: 4,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, ${alpha(
                      theme.palette.secondary.main,
                      0.03
                    )} 100%)`,
                    border: `1px solid ${theme.palette.divider}`,
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
                      <SettingsIcon />
                      Board Information
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          label="Board Name"
                          fullWidth
                          value={boardName}
                          onChange={(e) => setBoardName(e.target.value)}
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 3,
                              fontSize: "1.1rem",
                              fontWeight: 600,
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Description"
                          fullWidth
                          multiline
                          rows={4}
                          value={boardDescription}
                          onChange={(e) => setBoardDescription(e.target.value)}
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 3,
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={isPublic}
                              onChange={(e) => setIsPublic(e.target.checked)}
                              color="primary"
                            />
                          }
                          label={
                            <Box display="flex" alignItems="center" gap={1}>
                              {isPublic ? <PublicIcon /> : <LockIcon />}
                              <Typography variant="body1" fontWeight={500}>
                                {isPublic ? "Public Board" : "Private Board"}
                              </Typography>
                            </Box>
                          }
                        />
                        <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                          {isPublic
                            ? "Anyone with the link can view this board"
                            : "Only team members can access this board"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Statistics */}
              <Grid item xs={12} lg={4}>
                <Stack spacing={3}>
                  <StatCard
                    title="Columns"
                    value={board.columns?.length || 0}
                    icon={<ViewColumnIcon />}
                    color={theme.palette.primary.main}
                    subtitle="Workflow stages"
                    trend={12}
                  />
                  <StatCard
                    title="Team Members"
                    value={board.permissions?.length || 0}
                    icon={<PeopleIcon />}
                    color={theme.palette.secondary.main}
                    subtitle="Active collaborators"
                    trend={-5}
                  />
                  <StatCard
                    title="Total Cards"
                    value={
                      board.columns?.reduce(
                        (total, col) => total + (col.cards?.length || 0),
                        0
                      ) || 0
                    }
                    icon={<DashboardIcon />}
                    color={theme.palette.success.main}
                    subtitle="Across all columns"
                    trend={8}
                  />
                </Stack>
              </Grid>

              {/* Recent Activity */}
              <Grid item xs={12}>
                <Card
                  sx={{
                    borderRadius: 4,
                    border: `1px solid ${theme.palette.divider}`,
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
                      <TimelineIcon />
                      Recent Activity
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                      {[1, 2, 3].map((item) => (
                        <Box
                          key={item}
                          display="flex"
                          alignItems="center"
                          gap={2}
                          py={2}
                          borderBottom={`1px solid ${theme.palette.divider}`}
                        >
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              backgroundColor: theme.palette.primary.main,
                              fontSize: "0.875rem",
                            }}
                          >
                            U
                          </Avatar>
                          <Box flex={1}>
                            <Typography variant="body2" fontWeight={500}>
                              John Doe moved "Design Review" from "In Progress" to "Done"
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              2 hours ago
                            </Typography>
                          </Box>
                          <CheckCircleIcon sx={{ color: "success.main", fontSize: 20 }} />
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Columns Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ px: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
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
              <Grid item xs={12} lg={editingColumn ? 6 : 12}>
                {board.columns && board.columns.length > 0 ? (
                  <Stack spacing={2}>
                    {board.columns.map((column) => (
                      <ColumnCard
                        key={column.id}
                        column={column}
                        onEdit={handleEditColumn}
                        onDelete={handleDeleteColumn}
                        isLoading={loading}
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
                      <Typography variant="h5" fontWeight={600} gutterBottom color="text.secondary">
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
                <Grid item xs={12} lg={6}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      border: `2px solid ${theme.palette.primary.main}`,
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(
                        theme.palette.primary.main,
                        0.02
                      )} 100%)`,
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
                        Customize the appearance and behavior of "{editingColumn.name}"
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
                          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
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
                            onClick={handleColorPickerOpen}
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
                          <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                            Click to customize colors. Dark mode color is auto-generated.
                          </Typography>
                        </Box>

                        <Stack direction="row" spacing={2} pt={2}>
                          <Button
                            onClick={handleSaveColumn}
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
          </Box>
        </TabPanel>

        {/* Team Tab */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ px: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
              <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Team Members
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage who has access to this board and their permissions
                </Typography>
              </Box>
              <Button
                startIcon={<PersonAddIcon />}
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  boxShadow: theme.shadows[4],
                  background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                  "&:hover": {
                    boxShadow: theme.shadows[8],
                    transform: "translateY(-1px)",
                  },
                }}
              >
                Invite Member
              </Button>
            </Box>

            {board.permissions && board.permissions.length > 0 ? (
              <Grid container spacing={3}>
                {board.permissions.map((permission) => (
                  <Grid item xs={12} md={6} lg={4} key={permission.id}>
                    <UserCard permission={permission} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Card
                sx={{
                  borderRadius: 4,
                  border: `2px dashed ${theme.palette.divider}`,
                  backgroundColor: alpha(theme.palette.secondary.main, 0.02),
                  textAlign: "center",
                  py: 8,
                }}
              >
                <CardContent>
                  <PeopleIcon
                    sx={{
                      fontSize: 64,
                      color: "text.disabled",
                      mb: 2,
                    }}
                  />
                  <Typography variant="h5" fontWeight={600} gutterBottom color="text.secondary">
                    No team members yet
                  </Typography>
                  <Typography variant="body1" color="text.secondary" mb={3}>
                    Invite colleagues to collaborate on this board
                  </Typography>
                  <Button
                    startIcon={<PersonAddIcon />}
                    variant="contained"
                    sx={{ borderRadius: 3 }}
                  >
                    Invite First Member
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Permission Roles Info */}
            <Card
              sx={{
                mt: 4,
                borderRadius: 4,
                border: `1px solid ${theme.palette.divider}`,
                background: alpha(theme.palette.info.main, 0.02),
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    color: theme.palette.info.main,
                  }}
                >
                  <InfoIcon />
                  Permission Roles
                </Typography>
                <Grid container spacing={3} mt={1}>
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                        backgroundColor: alpha(theme.palette.error.main, 0.05),
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <SecurityIcon sx={{ color: "error.main" }} />
                        <Typography variant="h6" fontWeight={600}>
                          Admin
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Full access to board settings, can manage members and delete the board
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                        backgroundColor: alpha(theme.palette.warning.main, 0.05),
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <EditIcon sx={{ color: "warning.main" }} />
                        <Typography variant="h6" fontWeight={600}>
                          Editor
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Can create, edit, and move cards. Can modify column settings
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                        backgroundColor: alpha(theme.palette.info.main, 0.05),
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <VisibilityIcon sx={{ color: "info.main" }} />
                        <Typography variant="h6" fontWeight={600}>
                          Viewer
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Read-only access. Can view cards and comments but cannot make changes
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </TabPanel>

        {/* Enhanced Color Picker Popover */}
        <Popover
          open={Boolean(colorPickerAnchor)}
          anchorEl={colorPickerAnchor}
          onClose={handleColorPickerClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{
            sx: {
              borderRadius: 4,
              boxShadow: theme.shadows[16],
              p: 4,
              maxWidth: 360,
              background: theme.palette.background.paper,
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
              Choose a color for light mode. Dark mode variant will be automatically generated.
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
              <HexColorPicker
                color={columnForm.color}
                onChange={(color) => {
                  const colorPair = getColorPair(color);
                  setColumnForm((prev) => ({
                    ...prev,
                    color: colorPair.lightColor,
                    darkColor: colorPair.darkColor,
                  }));
                }}
              />
            </Box>

            <Grid container spacing={2} mb={4}>
              <Grid item xs={6}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                    Light Mode
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      height: 48,
                      backgroundColor: columnForm.color,
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
                    {columnForm.color.toUpperCase()}
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                    Dark Mode
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      height: 48,
                      backgroundColor: columnForm.darkColor,
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
                    {columnForm.darkColor.toUpperCase()}
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              onClick={handleColorPickerClose}
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
      </DialogContent>

      <DialogActions
        sx={{
          p: 4,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, ${alpha(
            theme.palette.secondary.main,
            0.03
          )} 100%)`,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          size="large"
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            fontWeight: 600,
            borderWidth: 2,
            "&:hover": {
              borderWidth: 2,
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSaveBoard}
          variant="contained"
          disabled={loading}
          startIcon={loading ? null : <SaveIcon />}
          size="large"
          sx={{
            borderRadius: 3,
            px: 6,
            py: 1.5,
            fontWeight: 700,
            fontSize: "1rem",
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            boxShadow: theme.shadows[4],
            "&:hover": {
              boxShadow: theme.shadows[8],
              transform: "translateY(-1px)",
            },
            "&:disabled": {
              background: theme.palette.action.disabledBackground,
            },
          }}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BoardSettingsDialog;