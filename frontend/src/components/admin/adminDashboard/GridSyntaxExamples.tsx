import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  useTheme,
  alpha,
  Paper,
  Chip,
} from '@mui/material';
import {
  Code,
  Devices,
  ViewModule,
  GridView,
} from '@mui/icons-material';

/**
 * MUI Grid v2 New Syntax Examples
 * 
 * The new Grid syntax uses the `size` prop instead of individual breakpoint props.
 * This provides a cleaner, more intuitive API for responsive layouts.
 */

const GridSyntaxExamples: React.FC = () => {
  const theme = useTheme();

  const ExampleCard = ({ 
    title, 
    description, 
    code, 
    children 
  }: {
    title: string;
    description: string;
    code: string;
    children: React.ReactNode;
  }) => (
    <Card
      sx={{
        height: '100%',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[6],
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Code color="primary" />
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        
        {/* Code Example */}
        <Paper
          sx={{
            p: 2,
            backgroundColor: alpha(theme.palette.grey[900], 0.05),
            border: `1px solid ${alpha(theme.palette.grey[500], 0.2)}`,
            borderRadius: 1,
            mb: 2,
          }}
        >
          <Typography
            variant="body2"
            component="pre"
            sx={{
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              color: theme.palette.text.primary,
              whiteSpace: 'pre-wrap',
              margin: 0,
            }}
          >
            {code}
          </Typography>
        </Paper>

        {/* Live Example */}
        <Box sx={{ border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`, p: 2, borderRadius: 1 }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );

  const DemoBox = ({ children, color = theme.palette.primary.main }: { children: React.ReactNode; color?: string }) => (
    <Box
      sx={{
        p: 2,
        backgroundColor: alpha(color, 0.1),
        border: `2px solid ${alpha(color, 0.3)}`,
        borderRadius: 1,
        textAlign: 'center',
        minHeight: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 600, color }}>
        {children}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 4 }}>
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
        <GridView />
        MUI Grid v2 New Syntax Examples
      </Typography>

      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Comprehensive examples of the new Grid syntax using the <code>size</code> prop
      </Typography>

      <Grid container spacing={4}>
        
        {/* Basic Responsive Grid */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <ExampleCard
            title="Basic Responsive Grid"
            description="Simple responsive layout using the new size prop syntax"
            code={`<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
  <Card>Content</Card>
</Grid>`}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <DemoBox color="#2196f3">xs=12, sm=6, md=4</DemoBox>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <DemoBox color="#4caf50">xs=12, sm=6, md=4</DemoBox>
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                <DemoBox color="#ff9800">xs=12, sm=12, md=4</DemoBox>
              </Grid>
            </Grid>
          </ExampleCard>
        </Grid>

        {/* Dashboard Layout */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <ExampleCard
            title="Dashboard Card Layout"
            description="Perfect for dashboard metrics - 4 cards per row on desktop, 2 on tablet, 1 on mobile"
            code={`<Grid size={{ xs: 12, sm: 6, md: 3 }}>
  <MetricCard />
</Grid>`}
          >
            <Grid container spacing={1}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <DemoBox color="#e91e63">Metric 1</DemoBox>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <DemoBox color="#9c27b0">Metric 2</DemoBox>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <DemoBox color="#673ab7">Metric 3</DemoBox>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <DemoBox color="#3f51b5">Metric 4</DemoBox>
              </Grid>
            </Grid>
          </ExampleCard>
        </Grid>

        {/* Sidebar Layout */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <ExampleCard
            title="Sidebar Layout"
            description="Main content with sidebar - stacks on mobile, side-by-side on desktop"
            code={`<Grid size={{ xs: 12, lg: 8 }}>
  <MainContent />
</Grid>
<Grid size={{ xs: 12, lg: 4 }}>
  <Sidebar />
</Grid>`}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, lg: 8 }}>
                <DemoBox color="#00bcd4">Main Content (lg=8)</DemoBox>
              </Grid>
              <Grid size={{ xs: 12, lg: 4 }}>
                <DemoBox color="#009688">Sidebar (lg=4)</DemoBox>
              </Grid>
            </Grid>
          </ExampleCard>
        </Grid>

        {/* Complex Chart Layout */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <ExampleCard
            title="Complex Chart Layout"
            description="Mixed chart sizes for analytics dashboards"
            code={`<Grid size={{ xs: 12, md: 8 }}>
  <LargeChart />
</Grid>
<Grid size={{ xs: 12, md: 4 }}>
  <SmallChart />
</Grid>`}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 8 }}>
                <DemoBox color="#4caf50">Large Chart</DemoBox>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <DemoBox color="#8bc34a">Small Chart</DemoBox>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <DemoBox color="#cddc39">Medium Chart 1</DemoBox>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <DemoBox color="#ffeb3b">Medium Chart 2</DemoBox>
              </Grid>
            </Grid>
          </ExampleCard>
        </Grid>

        {/* Equal Height Columns */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <ExampleCard
            title="Equal Height Columns"
            description="Three equal columns that stack on smaller screens"
            code={`<Grid size={{ xs: 12, md: 4 }}>
  <Card sx={{ height: '100%' }}>
    Content
  </Card>
</Grid>`}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <DemoBox color="#ff5722">Column 1</DemoBox>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <DemoBox color="#795548">Column 2</DemoBox>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <DemoBox color="#607d8b">Column 3</DemoBox>
              </Grid>
            </Grid>
          </ExampleCard>
        </Grid>

        {/* Asymmetric Layout */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <ExampleCard
            title="Asymmetric Layout"
            description="Different proportions for varied content types"
            code={`<Grid size={{ xs: 12, md: 7 }}>
  <MainArea />
</Grid>
<Grid size={{ xs: 12, md: 5 }}>
  <SecondaryArea />
</Grid>`}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 7 }}>
                <DemoBox color="#e91e63">Main (7/12)</DemoBox>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <DemoBox color="#f06292">Secondary (5/12)</DemoBox>
              </Grid>
            </Grid>
          </ExampleCard>
        </Grid>

        {/* Breakpoint Comparison */}
        <Grid size={{ xs: 12 }}>
          <Card sx={{ p: 3, backgroundColor: alpha(theme.palette.info.main, 0.05) }}>
            <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Devices color="info" />
              Breakpoint Reference
            </Typography>
            
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Old Syntax (Deprecated)</Typography>
                <Paper sx={{ p: 2, backgroundColor: alpha(theme.palette.error.main, 0.05) }}>
                  <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`<Grid xs={12} sm={6} md={4} lg={3}>
  <Card>Content</Card>
</Grid>`}
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>New Syntax (Recommended)</Typography>
                <Paper sx={{ p: 2, backgroundColor: alpha(theme.palette.success.main, 0.05) }}>
                  <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
  <Card>Content</Card>
</Grid>`}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Breakpoint Values</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Chip label="xs: 0px+" color="primary" variant="outlined" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Chip label="sm: 600px+" color="secondary" variant="outlined" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Chip label="md: 900px+" color="success" variant="outlined" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Chip label="lg: 1200px+" color="warning" variant="outlined" />
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>

        {/* Advanced Examples */}
        <Grid size={{ xs: 12 }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
            Advanced Layout Examples
          </Typography>
        </Grid>

        {/* Masonry-like Layout */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <ExampleCard
            title="Masonry-like Layout"
            description="Different sized cards for varied content"
            code={`<Grid size={{ xs: 12, sm: 6 }}>
  <Card sx={{ height: 200 }} />
</Grid>
<Grid size={{ xs: 12 }}>
  <Card sx={{ height: 150 }} />
</Grid>`}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ height: 80, ...DemoBox({ children: 'Card 1', color: '#e91e63' }).props.sx }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#e91e63' }}>
                    Card 1
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ height: 60, ...DemoBox({ children: 'Card 2', color: '#9c27b0' }).props.sx }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#9c27b0' }}>
                    Card 2
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Box sx={{ height: 50, ...DemoBox({ children: 'Full Width Card', color: '#673ab7' }).props.sx }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#673ab7' }}>
                    Full Width Card
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </ExampleCard>
        </Grid>

        {/* Nested Grids */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <ExampleCard
            title="Nested Grids"
            description="Grids within grids for complex layouts"
            code={`<Grid size={{ xs: 12, md: 6 }}>
  <Grid container spacing={1}>
    <Grid size={{ xs: 6 }}>
      <SubCard />
    </Grid>
  </Grid>
</Grid>`}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <Box sx={{ p: 1, border: `2px dashed ${alpha(theme.palette.primary.main, 0.3)}` }}>
                  <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
                    Parent Grid
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid size={{ xs: 6 }}>
                      <DemoBox color="#3f51b5">Nested 1</DemoBox>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <DemoBox color="#2196f3">Nested 2</DemoBox>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </ExampleCard>
        </Grid>

        {/* Offset Examples */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <ExampleCard
            title="Offset & Spacing"
            description="Using offset and custom spacing for precise layouts"
            code={`<Grid size={{ xs: 10, md: 8 }} offset={{ xs: 1, md: 2 }}>
  <CenteredContent />
</Grid>`}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 8 }} offset={{ xs: 2 }}>
                <DemoBox color="#00bcd4">Centered (offset=2)</DemoBox>
              </Grid>
              <Grid size={{ xs: 6 }} offset={{ xs: 3 }}>
                <DemoBox color="#009688">Centered (offset=3)</DemoBox>
              </Grid>
            </Grid>
          </ExampleCard>
        </Grid>

      </Grid>
    </Box>
  );
};

export default GridSyntaxExamples;