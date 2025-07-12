import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useAuthStore } from "../../../stores/authStore";
import { apiService } from "../../../services/api";
import Header from "./Header";
import DashboardCards from "./DashboardCards";
import DashboardCharts from "./DashboardCharts";
import EnhancedDashboardCharts from "./EnhancedDashboardCharts";
import ComprehensiveChartsLibrary from "./ComprehensiveChartsLibrary";
import PerformanceMetrics from "./PerformanceMetrics";
import SystemHealth from "./SystemHealth";
import TeamOverview from "./TeamOverview";

//TODO: Refactor Grid
//TODO:Add Chat
//TODO:Add Report
//✅ Charts implemented with ComprehensiveChartsLibrary - All chart types covered
//TODO: JWt Cookie Http Only
//TODO: use TypeScript in backend
//TODO:Seperate and refactor
//TODO:FileManagement

const AdminDashboard: React.FC = () => {
  const { token } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeCustomers: 0,
    totalApplications: 0,
    activeApplications: 0,
    totalTickets: 0,
    openTickets: 0,
    inProgressTickets: 0,
    resolvedTickets: 0,
  });

  const fetchStats = async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const [customers, applications, tickets] = await Promise.all([
        apiService.getCustomers(token),
        apiService.getApplications(token),
        apiService.getTickets(token, {}),
      ]);

      const activeCustomers = customers.filter((c) => c.isActive).length;
      const activeApplications = applications.filter((a) => a.isActive).length;
      const openTickets = tickets.filter((t) => t.status === "OPEN").length;
      const inProgressTickets = tickets.filter(
        (t) => t.status === "IN_PROGRESS"
      ).length;
      const resolvedTickets = tickets.filter(
        (t) => t.status === "RESOLVED"
      ).length;

      setStats({
        totalCustomers: customers.length,
        activeCustomers,
        totalApplications: applications.length,
        activeApplications,
        totalTickets: tickets.length,
        openTickets,
        inProgressTickets,
        resolvedTickets,
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error fetching stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [token]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Header />
      <DashboardCards stats={stats} />
      
      {/* Performance Analytics Section */}
      <PerformanceMetrics />
      
      {/* Team Management Section */}
      <TeamOverview />
      
      {/* System Monitoring Section */}
      <SystemHealth />
      
      {/* Comprehensive Charts Library */}
      <ComprehensiveChartsLibrary stats={stats} />
    </Box>
  );
};

export default AdminDashboard;