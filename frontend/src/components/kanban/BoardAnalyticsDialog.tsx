import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { subDays, subMonths } from "date-fns";
import { useKanbanStore } from "../../stores/kanbanStore";
import type { BoardAnalytics } from "../../types/kanban";

interface BoardAnalyticsDialogProps {
  open: boolean;
  onClose: () => void;
  boardId: string;
}

const BoardAnalyticsDialog: React.FC<BoardAnalyticsDialogProps> = ({
  open,
  onClose,
  boardId,
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const { analytics, fetchBoardAnalytics, loading, error } = useKanbanStore();

  const [dateRange, setDateRange] = useState("30days");
  const [startDate, setStartDate] = useState<Date | null>(
    subDays(new Date(), 30)
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [customRange, setCustomRange] = useState(false);

  useEffect(() => {
    if (open && boardId) {
      loadAnalytics();
    }
  }, [open, boardId, dateRange, startDate, endDate]);

  const loadAnalytics = () => {
    let start: string | undefined;
    let end: string | undefined;

    if (customRange && startDate && endDate) {
      start = startDate.toISOString();
      end = endDate.toISOString();
    } else {
      const now = new Date();
      switch (dateRange) {
        case "7days":
          start = subDays(now, 7).toISOString();
          break;
        case "30days":
          start = subDays(now, 30).toISOString();
          break;
        case "3months":
          start = subMonths(now, 3).toISOString();
          break;
        case "6months":
          start = subMonths(now, 6).toISOString();
          break;
      }
      end = now.toISOString();
    }

    fetchBoardAnalytics(boardId, start, end);
  };

  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
    setCustomRange(value === "custom");
  };

  const formatStatusData = () => {
    if (!analytics) return [];

    return analytics.ticketsByStatus.map((item) => ({
      name: item.status.replace("_", " "),
      value: item._count.id,
      color: getStatusColor(item.status),
    }));
  };

  const formatPriorityData = () => {
    if (!analytics) return [];

    return analytics.ticketsByPriority.map((item) => ({
      name: item.priority,
      value: item._count.id,
      color: getPriorityColor(item.priority),
    }));
  };

  const getStatusColor = (status: string) => {
    // Theme-aware status colors
    if (isDarkMode) {
      switch (status) {
        case "OPEN":
          return "#1976d2"; // Blue main
        case "IN_PROGRESS":
          return "#f57c00"; // Orange main
        case "RESOLVED":
          return "#7b1fa2"; // Purple main
        case "CLOSED":
          return "#388e3c"; // Green main
        default:
          return "#616161"; // Grey main
      }
    } else {
      switch (status) {
        case "OPEN":
          return "#e3f2fd"; // Blue light
        case "IN_PROGRESS":
          return "#fff3e0"; // Orange light
        case "RESOLVED":
          return "#f3e5f5"; // Purple light
        case "CLOSED":
          return "#e8f5e8"; // Green light
        default:
          return "#fafafa"; // Grey light
      }
    }
  };

  const getPriorityColor = (priority: string) => {
    // Theme-aware priority colors
    if (isDarkMode) {
      switch (priority) {
        case "URGENT":
          return "#ff5252"; // Lighter red for dark mode
        case "HIGH":
          return "#ffb74d"; // Lighter orange for dark mode
        case "MEDIUM":
          return "#64b5f6"; // Lighter blue for dark mode
        case "LOW":
          return "#81c784"; // Lighter green for dark mode
        default:
          return "#bdbdbd"; // Lighter grey for dark mode
      }
    } else {
      switch (priority) {
        case "URGENT":
          return "#d32f2f"; // Darker red for light mode
        case "HIGH":
          return "#f57c00"; // Darker orange for light mode
        case "MEDIUM":
          return "#1976d2"; // Darker blue for light mode
        case "LOW":
          return "#388e3c"; // Darker green for light mode
        default:
          return "#616161"; // Darker grey for light mode
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogTitle>Board Analytics</DialogTitle>

        <DialogContent>
          {/* Date Range Selector */}
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 4 }}>
                <FormControl fullWidth>
                  <InputLabel>Date Range</InputLabel>
                  <Select
                    value={dateRange}
                    label="Date Range"
                    onChange={(e) => handleDateRangeChange(e.target.value)}
                  >
                    <MenuItem value="7days">Last 7 days</MenuItem>
                    <MenuItem value="30days">Last 30 days</MenuItem>
                    <MenuItem value="3months">Last 3 months</MenuItem>
                    <MenuItem value="6months">Last 6 months</MenuItem>
                    <MenuItem value="custom">Custom Range</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {customRange && (
                <>
                  <Grid size={{ xs: 4 }}>
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={setStartDate}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      onChange={setEndDate}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Box>

          {loading && (
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {analytics && !loading && (
            <Grid container spacing={3}>
              {/* Summary Cards */}
              <Grid size={{ xs: 12, md: 3 }}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Total Tickets
                    </Typography>
                    <Typography variant="h4">
                      {analytics.totalTickets}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Completed
                    </Typography>
                    <Typography variant="h4">
                      {analytics.completedTickets}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Completion Rate
                    </Typography>
                    <Typography variant="h4">
                      {analytics.completionRate}%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Avg. Completion Time
                    </Typography>
                    <Typography variant="h4">
                      {analytics.avgCompletionTime} days
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Charts */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Tickets by Status
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={formatStatusData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}`}
                          outerRadius={80}
                          fill={isDarkMode ? "#90caf9" : "#1976d2"}
                          dataKey="value"
                        >
                          {formatStatusData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: isDarkMode ? "#424242" : "#ffffff",
                            border: `1px solid ${
                              isDarkMode ? "#616161" : "#e0e0e0"
                            }`,
                            borderRadius: "4px",
                            color: isDarkMode ? "#ffffff" : "#000000",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Tickets by Priority
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={formatPriorityData()}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke={isDarkMode ? "#616161" : "#e0e0e0"}
                        />
                        <XAxis
                          dataKey="name"
                          tick={{ fill: isDarkMode ? "#ffffff" : "#000000" }}
                        />
                        <YAxis
                          tick={{ fill: isDarkMode ? "#ffffff" : "#000000" }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: isDarkMode ? "#424242" : "#ffffff",
                            border: `1px solid ${
                              isDarkMode ? "#616161" : "#e0e0e0"
                            }`,
                            borderRadius: "4px",
                            color: isDarkMode ? "#ffffff" : "#000000",
                          }}
                        />
                        <Bar
                          dataKey="value"
                          fill={isDarkMode ? "#90caf9" : "#1976d2"}
                        >
                          {formatPriorityData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default BoardAnalyticsDialog;
