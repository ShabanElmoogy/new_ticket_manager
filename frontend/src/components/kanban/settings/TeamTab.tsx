// components/tabs/TeamTab.tsx
import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  useTheme,
  alpha,
} from "@mui/material";
import {
  PersonAdd as PersonAddIcon,
  People as PeopleIcon,
  Info as InfoIcon,
  Security as SecurityIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { UserCard } from "./UserCard";
import type { KanbanBoard } from "../../../types/kanban";

interface TeamTabProps {
  board: KanbanBoard;
  onRemoveUser?: (id: string) => void;
}

export const TeamTab: React.FC<TeamTabProps> = ({ board, onRemoveUser }) => {
  const theme = useTheme();

  return (
    <Box sx={{ px: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Team Members
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage who has access to this board and their permissions
          </Typography>
        </Box>
        <Button
          startIcon={<PersonAddIcon />}
          variant="contained"
          size="large"
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            fontWeight: 600,
            boxShadow: theme.shadows[4],
            background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
            "&:hover": {
              boxShadow: theme.shadows[8],
              transform: "translateY(-1px)",
            },
          }}
        >
          Invite Member
        </Button>
      </Box>

      {board.permissions && board.permissions.length > 0 ? (
        <Grid container spacing={3}>
          {board.permissions.map((permission) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={permission.id}>
              <UserCard permission={permission} onRemove={onRemoveUser} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card
          sx={{
            borderRadius: 4,
            border: `2px dashed ${theme.palette.divider}`,
            backgroundColor: alpha(theme.palette.secondary.main, 0.02),
            textAlign: "center",
            py: 8,
          }}
        >
          <CardContent>
            <PeopleIcon
              sx={{
                fontSize: 64,
                color: "text.disabled",
                mb: 2,
              }}
            />
            <Typography
              variant="h5"
              fontWeight={600}
              gutterBottom
              color="text.secondary"
            >
              No team members yet
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Invite colleagues to collaborate on this board
            </Typography>
            <Button
              startIcon={<PersonAddIcon />}
              variant="contained"
              sx={{ borderRadius: 3 }}
            >
              Invite First Member
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Permission Roles Info */}
      <Card
        sx={{
          mt: 4,
          borderRadius: 4,
          border: `1px solid ${theme.palette.divider}`,
          background: alpha(theme.palette.info.main, 0.02),
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              color: theme.palette.info.main,
            }}
          >
            <InfoIcon />
            Permission Roles
          </Typography>
          <Grid container spacing={3} mt={1}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                  backgroundColor: alpha(theme.palette.error.main, 0.05),
                }}
              >
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <SecurityIcon sx={{ color: "error.main" }} />
                  <Typography variant="h6" fontWeight={600}>
                    Admin
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Full access to board settings, can manage members and delete
                  the board
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                  backgroundColor: alpha(theme.palette.warning.main, 0.05),
                }}
              >
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <EditIcon sx={{ color: "warning.main" }} />
                  <Typography variant="h6" fontWeight={600}>
                    Editor
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Can create, edit, and move cards. Can modify column settings
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                  backgroundColor: alpha(theme.palette.info.main, 0.05),
                }}
              >
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <VisibilityIcon sx={{ color: "info.main" }} />
                  <Typography variant="h6" fontWeight={600}>
                    Viewer
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Read-only access. Can view cards and comments but cannot make
                  changes
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
