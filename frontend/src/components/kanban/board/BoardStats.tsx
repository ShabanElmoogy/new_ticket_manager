import React from "react";
import { Box, Chip, useTheme } from "@mui/material";
import type {
  KanbanColumn as KanbanColumnType,
  TicketStatus,
} from "../../../types/kanban";

interface BoardStatsProps {
  statusColumns: TicketStatus[];
  getTicketsForColumn: (status: TicketStatus) => any[];
  getColumnByStatus: (status: TicketStatus) => KanbanColumnType | undefined;
  hasActiveFilters: boolean;
}

const BoardStats: React.FC<BoardStatsProps> = ({
  statusColumns,
  getTicketsForColumn,
  getColumnByStatus,
  hasActiveFilters,
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const getChipColors = (column: KanbanColumnType | undefined) => {
    if (!column) return { backgroundColor: "transparent", color: "inherit" };

    // Use theme-aware colors
    const backgroundColor =
      column.color && column.darkColor
        ? isDarkMode
          ? column.darkColor
          : column.color
        : column.color || "transparent";

    // Determine text color based on background
    const textColor =
      backgroundColor !== "transparent"
        ? isDarkMode
          ? "rgba(255, 255, 255, 0.87)"
          : "rgba(0, 0, 0, 0.87)"
        : "inherit";

    return { backgroundColor, color: textColor };
  };

  return (
    <Box
      display="flex"
      gap={{ xs: 1, sm: 2 }}
      mt={2}
      flexWrap="wrap"
      sx={{
        "& .MuiChip-root": {
          fontSize: { xs: "0.7rem", sm: "0.8125rem" },
          height: { xs: 24, sm: 32 },
        },
      }}
    >
      {statusColumns.map((status) => {
        const tickets = getTicketsForColumn(status);
        const column = getColumnByStatus(status);
        const chipColors = getChipColors(column);

        return (
          <Chip
            key={status}
            label={`${column?.name || status}: ${tickets.length}`}
            size="small"
            variant="outlined"
            sx={{
              backgroundColor: chipColors.backgroundColor,
              color: chipColors.color,
              transition: "background-color 0.3s ease, color 0.3s ease",
              borderColor: isDarkMode ? "rgba(255, 255, 255, 0.23)" : undefined,
            }}
          />
        );
      })}
      {hasActiveFilters && (
        <Chip
          label="Filters Active"
          size="small"
          color="primary"
          variant="filled"
        />
      )}
    </Box>
  );
};

export default BoardStats;
