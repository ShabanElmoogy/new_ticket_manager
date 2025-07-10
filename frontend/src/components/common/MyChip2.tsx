import { Chip } from "@mui/material";
import { alpha } from "@mui/material/styles";

interface Label {
  id: string;
  name: string;
  color: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface LabelChipProps extends Label {
  variant?: "selectable" | "deletable";
  isSelected?: boolean;
  onLabelToggle: (label?: Label) => void;
}

export default function LabelChip({
  id,
  name,
  color,
  description,
  createdAt,
  updatedAt,
  variant = "selectable",
  isSelected = false,
  onLabelToggle,
}: LabelChipProps) {
  const labelData: Label = {
    id,
    name,
    color,
    description,
    createdAt,
    updatedAt,
  };

  const handleAction = () => {
    onLabelToggle(labelData);
  };

  const getStyles = () => {
    if (variant === "deletable") {
      return {
        backgroundColor: `${color}20`,
        color: color,
        fontWeight: 600,
        border: `1px solid ${color}40`,
        "& .MuiChip-deleteIcon": {
          color: color,
          "&:hover": {
            color: alpha(color, 0.8),
          },
        },
      };
    }

    // Selectable variant
    return {
      backgroundColor: isSelected ? `${color}30` : `${color}10`,
      color: color,
      fontWeight: isSelected ? 700 : 500,
      border: `2px solid ${isSelected ? color : `${color}30`}`,
      transform: isSelected ? "scale(1.05)" : "scale(1)",
      transition: "all 0.2s ease",
      "&:hover": {
        backgroundColor: `${color}25`,
        transform: "scale(1.05)",
      },
    };
  };

  if (variant === "deletable") {
    return (
      <Chip
        key={id}
        label={name}
        size="small"
        onDelete={handleAction}
        sx={getStyles()}
      />
    );
  }

  return (
    <Chip
      key={id}
      label={name}
      size="small"
      clickable
      onClick={handleAction}
      sx={getStyles()}
    />
  );
}
