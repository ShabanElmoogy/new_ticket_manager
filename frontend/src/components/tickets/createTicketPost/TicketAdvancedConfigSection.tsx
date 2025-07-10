import React from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Avatar,
  Collapse,
  Paper,
  useTheme,
} from "@mui/material";
import {
  Person as PersonIcon,
  Business as BusinessIcon,
  Apps as AppsIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { alpha } from "@mui/material/styles";
import type { User, Customer, Application } from "./types";

interface TicketAdvancedConfigSectionProps {
  showAdvanced: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  onPriorityChange: (priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT") => void;
  assignedTo: string;
  onAssignedToChange: (assignedTo: string) => void;
  customerId: string;
  onCustomerChange: (customerId: string) => void;
  applicationId: string;
  onApplicationChange: (applicationId: string) => void;
  dueDate: Date | null;
  onDueDateChange: (date: Date | null) => void;
  estimatedHours: string;
  onEstimatedHoursChange: (hours: string) => void;
  employees: User[];
  customers: Customer[];
  applications: Application[];
}

const TicketAdvancedConfigSection: React.FC<
  TicketAdvancedConfigSectionProps
> = ({
  showAdvanced,
  priority,
  onPriorityChange,
  assignedTo,
  onAssignedToChange,
  customerId,
  onCustomerChange,
  applicationId,
  onApplicationChange,
  dueDate,
  onDueDateChange,
  estimatedHours,
  onEstimatedHoursChange,
  employees,
  customers,
  applications,
}) => {
  const theme = useTheme();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
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
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>
          Advanced Configuration
        </Typography>

        {/* First Row - Basic Options */}
        <Box display="flex" gap={2} mb={3} flexWrap="wrap">
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              label="Priority"
              onChange={(e) => onPriorityChange(e.target.value as any)}
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
              onChange={(e) => onAssignedToChange(e.target.value)}
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
              onChange={(e) => onCustomerChange(e.target.value)}
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
              onChange={(e) => onApplicationChange(e.target.value)}
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
              onChange={onDueDateChange}
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
            onChange={(e) => onEstimatedHoursChange(e.target.value)}
            inputProps={{ min: 0, step: 0.5 }}
            sx={{
              minWidth: 160,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Box>
      </Paper>
    </Collapse>
  );
};

export default TicketAdvancedConfigSection;
