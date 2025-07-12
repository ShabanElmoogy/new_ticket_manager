import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  IconButton,
  Collapse,
  Badge,
  useTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
  Apps as AppsIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Dashboard as DashboardIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";
import { useAuthStore } from "../../stores/authStore";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  action: () => void;
  adminOnly?: boolean;
  badge?: number;
}

interface QuickActionsProps {
  onCreateTicket?: () => void;
  onOpenFilters?: () => void;
  onOpenSearch?: () => void;
  onRefresh?: () => void;
  pendingNotifications?: number;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onCreateTicket,
  onOpenFilters,
  onOpenSearch,
  onRefresh,
  pendingNotifications = 0,
}) => {
  const { user } = useAuthStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [expanded, setExpanded] = useState(true);

  const quickActions: QuickAction[] = [
    {
      id: "create-ticket",
      title: "Create Ticket",
      description: "Create a new support ticket",
      icon: <AddIcon />,
      color: "#ffffff",
      bgColor: "#10b981",
      action: () => onCreateTicket?.(),
      adminOnly: true,
    },
    {
      id: "search",
      title: "Search Tickets",
      description: "Find specific tickets",
      icon: <SearchIcon />,
      color: "#ffffff",
      bgColor: "#3b82f6",
      action: () => onOpenSearch?.(),
    },
    {
      id: "filters",
      title: "Filter View",
      description: "Apply filters to tickets",
      icon: <FilterIcon />,
      color: "#ffffff",
      bgColor: "#8b5cf6",
      action: () => onOpenFilters?.(),
    },
    {
      id: "refresh",
      title: "Refresh Data",
      description: "Update dashboard data",
      icon: <DashboardIcon />,
      color: "#ffffff",
      bgColor: "#f59e0b",
      action: () => onRefresh?.(),
    },
    {
      id: "manage-users",
      title: "Manage Users",
      description: "Add or edit team members",
      icon: <PeopleIcon />,
      color: "#ffffff",
      bgColor: "#ef4444",
      action: () => {
        // Navigate to users management
        window.location.href = "/admin/users";
      },
      adminOnly: true,
    },
    {
      id: "manage-customers",
      title: "Manage Customers",
      description: "Add or edit customers",
      icon: <BusinessIcon />,
      color: "#ffffff",
      bgColor: "#06b6d4",
      action: () => {
        // Navigate to customers management
        window.location.href = "/admin/customers";
      },
      adminOnly: true,
    },
    {
      id: "manage-apps",
      title: "Manage Applications",
      description: "Add or edit applications",
      icon: <AppsIcon />,
      color: "#ffffff",
      bgColor: "#84cc16",
      action: () => {
        // Navigate to applications management
        window.location.href = "/admin/applications";
      },
      adminOnly: true,
    },
    {
      id: "reports",
      title: "View Reports",
      description: "Generate performance reports",
      icon: <ReportsIcon />,
      color: "#ffffff",
      bgColor: "#f97316",
      action: () => {
        // Navigate to reports
        window.location.href = "/admin/reports";
      },
      adminOnly: true,
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "View system notifications",
      icon: <NotificationsIcon />,
      color: "#ffffff",
      bgColor: "#ec4899",
      action: () => {
        // Open notifications panel
        console.log("Opening notifications");
      },
      badge: pendingNotifications,
    },
    {
      id: "settings",
      title: "Settings",
      description: "Configure system settings",
      icon: <SettingsIcon />,
      color: "#ffffff",
      bgColor: "#6b7280",
      action: () => {
        // Navigate to settings
        window.location.href = "/settings";
      },
      adminOnly: true,
    },
  ];

  const filteredActions = quickActions.filter(action => 
    !action.adminOnly || user?.role === "ADMIN"
  );

  const handleActionClick = (action: QuickAction) => {
    try {
      action.action();
    } catch (error) {
      console.error("Error executing quick action:", error);
    }
  };

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
          <DashboardIcon />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            ⚡ Quick Actions
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: "white" }}>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            {filteredActions.map((action) => (
              <Grid 
                item 
                xs={6} 
                sm={4} 
                md={3} 
                lg={isMobile ? 6 : 2.4} 
                key={action.id}
              >
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 2,
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => handleActionClick(action)}
                    sx={{
                      height: "100%",
                      p: 0,
                    }}
                  >
                    <CardContent
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        p: 2,
                        "&:last-child": { pb: 2 },
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 48, sm: 56 },
                          height: { xs: 48, sm: 56 },
                          borderRadius: "50%",
                          backgroundColor: action.bgColor,
                          color: action.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 1.5,
                          position: "relative",
                        }}
                      >
                        {action.badge && action.badge > 0 ? (
                          <Badge
                            badgeContent={action.badge}
                            color="error"
                            sx={{
                              "& .MuiBadge-badge": {
                                fontSize: "0.7rem",
                                minWidth: "16px",
                                height: "16px",
                              },
                            }}
                          >
                            {action.icon}
                          </Badge>
                        ) : (
                          action.icon
                        )}
                      </Box>

                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          mb: 0.5,
                          fontSize: { xs: "0.8rem", sm: "0.875rem" },
                          lineHeight: 1.2,
                        }}
                      >
                        {action.title}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          fontSize: { xs: "0.7rem", sm: "0.75rem" },
                          lineHeight: 1.2,
                          display: { xs: "none", sm: "block" },
                        }}
                      >
                        {action.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Additional Info for Mobile */}
          {isMobile && (
            <Box sx={{ mt: 2, p: 2, backgroundColor: "background.default", borderRadius: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center", display: "block" }}>
                💡 Tip: Tap any action above to quickly access common features
              </Typography>
            </Box>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default QuickActions;