import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  IconButton,
  Collapse,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Assignment as TicketIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  Visibility as ViewIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import { useAuthStore } from "../../stores/authStore";
import { apiService, type Ticket } from "../../services/api";

interface RecentTicketsProps {
  onTicketClick: (ticket: Ticket) => void;
  limit?: number;
}

const RecentTickets: React.FC<RecentTicketsProps> = ({ 
  onTicketClick, 
  limit = 10 
}) => {
  const { user, token } = useAuthStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (token) {
      fetchRecentTickets();
    }
  }, [token]);

  const fetchRecentTickets = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const allTickets = await apiService.getTickets(token, {});
      
      // Sort by creation date (most recent first) and limit
      const recentTickets = allTickets
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, limit);
      
      setTickets(recentTickets);
    } catch (error) {
      console.error("Error fetching recent tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "URGENT": return "#ef4444";
      case "HIGH": return "#f97316";
      case "MEDIUM": return "#eab308";
      case "LOW": return "#22c55e";
      default: return "#6b7280";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN": return "#3b82f6";
      case "IN_PROGRESS": return "#f59e0b";
      case "RESOLVED": return "#10b981";
      case "CLOSED": return "#6b7280";
      default: return "#6b7280";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "OPEN": return "🔵";
      case "IN_PROGRESS": return "🟡";
      case "RESOLVED": return "🟢";
      case "CLOSED": return "⚫";
      default: return "⚪";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "URGENT": return "🔴";
      case "HIGH": return "🟠";
      case "MEDIUM": return "🟡";
      case "LOW": return "🟢";
      default: return "⚪";
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleTicketClick = (ticket: Ticket) => {
    onTicketClick(ticket);
  };

  return (
    <Paper sx={{ mb: 3, borderRadius: 3, overflow: "hidden" }}>
      {/* Header */}
      <Box
        sx={{
          p: 2,
          backgroundColor: "info.main",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <TrendingUpIcon />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            🎫 Recent Tickets
          </Typography>
          <Chip
            label={tickets.length}
            size="small"
            sx={{
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "white",
              fontWeight: 600,
            }}
          />
        </Box>
        <IconButton size="small" sx={{ color: "white" }}>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ maxHeight: { xs: "400px", md: "500px" }, overflow: "auto" }}>
          {loading ? (
            <Box sx={{ p: 3, textAlign: "center" }}>
              <CircularProgress size={24} />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Loading recent tickets...
              </Typography>
            </Box>
          ) : tickets.length === 0 ? (
            <Box sx={{ p: 3, textAlign: "center", color: "text.secondary" }}>
              <TicketIcon sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
              <Typography variant="body2">No tickets found</Typography>
              <Typography variant="caption" color="text.disabled">
                Recent tickets will appear here
              </Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {tickets.map((ticket, index) => {
                const isLast = index === tickets.length - 1;

                return (
                  <React.Fragment key={ticket.id}>
                    <ListItem
                      button
                      onClick={() => handleTicketClick(ticket)}
                      sx={{
                        py: 1.5,
                        px: 2,
                        "&:hover": {
                          backgroundColor: "action.hover",
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            backgroundColor: getPriorityColor(ticket.priority),
                            width: 40,
                            height: 40,
                          }}
                        >
                          <TicketIcon />
                        </Avatar>
                      </ListItemAvatar>

                      <ListItemText
                        primary={
                          <Box>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontWeight: 600,
                                mb: 0.5,
                                display: "-webkit-box",
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {ticket.title}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                              <Chip
                                label={`${getStatusIcon(ticket.status)} ${ticket.status.replace("_", " ")}`}
                                size="small"
                                sx={{
                                  height: 20,
                                  fontSize: "0.7rem",
                                  backgroundColor: getStatusColor(ticket.status),
                                  color: "white",
                                  fontWeight: 600,
                                }}
                              />
                              <Chip
                                label={`${getPriorityIcon(ticket.priority)} ${ticket.priority}`}
                                size="small"
                                sx={{
                                  height: 20,
                                  fontSize: "0.7rem",
                                  backgroundColor: getPriorityColor(ticket.priority),
                                  color: "white",
                                  fontWeight: 600,
                                }}
                              />
                            </Box>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                              <PersonIcon sx={{ fontSize: 14, color: "text.disabled" }} />
                              <Typography variant="caption" color="text.secondary">
                                Created by {ticket.createdBy.name}
                              </Typography>
                            </Box>
                            
                            {ticket.assignedTo && (
                              <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                                <PersonIcon sx={{ fontSize: 14, color: "text.disabled" }} />
                                <Typography variant="caption" color="text.secondary">
                                  Assigned to {ticket.assignedTo.name}
                                </Typography>
                              </Box>
                            )}

                            <Box display="flex" alignItems="center" gap={1}>
                              <ScheduleIcon sx={{ fontSize: 14, color: "text.disabled" }} />
                              <Typography variant="caption" color="text.disabled">
                                {formatTimeAgo(ticket.createdAt)}
                              </Typography>
                            </Box>

                            {ticket.customer && (
                              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                                Customer: {ticket.customer.name}
                              </Typography>
                            )}

                            {ticket.application && (
                              <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                                App: {ticket.application.name}
                              </Typography>
                            )}
                          </Box>
                        }
                      />

                      <Box sx={{ ml: 1 }}>
                        <Tooltip title="View Details">
                          <IconButton size="small" color="primary">
                            <ViewIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </ListItem>
                    {!isLast && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                );
              })}
            </List>
          )}

          {/* Footer with action button */}
          {tickets.length > 0 && (
            <Box sx={{ p: 2, borderTop: 1, borderColor: "divider", textAlign: "center" }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  // Navigate to full tickets view
                  window.location.href = "/tickets";
                }}
                sx={{ borderRadius: 2 }}
              >
                View All Tickets
              </Button>
            </Box>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default RecentTickets;