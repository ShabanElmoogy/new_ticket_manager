import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  useTheme,
  alpha,
  Paper,
  Tabs,
  Tab,
  Chip,
  Avatar,
  IconButton,
  Switch,
  FormControlLabel,
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
  ReferenceArea,
  Treemap,
  FunnelChart,
  Funnel,
  LabelList,
  RadialBarChart,
  RadialBar,
  Brush,
  ErrorBar,
} from 'recharts';
import {
  TrendingUp,
  Assessment,
  DonutLarge,
  ShowChart,
  Timeline,
  BubbleChart,
  Radar as RadarIcon,
  MoreVert,
  Analytics,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  MultilineChart,
  ScatterPlot,
  AccountTree,
  Layers,
  FilterList,
  Refresh,
  Download,
  Fullscreen,
  Settings,
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

interface ComprehensiveChartsLibraryProps {
  stats: DashboardStats;
}

const ComprehensiveChartsLibrary: React.FC<ComprehensiveChartsLibraryProps> = ({ stats }) => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);
  const [showAnimations, setShowAnimations] = useState(true);

  // Enhanced sample data for all chart types
  const monthlyData = [
    { month: 'Jan', tickets: 45, resolved: 40, customers: 120, revenue: 15000, satisfaction: 4.2 },
    { month: 'Feb', tickets: 52, resolved: 48, customers: 135, revenue: 18000, satisfaction: 4.3 },
    { month: 'Mar', tickets: 38, resolved: 35, customers: 148, revenue: 16500, satisfaction: 4.1 },
    { month: 'Apr', tickets: 61, resolved: 58, customers: 162, revenue: 22000, satisfaction: 4.5 },
    { month: 'May', tickets: 55, resolved: 52, customers: 178, revenue: 19500, satisfaction: 4.4 },
    { month: 'Jun', tickets: 48, resolved: 46, customers: 195, revenue: 21000, satisfaction: 4.6 },
    { month: 'Jul', tickets: 65, resolved: 62, customers: 210, revenue: 24000, satisfaction: 4.3 },
    { month: 'Aug', tickets: 58, resolved: 55, customers: 225, revenue: 23500, satisfaction: 4.4 },
    { month: 'Sep', tickets: 42, resolved: 40, customers: 240, revenue: 20500, satisfaction: 4.5 },
    { month: 'Oct', tickets: 71, resolved: 68, customers: 255, revenue: 26000, satisfaction: 4.2 },
    { month: 'Nov', tickets: 63, resolved: 60, customers: 270, revenue: 25500, satisfaction: 4.6 },
    { month: 'Dec', tickets: 49, resolved: 47, customers: 285, revenue: 22500, satisfaction: 4.7 },
  ];

  const categoryData = [
    { name: 'Technical', value: 35, color: '#2196f3', count: 142 },
    { name: 'Billing', value: 25, color: '#4caf50', count: 98 },
    { name: 'General', value: 20, color: '#ff9800', count: 76 },
    { name: 'Bug Report', value: 15, color: '#f44336', count: 54 },
    { name: 'Feature Request', value: 5, color: '#9c27b0', count: 23 },
  ];

  const priorityFunnelData = [
    { name: 'All Tickets', value: 1000, fill: '#8884d8' },
    { name: 'Triaged', value: 850, fill: '#83a6ed' },
    { name: 'In Progress', value: 650, fill: '#8dd1e1' },
    { name: 'Testing', value: 450, fill: '#82ca9d' },
    { name: 'Resolved', value: 380, fill: '#a4de6c' },
  ];

  const teamPerformanceRadar = [
    { subject: 'Response Time', teamA: 120, teamB: 110, teamC: 140, fullMark: 150 },
    { subject: 'Resolution Rate', teamA: 98, teamB: 130, teamC: 85, fullMark: 150 },
    { subject: 'Customer Satisfaction', teamA: 86, teamB: 130, teamC: 95, fullMark: 150 },
    { subject: 'Code Quality', teamA: 99, teamB: 100, teamC: 120, fullMark: 150 },
    { subject: 'Documentation', teamA: 85, teamB: 90, teamC: 110, fullMark: 150 },
    { subject: 'Communication', teamA: 65, teamB: 85, teamC: 75, fullMark: 150 },
  ];

  const bubbleData = [
    { x: 100, y: 200, z: 200, name: 'Critical Issues', category: 'bugs' },
    { x: 120, y: 100, z: 260, name: 'Feature Requests', category: 'features' },
    { x: 170, y: 300, z: 400, name: 'Documentation', category: 'docs' },
    { x: 140, y: 250, z: 280, name: 'Performance', category: 'performance' },
    { x: 150, y: 400, z: 500, name: 'UI/UX', category: 'design' },
    { x: 110, y: 280, z: 200, name: 'Security', category: 'security' },
    { x: 180, y: 180, z: 350, name: 'Integration', category: 'integration' },
    { x: 90, y: 350, z: 150, name: 'Testing', category: 'testing' },
  ];

  const treemapData = [
    { name: 'Frontend', size: 2400, fill: '#8884d8' },
    { name: 'Backend', size: 1800, fill: '#82ca9d' },
    { name: 'Database', size: 1200, fill: '#ffc658' },
    { name: 'DevOps', size: 800, fill: '#ff7300' },
    { name: 'Testing', size: 600, fill: '#8dd1e1' },
    { name: 'Documentation', size: 400, fill: '#d084d0' },
  ];

  const radialBarData = [
    { name: 'Critical', value: 15, fill: '#ff4444' },
    { name: 'High', value: 28, fill: '#ff8800' },
    { name: 'Medium', value: 45, fill: '#ffbb33' },
    { name: 'Low', value: 32, fill: '#00C851' },
  ];

  const hourlyActivityData = Array.from({ length: 24 }, (_, i) => ({
    hour: i.toString().padStart(2, '0'),
    tickets: Math.floor(Math.random() * 50) + 5,
    resolved: Math.floor(Math.random() * 40) + 2,
    errors: Math.floor(Math.random() * 10),
  }));

  const scatterData = [
    { x: 100, y: 200, z: 200 }, { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 }, { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 }, { x: 110, y: 280, z: 200 },
    { x: 180, y: 180, z: 350 }, { x: 90, y: 350, z: 150 },
    { x: 200, y: 220, z: 300 }, { x: 160, y: 320, z: 250 },
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
            maxWidth: 250,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
            {label}
          </Typography>
          {payload.map((entry: any, index: number) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ 
                color: entry.color, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                mb: 0.5 
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: entry.color,
                }}
              />
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </Typography>
          ))}
        </Paper>
      );
    }
    return null;
  };

  const ChartCard = ({
    title,
    subtitle,
    icon,
    children,
    height = 300,
    actions,
    category,
  }: {
    title: string;
    subtitle?: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    height?: number;
    actions?: React.ReactNode;
    category?: string;
  }) => (
    <Card
      sx={{
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: showAnimations ? 'translateY(-2px)' : 'none',
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
              {category && (
                <Chip 
                  label={category} 
                  size="small" 
                  sx={{ mt: 0.5 }}
                  color="primary"
                  variant="outlined"
                />
              )}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {actions}
            <IconButton size="small">
              <MoreVert />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ height }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );

  const chartCategories = [
    { label: 'Basic Charts', value: 0, icon: <BarChartIcon /> },
    { label: 'Advanced Charts', value: 1, icon: <MultilineChart /> },
    { label: 'Specialized Charts', value: 2, icon: <ScatterPlot /> },
    { label: 'Interactive Charts', value: 3, icon: <Analytics /> },
  ];

  const renderBasicCharts = () => (
    <Grid container spacing={3}>
      {/* Line Chart */}
      <Grid size={{ xs: 12, lg: 6 }}>
        <ChartCard
          title="Line Chart"
          subtitle="Monthly ticket trends"
          icon={<ShowChart />}
          category="Basic"
          actions={
            <>
              <IconButton size="small"><Download /></IconButton>
              <IconButton size="small"><Fullscreen /></IconButton>
            </>
          }
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
              <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
              <YAxis stroke={theme.palette.text.secondary} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="tickets"
                stroke="#2196f3"
                strokeWidth={3}
                dot={{ fill: '#2196f3', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#2196f3', strokeWidth: 2 }}
                animationDuration={showAnimations ? 1000 : 0}
              />
              <Line
                type="monotone"
                dataKey="resolved"
                stroke="#4caf50"
                strokeWidth={3}
                dot={{ fill: '#4caf50', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#4caf50', strokeWidth: 2 }}
                animationDuration={showAnimations ? 1000 : 0}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </Grid>

      {/* Bar Chart */}
      <Grid size={{ xs: 12, lg: 6 }}>
        <ChartCard
          title="Bar Chart"
          subtitle="Monthly comparison"
          icon={<BarChartIcon />}
          category="Basic"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
              <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
              <YAxis stroke={theme.palette.text.secondary} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="tickets" 
                fill="#2196f3" 
                radius={[4, 4, 0, 0]}
                animationDuration={showAnimations ? 1000 : 0}
              />
              <Bar 
                dataKey="resolved" 
                fill="#4caf50" 
                radius={[4, 4, 0, 0]}
                animationDuration={showAnimations ? 1000 : 0}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </Grid>

      {/* Area Chart */}
      <Grid size={{ xs: 12, lg: 6 }}>
        <ChartCard
          title="Area Chart"
          subtitle="Cumulative trends"
          icon={<Timeline />}
          category="Basic"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2196f3" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2196f3" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4caf50" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4caf50" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
              <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
              <YAxis stroke={theme.palette.text.secondary} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="tickets"
                stackId="1"
                stroke="#2196f3"
                fill="url(#colorTickets)"
                animationDuration={showAnimations ? 1000 : 0}
              />
              <Area
                type="monotone"
                dataKey="resolved"
                stackId="1"
                stroke="#4caf50"
                fill="url(#colorResolved)"
                animationDuration={showAnimations ? 1000 : 0}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </Grid>

      {/* Pie Chart */}
      <Grid size={{ xs: 12, lg: 6 }}>
        <ChartCard
          title="Pie Chart"
          subtitle="Category distribution"
          icon={<PieChartIcon />}
          category="Basic"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                animationDuration={showAnimations ? 1000 : 0}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </Grid>
    </Grid>
  );

  const renderAdvancedCharts = () => (
    <Grid container spacing={3}>
      {/* Composed Chart */}
      <Grid size={{ xs: 12, lg: 8 }}>
        <ChartCard
          title="Composed Chart"
          subtitle="Multiple chart types combined"
          icon={<Analytics />}
          category="Advanced"
          height={400}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
              <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
              <YAxis yAxisId="left" stroke={theme.palette.text.secondary} />
              <YAxis yAxisId="right" orientation="right" stroke={theme.palette.text.secondary} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar yAxisId="left" dataKey="tickets" fill="#2196f3" radius={[4, 4, 0, 0]} />
              <Area yAxisId="left" type="monotone" dataKey="resolved" fill="#4caf50" stroke="#4caf50" fillOpacity={0.3} />
              <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="#ff9800" strokeWidth={3} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </Grid>

      {/* Radar Chart */}
      <Grid size={{ xs: 12, lg: 4 }}>
        <ChartCard
          title="Radar Chart"
          subtitle="Team performance comparison"
          icon={<RadarIcon />}
          category="Advanced"
          height={400}
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={teamPerformanceRadar}>
              <PolarGrid stroke={alpha(theme.palette.divider, 0.3)} />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis tick={{ fontSize: 10 }} />
              <Radar
                name="Team A"
                dataKey="teamA"
                stroke="#2196f3"
                fill="#2196f3"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Radar
                name="Team B"
                dataKey="teamB"
                stroke="#4caf50"
                fill="#4caf50"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Radar
                name="Team C"
                dataKey="teamC"
                stroke="#ff9800"
                fill="#ff9800"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Legend />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </Grid>

      {/* Radial Bar Chart */}
      <Grid size={{ xs: 12, lg: 6 }}>
        <ChartCard
          title="Radial Bar Chart"
          subtitle="Priority distribution"
          icon={<DonutLarge />}
          category="Advanced"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" data={radialBarData}>
              <RadialBar
                minAngle={15}
                label={{ position: 'insideStart', fill: '#fff' }}
                background
                clockWise
                dataKey="value"
              />
              <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
              <Tooltip content={<CustomTooltip />} />
            </RadialBarChart>
          </ResponsiveContainer>
        </ChartCard>
      </Grid>

      {/* Funnel Chart */}
      <Grid size={{ xs: 12, lg: 6 }}>
        <ChartCard
          title="Funnel Chart"
          subtitle="Ticket processing pipeline"
          icon={<FilterList />}
          category="Advanced"
        >
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip content={<CustomTooltip />} />
              <Funnel
                dataKey="value"
                data={priorityFunnelData}
                isAnimationActive={showAnimations}
              >
                <LabelList position="center" fill="#fff" stroke="none" />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </ChartCard>
      </Grid>
    </Grid>
  );

  const renderSpecializedCharts = () => (
    <Grid container spacing={3}>
      {/* Scatter Chart */}
      <Grid size={{ xs: 12, lg: 6 }}>
        <ChartCard
          title="Scatter Chart"
          subtitle="Correlation analysis"
          icon={<ScatterPlot />}
          category="Specialized"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart data={scatterData}>
              <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
              <XAxis type="number" dataKey="x" name="Impact" stroke={theme.palette.text.secondary} />
              <YAxis type="number" dataKey="y" name="Urgency" stroke={theme.palette.text.secondary} />
              <ZAxis type="number" dataKey="z" range={[50, 400]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
              <Scatter dataKey="z" fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>
      </Grid>

      {/* Bubble Chart */}
      <Grid size={{ xs: 12, lg: 6 }}>
        <ChartCard
          title="Bubble Chart"
          subtitle="Multi-dimensional data"
          icon={<BubbleChart />}
          category="Specialized"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart data={bubbleData}>
              <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
              <XAxis type="number" dataKey="x" name="Complexity" stroke={theme.palette.text.secondary} />
              <YAxis type="number" dataKey="y" name="Priority" stroke={theme.palette.text.secondary} />
              <ZAxis type="number" dataKey="z" range={[64, 144]} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <Paper elevation={4} sx={{ p: 2 }}>
                        <Typography variant="subtitle2">{data.name}</Typography>
                        <Typography variant="body2">Complexity: {data.x}</Typography>
                        <Typography variant="body2">Priority: {data.y}</Typography>
                        <Typography variant="body2">Impact: {data.z}</Typography>
                        <Chip label={data.category} size="small" sx={{ mt: 1 }} />
                      </Paper>
                    );
                  }
                  return null;
                }}
              />
              <Scatter dataKey="z" fill="#ff7300" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>
      </Grid>

      {/* Treemap - Fixed version */}
      <Grid size={{ xs: 12, lg: 8 }}>
        <ChartCard
          title="Treemap Chart"
          subtitle="Hierarchical data visualization"
          icon={<AccountTree />}
          category="Specialized"
          height={400}
        >
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={treemapData}
              dataKey="size"
              ratio={4/3}
              stroke="#fff"
              fill="#8884d8"
            />
          </ResponsiveContainer>
        </ChartCard>
      </Grid>

      {/* Stacked Area Chart */}
      <Grid size={{ xs: 12, lg: 4 }}>
        <ChartCard
          title="Stacked Area Chart"
          subtitle="Layered data trends"
          icon={<Layers />}
          category="Specialized"
          height={400}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
              <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
              <YAxis stroke={theme.palette.text.secondary} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="tickets"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="resolved"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Area
                type="monotone"
                dataKey="customers"
                stackId="1"
                stroke="#ffc658"
                fill="#ffc658"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </Grid>
    </Grid>
  );

  const renderInteractiveCharts = () => (
    <Grid container spacing={3}>
      {/* Chart with Brush */}
      <Grid size={{ xs: 12 }}>
        <ChartCard
          title="Interactive Chart with Brush"
          subtitle="Zoom and pan functionality"
          icon={<Timeline />}
          category="Interactive"
          height={500}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
              <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
              <YAxis stroke={theme.palette.text.secondary} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="tickets" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="resolved" stroke="#82ca9d" strokeWidth={2} />
              <Line type="monotone" dataKey="customers" stroke="#ffc658" strokeWidth={2} />
              <Brush dataKey="month" height={30} stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </Grid>

      {/* Chart with Reference Lines */}
      <Grid size={{ xs: 12, lg: 6 }}>
        <ChartCard
          title="Chart with Reference Lines"
          subtitle="Target and threshold indicators"
          icon={<TrendingUp />}
          category="Interactive"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
              <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
              <YAxis stroke={theme.palette.text.secondary} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <ReferenceLine y={50} stroke="red" strokeDasharray="5 5" label="Target" />
              <ReferenceLine x="Jun" stroke="green" strokeDasharray="5 5" label="Milestone" />
              <ReferenceArea x1="Apr" x2="Jun" y1={40} y2={60} stroke="red" strokeOpacity={0.3} fill="red" fillOpacity={0.1} />
              <Line type="monotone" dataKey="tickets" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="resolved" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </Grid>

      {/* Chart with Error Bars */}
      <Grid size={{ xs: 12, lg: 6 }}>
        <ChartCard
          title="Chart with Error Bars"
          subtitle="Data uncertainty visualization"
          icon={<BarChartIcon />}
          category="Interactive"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData.map(item => ({
              ...item,
              errorY: Math.random() * 10 + 5,
              errorX: Math.random() * 2 + 1,
            }))}>
              <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
              <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
              <YAxis stroke={theme.palette.text.secondary} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="tickets" fill="#8884d8">
                <ErrorBar dataKey="errorY" width={4} stroke="red" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </Grid>

      {/* Real-time Activity Chart */}
      <Grid size={{ xs: 12 }}>
        <ChartCard
          title="24-Hour Activity Heatmap"
          subtitle="Real-time ticket activity by hour"
          icon={<Schedule />}
          category="Interactive"
          height={350}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hourlyActivityData}>
              <defs>
                <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
              <XAxis 
                dataKey="hour" 
                stroke={theme.palette.text.secondary}
                interval={2}
              />
              <YAxis stroke={theme.palette.text.secondary} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="tickets"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorActivity)"
              />
              <Line
                type="monotone"
                dataKey="resolved"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={false}
              />
              <ReferenceLine y={30} stroke="#ff7300" strokeDasharray="3 3" label="Peak Threshold" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </Grid>
    </Grid>
  );

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return renderBasicCharts();
      case 1:
        return renderAdvancedCharts();
      case 2:
        return renderSpecializedCharts();
      case 3:
        return renderInteractiveCharts();
      default:
        return renderBasicCharts();
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            mb: 2,
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
          <Assessment />
          Comprehensive Charts Library
        </Typography>
        
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Complete collection of all chart types available in Material UI ecosystem
        </Typography>

        {/* Controls */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <FormControlLabel
            control={
              <Switch
                checked={showAnimations}
                onChange={(e) => setShowAnimations(e.target.checked)}
                color="primary"
              />
            }
            label="Enable Animations"
          />
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton><Refresh /></IconButton>
            <IconButton><Download /></IconButton>
            <IconButton><Settings /></IconButton>
          </Box>
        </Box>
      </Box>

      {/* Chart Categories Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={(_, newValue) => setSelectedTab(newValue)}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              minHeight: 72,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
            },
          }}
        >
          {chartCategories.map((category) => (
            <Tab
              key={category.value}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {category.icon}
                  {category.label}
                </Box>
              }
              value={category.value}
            />
          ))}
        </Tabs>
      </Paper>

      {/* Chart Content */}
      <Box sx={{ minHeight: 600 }}>
        {renderTabContent()}
      </Box>

      {/* Chart Statistics */}
      <Paper sx={{ mt: 4, p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Chart Library Statistics
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
                15+
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Chart Types
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="secondary" sx={{ fontWeight: 700 }}>
                4
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Categories
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="success.main" sx={{ fontWeight: 700 }}>
                100%
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Responsive
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="warning.main" sx={{ fontWeight: 700 }}>
                ∞
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Customizable
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ComprehensiveChartsLibrary;