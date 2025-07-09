import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  Typography,
  Grid,
  Alert,
  Avatar,
  IconButton,
  Paper,
  Stack,
  InputAdornment,
  Fade,
  alpha,
} from "@mui/material";
import {
  Close as CloseIcon,
  Add as AddIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Apps as AppsIcon,
  Schedule as ScheduleIcon,
  Flag as FlagIcon,
  Description as DescriptionIcon,
  Label as LabelIcon,
  CalendarToday as CalendarIcon,
  Assignment as AssignmentIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useKanbanStore } from "../../stores/kanbanStore";
import type { Priority } from "../../types/kanban";
import { ticketApi } from "../../services/ticketApi";
import MyTextField from "../common/MyTextField";

interface CreateTicketDialogProps {
  open: boolean;
  onClose: () => void;
  boardId: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface Application {
  id: string;
  name: string;
  version?: string;
}

const CreateTicketDialog: React.FC<CreateTicketDialogProps> = ({
  open,
  onClose,
  boardId,
}) => {
  console.log('=== DEBUG: CreateTicketDialog rendered ===');
  console.log('CreateTicketDialog open:', open);
  
  const { labels, fetchLabels, fetchBoard } = useKanbanStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM" as Priority,
    assignedToId: "",
    customerId: "",
    applicationId: "",
    dueDate: null as Date | null,
    estimatedHours: "",
    selectedLabels: [] as string[],
  });

  const [users, setUsers] = useState<User[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      fetchLabels();
      fetchUsers();
      fetchCustomers();
      fetchApplications();
    }
  }, [open, fetchLabels]);

  const fetchUsers = async () => {
    try {
      const response = await ticketApi.getUsers();
      setUsers(response);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await ticketApi.getCustomers();
      setCustomers(response);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await ticketApi.getApplications();
      setApplications(response);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const ticketData = {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        assignedToId: formData.assignedToId || undefined,
        customerId: formData.customerId || undefined,
        applicationId: formData.applicationId || undefined,
        boardId,
        dueDate: formData.dueDate?.toISOString(),
        estimatedHours: formData.estimatedHours
          ? parseFloat(formData.estimatedHours)
          : undefined,
        labels: formData.selectedLabels,
      };

      await ticketApi.createTicket(ticketData);

      // Refresh the board to show the new ticket
      await fetchBoard(boardId);

      handleClose();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to create ticket"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      priority: "MEDIUM",
      assignedToId: "",
      customerId: "",
      applicationId: "",
      dueDate: null,
      estimatedHours: "",
      selectedLabels: [],
    });
    setError(null);
    onClose();
  };

  const handleLabelToggle = (labelId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedLabels: prev.selectedLabels.includes(labelId)
        ? prev.selectedLabels.filter((id) => id !== labelId)
        : [...prev.selectedLabels, labelId],
    }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: (theme) =>
              `linear-gradient(145deg, ${alpha(
                theme.palette.background.paper,
                0.98
              )} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
            backdropFilter: "blur(20px)",
            boxShadow: (theme) =>
              `0 24px 48px ${alpha(theme.palette.common.black, 0.12)}`,
            overflow: "visible",
          },
        }}
        TransitionComponent={Fade}
        transitionDuration={400}
      >
        {/* Enhanced Dialog Title */}
        <DialogTitle
          sx={{
            p: 0,
            background: (theme) =>
              `linear-gradient(135deg, ${alpha(
                theme.palette.primary.main,
                0.08
              )} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ p: 3 }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                sx={{
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  width: 48,
                  height: 48,
                  boxShadow: (theme) =>
                    `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
                }}
              >
                <AddIcon sx={{ fontSize: "1.5rem" }} />
              </Avatar>
              <Box>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{
                    background: (theme) =>
                      `linear-gradient(135deg, ${
                        theme.palette.text.primary
                      }, ${alpha(theme.palette.text.primary, 0.8)})`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Create New Ticket
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  Fill in the details to create a new ticket
                </Typography>
              </Box>
            </Stack>

            <IconButton
              onClick={handleClose}
              sx={{
                bgcolor: (theme) => alpha(theme.palette.action.hover, 0.5),
                "&:hover": {
                  bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                  color: "error.main",
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
                border: 1,
                borderColor: "error.light",
              }}
            >
              {error}
            </Alert>
          )}

          <Grid container spacing={3}>
            {/* Basic Information Section */}
            <Grid size={{ xs: 12 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mt: 1,
                  borderRadius: 2,
                  border: 1,
                  borderColor: "divider",
                  background: (theme) =>
                    alpha(theme.palette.background.default, 0.3),
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <AssignmentIcon color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    Basic Information
                  </Typography>
                </Stack>

                <Grid container spacing={2}>
                  {/* Title */}
                  <Grid size={{ xs: 12 }}>
                    <MyTextField
                      label="Ticket Title"
                      placeholder="Enter a descriptive title for your ticket..."
                      fullWidth
                      required
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      startIcon={<DescriptionIcon color="action" />}
                    />
                  </Grid>

                  {/* Description */}
                  <Grid size={{ xs: 12 }}>
                    <MyTextField
                      label="Description"
                      placeholder="Provide detailed information about the ticket..."
                      fullWidth
                      multiline
                      rows={4}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Priority and Assignment Section */}
            <Grid size={{ xs: 12 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: 1,
                  borderColor: "divider",
                  background: (theme) =>
                    alpha(theme.palette.background.default, 0.3),
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <FlagIcon color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    Priority & Assignment
                  </Typography>
                </Stack>

                <Grid container spacing={2}>
                  {/* Priority */}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Priority Level</InputLabel>
                      <Select
                        value={formData.priority}
                        label="Priority Level"
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            priority: e.target.value as Priority,
                          }))
                        }
                        sx={{ borderRadius: 2 }}
                      >
                        <MenuItem value="LOW">
                          <Box display="flex" alignItems="center" gap={1.5}>
                            🟢
                            <Typography>Low Priority</Typography>
                          </Box>
                        </MenuItem>
                        <MenuItem value="MEDIUM">
                          <Box display="flex" alignItems="center" gap={1.5}>
                            🟡
                            <Typography>Medium Priority</Typography>
                          </Box>
                        </MenuItem>
                        <MenuItem value="HIGH">
                          <Box display="flex" alignItems="center" gap={1.5}>
                            🟠
                            <Typography>High Priority</Typography>
                          </Box>
                        </MenuItem>
                        <MenuItem value="URGENT">
                          <Box display="flex" alignItems="center" gap={1.5}>
                            🔴
                            <Typography>Urgent</Typography>
                          </Box>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Assignee */}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Assign To</InputLabel>
                      <Select
                        value={formData.assignedToId}
                        label="Assign To"
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            assignedToId: e.target.value,
                          }))
                        }
                        sx={{ borderRadius: 2 }}
                      >
                        <MenuItem value="">
                          <Box display="flex" alignItems="center" gap={1.5}>
                            <PersonIcon color="disabled" />
                            <Typography>Unassigned</Typography>
                          </Box>
                        </MenuItem>
                        {users.map((user) => (
                          <MenuItem key={user.id} value={user.id}>
                            <Box display="flex" alignItems="center" gap={1.5}>
                              <PersonIcon color="primary" />
                              <Box>
                                <Typography variant="body2" fontWeight={500}>
                                  {user.name}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {user.email}
                                </Typography>
                              </Box>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Organization Section */}
            <Grid size={{ xs: 12 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: 1,
                  borderColor: "divider",
                  background: (theme) =>
                    alpha(theme.palette.background.default, 0.3),
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <BusinessIcon color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    Organization & Application
                  </Typography>
                </Stack>

                <Grid container spacing={2}>
                  {/* Customer */}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Customer</InputLabel>
                      <Select
                        value={formData.customerId}
                        label="Customer"
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            customerId: e.target.value,
                          }))
                        }
                        sx={{ borderRadius: 2 }}
                      >
                        <MenuItem value="">
                          <Box display="flex" alignItems="center" gap={1.5}>
                            <BusinessIcon color="disabled" />
                            <Typography>No Customer</Typography>
                          </Box>
                        </MenuItem>
                        {customers.map((customer) => (
                          <MenuItem key={customer.id} value={customer.id}>
                            <Box display="flex" alignItems="center" gap={1.5}>
                              <BusinessIcon color="info" />
                              <Typography>{customer.name}</Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Application */}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Application</InputLabel>
                      <Select
                        value={formData.applicationId}
                        label="Application"
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            applicationId: e.target.value,
                          }))
                        }
                        sx={{ borderRadius: 2 }}
                      >
                        <MenuItem value="">
                          <Box display="flex" alignItems="center" gap={1.5}>
                            <AppsIcon color="disabled" />
                            <Typography>No Application</Typography>
                          </Box>
                        </MenuItem>
                        {applications.map((app) => (
                          <MenuItem key={app.id} value={app.id}>
                            <Box display="flex" alignItems="center" gap={1.5}>
                              <AppsIcon color="success" />
                              <Box>
                                <Typography variant="body2" fontWeight={500}>
                                  {app.name}
                                </Typography>
                                {app.version && (
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    Version {app.version}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Timeline Section */}
            <Grid size={{ xs: 12 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: 1,
                  borderColor: "divider",
                  background: (theme) =>
                    alpha(theme.palette.background.default, 0.3),
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <ScheduleIcon color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    Timeline & Estimation
                  </Typography>
                </Stack>

                <Grid container spacing={2}>
                  {/* Due Date */}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <DatePicker
                      label="Due Date"
                      value={formData.dueDate}
                      onChange={(date) =>
                        setFormData((prev) => ({ ...prev, dueDate: date }))
                      }
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          InputProps: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <CalendarIcon color="action" />
                              </InputAdornment>
                            ),
                          },
                          sx: {
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          },
                        },
                      }}
                    />
                  </Grid>

                  {/* Estimated Hours */}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <MyTextField
                      label="Estimated Hours"
                      type="number"
                      placeholder="0.0"
                      fullWidth
                      value={formData.estimatedHours}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          estimatedHours: e.target.value,
                        }))
                      }
                      startIcon={<ScheduleIcon />}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Labels Section */}
            {labels.length > 0 && (
              <Grid size={{ xs: 12 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    border: 1,
                    borderColor: "divider",
                    background: (theme) =>
                      alpha(theme.palette.background.default, 0.3),
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                    <LabelIcon color="primary" />
                    <Typography variant="h6" fontWeight={600}>
                      Labels
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ({formData.selectedLabels.length} selected)
                    </Typography>
                  </Stack>

                  <Box display="flex" flexWrap="wrap" gap={1.5}>
                    {labels.map((label) => (
                      <Chip
                        key={label.id}
                        label={label.name}
                        clickable
                        variant={
                          formData.selectedLabels.includes(label.id)
                            ? "filled"
                            : "outlined"
                        }
                        onClick={() => handleLabelToggle(label.id)}
                        sx={{
                          backgroundColor: formData.selectedLabels.includes(
                            label.id
                          )
                            ? label.color
                            : "transparent",
                          color: formData.selectedLabels.includes(label.id)
                            ? "white"
                            : label.color,
                          borderColor: label.color,
                          fontWeight: 500,
                          "&:hover": {
                            backgroundColor: formData.selectedLabels.includes(
                              label.id
                            )
                              ? alpha(label.color, 0.8)
                              : alpha(label.color, 0.1),
                            transform: "translateY(-1px)",
                          },
                          transition: "all 0.2s ease-in-out",
                        }}
                      />
                    ))}
                  </Box>
                </Paper>
              </Grid>
            )}
          </Grid>
        </DialogContent>

        <DialogActions
          sx={{
            p: 3,
            borderTop: 1,
            borderColor: "divider",
            background: (theme) => alpha(theme.palette.background.default, 0.5),
          }}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading || !formData.title.trim()}
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1,
              textTransform: "none",
              fontWeight: 600,
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              boxShadow: (theme) =>
                `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
              "&:hover": {
                boxShadow: (theme) =>
                  `0 12px 32px ${alpha(theme.palette.primary.main, 0.4)}`,
                transform: "translateY(-1px)",
              },
              "&:disabled": {
                background: (theme) =>
                  alpha(theme.palette.action.disabled, 0.3),
                boxShadow: "none",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            {loading ? "Creating..." : "Create Ticket"}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default CreateTicketDialog;
