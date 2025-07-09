// components/tabs/OverviewTab.tsx
import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
  Stack,
  Avatar,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  Timeline as TimelineIcon,
  ViewColumn as ViewColumnIcon,
  People as PeopleIcon,
  Dashboard as DashboardIcon,
  Public as PublicIcon,
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { StatCard } from "./StatCard";
import type { KanbanBoard } from "../../../types/kanban";

interface OverviewTabProps {
  board: KanbanBoard;
  boardName: string;
  setBoardName: (name: string) => void;
  boardDescription: string;
  setBoardDescription: (description: string) => void;
  isPublic: boolean;
  setIsPublic: (isPublic: boolean) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  board,
  boardName,
  setBoardName,
  boardDescription,
  setBoardDescription,
  isPublic,
  setIsPublic,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ px: 3 }}>
      <Grid container spacing={4}>
        {/* Board Information */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card
            sx={{
              borderRadius: 4,
              background: `linear-gradient(135deg, ${alpha(
                theme.palette.primary.main,
                0.03
              )} 0%, ${alpha(theme.palette.secondary.main, 0.03)} 100%)`,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h5"
                fontWeight={700}
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  color: theme.palette.primary.main,
                }}
              >
                <SettingsIcon />
                Board Information
              </Typography>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Board Name"
                    fullWidth
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        fontSize: "1.1rem",
                        fontWeight: 600,
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    value={boardDescription}
                    onChange={(e) => setBoardDescription(e.target.value)}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box display="flex" alignItems="center" gap={1}>
                        {isPublic ? <PublicIcon /> : <LockIcon />}
                        <Typography variant="body1" fontWeight={500}>
                          {isPublic ? "Public Board" : "Private Board"}
                        </Typography>
                      </Box>
                    }
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    mt={1}
                  >
                    {isPublic
                      ? "Anyone with the link can view this board"
                      : "Only team members can access this board"}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Statistics */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            <StatCard
              title="Columns"
              value={board.columns?.length || 0}
              icon={<ViewColumnIcon />}
              color={theme.palette.primary.main}
              subtitle="Workflow stages"
              trend={12}
            />
            <StatCard
              title="Team Members"
              value={board.permissions?.length || 0}
              icon={<PeopleIcon />}
              color={theme.palette.secondary.main}
              subtitle="Active collaborators"
              trend={-5}
            />
            <StatCard
              title="Total Cards"
              value={
                board.columns?.reduce(
                  (total, col) => total + (col.cards?.length || 0),
                  0
                ) || 0
              }
              icon={<DashboardIcon />}
              color={theme.palette.success.main}
              subtitle="Across all columns"
              trend={8}
            />
          </Stack>
        </Grid>

        {/* Recent Activity */}
        <Grid size={{ xs: 12 }}>
          <Card
            sx={{
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h5"
                fontWeight={700}
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  color: theme.palette.primary.main,
                }}
              >
                <TimelineIcon />
                Recent Activity
              </Typography>
              <Box sx={{ mt: 3 }}>
                {[1, 2, 3].map((item) => (
                  <Box
                    key={item}
                    display="flex"
                    alignItems="center"
                    gap={2}
                    py={2}
                    borderBottom={`1px solid ${theme.palette.divider}`}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        backgroundColor: theme.palette.primary.main,
                        fontSize: "0.875rem",
                      }}
                    >
                      U
                    </Avatar>
                    <Box flex={1}>
                      <Typography variant="body2" fontWeight={500}>
                        John Doe moved "Design Review" from "In Progress" to
                        "Done"
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        2 hours ago
                      </Typography>
                    </Box>
                    <CheckCircleIcon
                      sx={{ color: "success.main", fontSize: 20 }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
