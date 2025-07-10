import React, { useState, useRef, useEffect } from "react";
import { TextField, IconButton, InputAdornment, useTheme } from "@mui/material";
import {
  Clear as ClearIcon,
  CheckCircle as CheckCircleIcon,
  Visibility,
  VisibilityOff,
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
  // Password toggle configuration
  showPasswordToggle?: boolean;
}

const MyTextField: React.FC<MyTextFieldProps> = (props) => {
  const {
    showClearButton = true,
    showSuccessIcon = true,
    showPasswordToggle = false,
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
    type: originalType,
    ...restProps
  } = props;

  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Check if field has value
  const hasValue = Boolean(value && String(value).length > 0);

  // Determine if this is a password field
  const isPasswordField = originalType === "password" || showPasswordToggle;

  // Determine actual input type
  const inputType = isPasswordField
    ? showPassword
      ? "text"
      : "password"
    : originalType;

  // Generate a unique name to prevent autocomplete associations
  const uniqueName = useRef(
    `no-autocomplete-${Math.random().toString(36).substr(2, 9)}`
  );

  // Ensure autocomplete is completely disabled after component mounts
  useEffect(() => {
    if (inputRef.current) {
      const input = inputRef.current;

      // Set attributes directly on the DOM element
      input.setAttribute("autocomplete", "off");
      input.setAttribute("autocorrect", "off");
      input.setAttribute("autocapitalize", "off");
      input.setAttribute("spellcheck", "false");

      // Additional browser-specific attributes
      input.setAttribute("data-lpignore", "true");
      input.setAttribute("data-1p-ignore", "true");
      input.setAttribute("data-bwignore", "true");
      input.setAttribute("data-dashlane-ignore", "true");
      input.setAttribute("data-keeper-ignore", "true");
      input.setAttribute("data-roboform-ignore", "true");
      input.setAttribute("data-bitwarden-ignore", "true");

      // Prevent form-based autocomplete
      input.setAttribute("data-form-type", "other");
      input.setAttribute("data-autocomplete-type", "disabled");

      // Remove any existing autocomplete classes
      input.classList.remove("autocomplete", "autofill");

      // Set a random name to break autocomplete patterns
      input.setAttribute("name", uniqueName.current);

      // For password fields, use additional prevention
      if (isPasswordField) {
        input.setAttribute("autocomplete", "new-password");
        input.setAttribute("data-password-manager-ignore", "true");
      }
    }
  }, [isPasswordField]);

  // Additional effect to monitor and prevent autocomplete attempts
  useEffect(() => {
    if (inputRef.current) {
      const input = inputRef.current;

      const preventAutocomplete = () => {
        // Re-apply autocomplete prevention if it gets overridden
        input.setAttribute(
          "autocomplete",
          isPasswordField ? "new-password" : "off"
        );
      };

      // Monitor for changes that might re-enable autocomplete
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            (mutation.attributeName === "autocomplete" ||
              mutation.attributeName === "name")
          ) {
            preventAutocomplete();
          }
        });
      });

      observer.observe(input, {
        attributes: true,
        attributeFilter: ["autocomplete", "name", "data-lpignore"],
      });

      return () => observer.disconnect();
    }
  }, [isPasswordField]);

  // Determine if we should show success icon
  const shouldShowSuccess =
    showSuccessIcon &&
    !isFocused &&
    hasValue &&
    !error &&
    !isClearing &&
    isValid !== false;

  // Determine if we should show clear button
  const shouldShowClear = showClearButton && isFocused && hasValue;

  // Determine if we should show password toggle
  const shouldShowPasswordToggle = isPasswordField && hasValue;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);

    // Additional autocomplete prevention on focus
    const input = e.target;
    input.setAttribute(
      "autocomplete",
      isPasswordField ? "new-password" : "off"
    );

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

    setTimeout(() => {
      setIsClearing(false);
    }, 50);
  };

  const handlePasswordToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  // Create password toggle button
  const passwordToggle = shouldShowPasswordToggle ? (
    <IconButton
      aria-label={showPassword ? "hide password" : "show password"}
      onMouseDown={handlePasswordToggle}
      edge="end"
      size="small"
      tabIndex={-1}
      sx={{
        opacity: 0.7,
        marginLeft: 0.5,
        "&:hover": {
          opacity: 1,
          backgroundColor: alpha(theme.palette.action.hover, 0.1),
        },
        transition: "opacity 0.2s ease-in-out",
      }}
    >
      {showPassword ? (
        <VisibilityOff fontSize="small" />
      ) : (
        <Visibility fontSize="small" />
      )}
    </IconButton>
  ) : null;

  // Create success icon
  const successIcon = shouldShowSuccess ? (
    <CheckCircleIcon
      sx={{
        color: successIconColor || theme.palette.success.main,
        fontSize: "1.2rem",
        opacity: 0.8,
        transition: "opacity 0.2s ease-in-out",
        marginRight: passwordToggle ? 0.5 : 0,
      }}
    />
  ) : null;

  // Create clear button
  const clearButton = shouldShowClear ? (
    <IconButton
      aria-label="clear"
      onMouseDown={handleClear}
      edge="end"
      size="small"
      tabIndex={-1}
      sx={{
        opacity: 0.7,
        marginLeft: successIcon || passwordToggle ? 0.5 : 0,
        "&:hover": {
          opacity: 1,
          backgroundColor: alpha(theme.palette.action.hover, 0.1),
        },
        transition: "opacity 0.2s ease-in-out",
      }}
    >
      <ClearIcon fontSize="small" />
    </IconButton>
  ) : null;

  // Build end adornment with proper ordering
  const endAdornmentElements = [];

  // Add success icon first (leftmost when multiple icons)
  if (successIcon) {
    endAdornmentElements.push(successIcon);
  }

  // Add password toggle (middle)
  if (passwordToggle) {
    endAdornmentElements.push(passwordToggle);
  }

  // Add clear button last (rightmost)
  if (clearButton) {
    endAdornmentElements.push(clearButton);
  }

  // Create end adornment only if we have elements
  const endAdornment =
    endAdornmentElements.length > 0 ? (
      <InputAdornment position="end" sx={{ gap: 0 }}>
        {endAdornmentElements.map((element, index) => (
          <React.Fragment key={index}>{element}</React.Fragment>
        ))}
      </InputAdornment>
    ) : undefined;

  // Create start icon adornment
  const startAdornment = startIcon ? (
    <InputAdornment position="start">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: startIconColor || theme.palette.text.secondary,
          fontSize: "1.2rem",
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
    ref: inputRef,
  };

  return (
    <TextField
      {...restProps}
      type={inputType}
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
        // Hide native password toggle in WebKit browsers
        "& input[type='password']::-webkit-textfield-decoration-container": {
          display: "none !important",
        },
        "& input[type='password']::-webkit-credentials-auto-fill-button": {
          display: "none !important",
        },
        "& input[type='password']::-webkit-strong-password-auto-fill-button": {
          display: "none !important",
        },
        // Hide native password toggle in other browsers
        "& input[type='password']::-ms-reveal": {
          display: "none !important",
        },
        "& input[type='password']::-ms-clear": {
          display: "none !important",
        },
        // Prevent browser autofill styling
        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px transparent inset !important",
          WebkitTextFillColor: "inherit !important",
          transition: "background-color 5000s ease-in-out 0s !important",
        },
        "& input:-webkit-autofill:hover": {
          WebkitBoxShadow: "0 0 0 1000px transparent inset !important",
          WebkitTextFillColor: "inherit !important",
          transition: "background-color 5000s ease-in-out 0s !important",
        },
        "& input:-webkit-autofill:focus": {
          WebkitBoxShadow: "0 0 0 1000px transparent inset !important",
          WebkitTextFillColor: "inherit !important",
          transition: "background-color 5000s ease-in-out 0s !important",
        },
        "& input:-webkit-autofill:active": {
          WebkitBoxShadow: "0 0 0 1000px transparent inset !important",
          WebkitTextFillColor: "inherit !important",
          transition: "background-color 5000s ease-in-out 0s !important",
        },
        // Disable autofill dropdown
        "& input": {
          "&::-webkit-contacts-auto-fill-button": {
            visibility: "hidden !important",
            display: "none !important",
            pointerEvents: "none !important",
            position: "absolute !important",
            right: "0 !important",
          },
        },
        ...sx,
      }}
      slotProps={{
        ...slotProps,
        input: inputSlotProps,
        htmlInput: {
          ...slotProps?.htmlInput,
          // Comprehensive autocomplete prevention
          autoComplete: isPasswordField ? "new-password" : "off",
          autoCorrect: "off",
          autoCapitalize: "off",
          spellCheck: "false",

          // Random name to break autocomplete patterns
          name: uniqueName.current,

          // Password manager prevention (comprehensive list)
          "data-lpignore": "true", // LastPass
          "data-1p-ignore": "true", // 1Password
          "data-bwignore": "true", // Bitwarden
          "data-dashlane-ignore": "true", // Dashlane
          "data-keeper-ignore": "true", // Keeper
          "data-roboform-ignore": "true", // RoboForm
          "data-bitwarden-ignore": "true", // Bitwarden alternative
          "data-password-manager-ignore": "true", // Generic

          // Browser autocomplete prevention
          "data-form-type": "other",
          "data-autocomplete-type": "disabled",
          "data-enable-autocomplete": "false",

          // Additional security attributes
          role: "textbox",
          "aria-autocomplete": "none",
          "data-testid": uniqueName.current,

          // Prevent form association
          form: "",

          // Additional WebKit prevention
          "data-webkit-autofill": "false",

          // Prevent mobile keyboard suggestions
          inputMode: isPasswordField ? "text" : undefined,
        },
      }}
    />
  );
};

export default MyTextField;

/*
Usage examples:

// Basic password field with complete autocomplete prevention
<MyTextField 
  type="password"
  placeholder="Enter password"
  showPasswordToggle={true}
/>

// Email field with complete autocomplete prevention
<MyTextField 
  type="email"
  startIcon={<EmailIcon />}
  placeholder="Enter email"
  isValid={emailIsValid}
/>

// Search field with autocomplete disabled
<MyTextField 
  startIcon={<SearchIcon />}
  placeholder="Search..."
/>
*/

// Helper function to make alpha available
function alpha(color: string, value: number): string {
  // Simple alpha implementation for demo - you might want to use MUI's alpha utility
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 6);
  return `rgba(${r}, ${g}, ${b}, ${value})`;
}
