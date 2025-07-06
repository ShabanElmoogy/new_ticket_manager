import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  Chip,
  Typography,
  Alert,
  Snackbar,
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
  type Application,
  type Customer,
  type CreateApplicationData,
  type CustomerApplication,
} from "../../services/api";
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';

const ApplicationsManagement: React.FC = () => {
  const { token } = useAuthStore();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingApplication, setEditingApplication] =
    useState<Application | null>(null);
  const [formData, setFormData] = useState<CreateApplicationData>({
    name: "",
    description: "",
    version: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    application: null as Application | null,
    loading: false,
  });

  const fetchData = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const applicationsData = await apiService.getApplications(token);
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

  const handleOpenDialog = (application?: Application) => {
    if (application) {
      setEditingApplication(application);
      setFormData({
        name: application.name,
        description: application.description || "",
        version: application.version || "",
      });
    } else {
      setEditingApplication(null);
      setFormData({
        name: "",
        description: "",
        version: "",
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingApplication(null);
  };

  const handleSubmit = async () => {
    if (!token) return;

    try {
      if (editingApplication) {
        await apiService.updateApplication(
          token,
          editingApplication.id,
          formData
        );
        showSnackbar("Application updated successfully", "success");
      } else {
        await apiService.createApplication(token, formData);
        showSnackbar("Application created successfully", "success");
      }
      handleCloseDialog();
      fetchData();
    } catch (error) {
      showSnackbar(
        error instanceof Error ? error.message : "Error saving application",
        "error"
      );
    }
  };

  const handleDeleteClick = (application: Application) => {
    setDeleteDialog({
      open: true,
      application,
      loading: false,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!token || !deleteDialog.application) return;
    
    setDeleteDialog(prev => ({ ...prev, loading: true }));
    
    try {
      await apiService.deleteApplication(token, deleteDialog.application.id);
      showSnackbar("Application deleted successfully", "success");
      setDeleteDialog({ open: false, application: null, loading: false });
      fetchData();
    } catch (error) {
      showSnackbar(
        error instanceof Error ? error.message : "Error deleting application",
        "error"
      );
      setDeleteDialog(prev => ({ ...prev, loading: false }));
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, application: null, loading: false });
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
      renderCell: (params) => params.value || "-",
    },
    {
      field: "version",
      headerName: "Version",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value || "N/A"}
          size="small"
          color="info"
          variant="outlined"
        />
      ),
    },
    {
      field: "customers",
      headerName: "Customers",
      width: 300,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", py: 1 }}>
          {params.row.customers?.map((ca: CustomerApplication) => (
            <Chip
              key={ca.customerId}
              label={ca.customer?.name}
              size="small"
              color="secondary"
              variant="outlined"
            />
          )) || "-"}
        </Box>
      ),
    },
    {
      field: "ticketCount",
      headerName: "Tickets",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Chip
          label={params.row._count?.tickets || 0}
          size="small"
          color="primary"
        />
      ),
    },
    {
      field: "customerCount",
      headerName: "Customers Count",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Chip
          label={params.row._count?.customers || 0}
          size="small"
          color="success"
        />
      ),
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value ? "Active" : "Inactive"}
          color={params.value ? "success" : "default"}
          size="small"
        />
      ),
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
              onClick={() => handleOpenDialog(params.row as Application)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              onClick={() => handleDeleteClick(params.row as Application)}
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
          Applications Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Application
        </Button>
      </Box>

      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={applications}
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
          {editingApplication ? "Edit Application" : "Create New Application"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
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
              rows={3}
              fullWidth
              autoComplete="off"
            />
            <TextField
              label="Version"
              value={formData.version}
              onChange={(e) =>
                setFormData({ ...formData, version: e.target.value })
              }
              fullWidth
              autoComplete="off"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.name}
          >
            {editingApplication ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        itemName={deleteDialog.application?.name}
        itemType="application"
        loading={deleteDialog.loading}
        warningMessage={
          deleteDialog.application?._count?.tickets && deleteDialog.application._count.tickets > 0
            ? `This application has ${deleteDialog.application._count.tickets} associated ticket(s). Please reassign or delete them first.`
            : undefined
        }
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

export default ApplicationsManagement;
