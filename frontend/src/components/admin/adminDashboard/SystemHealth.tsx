import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  IconButton,
  Collapse,
  useTheme,
  Tooltip,
  Alert,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Storage as StorageIcon,
  Speed as SpeedIcon,
  NetworkCheck as NetworkIcon,
  Security as SecurityIcon,
  Update as UpdateIcon,
} from "@mui/icons-material";
import { useAuthStore } from "../../../stores/authStore";

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: "healthy" | "warning" | "critical";
  icon: React.ReactNode;
  description: string;
  threshold: {
    warning: number;
    critical: number;
  };
}

interface SystemAlert {
  id: string;
  type: "info" | "warning" | "error" | "success";
  title: string;
  message: string;
  timestamp: string;
}

const SystemHealth: React.FC = () => {
  const { user } = useAuthStore();
  const theme = useTheme();
  const [expanded, setExpanded] = useState(true);
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      fetchSystemHealth();
      // Set up periodic updates
      const interval = setInterval(fetchSystemHealth, 30000); // Update every 30 seconds
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchSystemHealth = async () => {
    try {
      setLoading(true);
      
      // Simulate system health data (in a real app, this would come from your backend)
      const mockMetrics: SystemMetric[] = [
        {
          id: "cpu",
          name: "CPU Usage",
          value: Math.random() * 100,
          unit: "%",
          status: "healthy",
          icon: <SpeedIcon />,
          description: "Server CPU utilization",
          threshold: { warning: 70, critical: 90 },
        },
        {
          id: "memory",
          name: "Memory Usage",
          value: Math.random() * 100,
          unit: "%",
          status: "healthy",
          icon: <StorageIcon />,
          description: "Server memory utilization",
          threshold: { warning: 80, critical: 95 },
        },
        {
          id: "disk",
          name: "Disk Usage",
          value: Math.random() * 100,
          unit: "%",
          status: "healthy",
          icon: <StorageIcon />,
          description: "Disk space utilization",
          threshold: { warning: 85, critical: 95 },
        },
        {
          id: "network",
          name: "Network Latency",
          value: Math.random() * 200,
          unit: "ms",
          status: "healthy",
          icon: <NetworkIcon />,
          description: "Average network response time",
          threshold: { warning: 100, critical: 200 },
        },
        {
          id: "database",
          name: "Database Connections",
          value: Math.random() * 100,
          unit: "",
          status: "healthy",
          icon: <StorageIcon />,
          description: "Active database connections",
          threshold: { warning: 80, critical: 95 },
        },
        {
          id: "uptime",
          name: "System Uptime",
          value: 99.9,
          unit: "%",
          status: "healthy",
          icon: <CheckCircleIcon />,
          description: "System availability",
          threshold: { warning: 99, critical: 95 },
        },
      ];

      // Determine status based on thresholds
      const updatedMetrics = mockMetrics.map(metric => {
        let status: "healthy" | "warning" | "critical" = "healthy";
        
        if (metric.id === "uptime") {
          // For uptime, lower values are worse
          if (metric.value < metric.threshold.critical) status = "critical";
          else if (metric.value < metric.threshold.warning) status = "warning";
        } else {
          // For other metrics, higher values are worse
          if (metric.value > metric.threshold.critical) status = "critical";
          else if (metric.value > metric.threshold.warning) status = "warning";
        }

        return { ...metric, status };
      });

      setMetrics(updatedMetrics);

      // Generate alerts based on metrics
      const newAlerts: SystemAlert[] = [];
      updatedMetrics.forEach(metric => {
        if (metric.status === "critical") {
          newAlerts.push({
            id: `alert-${metric.id}-${Date.now()}`,
            type: "error",
            title: `Critical: ${metric.name}`,
            message: `${metric.name} is at ${metric.value.toFixed(1)}${metric.unit}, which exceeds the critical threshold.`,
            timestamp: new Date().toISOString(),
          });
        } else if (metric.status === "warning") {
          newAlerts.push({
            id: `alert-${metric.id}-${Date.now()}`,
            type: "warning",
            title: `Warning: ${metric.name}`,
            message: `${metric.name} is at ${metric.value.toFixed(1)}${metric.unit}, approaching critical levels.`,
            timestamp: new Date().toISOString(),
          });
        }
      });

      // Add some general system alerts
      if (Math.random() > 0.7) {
        newAlerts.push({
          id: `info-${Date.now()}`,
          type: "info",
          title: "System Update Available",
          message: "A new system update is available for installation.",
          timestamp: new Date().toISOString(),
        });
      }

      setAlerts(newAlerts);
    } catch (error) {
      console.error("Error fetching system health:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "#10b981";
      case "warning": return "#f59e0b";
      case "critical": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy": return <CheckCircleIcon sx={{ color: "#10b981" }} />;
      case "warning": return <WarningIcon sx={{ color: "#f59e0b" }} />;
      case "critical": return <ErrorIcon sx={{ color: "#ef4444" }} />;
      default: return <InfoIcon sx={{ color: "#6b7280" }} />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircleIcon />;
      case "warning": return <WarningIcon />;
      case "error": return <ErrorIcon />;
      case "info": return <InfoIcon />;
      default: return <InfoIcon />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  if (user?.role !== "ADMIN") {
    return null;
  }

  return (
    <Paper sx={{ mb: 3, borderRadius: 3, overflow: "hidden" }}>
      {/* Header */}
      <Box
        sx={{
          p: 2,
          backgroundColor: "success.main",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <SecurityIcon />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            🔧 System Health
          </Typography>
          {alerts.length > 0 && (
            <Chip
              label={`${alerts.length} alerts`}
              size="small"
              sx={{
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "white",
                fontWeight: 600,
              }}
            />
          )}
        </Box>
        <IconButton size="small" sx={{ color: "white" }}>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ p: 3 }}>
          {/* System Metrics */}
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            System Metrics
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {metrics.map((metric) => (
              <Grid item xs={12} sm={6} md={4} key={metric.id}>
                <Card sx={{ height: "100%", borderRadius: 2 }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Box sx={{ color: getStatusColor(metric.status) }}>
                        {metric.icon}
                      </Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {metric.name}
                      </Typography>
                      {getStatusIcon(metric.status)}
                    </Box>

                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                      {metric.value.toFixed(1)}{metric.unit}
                    </Typography>

                    <LinearProgress
                      variant="determinate"
                      value={metric.id === "uptime" ? metric.value : Math.min(metric.value, 100)}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "rgba(0,0,0,0.1)",
                        mb: 1,
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: getStatusColor(metric.status),
                          borderRadius: 4,
                        },
                      }}
                    />

                    <Typography variant="caption" color="text.secondary">
                      {metric.description}
                    </Typography>

                    <Box display="flex" justifyContent="space-between" mt={1}>
                      <Typography variant="caption" color="text.disabled">
                        Warning: {metric.threshold.warning}{metric.unit}
                      </Typography>
                      <Typography variant="caption" color="text.disabled">
                        Critical: {metric.threshold.critical}{metric.unit}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* System Alerts */}
          {alerts.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                System Alerts
              </Typography>
              
              <Box sx={{ maxHeight: "300px", overflow: "auto" }}>
                {alerts.map((alert) => (
                  <Alert
                    key={alert.id}
                    severity={alert.type}
                    icon={getAlertIcon(alert.type)}
                    sx={{ mb: 1, borderRadius: 2 }}
                  >
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {alert.title}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        {alert.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatTimestamp(alert.timestamp)}
                      </Typography>
                    </Box>
                  </Alert>
                ))}
              </Box>
            </>
          )}

          {/* System Status Summary */}
          <Box sx={{ mt: 3, p: 2, backgroundColor: "background.default", borderRadius: 2 }}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <UpdateIcon sx={{ color: "primary.main" }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                System Status Summary
              </Typography>
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Box textAlign="center">
                  <Typography variant="h3" sx={{ color: "#10b981", fontWeight: 600 }}>
                    {metrics.filter(m => m.status === "healthy").length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Healthy Services
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Box textAlign="center">
                  <Typography variant="h3" sx={{ color: "#f59e0b", fontWeight: 600 }}>
                    {metrics.filter(m => m.status === "warning").length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Warning Services
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Box textAlign="center">
                  <Typography variant="h3" sx={{ color: "#ef4444", fontWeight: 600 }}>
                    {metrics.filter(m => m.status === "critical").length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Critical Services
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default SystemHealth;