import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  useTheme,
  alpha,
  Chip,
  Avatar,
  LinearProgress,
  Stack,
  Divider,
  IconButton,
  Paper,
} from '@mui/material';
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Scatter,
  ScatterChart,
  ZAxis,
  ReferenceLine,
} from 'recharts';
import {
  TrendingUp,
  Assessment,
  DonutLarge,
  ShowChart,
  Speed,
  Timeline,
  BubbleChart,
  Radar as RadarIcon,
  MoreVert,
  ArrowUpward,
  ArrowDownward,
  Remove,
  Person,
  Business,
  Support,
  Schedule,
} from '@mui/icons-material';

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

interface EnhancedDashboardChartsProps {
  stats: DashboardStats;
}

const EnhancedDashboardCharts: React.FC<EnhancedDashboardChartsProps> = ({ stats }) => {
  const theme = useTheme();

  // Enhanced sample data for various chart types
  const ticketTrendData = [
    { month: 'Jan', open: 45, inProgress: 30, resolved: 85, total: 160 },
    { month: 'Feb', open: 52, inProgress: 35, resolved: 92, total: 179 },
    { month: 'Mar', open: 38, inProgress: 42, resolved: 78, total: 158 },
    { month: 'Apr', open: 61, inProgress: 28, resolved: 95, total: 184 },
    { month: 'May', open: 55, inProgress: 38, resolved: 88, total: 181 },
    { month: 'Jun', open: 48, inProgress: 45, resolved: 102, total: 195 },
  ];

  const performanceData = [
    { subject: 'Response Time', A: 120, B: 110, fullMark: 150 },
    { subject: 'Resolution Rate', A: 98, B: 130, fullMark: 150 },
    { subject: 'Customer Satisfaction', A: 86, B: 130, fullMark: 150 },
    { subject: 'Team Efficiency', A: 99, B: 100, fullMark: 150 },
    { subject: 'Quality Score', A: 85, B: 90, fullMark: 150 },
    { subject: 'Availability', A: 65, B: 85, fullMark: 150 },
  ];

  const bubbleData = [
    { x: 100, y: 200, z: 200, name: 'Critical' },
    { x: 120, y: 100, z: 260, name: 'High' },
    { x: 170, y: 300, z: 400, name: 'Medium' },
    { x: 140, y: 250, z: 280, name: 'Low' },
    { x: 150, y: 400, z: 500, name: 'Info' },
    { x: 110, y: 280, z: 200, name: 'Urgent' },
  ];

  const hourlyData = [
    { hour: '00', tickets: 5 }, { hour: '01', tickets: 3 }, { hour: '02', tickets: 2 },
    { hour: '03', tickets: 1 }, { hour: '04', tickets: 2 }, { hour: '05', tickets: 4 },
    { hour: '06', tickets: 8 }, { hour: '07', tickets: 15 }, { hour: '08', tickets: 25 },
    { hour: '09', tickets: 35 }, { hour: '10', tickets: 42 }, { hour: '11', tickets: 38 },
    { hour: '12', tickets: 28 }, { hour: '13', tickets: 32 }, { hour: '14', tickets: 45 },
    { hour: '15', tickets: 38 }, { hour: '16', tickets: 35 }, { hour: '17', tickets: 28 },
    { hour: '18', tickets: 22 }, { hour: '19', tickets: 18 }, { hour: '20', tickets: 12 },
    { hour: '21', tickets: 8 }, { hour: '22', tickets: 6 }, { hour: '23', tickets: 4 },
  ];

  const teamPerformanceData = [
    { name: 'Team A', resolved: 45, pending: 12, efficiency: 78 },
    { name: 'Team B', resolved: 38, pending: 8, efficiency: 82 },
    { name: 'Team C', resolved: 52, pending: 15, efficiency: 75 },
    { name: 'Team D', resolved: 41, pending: 9, efficiency: 85 },
  ];

  const priorityData = [
    { name: 'Critical', value: 15, color: '#d32f2f' },
    { name: 'High', value: 28, color: '#f57c00' },
    { name: 'Medium', value: 45, color: '#fbc02d' },
    { name: 'Low', value: 32, color: '#388e3c' },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          elevation={8}
          sx={{
            p: 2,
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
            {label}
          </Typography>
          {payload.map((entry: any, index: number) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ color: entry.color, display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: entry.color,
                }}
              />
              {entry.name}: {entry.value}
            </Typography>
          ))}
        </Paper>
      );
    }
    return null;
  };

  const MetricCard = ({ 
    title, 
    value, 
    change, 
    icon, 
    color = theme.palette.primary.main 
  }: {
    title: string;
    value: string | number;
    change?: { value: number; type: 'up' | 'down' | 'neutral' };
    icon: React.ReactNode;
    color?: string;
  }) => (
    <Card
      sx={{
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(color, 0.05)} 0%, ${alpha(color, 0.02)} 100%)`,
        border: `1px solid ${alpha(color, 0.1)}`,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[6],
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: color, mb: 1 }}>
              {value}
            </Typography>
            {change && (
              <Chip
                size="small"
                icon={
                  change.type === 'up' ? <ArrowUpward /> :
                  change.type === 'down' ? <ArrowDownward /> : <Remove />
                }
                label={`${change.value}%`}
                color={
                  change.type === 'up' ? 'success' :
                  change.type === 'down' ? 'error' : 'default'
                }
                sx={{ fontSize: '0.75rem' }}
              />
            )}
          </Box>
          <Avatar
            sx={{
              backgroundColor: alpha(color, 0.1),
              color: color,
              width: 48,
              height: 48,
            }}
          >
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  const ChartCard = ({
    title,
    subtitle,
    icon,
    children,
    height = 300,
    actions,
  }: {
    title: string;
    subtitle?: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    height?: number;
    actions?: React.ReactNode;
  }) => (
    <Card
      sx={{
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[8],
          border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                width: 40,
                height: 40,
                mr: 2,
              }}
            >
              {icon}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="body2" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Box>
          {actions}
        </Box>
        <Box sx={{ height }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 700,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Assessment sx={{ color: theme.palette.primary.main }} />
        Enhanced Analytics Dashboard
      </Typography>

      {/* Key Metrics Row - New Grid Syntax Examples */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* xs=12, sm=6, md=3 - Full width on mobile, half on small, quarter on medium+ */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title="Response Time"
            value="2.4h"
            change={{ value: 12, type: 'down' }}
            icon={<Schedule />}
            color="#2196f3"
          />
        </Grid>
        
        {/* xs=12, sm=6, md=3 - Same responsive pattern */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title="Resolution Rate"
            value="94.2%"
            change={{ value: 8, type: 'up' }}
            icon={<Support />}
            color="#4caf50"
          />
        </Grid>
        
        {/* xs=12, sm=6, md=3 - Responsive grid example */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title="Customer Satisfaction"
            value="4.8/5"
            change={{ value: 3, type: 'up' }}
            icon={<Person />}
            color="#ff9800"
          />
        </Grid>
        
        {/* xs=12, sm=6, md=3 - Last metric card */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title="Active Teams"
            value="12"
            change={{ value: 0, type: 'neutral' }}
            icon={<Business />}
            color="#9c27b0"
          />
        </Grid>
      </Grid>

      {/* Main Charts Grid - Advanced Layout Examples */}
      <Grid container spacing={3}>
        
        {/* Large Chart - xs=12, lg=8 (full width on mobile, 2/3 on large screens) */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <ChartCard
            title="Ticket Trends & Performance"
            subtitle="Monthly overview with combined metrics"
            icon={<TrendingUp />}
            height={400}
            actions={
              <IconButton size="small">
                <MoreVert />
              </IconButton>
            }
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={ticketTrendData}>
                <defs>
                  <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2196f3" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2196f3" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
                <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
                <YAxis yAxisId="left" stroke={theme.palette.text.secondary} />
                <YAxis yAxisId="right" orientation="right" stroke={theme.palette.text.secondary} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="total"
                  fill="url(#totalGradient)"
                  stroke="#2196f3"
                  strokeWidth={2}
                />
                <Bar yAxisId="right" dataKey="resolved" fill="#4caf50" radius={[4, 4, 0, 0]} />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="open"
                  stroke="#f44336"
                  strokeWidth={3}
                  dot={{ fill: '#f44336', strokeWidth: 2, r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Side Panel - xs=12, lg=4 (full width on mobile, 1/3 on large screens) */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3} sx={{ height: '100%' }}>
            {/* Priority Distribution - Nested in side panel */}
            <ChartCard
              title="Priority Distribution"
              icon={<DonutLarge />}
              height={180}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Team Performance Progress */}
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Speed />
                  Team Performance
                </Typography>
                <Stack spacing={2}>
                  {teamPerformanceData.map((team, index) => (
                    <Box key={index}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">{team.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {team.efficiency}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={team.efficiency}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            backgroundColor: team.efficiency > 80 ? '#4caf50' : team.efficiency > 70 ? '#ff9800' : '#f44336',
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* Radar Chart - xs=12, md=6, lg=4 (responsive across all breakpoints) */}
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <ChartCard
            title="Performance Radar"
            subtitle="Multi-dimensional analysis"
            icon={<RadarIcon />}
            height={350}
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={performanceData}>
                <PolarGrid stroke={alpha(theme.palette.divider, 0.3)} />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis tick={{ fontSize: 10 }} />
                <Radar
                  name="Current"
                  dataKey="A"
                  stroke="#2196f3"
                  fill="#2196f3"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Radar
                  name="Target"
                  dataKey="B"
                  stroke="#4caf50"
                  fill="#4caf50"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
                <Legend />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Hourly Activity - xs=12, md=6, lg=4 */}
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <ChartCard
            title="24h Activity Pattern"
            subtitle="Tickets by hour"
            icon={<Timeline />}
            height={350}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData}>
                <defs>
                  <linearGradient id="hourlyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9c27b0" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#9c27b0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
                <XAxis 
                  dataKey="hour" 
                  stroke={theme.palette.text.secondary}
                  fontSize={10}
                  interval={3}
                />
                <YAxis stroke={theme.palette.text.secondary} fontSize={10} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={30} stroke="#ff9800" strokeDasharray="3 3" />
                <Area
                  type="monotone"
                  dataKey="tickets"
                  stroke="#9c27b0"
                  fill="url(#hourlyGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Bubble Chart - xs=12, md=6, lg=4 */}
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <ChartCard
            title="Issue Complexity Matrix"
            subtitle="Priority vs Impact analysis"
            icon={<BubbleChart />}
            height={350}
          >
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart data={bubbleData}>
                <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Impact"
                  stroke={theme.palette.text.secondary}
                  fontSize={10}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Urgency"
                  stroke={theme.palette.text.secondary}
                  fontSize={10}
                />
                <ZAxis type="number" dataKey="z" range={[50, 400]} />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <Paper elevation={4} sx={{ p: 2 }}>
                          <Typography variant="subtitle2">{data.name}</Typography>
                          <Typography variant="body2">Impact: {data.x}</Typography>
                          <Typography variant="body2">Urgency: {data.y}</Typography>
                          <Typography variant="body2">Volume: {data.z}</Typography>
                        </Paper>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter 
                  dataKey="z" 
                  fill="#ff5722"
                  fillOpacity={0.6}
                  stroke="#ff5722"
                  strokeWidth={2}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

      </Grid>
    </Box>
  );
};

export default EnhancedDashboardCharts;