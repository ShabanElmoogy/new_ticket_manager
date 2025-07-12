import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  IconButton,
  Collapse,
  LinearProgress,
  useTheme,
  useMediaQuery,
  Tooltip,
  Badge,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import { useAuthStore } from "../../../stores/authStore";
import { apiService, type User, type Ticket } from "../../../services/api";

interface TeamMember {
  user: User;
  stats: {
    totalAssigned: number;
    completed: number;
    inProgress: number;
    overdue: number;
    completionRate: number;
    avgResolutionTime: number;
    workload: "light" | "moderate" | "heavy";
  };
}

interface TeamStats {
  totalMembers: number;
  activeMembers: number;
  totalTicketsAssigned: number;
  totalTicketsCompleted: number;
  teamCompletionRate: number;
  avgTeamResolutionTime: number;
}

const TeamOverview: React.FC = () => {
  const { user, token } = useAuthStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamStats, setTeamStats] = useState<TeamStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (token && user?.role === "ADMIN") {
      fetchTeamData();
    }
  }, [token, user]);

  const fetchTeamData = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const [users, tickets] = await Promise.all([
        apiService.getUsers(token),
        apiService.getTickets(token, {}),
      ]);

      const teamData = calculateTeamStats(users, tickets);
      setTeamMembers(teamData.members);
      setTeamStats(teamData.stats);
    } catch (error) {
      console.error("Error fetching team data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTeamStats = (users: User[], tickets: Ticket[]) => {
    const now = new Date();
    
    const members: TeamMember[] = users.map(user => {
      const userTickets = tickets.filter(t => t.assignedToId === user.id);
      const completedTickets = userTickets.filter(t => t.status === "RESOLVED" || t.status === "CLOSED");
      const inProgressTickets = userTickets.filter(t => t.status === "IN_PROGRESS");
      
      // Calculate overdue tickets (simplified logic)
      const overdueTickets = userTickets.filter(t => {
        if (t.status === "RESOLVED" || t.status === "CLOSED") return false;
        
        const created = new Date(t.createdAt);
        const hoursElapsed = (now.getTime() - created.getTime()) / (1000 * 60 * 60);
        
        switch (t.priority) {
          case "URGENT": return hoursElapsed > 24;
          case "HIGH": return hoursElapsed > 48;
          case "MEDIUM": return hoursElapsed > 72;
          case "LOW": return hoursElapsed > 120;
          default: return false;
        }
      });

      const completionRate = userTickets.length > 0 
        ? (completedTickets.length / userTickets.length) * 100 
        : 0;

      // Calculate average resolution time
      const avgResolutionTime = completedTickets.length > 0
        ? completedTickets.reduce((sum, ticket) => {
            const created = new Date(ticket.createdAt);
            const updated = new Date(ticket.updatedAt);
            return sum + (updated.getTime() - created.getTime());
          }, 0) / completedTickets.length / (1000 * 60 * 60) // Convert to hours
        : 0;

      // Determine workload
      let workload: "light" | "moderate" | "heavy" = "light";
      if (userTickets.length > 15) workload = "heavy";
      else if (userTickets.length > 8) workload = "moderate";

      return {
        user,
        stats: {
          totalAssigned: userTickets.length,
          completed: completedTickets.length,
          inProgress: inProgressTickets.length,
          overdue: overdueTickets.length,
          completionRate,
          avgResolutionTime,
          workload,
        },
      };
    }).filter(member => member.stats.totalAssigned > 0); // Only show members with assigned tickets

    // Calculate team stats
    const totalTicketsAssigned = members.reduce((sum, member) => sum + member.stats.totalAssigned, 0);
    const totalTicketsCompleted = members.reduce((sum, member) => sum + member.stats.completed, 0);
    const teamCompletionRate = totalTicketsAssigned > 0 
      ? (totalTicketsCompleted / totalTicketsAssigned) * 100 
      : 0;

    const avgTeamResolutionTime = members.length > 0
      ? members.reduce((sum, member) => sum + member.stats.avgResolutionTime, 0) / members.length
      : 0;

    const stats: TeamStats = {
      totalMembers: users.length,
      activeMembers: members.length,
      totalTicketsAssigned,
      totalTicketsCompleted,
      teamCompletionRate,
      avgTeamResolutionTime,
    };

    return { members, stats };
  };

  const getWorkloadColor = (workload: string) => {
    switch (workload) {
      case "light": return "#10b981";
      case "moderate": return "#f59e0b";
      case "heavy": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const getWorkloadIcon = (workload: string) => {
    switch (workload) {
      case "light": return "🟢";
      case "moderate": return "🟡";
      case "heavy": return "🔴";
      default: return "⚪";
    }
  };

  const formatTime = (hours: number) => {
    if (hours < 1) return `${Math.round(hours * 60)}m`;
    if (hours < 24) return `${Math.round(hours)}h`;
    return `${Math.round(hours / 24)}d`;
  };

  const getPerformanceRating = (completionRate: number) => {
    if (completionRate >= 90) return { rating: "Excellent", stars: 5, color: "#10b981" };
    if (completionRate >= 80) return { rating: "Good", stars: 4, color: "#22c55e" };
    if (completionRate >= 70) return { rating: "Average", stars: 3, color: "#eab308" };
    if (completionRate >= 60) return { rating: "Below Average", stars: 2, color: "#f97316" };
    return { rating: "Needs Improvement", stars: 1, color: "#ef4444" };
  };

  if (user?.role !== "ADMIN") {
    return null;
  }

  if (loading) {
    return (
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography>Loading team overview...</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ mb: 3, borderRadius: 3, overflow: "hidden" }}>
      {/* Header */}
      <Box
        sx={{
          p: 2,
          backgroundColor: "warning.main",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <PeopleIcon />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            👥 Team Overview
          </Typography>
          {teamStats && (
            <Chip
              label={`${teamStats.activeMembers} active`}
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
          {/* Team Stats Summary */}
          {teamStats && (
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ height: "100%", borderRadius: 2 }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <PeopleIcon sx={{ fontSize: 40, color: "#3b82f6", mb: 1 }} />
                    <Typography variant="h4" sx={{ fontWeight: 600, color: "#3b82f6" }}>
                      {teamStats.activeMembers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Members
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ height: "100%", borderRadius: 2 }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <AssignmentIcon sx={{ fontSize: 40, color: "#8b5cf6", mb: 1 }} />
                    <Typography variant="h4" sx={{ fontWeight: 600, color: "#8b5cf6" }}>
                      {teamStats.totalTicketsAssigned}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Assigned
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ height: "100%", borderRadius: 2 }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <CheckCircleIcon sx={{ fontSize: 40, color: "#10b981", mb: 1 }} />
                    <Typography variant="h4" sx={{ fontWeight: 600, color: "#10b981" }}>
                      {Math.round(teamStats.teamCompletionRate)}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Team Completion Rate
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ height: "100%", borderRadius: 2 }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <ScheduleIcon sx={{ fontSize: 40, color: "#f59e0b", mb: 1 }} />
                    <Typography variant="h4" sx={{ fontWeight: 600, color: "#f59e0b" }}>
                      {formatTime(teamStats.avgTeamResolutionTime)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Avg Resolution Time
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Team Members */}
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Team Members Performance
          </Typography>

          <Grid container spacing={2}>
            {teamMembers.map((member) => {
              const performance = getPerformanceRating(member.stats.completionRate);
              
              return (
                <Grid item xs={12} sm={6} md={4} key={member.user.id}>
                  <Card sx={{ height: "100%", borderRadius: 2 }}>
                    <CardContent>
                      {/* Member Header */}
                      <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <Badge
                          badgeContent={member.stats.overdue > 0 ? member.stats.overdue : null}
                          color="error"
                        >
                          <Avatar
                            sx={{
                              width: 48,
                              height: 48,
                              backgroundColor: member.user.role === "ADMIN" ? "#ef4444" : "#10b981",
                              fontSize: "1.2rem",
                              fontWeight: 600,
                            }}
                          >
                            {member.user.name.charAt(0)}
                          </Avatar>
                        </Badge>
                        
                        <Box flex={1}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {member.user.name}
                          </Typography>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Chip
                              label={member.user.role}
                              size="small"
                              sx={{
                                height: 20,
                                fontSize: "0.7rem",
                                backgroundColor: member.user.role === "ADMIN" ? "#ef4444" : "#10b981",
                                color: "white",
                                fontWeight: 600,
                              }}
                            />
                            <Chip
                              label={`${getWorkloadIcon(member.stats.workload)} ${member.stats.workload}`}
                              size="small"
                              sx={{
                                height: 20,
                                fontSize: "0.7rem",
                                backgroundColor: getWorkloadColor(member.stats.workload),
                                color: "white",
                                fontWeight: 600,
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>

                      {/* Performance Rating */}
                      <Box mb={2}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                          <Typography variant="body2" color="text.secondary">
                            Performance
                          </Typography>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                sx={{
                                  fontSize: 16,
                                  color: i < performance.stars ? performance.color : "#e5e7eb",
                                }}
                              />
                            ))}
                          </Box>
                        </Box>
                        <Typography variant="caption" sx={{ color: performance.color, fontWeight: 600 }}>
                          {performance.rating}
                        </Typography>
                      </Box>

                      {/* Completion Rate */}
                      <Box mb={2}>
                        <Box display="flex" justifyContent="space-between" mb={0.5}>
                          <Typography variant="body2" color="text.secondary">
                            Completion Rate
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {Math.round(member.stats.completionRate)}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={member.stats.completionRate}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: "rgba(0,0,0,0.1)",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: performance.color,
                              borderRadius: 3,
                            },
                          }}
                        />
                      </Box>

                      {/* Stats Grid */}
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Box textAlign="center" sx={{ p: 1, backgroundColor: "background.default", borderRadius: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: "#3b82f6" }}>
                              {member.stats.totalAssigned}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Assigned
                            </Typography>
                          </Box>
                        </Grid>
                        
                        <Grid item xs={6}>
                          <Box textAlign="center" sx={{ p: 1, backgroundColor: "background.default", borderRadius: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: "#10b981" }}>
                              {member.stats.completed}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Completed
                            </Typography>
                          </Box>
                        </Grid>
                        
                        <Grid item xs={6}>
                          <Box textAlign="center" sx={{ p: 1, backgroundColor: "background.default", borderRadius: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: "#f59e0b" }}>
                              {member.stats.inProgress}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              In Progress
                            </Typography>
                          </Box>
                        </Grid>
                        
                        <Grid item xs={6}>
                          <Box textAlign="center" sx={{ p: 1, backgroundColor: "background.default", borderRadius: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: "#ef4444" }}>
                              {member.stats.overdue}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Overdue
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      {/* Average Resolution Time */}
                      <Box sx={{ mt: 2, textAlign: "center" }}>
                        <Typography variant="caption" color="text.secondary">
                          Avg Resolution: {formatTime(member.stats.avgResolutionTime)}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {teamMembers.length === 0 && (
            <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
              <PeopleIcon sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                No Active Team Members
              </Typography>
              <Typography variant="body2">
                Team members with assigned tickets will appear here
              </Typography>
            </Box>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default TeamOverview;