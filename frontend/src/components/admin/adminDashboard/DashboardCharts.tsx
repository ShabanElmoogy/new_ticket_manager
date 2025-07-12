import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  useTheme,
  alpha,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import {
  TrendingUp,
  Assessment,
  DonutLarge,
  ShowChart,
} from "@mui/icons-material";

interface DashboardStats {
  totalCustomers: number;
  activeCustomers: number;
  totalApplications: number;
  activeApplications: number;
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  resolvedTickets: number;
}

interface DashboardChartsProps {
  stats: DashboardStats;
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({ stats }) => {
  const theme = useTheme();

  // Sample data for charts - in real app, this would come from API
  const ticketTrendData = [
    { month: "Jan", open: 45, inProgress: 30, resolved: 85 },
    { month: "Feb", open: 52, inProgress: 35, resolved: 92 },
    { month: "Mar", open: 38, inProgress: 42, resolved: 78 },
    { month: "Apr", open: 61, inProgress: 28, resolved: 95 },
    { month: "May", open: 55, inProgress: 38, resolved: 88 },
    { month: "Jun", open: 48, inProgress: 45, resolved: 102 },
  ];

  const customerGrowthData = [
    { month: "Jan", customers: 120, applications: 85 },
    { month: "Feb", customers: 135, applications: 92 },
    { month: "Mar", customers: 148, applications: 98 },
    { month: "Apr", customers: 162, applications: 105 },
    { month: "May", customers: 178, applications: 112 },
    { month: "Jun", customers: 195, applications: 125 },
  ];

  const ticketStatusData = [
    { name: "Open", value: stats.openTickets, color: "#f44336" },
    { name: "In Progress", value: stats.inProgressTickets, color: "#ff9800" },
    { name: "Resolved", value: stats.resolvedTickets, color: "#4caf50" },
  ];

  const applicationStatusData = [
    { name: "Active", value: stats.activeApplications, color: "#2196f3" },
    {
      name: "Inactive",
      value: stats.totalApplications - stats.activeApplications,
      color: "#9e9e9e",
    },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            p: 1.5,
            boxShadow: theme.shadows[4],
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: "bold", mb: 0.5 }}>
            {label}
          </Typography>
          {payload.map((entry: any, index: number) => (
            <Typography key={index} variant="body2" sx={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };

  const ChartCard = ({
    title,
    icon,
    children,
    height = 300,
  }: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    height?: number;
  }) => (
    <Card
      sx={{
        height: "100%",
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.02
        )} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[8],
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              mr: 2,
            }}
          >
            {icon}
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box sx={{ height }}>{children}</Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: 700,
          color: theme.palette.text.primary,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Assessment sx={{ color: theme.palette.primary.main }} />
        Analytics Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Ticket Trends Chart */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <ChartCard title="Ticket Trends" icon={<TrendingUp />} height={350}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ticketTrendData}>
                <defs>
                  <linearGradient id="openGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f44336" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f44336" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="progressGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#ff9800" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ff9800" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="resolvedGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#4caf50" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4caf50" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={alpha(theme.palette.divider, 0.3)}
                />
                <XAxis
                  dataKey="month"
                  stroke={theme.palette.text.secondary}
                  fontSize={12}
                />
                <YAxis stroke={theme.palette.text.secondary} fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="resolved"
                  stackId="1"
                  stroke="#4caf50"
                  fill="url(#resolvedGradient)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="inProgress"
                  stackId="1"
                  stroke="#ff9800"
                  fill="url(#progressGradient)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="open"
                  stackId="1"
                  stroke="#f44336"
                  fill="url(#openGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Ticket Status Distribution */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <ChartCard
            title="Ticket Status Distribution"
            icon={<DonutLarge />}
            height={350}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ticketStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {ticketStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Customer Growth */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <ChartCard
            title="Customer & Application Growth"
            icon={<ShowChart />}
            height={300}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={customerGrowthData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={alpha(theme.palette.divider, 0.3)}
                />
                <XAxis
                  dataKey="month"
                  stroke={theme.palette.text.secondary}
                  fontSize={12}
                />
                <YAxis stroke={theme.palette.text.secondary} fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="customers"
                  stroke="#2196f3"
                  strokeWidth={3}
                  dot={{ fill: "#2196f3", strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: "#2196f3", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="applications"
                  stroke="#9c27b0"
                  strokeWidth={3}
                  dot={{ fill: "#9c27b0", strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: "#9c27b0", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Application Status */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartCard
            title="Application Status"
            icon={<DonutLarge />}
            height={300}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={applicationStatusData} layout="horizontal">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={alpha(theme.palette.divider, 0.3)}
                />
                <XAxis
                  type="number"
                  stroke={theme.palette.text.secondary}
                  fontSize={12}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke={theme.palette.text.secondary}
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="value"
                  radius={[0, 8, 8, 0]}
                  fill={(entry: any) => entry.color}
                >
                  {applicationStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardCharts;
