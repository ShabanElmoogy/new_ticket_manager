// components/team/UserCard.tsx
import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  Badge,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Security as SecurityIcon,
  Visibility as VisibilityIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import { type UserCardProps } from "../../../types/BoardSettings";

export const UserCard: React.FC<UserCardProps> = ({ permission, onRemove }) => {
  const theme = useTheme();

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return theme.palette.error.main;
      case "EDITOR":
        return theme.palette.warning.main;
      case "VIEWER":
        return theme.palette.info.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "ADMIN":
        return <SecurityIcon />;
      case "EDITOR":
        return <EditIcon />;
      case "VIEWER":
        return <VisibilityIcon />;
      default:
        return <PersonAddIcon />;
    }
  };

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: theme.shadows[4],
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Badge
            badgeContent={getRoleIcon(permission.role)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: getRoleColor(permission.role),
                color: "white",
                width: 24,
                height: 24,
                borderRadius: "50%",
                border: `2px solid ${theme.palette.background.paper}`,
              },
            }}
          >
            <Avatar
              sx={{
                width: 56,
                height: 56,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                fontWeight: 700,
                fontSize: "1.25rem",
              }}
            >
              {permission.user.name.charAt(0).toUpperCase()}
            </Avatar>
          </Badge>

          <Box flex={1}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              {permission.user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {permission.user.email}
            </Typography>
            <Box display="flex" gap={1} alignItems="center">
              <Chip
                label={permission.role}
                size="small"
                sx={{
                  backgroundColor: alpha(getRoleColor(permission.role), 0.1),
                  color: getRoleColor(permission.role),
                  fontWeight: 600,
                  border: `1px solid ${alpha(
                    getRoleColor(permission.role),
                    0.3
                  )}`,
                }}
              />
              <Typography variant="caption" color="text.disabled">
                • Last active 2h ago
              </Typography>
            </Box>
          </Box>

          <Stack direction="row" spacing={1}>
            <Tooltip title="Edit permissions">
              <IconButton
                sx={{
                  color: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            {onRemove && (
              <Tooltip title="Remove user">
                <IconButton
                  onClick={() => onRemove(permission.id)}
                  sx={{
                    color: theme.palette.error.main,
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.error.main, 0.1),
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};
