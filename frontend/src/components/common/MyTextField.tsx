import React, { useState } from "react";
import { TextField, IconButton, InputAdornment, useTheme } from "@mui/material";
import {
  Clear as ClearIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import type { TextFieldProps } from "@mui/material/TextField";

interface MyTextFieldProps extends Omit<TextFieldProps, "autoComplete"> {
  showClearButton?: boolean;
  showSuccessIcon?: boolean;
  onClear?: () => void;
  rounded?: boolean;
  successIconColor?: string;
  // Allow for custom validation logic
  isValid?: boolean;
  // Start icon configuration
  startIcon?: React.ReactNode;
  startIconColor?: string;
}

const MyTextField: React.FC<MyTextFieldProps> = (props) => {
  const {
    showClearButton = true,
    showSuccessIcon = true,
    onClear,
    value,
    onChange,
    onFocus,
    onBlur,
    slotProps,
    sx,
    rounded = false,
    successIconColor,
    isValid,
    error,
    startIcon,
    startIconColor,
    ...restProps
  } = props;

  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  // Check if field has value
  const hasValue = Boolean(value && String(value).length > 0);

  // Determine if we should show success icon
  // Show success if: NOT focused, has value, no error, not currently clearing, and either isValid is true or isValid is undefined (auto-detect)
  const shouldShowSuccess =
    showSuccessIcon && !isFocused && hasValue && !error && !isClearing && isValid !== false;

  // Determine if we should show clear button
  // Show clear if: focused, has value, and showClearButton is true
  const shouldShowClear = showClearButton && isFocused && hasValue;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Set clearing state to prevent success icon from showing
    setIsClearing(true);
    
    if (onClear) {
      onClear();
    } else if (onChange) {
      const event = {
        target: { value: "" },
        currentTarget: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
    
    // Reset clearing state after a brief delay to allow value to update
    setTimeout(() => {
      setIsClearing(false);
    }, 50);
  };

  // Create success icon
  const successIcon = shouldShowSuccess ? (
    <InputAdornment position="end">
      <CheckCircleIcon
        sx={{
          color: successIconColor || theme.palette.success.main,
          fontSize: "1.2rem",
          opacity: 0.8,
          transition: "opacity 0.2s ease-in-out",
        }}
      />
    </InputAdornment>
  ) : undefined;

  // Create clear button
  const clearButton = shouldShowClear ? (
    <InputAdornment position="end">
      <IconButton
        aria-label="clear"
        onMouseDown={handleClear}
        edge="end"
        size="small"
        tabIndex={-1}
        sx={{
          opacity: 0.7,
          "&:hover": {
            opacity: 1,
            backgroundColor: alpha(theme.palette.action.hover, 0.1),
          },
          transition: "opacity 0.2s ease-in-out",
        }}
      >
        <ClearIcon fontSize="small" />
      </IconButton>
    </InputAdornment>
  ) : undefined;

  // Determine which end adornment to use (success takes priority when not focused)
  const endAdornment = successIcon || clearButton;

  // Create start icon adornment
  const startAdornment = startIcon ? (
    <InputAdornment position="start">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          color: startIconColor || theme.palette.text.secondary,
          fontSize: '1.2rem',
        }}
      >
        {startIcon}
      </div>
    </InputAdornment>
  ) : undefined;

  // Build the input slot props with proper typing
  const inputSlotProps = {
    ...slotProps?.input,
    ...(endAdornment && { endAdornment }),
    ...(startAdornment && { startAdornment }),
  };

  return (
    <TextField
      {...restProps}
      value={value}
      onChange={onChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      error={error}
      autoComplete="off"
      sx={{
        ...(rounded && {
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
          },
        }),
        ...sx,
      }}
      slotProps={{
        ...slotProps,
        input: inputSlotProps,
        htmlInput: {
          ...slotProps?.htmlInput,
          // Comprehensive autocomplete prevention
          autoComplete: "new-password",
          autoCorrect: "off",
          autoCapitalize: "off",
          spellCheck: "false",
          // Password manager prevention
          "data-lpignore": "true", // LastPass
          "data-1p-ignore": "true", // 1Password
          "data-bwignore": "true", // Bitwarden
          "data-dashlane-ignore": "true", // Dashlane
          "data-keeper-ignore": "true", // Keeper
          // Browser autocomplete prevention
          "data-form-type": "other",
          "data-autocomplete-type": "disabled",
          // Additional attributes
          role: "textbox",
          "aria-autocomplete": "none",
        },
      }}
    />
  );
};

export default MyTextField;

/*
Usage example with start icon:

import { Search as SearchIcon, Email as EmailIcon } from "@mui/icons-material";

// With search icon
<MyTextField 
  startIcon={<SearchIcon />}
  placeholder="Search..."
/>

// With email icon and custom color
<MyTextField 
  startIcon={<EmailIcon />}
  startIconColor="#1976d2"
  placeholder="Enter email"
/>
*/

// Helper function to make alpha available
function alpha(color: string, value: number): string {
  // Simple alpha implementation for demo - you might want to use MUI's alpha utility
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${value})`;
}