import React from "react";
import { Collapse, Fade, useTheme, Box } from "@mui/material";
import { alpha } from "@mui/material/styles";
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
  const theme = useTheme();

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
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: `0 4px 12px ${alpha(
                      theme.palette.primary.main,
                      0.15
                    )}`,
                  },
                  "&.Mui-focused": {
                    transform: "translateY(-1px)",
                    boxShadow: `0 4px 12px ${alpha(
                      theme.palette.primary.main,
                      0.25
                    )}`,
                  },
                },
              }}
            />
          </MyCard>
        </Box>
      </Fade>
    </Collapse>
  );
};

export default TicketDescriptionSection;
