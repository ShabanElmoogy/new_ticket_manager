import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Typography,
  Alert,
  Snackbar,
  Tooltip,
  IconButton,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { useAuthStore } from "../../stores/authStore";
import {
  apiService,
  type Ticket,
  type User,
  type Customer,
  type Application,
  type CreateTicketData,
} from "../../services/api";
import DeleteConfirmDialog from "../common/DeleteConfirmDialog";

const TicketsManagement: React.FC = () => {
  const { token } = useAuthStore();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [formData, setFormData] = useState<CreateTicketData>({
    title: "",
    description: "",
    priority: "MEDIUM",
    assignedToId: "",
    customerId: "",
    applicationId: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    ticket: null as Ticket | null,
    loading: false,
  });

  const fetchData = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const [ticketsData, usersData, customersData, applicationsData] =
        await Promise.all([
          apiService.getTickets(token, {}),
          apiService.getUsers(token),
          apiService.getCustomers(token),
          apiService.getApplications(token),
        ]);
      setTickets(ticketsData);
      setUsers(usersData);
      setCustomers(customersData);
      setApplications(applicationsData);
    } catch (error) {
      showSnackbar("Error fetching data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleOpenDialog = (ticket?: Ticket) => {
    if (ticket) {
      setEditingTicket(ticket);
      setFormData({
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        assignedToId: ticket.assignedToId || "",
        customerId: ticket.customerId || "",
        applicationId: ticket.applicationId || "",
      });
    } else {
      setEditingTicket(null);
      setFormData({
        title: "",
        description: "",
        priority: "MEDIUM",
        assignedToId: "",
        customerId: "",
        applicationId: "",
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingTicket(null);
  };

  const handleSubmit = async () => {
    if (!token) return;

    try {
      const submitData = {
        ...formData,
        assignedToId: formData.assignedToId || undefined,
        customerId: formData.customerId || undefined,
        applicationId: formData.applicationId || undefined,
      };

      if (editingTicket) {
        await apiService.updateTicket(token, editingTicket.id, submitData);
        showSnackbar("Ticket updated successfully", "success");
      } else {
        await apiService.createTicket(token, submitData);
        showSnackbar("Ticket created successfully", "success");
      }
      handleCloseDialog();
      fetchData();
    } catch (error) {
      showSnackbar(
        error instanceof Error ? error.message : "Error saving ticket",
        "error"
      );
    }
  };

  const handleDeleteClick = (ticket: Ticket) => {
    setDeleteDialog({
      open: true,
      ticket,
      loading: false,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!token || !deleteDialog.ticket) return;

    setDeleteDialog((prev) => ({ ...prev, loading: true }));

    try {
      await apiService.deleteTicket(token, deleteDialog.ticket.id);
      showSnackbar("Ticket deleted successfully", "success");
      setDeleteDialog({ open: false, ticket: null, loading: false });
      fetchData();
    } catch (error) {
      showSnackbar(
        error instanceof Error ? error.message : "Error deleting ticket",
        "error"
      );
      setDeleteDialog((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, ticket: null, loading: false });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "info";
      case "IN_PROGRESS":
        return "warning";
      case "RESOLVED":
        return "success";
      case "CLOSED":
        return "default";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "LOW":
        return "success";
      case "MEDIUM":
        return "warning";
      case "HIGH":
        return "error";
      case "URGENT":
        return "error";
      default:
        return "default";
    }
  };

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      width: 250,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight="medium">
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value) as any}
          size="small"
        />
      ),
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getPriorityColor(params.value) as any}
          size="small"
        />
      ),
    },
    {
      field: "customer",
      headerName: "Customer",
      width: 150,
      renderCell: (params) => params.row.customer?.name || "-",
    },
    {
      field: "application",
      headerName: "Application",
      width: 150,
      renderCell: (params) => params.row.application?.name || "-",
    },
    {
      field: "assignedTo",
      headerName: "Assigned To",
      width: 150,
      renderCell: (params) => params.row.assignedTo?.name || "Unassigned",
    },
    {
      field: "createdBy",
      headerName: "Created By",
      width: 150,
      renderCell: (params) => params.row.createdBy?.name || "-",
    },
    {
      field: "createdAt",
      headerName: "Created",
      width: 120,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={() => handleOpenDialog(params.row as Ticket)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              onClick={() => handleDeleteClick(params.row as Ticket)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          Tickets Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Ticket
        </Button>
      </Box>

      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={tickets}
          columns={columns}
          loading={loading}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          disableRowSelectionOnClick
          sx={{
            "& .MuiDataGrid-cell": {
              borderBottom: (theme) =>
                `1px solid ${
                  theme.palette.mode === "dark" ? "#333" : "#f0f0f0"
                }`,
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.08)"
                  : "#f5f5f5",
            },
          }}
        />
      </Box>

      {/* Create/Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingTicket ? "Edit Ticket" : "Create New Ticket"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <TextField
              label="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              fullWidth
              autoComplete="off"
            />
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              multiline
              rows={4}
              required
              fullWidth
              autoComplete="off"
            />
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value as any })
                }
                inputProps={{ autoComplete: "off" }}
              >
                <MenuItem value="LOW">Low</MenuItem>
                <MenuItem value="MEDIUM">Medium</MenuItem>
                <MenuItem value="HIGH">High</MenuItem>
                <MenuItem value="URGENT">Urgent</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Customer</InputLabel>
              <Select
                value={formData.customerId}
                onChange={(e) =>
                  setFormData({ ...formData, customerId: e.target.value })
                }
                inputProps={{ autoComplete: "off" }}
              >
                <MenuItem value="">None</MenuItem>
                {customers.map((customer) => (
                  <MenuItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Application</InputLabel>
              <Select
                value={formData.applicationId}
                onChange={(e) =>
                  setFormData({ ...formData, applicationId: e.target.value })
                }
                inputProps={{ autoComplete: "off" }}
              >
                <MenuItem value="">None</MenuItem>
                {applications.map((app) => (
                  <MenuItem key={app.id} value={app.id}>
                    {app.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Assign To</InputLabel>
              <Select
                value={formData.assignedToId}
                onChange={(e) =>
                  setFormData({ ...formData, assignedToId: e.target.value })
                }
                inputProps={{ autoComplete: "off" }}
              >
                <MenuItem value="">Unassigned</MenuItem>
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name} ({user.role})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.title || !formData.description}
          >
            {editingTicket ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        itemName={deleteDialog.ticket?.title}
        itemType="ticket"
        loading={deleteDialog.loading}
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TicketsManagement;
