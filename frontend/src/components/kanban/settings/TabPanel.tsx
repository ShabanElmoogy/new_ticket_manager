// components/common/TabPanel.tsx
import React from "react";
import { Box, Slide } from "@mui/material";
import { type TabPanelProps } from "../../../types/BoardSettings";

export const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
}) => (
  <Box
    role="tabpanel"
    hidden={value !== index}
    id={`board-settings-tabpanel-${index}`}
    aria-labelledby={`board-settings-tab-${index}`}
  >
    {value === index && (
      <Slide direction="left" in={value === index} mountOnEnter unmountOnExit>
        <Box sx={{ py: 3 }}>{children}</Box>
      </Slide>
    )}
  </Box>
);
