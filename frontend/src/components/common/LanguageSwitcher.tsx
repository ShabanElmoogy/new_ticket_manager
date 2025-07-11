import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import { Check as CheckIcon } from "@mui/icons-material";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  direction: "ltr" | "rtl";
}

const languages: Language[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    direction: "ltr",
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    direction: "ltr",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    direction: "ltr",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    direction: "ltr",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
    direction: "rtl",
  },
];

interface LanguageSwitcherProps {
  variant?: "compact" | "full";
  size?: "small" | "medium";
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = "compact",
  size = "small",
}) => {
  const theme = useTheme();
  const { i18n } = useTranslation();

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);

    const selectedLang = languages.find((lang) => lang.code === newLanguage);
    if (selectedLang) {
      document.dir = selectedLang.direction;
      document.documentElement.lang = newLanguage;
    }
  };

  return (
    <FormControl
      size={size}
      sx={{ minWidth: variant === "compact" ? 80 : 140 }}
    >
      <Select
        value={i18n.language}
        onChange={handleLanguageChange}
        displayEmpty
        sx={{
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          transition: "all 0.2s ease-in-out",

          "&:hover": {
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.action.hover,
            transform: "translateY(-1px)",
            boxShadow: theme.shadows[2],
          },

          "&.Mui-focused": {
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.action.selected,
            boxShadow: `0 0 0 2px ${theme.palette.primary.main}25`,
          },

          "& .MuiSelect-select": {
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            py: size === "small" ? 0.5 : 1,
            px: size === "small" ? 1 : 1.5,
          },

          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },

          "& .MuiSelect-icon": {
            color: theme.palette.text.secondary,
            transition: "transform 0.2s",
          },

          "&.Mui-focused .MuiSelect-icon": {
            color: theme.palette.primary.main,
            transform: "rotate(180deg)",
          },
        }}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            value={language.code}
            sx={{
              borderRadius: 0.5,
              mx: 0.5,
              my: 0.25,
              minHeight: "auto",
              transition: "all 0.15s ease-in-out",

              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },

              "&.Mui-selected": {
                backgroundColor: theme.palette.action.selected,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={0.5} width="100%">
              <span style={{ fontSize: "0.9em" }}>{language.flag}</span>

              {variant === "compact" ? (
                <Typography
                  variant="caption"
                  fontWeight={600}
                  fontSize="0.7rem"
                >
                  {language.code.toUpperCase()}
                </Typography>
              ) : (
                <Box flexGrow={1}>
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    fontSize="0.8rem"
                  >
                    {language.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontSize="0.65rem"
                  >
                    {language.nativeName}
                  </Typography>
                </Box>
              )}

              {language.code === currentLanguage.code && (
                <CheckIcon
                  sx={{
                    fontSize: "0.75rem",
                    color: theme.palette.primary.main,
                    ml: "auto",
                  }}
                />
              )}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSwitcher;
