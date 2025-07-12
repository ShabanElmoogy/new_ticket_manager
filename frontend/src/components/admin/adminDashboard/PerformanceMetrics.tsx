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
  useTheme,
  IconButton,
  Collapse,
} from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Schedule as ScheduleIcon,
  Assignment as AssignmentIcon,
  Speed as SpeedIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import { useAuthStore } from "../../../stores/authStore";
import { apiService, type Ticket, type User } from "../../../services/api";

interface PerformanceData {
  avgResolutionTime: number;
  ticketsResolvedToday: number;
  ticketsResolvedThisWeek: number;
  overdueTickets: number;
  userPerformance: UserPerformance[];
  priorityDistribution: PriorityDistribution[];
}

interface UserPerformance {
  user: User;
  assignedTickets: number;
  resolvedTickets: number;
  avgResolutionTime: number;
  efficiency: number;
}

interface PriorityDistribution {
  priority: string;
  count: number;
  percentage: number;
  color: string;
}

const PerformanceMetrics: React.FC = () => {
  const { user, token } = useAuthStore();
  const theme = useTheme();
  const [performanceData, setPerformanceData] =
    useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (token && user?.role === "ADMIN") {
      fetchPerformanceData();
    }
  }, [token, user]);

  const fetchPerformanceData = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const [tickets, users] = await Promise.all([
        apiService.getTickets(token, {}),
        apiService.getUsers(token),
      ]);

      const performanceData = calculatePerformanceMetrics(tickets, users);
      setPerformanceData(performanceData);
    } catch (error) {
      console.error("Error fetching performance data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePerformanceMetrics = (
    tickets: Ticket[],
    users: User[]
  ): PerformanceData => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Calculate resolution times
    const resolvedTickets = tickets.filter((t) => t.status === "RESOLVED");
    const avgResolutionTime =
      resolvedTickets.length > 0
        ? resolvedTickets.reduce((sum, ticket) => {
            const created = new Date(ticket.createdAt);
            const updated = new Date(ticket.updatedAt);
            return sum + (updated.getTime() - created.getTime());
          }, 0) /
          resolvedTickets.length /
          (1000 * 60 * 60) // Convert to hours
        : 0;

    // Tickets resolved today and this week
    const ticketsResolvedToday = resolvedTickets.filter(
      (t) => new Date(t.updatedAt) >= today
    ).length;

    const ticketsResolvedThisWeek = resolvedTickets.filter(
      (t) => new Date(t.updatedAt) >= weekAgo
    ).length;

    // Overdue tickets (assuming 48 hours for high priority, 72 for medium, 120 for low)
    const overdueTickets = tickets.filter((t) => {
      if (t.status === "RESOLVED" || t.status === "CLOSED") return false;

      const created = new Date(t.createdAt);
      const hoursElapsed =
        (now.getTime() - created.getTime()) / (1000 * 60 * 60);

      switch (t.priority) {
        case "URGENT":
          return hoursElapsed > 24;
        case "HIGH":
          return hoursElapsed > 48;
        case "MEDIUM":
          return hoursElapsed > 72;
        case "LOW":
          return hoursElapsed > 120;
        default:
          return false;
      }
    }).length;

    // User performance
    const userPerformance: UserPerformance[] = users
      .map((user) => {
        const userTickets = tickets.filter((t) => t.assignedToId === user.id);
        const userResolved = userTickets.filter((t) => t.status === "RESOLVED");

        const userAvgResolution =
          userResolved.length > 0
            ? userResolved.reduce((sum, ticket) => {
                const created = new Date(ticket.createdAt);
                const updated = new Date(ticket.updatedAt);
                return sum + (updated.getTime() - created.getTime());
              }, 0) /
              userResolved.length /
              (1000 * 60 * 60)
            : 0;

        const efficiency =
          userTickets.length > 0
            ? (userResolved.length / userTickets.length) * 100
            : 0;

        return {
          user,
          assignedTickets: userTickets.length,
          resolvedTickets: userResolved.length,
          avgResolutionTime: userAvgResolution,
          efficiency,
        };
      })
      .filter((up) => up.assignedTickets > 0);

    // Priority distribution
    const priorityCounts = tickets.reduce((acc, ticket) => {
      acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const priorityDistribution: PriorityDistribution[] = Object.entries(
      priorityCounts
    ).map(([priority, count]) => ({
      priority,
      count,
      percentage: (count / tickets.length) * 100,
      color: getPriorityColor(priority),
    }));

    return {
      avgResolutionTime,
      ticketsResolvedToday,
      ticketsResolvedThisWeek,
      overdueTickets,
      userPerformance,
      priorityDistribution,
    };
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "URGENT":
        return "#ef4444";
      case "HIGH":
        return "#f97316";
      case "MEDIUM":
        return "#eab308";
      case "LOW":
        return "#22c55e";
      default:
        return "#6b7280";
    }
  };

  const formatTime = (hours: number) => {
    if (hours < 1) return `${Math.round(hours * 60)}m`;
    if (hours < 24) return `${Math.round(hours)}h`;
    return `${Math.round(hours / 24)}d`;
  };

  if (user?.role !== "ADMIN") {
    return null;
  }

  if (loading) {
    return (
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography>Loading performance metrics...</Typography>
      </Paper>
    );
  }

  if (!performanceData) {
    return null;
  }

  return (
    <Paper sx={{ mb: 3, borderRadius: 3, overflow: "hidden" }}>
      {/* Header */}
      <Box
        sx={{
          p: 2,
          backgroundColor: "primary.main",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <SpeedIcon />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            📊 Performance Metrics
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: "white" }}>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ p: 3 }}>
          {/* Key Metrics */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: "100%", borderRadius: 2 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <ScheduleIcon sx={{ color: "#3b82f6" }} />
                    <Typography variant="subtitle2" color="text.secondary">
                      Avg Resolution Time
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 600, color: "#3b82f6" }}
                  >
                    {formatTime(performanceData.avgResolutionTime)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: "100%", borderRadius: 2 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <TrendingUpIcon sx={{ color: "#10b981" }} />
                    <Typography variant="subtitle2" color="text.secondary">
                      Resolved Today
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 600, color: "#10b981" }}
                  >
                    {performanceData.ticketsResolvedToday}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: "100%", borderRadius: 2 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <AssignmentIcon sx={{ color: "#8b5cf6" }} />
                    <Typography variant="subtitle2" color="text.secondary">
                      Resolved This Week
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 600, color: "#8b5cf6" }}
                  >
                    {performanceData.ticketsResolvedThisWeek}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: "100%", borderRadius: 2 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <TrendingDownIcon sx={{ color: "#ef4444" }} />
                    <Typography variant="subtitle2" color="text.secondary">
                      Overdue Tickets
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 600, color: "#ef4444" }}
                  >
                    {performanceData.overdueTickets}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Priority Distribution */}
          <Card sx={{ mb: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Priority Distribution
              </Typography>
              <Grid container spacing={2}>
                {performanceData.priorityDistribution.map((item) => (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.priority}>
                    <Box>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1}
                      >
                        <Chip
                          label={item.priority}
                          size="small"
                          sx={{
                            backgroundColor: item.color,
                            color: "white",
                            fontWeight: 600,
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {item.count} ({Math.round(item.percentage)}%)
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={item.percentage}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: "rgba(0,0,0,0.1)",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: item.color,
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* User Performance */}
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Team Performance
              </Typography>
              <Grid container spacing={2}>
                {performanceData.userPerformance.map((userPerf) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={userPerf.user.id}>
                    <Box
                      sx={{
                        p: 2,
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 2,
                        backgroundColor: "background.default",
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            backgroundColor:
                              userPerf.user.role === "ADMIN"
                                ? "#ef4444"
                                : "#10b981",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                          }}
                        >
                          {userPerf.user.name.charAt(0)}
                        </Box>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600 }}
                          >
                            {userPerf.user.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {userPerf.user.role}
                          </Typography>
                        </Box>
                      </Box>

                      <Box mb={1}>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          mb={0.5}
                        >
                          <Typography variant="caption" color="text.secondary">
                            Efficiency
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ fontWeight: 600 }}
                          >
                            {Math.round(userPerf.efficiency)}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={userPerf.efficiency}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: "rgba(0,0,0,0.1)",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor:
                                userPerf.efficiency > 75
                                  ? "#10b981"
                                  : userPerf.efficiency > 50
                                  ? "#eab308"
                                  : "#ef4444",
                              borderRadius: 3,
                            },
                          }}
                        />
                      </Box>

                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="caption" color="text.secondary">
                          Assigned: {userPerf.assignedTickets}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Resolved: {userPerf.resolvedTickets}
                        </Typography>
                      </Box>

                      <Typography variant="caption" color="text.secondary">
                        Avg Resolution: {formatTime(userPerf.avgResolutionTime)}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default PerformanceMetrics;
