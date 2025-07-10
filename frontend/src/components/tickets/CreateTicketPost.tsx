import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Avatar,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Collapse,
  CircularProgress,
  Paper,
  Fade,
  Stack,
  useTheme,
  alpha,
  Badge,
} from "@mui/material";
import {
  Send as SendIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  PriorityHigh as PriorityIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  Timer as TimerIcon,
  Label as LabelIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Apps as AppsIcon,
  AutoAwesome as AutoAwesomeIcon,
  Palette as PaletteIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useAuthStore } from "../../stores/authStore";
import { useKanbanStore } from "../../stores/kanbanStore";
import type {
  User,
  Customer,
  Application,
  CreateTicketData,
} from "../../services/api";
import type { Label } from "../../types/kanban";
import MyTextField from "../common/MyTextField";

interface CreateTicketPostProps {
  onSubmit: (data: CreateTicketData) => void;
  employees: User[];
  customers?: Customer[];
  applications?: Application[];
}

const CreateTicketPost: React.FC<CreateTicketPostProps> = ({
  onSubmit,
  employees,
  customers = [],
  applications = [],
}) => {
  const theme = useTheme();
  const { user } = useAuthStore();
  const { labels, fetchLabels, createLabel } = useKanbanStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<
    "LOW" | "MEDIUM" | "HIGH" | "URGENT"
  >("MEDIUM");
  const [assignedTo, setAssignedTo] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [estimatedHours, setEstimatedHours] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<Label[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [labelsLoading, setLabelsLoading] = useState(false);
  const [showLabelSelector, setShowLabelSelector] = useState(false);

  // Create default labels if none exist
  const createDefaultLabels = async () => {
    const defaultLabels = [
      { name: "Bug", color: "#f44336", description: "Bug reports and fixes" },
      {
        name: "Feature",
        color: "#4caf50",
        description: "New feature requests",
      },
      {
        name: "Enhancement",
        color: "#2196f3",
        description: "Improvements to existing features",
      },
      {
        name: "Documentation",
        color: "#ff9800",
        description: "Documentation updates",
      },
      { name: "Urgent", color: "#e91e63", description: "Urgent issues" },
      {
        name: "UI/UX",
        color: "#9c27b0",
        description: "User interface improvements",
      },
      {
        name: "Performance",
        color: "#607d8b",
        description: "Performance optimization",
      },
      {
        name: "Security",
        color: "#795548",
        description: "Security related issues",
      },
    ];

    for (const label of defaultLabels) {
      try {
        await createLabel(label);
      } catch (error) {
        console.error(`Error creating default label ${label.name}:`, error);
      }
    }
  };

  // Fetch labels when component mounts
  useEffect(() => {
    const loadLabels = async () => {
      setLabelsLoading(true);
      try {
        await fetchLabels();
        if (labels.length === 0) {
          await createDefaultLabels();
          await fetchLabels();
        }
      } catch (error) {
        console.error("Failed to fetch labels:", error);
      } finally {
        setLabelsLoading(false);
      }
    };
    loadLabels();
  }, [fetchLabels, createLabel]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsPosting(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        priority,
        assignedToId: assignedTo || undefined,
        customerId: customerId || undefined,
        applicationId: applicationId || undefined,
        dueDate: dueDate?.toISOString(),
        estimatedHours: estimatedHours ? parseFloat(estimatedHours) : undefined,
        labelIds: selectedLabels.map((label) => label.id),
      });

      // Reset form
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setAssignedTo("");
      setCustomerId("");
      setApplicationId("");
      setDueDate(null);
      setEstimatedHours("");
      setSelectedLabels([]);
      setShowAdvanced(false);
      setShowLabelSelector(false);
    } finally {
      setIsPosting(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "LOW":
        return { color: "#10b981", emoji: "🟢", label: "Low" };
      case "MEDIUM":
        return { color: "#f59e0b", emoji: "🟡", label: "Medium" };
      case "HIGH":
        return { color: "#ef4444", emoji: "🟠", label: "High" };
      case "URGENT":
        return { color: "#dc2626", emoji: "🔴", label: "Urgent" };
      default:
        return { color: "#6b7280", emoji: "⚪", label: "Unknown" };
    }
  };

  const handleLabelToggle = (label: Label) => {
    const isSelected = selectedLabels.some((l) => l.id === label.id);
    if (isSelected) {
      setSelectedLabels(selectedLabels.filter((l) => l.id !== label.id));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  const priorityConfig = getPriorityConfig(priority);

  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 4,
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.02
        )} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        boxShadow: theme.shadows[4],
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: theme.shadows[8],
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent sx={{ p: 4 }}>
        {/* Header Section */}
        <Box display="flex" gap={3} mb={3}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              background:
                user?.role === "ADMIN"
                  ? `linear-gradient(135deg, #ef4444, #dc2626)`
                  : `linear-gradient(135deg, #10b981, #059669)`,
              fontSize: "1.1rem",
              fontWeight: 700,
              boxShadow: theme.shadows[3],
            }}
          >
            {getInitials(user?.name || "U")}
          </Avatar>
          <Box flexGrow={1}>
            <Typography
              variant="h6"
              sx={{
                mb: 1,
                fontWeight: 600,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Create New Ticket
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              What's the issue, {user?.name?.split(" ")[0]}?
            </Typography>
            <MyTextField
              fullWidth
              placeholder="Describe the problem or request..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              rounded
              startIcon={<AutoAwesomeIcon />}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: `0 4px 12px ${alpha(
                      theme.palette.primary.main,
                      0.15
                    )}`,
                  },
                  "&.Mui-focused": {
                    transform: "translateY(-1px)",
                    boxShadow: `0 4px 12px ${alpha(
                      theme.palette.primary.main,
                      0.25
                    )}`,
                  },
                },
              }}
            />
          </Box>
        </Box>

        {/* Description Section */}
        <Collapse in={title.length > 0}>
          <Fade in={title.length > 0}>
            <Box sx={{ ml: 8, mb: 3 }}>
              <MyTextField
                fullWidth
                multiline
                rows={4}
                placeholder="Provide detailed information about the issue, steps to reproduce, or requirements..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rounded
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-1px)",
                      boxShadow: `0 4px 12px ${alpha(
                        theme.palette.primary.main,
                        0.15
                      )}`,
                    },
                    "&.Mui-focused": {
                      transform: "translateY(-1px)",
                      boxShadow: `0 4px 12px ${alpha(
                        theme.palette.primary.main,
                        0.25
                      )}`,
                    },
                  },
                }}
              />
            </Box>
          </Fade>
        </Collapse>

        {/* Quick Actions & Status */}
        <Collapse in={title.length > 0}>
          <Fade in={title.length > 0}>
            <Box sx={{ ml: 8 }}>
              {/* Quick Status Bar */}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  mb: 3,
                  borderRadius: 3,
                  backgroundColor: alpha(theme.palette.background.default, 0.5),
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                >
                  <Typography variant="subtitle2" fontWeight={600}>
                    Ticket Configuration
                  </Typography>
                  <Button
                    startIcon={
                      showAdvanced ? <ExpandLessIcon /> : <ExpandMoreIcon />
                    }
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    size="small"
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 500,
                    }}
                  >
                    {showAdvanced ? "Hide Options" : "More Options"}
                  </Button>
                </Box>

                {/* Quick Status Chips */}
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Chip
                    icon={<PriorityIcon sx={{ fontSize: "1rem" }} />}
                    label={`${priorityConfig.emoji} ${priorityConfig.label}`}
                    size="small"
                    sx={{
                      backgroundColor: `${priorityConfig.color}15`,
                      color: priorityConfig.color,
                      fontWeight: 600,
                      border: `1px solid ${priorityConfig.color}30`,
                    }}
                  />
                  {assignedTo && (
                    <Chip
                      icon={<AssignmentIcon sx={{ fontSize: "1rem" }} />}
                      label={
                        employees.find((emp) => emp.id === assignedTo)?.name ||
                        "Assigned"
                      }
                      size="small"
                      sx={{
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                        border: `1px solid ${alpha(
                          theme.palette.primary.main,
                          0.3
                        )}`,
                      }}
                    />
                  )}
                  {dueDate && (
                    <Chip
                      icon={<ScheduleIcon sx={{ fontSize: "1rem" }} />}
                      label={`Due: ${dueDate.toLocaleDateString()}`}
                      size="small"
                      sx={{
                        backgroundColor: alpha(theme.palette.warning.main, 0.1),
                        color: theme.palette.warning.main,
                        fontWeight: 600,
                        border: `1px solid ${alpha(
                          theme.palette.warning.main,
                          0.3
                        )}`,
                      }}
                    />
                  )}
                  {estimatedHours && (
                    <Chip
                      icon={<TimerIcon sx={{ fontSize: "1rem" }} />}
                      label={`${estimatedHours}h`}
                      size="small"
                      sx={{
                        backgroundColor: alpha(theme.palette.info.main, 0.1),
                        color: theme.palette.info.main,
                        fontWeight: 600,
                        border: `1px solid ${alpha(
                          theme.palette.info.main,
                          0.3
                        )}`,
                      }}
                    />
                  )}
                  {selectedLabels.length > 0 && (
                    <Badge
                      badgeContent={selectedLabels.length}
                      color="secondary"
                    >
                      <Chip
                        icon={<LabelIcon sx={{ fontSize: "1rem" }} />}
                        label="Labels"
                        size="small"
                        sx={{
                          backgroundColor: alpha(
                            theme.palette.secondary.main,
                            0.1
                          ),
                          color: theme.palette.secondary.main,
                          fontWeight: 600,
                          border: `1px solid ${alpha(
                            theme.palette.secondary.main,
                            0.3
                          )}`,
                        }}
                      />
                    </Badge>
                  )}
                </Stack>
              </Paper>

              {/* Advanced Options */}
              <Collapse in={showAdvanced}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 3,
                    backgroundColor: alpha(theme.palette.background.paper, 0.8),
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    sx={{ mb: 2 }}
                  >
                    Advanced Configuration
                  </Typography>

                  {/* First Row - Basic Options */}
                  <Box display="flex" gap={2} mb={3} flexWrap="wrap">
                    <FormControl size="small" sx={{ minWidth: 140 }}>
                      <InputLabel>Priority</InputLabel>
                      <Select
                        value={priority}
                        label="Priority"
                        onChange={(e) => setPriority(e.target.value as any)}
                        sx={{
                          borderRadius: 2,
                          "& .MuiSelect-select": {
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          },
                        }}
                      >
                        <MenuItem value="LOW">🟢 Low</MenuItem>
                        <MenuItem value="MEDIUM">🟡 Medium</MenuItem>
                        <MenuItem value="HIGH">🟠 High</MenuItem>
                        <MenuItem value="URGENT">🔴 Urgent</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 180 }}>
                      <InputLabel>Assign To</InputLabel>
                      <Select
                        value={assignedTo}
                        label="Assign To"
                        onChange={(e) => setAssignedTo(e.target.value)}
                        sx={{ borderRadius: 2 }}
                      >
                        <MenuItem value="">
                          <Box display="flex" alignItems="center" gap={1}>
                            <PersonIcon fontSize="small" />
                            Unassigned
                          </Box>
                        </MenuItem>
                        {employees.map((employee) => (
                          <MenuItem key={employee.id} value={employee.id}>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Avatar
                                sx={{
                                  width: 24,
                                  height: 24,
                                  fontSize: "0.75rem",
                                }}
                              >
                                {getInitials(employee.name)}
                              </Avatar>
                              {employee.name}
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 160 }}>
                      <InputLabel>Customer</InputLabel>
                      <Select
                        value={customerId}
                        label="Customer"
                        onChange={(e) => setCustomerId(e.target.value)}
                        sx={{ borderRadius: 2 }}
                      >
                        <MenuItem value="">
                          <Box display="flex" alignItems="center" gap={1}>
                            <BusinessIcon fontSize="small" />
                            None
                          </Box>
                        </MenuItem>
                        {customers.map((customer) => (
                          <MenuItem key={customer.id} value={customer.id}>
                            <Box display="flex" alignItems="center" gap={1}>
                              <BusinessIcon fontSize="small" />
                              {customer.name}
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 160 }}>
                      <InputLabel>Application</InputLabel>
                      <Select
                        value={applicationId}
                        label="Application"
                        onChange={(e) => setApplicationId(e.target.value)}
                        sx={{ borderRadius: 2 }}
                      >
                        <MenuItem value="">
                          <Box display="flex" alignItems="center" gap={1}>
                            <AppsIcon fontSize="small" />
                            None
                          </Box>
                        </MenuItem>
                        {applications.map((app) => (
                          <MenuItem key={app.id} value={app.id}>
                            <Box display="flex" alignItems="center" gap={1}>
                              <AppsIcon fontSize="small" />
                              {app.name}
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Second Row - Date and Time */}
                  <Box display="flex" gap={2} mb={3} flexWrap="wrap">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Due Date"
                        value={dueDate}
                        onChange={(date) => setDueDate(date)}
                        slotProps={{
                          textField: {
                            size: "small",
                            sx: {
                              minWidth: 180,
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                              },
                            },
                          },
                        }}
                      />
                    </LocalizationProvider>

                    <TextField
                      label="Estimated Hours"
                      type="number"
                      size="small"
                      value={estimatedHours}
                      onChange={(e) => setEstimatedHours(e.target.value)}
                      inputProps={{ min: 0, step: 0.5 }}
                      sx={{
                        minWidth: 160,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Box>

                  {/* Enhanced Labels Section */}
                  <Box sx={{ mb: 2 }}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      mb={2}
                    >
                      <Typography variant="subtitle2" fontWeight={600}>
                        Labels & Tags
                      </Typography>
                      <Button
                        startIcon={<PaletteIcon />}
                        onClick={() => setShowLabelSelector(!showLabelSelector)}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 500,
                        }}
                      >
                        {showLabelSelector ? "Hide Labels" : "Select Labels"}
                      </Button>
                    </Box>

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
                            <Chip
                              key={label.id}
                              label={label.name}
                              size="small"
                              onDelete={() => handleLabelToggle(label)}
                              sx={{
                                backgroundColor: `${label.color}20`,
                                color: label.color,
                                fontWeight: 600,
                                border: `1px solid ${label.color}40`,
                                "& .MuiChip-deleteIcon": {
                                  color: label.color,
                                  "&:hover": {
                                    color: alpha(label.color, 0.8),
                                  },
                                },
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}

                    {/* Enhanced Label Selector */}
                    <Collapse in={showLabelSelector}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          backgroundColor: alpha(
                            theme.palette.background.default,
                            0.5
                          ),
                          border: `1px solid ${alpha(
                            theme.palette.divider,
                            0.2
                          )}`,
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
                              const isSelected = selectedLabels.some(
                                (l) => l.id === label.id
                              );
                              return (
                                <Chip
                                  key={label.id}
                                  label={label.name}
                                  size="small"
                                  clickable
                                  onClick={() => handleLabelToggle(label)}
                                  sx={{
                                    backgroundColor: isSelected
                                      ? `${label.color}30`
                                      : `${label.color}10`,
                                    color: label.color,
                                    fontWeight: isSelected ? 700 : 500,
                                    border: `2px solid ${
                                      isSelected
                                        ? label.color
                                        : `${label.color}30`
                                    }`,
                                    transform: isSelected
                                      ? "scale(1.05)"
                                      : "scale(1)",
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                      backgroundColor: `${label.color}25`,
                                      transform: "scale(1.05)",
                                    },
                                  }}
                                />
                              );
                            })}
                          </Box>
                        )}
                      </Paper>
                    </Collapse>
                  </Box>
                </Paper>
              </Collapse>

              {/* Submit Section */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: alpha(theme.palette.background.paper, 0.9),
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color="textSecondary"
                    >
                      🌟 This ticket will be visible to all team members
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Make sure to provide clear and detailed information
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    endIcon={
                      isPosting ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <SendIcon />
                      )
                    }
                    onClick={handleSubmit}
                    disabled={!title.trim() || !description.trim() || isPosting}
                    size="large"
                    sx={{
                      borderRadius: 3,
                      px: 4,
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 600,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      boxShadow: `0 4px 12px ${alpha(
                        theme.palette.primary.main,
                        0.4
                      )}`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                        boxShadow: `0 6px 16px ${alpha(
                          theme.palette.primary.main,
                          0.5
                        )}`,
                        transform: "translateY(-2px)",
                      },
                      "&:disabled": {
                        background: alpha(
                          theme.palette.action.disabledBackground,
                          0.8
                        ),
                        color: theme.palette.action.disabled,
                        boxShadow: "none",
                        transform: "none",
                      },
                    }}
                  >
                    {isPosting ? "Creating Ticket..." : "Create Ticket"}
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Fade>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default CreateTicketPost;
