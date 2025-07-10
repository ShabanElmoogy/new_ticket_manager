import React from "react";
import { Collapse, Fade, Box } from "@mui/material";
import MyTextField from "../../common/MyTextField";
import MyCard from "../../common/MyCard";

interface TicketDescriptionSectionProps {
  title: string;
  description: string;
  onDescriptionChange: (description: string) => void;
}
const TicketDescriptionSection: React.FC<TicketDescriptionSectionProps> = ({
  title,
  description,
  onDescriptionChange,
}) => {
  return (
    <Collapse in={title.length > 0}>
      <Fade in={title.length > 0}>
        <Box>
          <MyCard inputTitle="Description" headerIcon="">
            <MyTextField
              fullWidth
              multiline
              rows={4}
              placeholder="Provide detailed information about the issue, steps to reproduce, or requirements..."
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              rounded
            />
          </MyCard>
        </Box>
      </Fade>
    </Collapse>
  );
};

export default TicketDescriptionSection;
