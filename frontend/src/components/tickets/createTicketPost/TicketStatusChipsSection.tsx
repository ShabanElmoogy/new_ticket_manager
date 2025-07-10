import React from "react";
import { Box, Typography, Button } from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import type { User, Label } from "./types";
import MyCard from "../../common/MyCard";

interface TicketStatusChipsSectionProps {
  showAdvanced: boolean;
  onToggleAdvanced: () => void;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  assignedTo: string;
  dueDate: Date | null;
  estimatedHours: string;
  selectedLabels: Label[];
  employees: User[];
}

const TicketStatusChipsSection: React.FC<TicketStatusChipsSectionProps> = ({
  showAdvanced,
  onToggleAdvanced,
}) => {
  return (
    <MyCard headerIcon="">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="subtitle2" fontWeight={600}>
          Ticket Configuration
        </Typography>
        <Button
          startIcon={showAdvanced ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={onToggleAdvanced}
          size="small"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          {showAdvanced ? "Hide Options" : "More Options"}
        </Button>
      </Box>
    </MyCard>
  );
};

export default TicketStatusChipsSection;
