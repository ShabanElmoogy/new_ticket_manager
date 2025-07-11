import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
  loading?: boolean;
}

const DashboardCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  trend,
  subtitle,
  loading = false,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: "100%",
        background: `linear-gradient(135deg, ${
          theme.palette.background.paper
        } 0%, ${alpha(theme.palette.background.default, 0.8)} 100%)`,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 3,
        borderTop: `4px solid ${color}`,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        overflow: "visible",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: `0 20px 40px ${alpha(color, 0.15)}`,
          borderColor: alpha(color, 0.3),
          "& .stat-icon": {
            transform: "scale(1.1) rotate(5deg)",
          },
          "& .stat-value": {
            background: `linear-gradient(135deg, ${color} 0%, ${alpha(
              color,
              0.8
            )} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          },
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          background: `linear-gradient(135deg, ${alpha(
            color,
            0.02
          )} 0%, transparent 50%)`,
          borderRadius: 3,
          pointerEvents: "none",
        },
      }}
    >
      <CardContent sx={{ p: 3, pb: "24px !important" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="overline"
              sx={{
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "0.5px",
                mb: 1,
                color: theme.palette.text.secondary,
                display: "block",
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="h3"
              component="div"
              className="stat-value"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.8rem", sm: "2.25rem" },
                lineHeight: 1.1,
                color: theme.palette.text.primary,
                mb: 0.5,
                transition: "all 0.3s ease",
                fontFamily:
                  '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              {loading ? (
                <Box
                  sx={{
                    width: "80%",
                    height: "2rem",
                    backgroundColor: alpha(theme.palette.text.disabled, 0.1),
                    borderRadius: 1,
                    position: "relative",
                    overflow: "hidden",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background: `linear-gradient(90deg, transparent, ${alpha(
                        theme.palette.common.white,
                        0.4
                      )}, transparent)`,
                      animation: "loading 1.5s infinite",
                    },
                    "@keyframes loading": {
                      "0%": { left: "-100%" },
                      "100%": { left: "100%" },
                    },
                  }}
                />
              ) : (
                value
              )}
            </Typography>

            {subtitle && (
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.875rem",
                  color: theme.palette.text.secondary,
                  fontWeight: 500,
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>

          <Avatar
            className="stat-icon"
            sx={{
              background: `linear-gradient(135deg, ${color} 0%, ${alpha(
                color,
                0.8
              )} 100%)`,
              width: 56,
              height: 56,
              boxShadow: `0 8px 32px ${alpha(color, 0.25)}`,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "& .MuiSvgIcon-root": {
                fontSize: "1.5rem",
                color: theme.palette.common.white,
              },
            }}
          >
            {icon}
          </Avatar>
        </Box>

        {trend && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
              pt: 2,
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Chip
              icon={
                trend.isPositive ? (
                  <ArrowUpward fontSize="small" />
                ) : (
                  <ArrowDownward fontSize="small" />
                )
              }
              label={`${Math.abs(trend.value)}%`}
              size="small"
              sx={{
                backgroundColor: trend.isPositive
                  ? alpha(theme.palette.success.main, 0.1)
                  : alpha(theme.palette.error.main, 0.1),
                color: trend.isPositive
                  ? theme.palette.success.main
                  : theme.palette.error.main,
                fontWeight: 600,
                fontSize: "0.75rem",
                "& .MuiChip-icon": {
                  color: trend.isPositive
                    ? theme.palette.success.main
                    : theme.palette.error.main,
                  fontSize: "0.875rem",
                },
              }}
            />

            <Typography
              variant="body2"
              sx={{
                fontSize: "0.75rem",
                color: theme.palette.text.secondary,
                fontWeight: 500,
              }}
            >
              vs last month
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
