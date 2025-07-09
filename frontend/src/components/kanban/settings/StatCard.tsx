// components/common/StatCard.tsx
import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import { TrendingUp as TrendingUpIcon } from "@mui/icons-material";
import { type StatCardProps } from "../../../types/BoardSettings";

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  subtitle,
  trend,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 3,
        background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(
          color,
          0.05
        )} 100%)`,
        border: `1px solid ${alpha(color, 0.2)}`,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: theme.shadows[8],
          borderColor: alpha(color, 0.4),
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: color,
                lineHeight: 1,
                mb: 0.5,
              }}
            >
              {value}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 600, mb: 0.5 }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.disabled">
                {subtitle}
              </Typography>
            )}
            {trend !== undefined && (
              <Box display="flex" alignItems="center" mt={1}>
                <TrendingUpIcon
                  sx={{
                    fontSize: 16,
                    color: trend > 0 ? "success.main" : "error.main",
                    mr: 0.5,
                  }}
                />
                <Typography
                  variant="caption"
                  color={trend > 0 ? "success.main" : "error.main"}
                  fontWeight={600}
                >
                  {trend > 0 ? "+" : ""}
                  {trend}%
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              backgroundColor: alpha(color, 0.15),
              color: color,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
