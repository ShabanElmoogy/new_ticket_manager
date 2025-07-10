import React from "react";
import { useTheme } from "@mui/material";
import { AutoAwesome as AutoAwesomeIcon } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import MyTextField from "../../common/MyTextField";
import MyCard from "../../common/MyCard";

interface TicketHeaderSectionProps {
  user: {
    name?: string;
    role?: "ADMIN" | "EMPLOYEE";
  } | null;
  title: string;
  onTitleChange: (title: string) => void;
}

const TicketHeaderSection: React.FC<TicketHeaderSectionProps> = ({
  user,
  title,
  onTitleChange,
}) => {
  const theme = useTheme();

  return (
    <MyCard
      user={user}
      showWelcome
      title="Create New Ticket"
      subtitle="Let's solve your issue together"
      inputTitle="What's the issue?"
    >
      <MyTextField
        fullWidth
        placeholder="Describe the problem or request... (e.g., 'Login button not working on mobile')"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        rounded
        startIcon={<AutoAwesomeIcon />}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            fontSize: "1.1rem",
            fontWeight: 500,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            border: `2px solid ${alpha(theme.palette.divider, 0.1)}`,
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: "blur(10px)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: `0 8px 25px ${alpha(
                theme.palette.primary.main,
                0.15
              )}`,
              borderColor: alpha(theme.palette.primary.main, 0.3),
            },
            "&.Mui-focused": {
              transform: "translateY(-2px)",
              boxShadow: `0 8px 25px ${alpha(
                theme.palette.primary.main,
                0.25
              )}`,
              borderColor: theme.palette.primary.main,
              backgroundColor: theme.palette.background.paper,
            },
          },
          "& .MuiInputAdornment-root": {
            color: theme.palette.primary.main,
          },
        }}
      />
    </MyCard>
  );
};

export default TicketHeaderSection;
