import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  IconButton,
  Collapse,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  PictureAsPdf as PdfIcon,
  FileDownload as DownloadIcon,
  Assessment as ReportIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
import { useAuthStore } from "../../stores/authStore";
import type { ReportType, ReportConfig } from "./types";

const REPORT_CONFIGS: ReportConfig[] = [
  {
    type: "ticket-summary",
    title: "Ticket Summary Report",
    description: "Comprehensive overview of all tickets with status breakdown",
    icon: <ReportIcon />,
    color: "#1976d2",
  },
  {
    type: "performance-analytics",
    title: "Performance Analytics",
    description: "Resolution times, efficiency metrics, and performance trends",
    icon: <ReportIcon />,
    color: "#2e7d32",
    adminOnly: true,
  },
  {
    type: "team-productivity",
    title: "Team Productivity Report",
    description: "Individual and team performance metrics",
    icon: <ReportIcon />,
    color: "#7b1fa2",
    adminOnly: true,
  },
  {
    type: "customer-report",
    title: "Customer Activity Report",
    description: "Customer ticket history and satisfaction metrics",
    icon: <ReportIcon />,
    color: "#f57c00",
  },
  {
    type: "sla-compliance",
    title: "SLA Compliance Report",
    description: "Service level agreement compliance and breach analysis",
    icon: <ReportIcon />,
    color: "#d32f2f",
    adminOnly: true,
  },
  {
    type: "monthly-summary",
    title: "Monthly Summary",
    description: "Complete monthly overview with key metrics and trends",
    icon: <ReportIcon />,
    color: "#388e3c",
    adminOnly: true,
  },
];

const ReportGenerator: React.FC = () => {
  const { user } = useAuthStore();
  const [expanded, setExpanded] = useState(true);
  const [selectedReport, setSelectedReport] =
    useState<ReportType>("ticket-summary");
  const [dateFrom, setDateFrom] = useState<Date | null>(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  );
  const [dateTo, setDateTo] = useState<Date | null>(new Date());
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter reports based on user role
  const availableReports = REPORT_CONFIGS.filter(
    (report) => !report.adminOnly || user?.role === "ADMIN"
  );

  const handleGenerateReport = async () => {
    if (!dateFrom || !dateTo) {
      setError("Please select both start and end dates");
      return;
    }

    if (dateFrom > dateTo) {
      setError("Start date cannot be after end date");
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      console.log("Generating report with params:", {
        type: selectedReport,
        dateFrom,
        dateTo,
        user: user?.name,
      });

      // Import the simple PDF generator
      const { generatePDFReport } = await import("./SimplePDFGenerator");

      await generatePDFReport({
        type: selectedReport,
        dateFrom,
        dateTo,
        user: user!,
      });

      console.log("Report generation completed successfully!");
    } catch (error) {
      console.error("Error generating report:", error);
      setError(
        `Failed to generate report: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setGenerating(false);
    }
  };

  const selectedConfig = REPORT_CONFIGS.find((r) => r.type === selectedReport);

  return (
    <Paper sx={{ mb: 3, borderRadius: 3, overflow: "hidden" }}>
      {/* Header */}
      <Box
        sx={{
          p: 2,
          backgroundColor: "secondary.main",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <PdfIcon />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            📊 Report Generator
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: "white" }}>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ p: 3 }}>
          {error && (
            <Alert
              severity="error"
              sx={{ mb: 3 }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}

          <Grid container spacing={3}>
            {/* Report Selection */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Select Report Type
                  </Typography>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Report Type</InputLabel>
                    <Select
                      value={selectedReport}
                      label="Report Type"
                      onChange={(e) =>
                        setSelectedReport(e.target.value as ReportType)
                      }
                    >
                      {availableReports.map((report) => (
                        <MenuItem key={report.type} value={report.type}>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Box sx={{ color: report.color }}>
                              {report.icon}
                            </Box>
                            {report.title}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {selectedConfig && (
                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: "background.default",
                        borderRadius: 2,
                        border: `2px solid ${selectedConfig.color}`,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, mb: 1 }}
                      >
                        {selectedConfig.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedConfig.description}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Date Range Selection */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Date Range
                  </Typography>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <TextField
                      label="From Date"
                      type="date"
                      value={
                        dateFrom ? dateFrom.toISOString().split("T")[0] : ""
                      }
                      onChange={(e) =>
                        setDateFrom(
                          e.target.value ? new Date(e.target.value) : null
                        )
                      }
                      fullWidth
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      label="To Date"
                      type="date"
                      value={dateTo ? dateTo.toISOString().split("T")[0] : ""}
                      onChange={(e) =>
                        setDateTo(
                          e.target.value ? new Date(e.target.value) : null
                        )
                      }
                      fullWidth
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Box>

                  <Box sx={{ mt: 3 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      startIcon={
                        generating ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <DownloadIcon />
                        )
                      }
                      onClick={handleGenerateReport}
                      disabled={generating || !dateFrom || !dateTo}
                      sx={{
                        backgroundColor:
                          selectedConfig?.color || "primary.main",
                        "&:hover": {
                          backgroundColor:
                            selectedConfig?.color || "primary.dark",
                          opacity: 0.9,
                        },
                      }}
                    >
                      {generating
                        ? "Generating Report..."
                        : "Generate PDF Report"}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Quick Actions */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Quick Reports
            </Typography>
            <Grid container spacing={2}>
              {[
                { label: "Last 7 Days", days: 7 },
                { label: "Last 30 Days", days: 30 },
                { label: "Last 90 Days", days: 90 },
                { label: "This Year", days: 365 },
              ].map((period) => (
                <Grid size={{ xs: 6, sm: 3 }} key={period.label}>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="small"
                    onClick={() => {
                      const now = new Date();
                      const from = new Date(
                        now.getTime() - period.days * 24 * 60 * 60 * 1000
                      );
                      setDateFrom(from);
                      setDateTo(now);
                    }}
                  >
                    {period.label}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default ReportGenerator;
