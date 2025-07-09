import React from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  Box,
  Typography,
  Chip,
  alpha,
  useTheme,
  Tooltip,
  IconButton,
  Menu,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';
import {
  Language as LanguageIcon,
  ExpandMore as ExpandMoreIcon,
  Check as CheckIcon,
} from '@mui/icons-material';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  direction: 'ltr' | 'rtl';
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', direction: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', direction: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', direction: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', direction: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', direction: 'rtl' },
];

interface LanguageSwitcherProps {
  variant?: 'compact' | 'full' | 'button' | 'chip';
  size?: 'small' | 'medium';
  showLabel?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'compact',
  size = 'small',
  showLabel = false,
}) => {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const isDark = theme.palette.mode === 'dark';

  // Enhanced color scheme for better light mode visibility
  const getColors = () => {
    if (isDark) {
      return {
        primary: theme.palette.primary.main,
        primaryDark: theme.palette.primary.dark,
        text: theme.palette.primary.main,
        background: alpha(theme.palette.primary.main, 0.1),
        backgroundHover: alpha(theme.palette.primary.main, 0.2),
        border: alpha(theme.palette.primary.main, 0.2),
        shadow: alpha(theme.palette.primary.main, 0.3),
      };
    } else {
      return {
        primary: theme.palette.primary.dark,
        primaryDark: theme.palette.primary.main,
        text: theme.palette.primary.dark,
        background: alpha(theme.palette.primary.main, 0.08),
        backgroundHover: alpha(theme.palette.primary.main, 0.15),
        border: alpha(theme.palette.primary.dark, 0.3),
        shadow: alpha(theme.palette.primary.main, 0.25),
      };
    }
  };

  const colors = getColors();

  const handleLanguageChange = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
    
    // Update document direction for RTL languages
    const selectedLang = languages.find(lang => lang.code === newLanguage);
    if (selectedLang) {
      document.dir = selectedLang.direction;
      document.documentElement.lang = newLanguage;
    }
    
    setAnchorEl(null);
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    handleLanguageChange(event.target.value);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  // Enhanced Button Variant with Menu
  if (variant === 'button') {
    return (
      <>
        <Tooltip title="Change Language" arrow>
          <IconButton
            onClick={handleButtonClick}
            size={size}
            sx={{
              background: colors.background,
              border: `1px solid ${colors.border}`,
              borderRadius: 2,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                background: colors.backgroundHover,
                transform: 'translateY(-1px)',
                boxShadow: `0 4px 12px ${colors.shadow}`,
                borderColor: colors.primary,
              },
              '&:active': {
                transform: 'translateY(0)',
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={0.5}>
              <span style={{ fontSize: size === 'small' ? '1rem' : '1.2rem' }}>
                {currentLanguage.flag}
              </span>
              <Typography 
                variant="caption" 
                sx={{ 
                  fontWeight: 600,
                  color: colors.text,
                  fontSize: size === 'small' ? '0.7rem' : '0.8rem',
                }}
              >
                {currentLanguage.code.toUpperCase()}
              </Typography>
              <ExpandMoreIcon 
                sx={{ 
                  fontSize: '0.8rem',
                  color: colors.text,
                  transition: 'transform 0.2s',
                  transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </Box>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: isDark
                ? `0 8px 32px ${alpha(theme.palette.common.black, 0.4)}`
                : `0 8px 32px ${alpha(theme.palette.common.black, 0.15)}`,
              '& .MuiMenuItem-root': {
                borderRadius: 1,
                mx: 1,
                my: 0.5,
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: colors.background,
                },
              },
            },
          }}
        >
          {languages.map((language) => (
            <MenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              selected={language.code === currentLanguage.code}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: colors.background,
                  '&:hover': {
                    backgroundColor: colors.backgroundHover,
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <span style={{ fontSize: '1.2rem' }}>{language.flag}</span>
              </ListItemIcon>
              <ListItemText>
                <Box>
                  <Typography variant="body2" fontWeight={500}>
                    {language.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {language.nativeName}
                  </Typography>
                </Box>
              </ListItemText>
              {language.code === currentLanguage.code && (
                <CheckIcon 
                  sx={{ 
                    fontSize: '1rem',
                    color: colors.primary,
                    ml: 1,
                  }}
                />
              )}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }

  // Enhanced Chip Variant
  if (variant === 'chip') {
    return (
      <>
        <Tooltip title={`Current: ${currentLanguage.name}`} arrow>
          <Chip
            icon={
              <Box display="flex" alignItems="center" gap={0.5}>
                <span style={{ fontSize: '0.9rem' }}>{currentLanguage.flag}</span>
                <LanguageIcon sx={{ fontSize: '0.9rem' }} />
              </Box>
            }
            label={
              <Box display="flex" alignItems="center" gap={0.5}>
                <Typography variant="caption" fontWeight={600}>
                  {currentLanguage.code.toUpperCase()}
                </Typography>
                <ExpandMoreIcon 
                  sx={{ 
                    fontSize: '0.8rem',
                    transition: 'transform 0.2s',
                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </Box>
            }
            onClick={handleButtonClick}
            variant="outlined"
            size={size}
            sx={{
              borderRadius: 3,
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.background,
              color: colors.text,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                backgroundColor: colors.backgroundHover,
                borderColor: colors.primary,
                transform: 'translateY(-1px)',
                boxShadow: `0 4px 12px ${colors.shadow}`,
              },
              '&:active': {
                transform: 'translateY(0)',
              },
              '& .MuiChip-icon': {
                color: 'inherit',
              },
            }}
          />
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          transformOrigin={{ horizontal: 'center', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 180,
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: isDark
                ? `0 8px 32px ${alpha(theme.palette.common.black, 0.4)}`
                : `0 8px 32px ${alpha(theme.palette.common.black, 0.15)}`,
            },
          }}
        >
          {languages.map((language) => (
            <MenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              selected={language.code === currentLanguage.code}
              sx={{
                borderRadius: 1,
                mx: 1,
                my: 0.5,
                '&.Mui-selected': {
                  backgroundColor: colors.background,
                },
                '&:hover': {
                  backgroundColor: colors.background,
                },
              }}
            >
              <Box display="flex" alignItems="center" gap={1.5} width="100%">
                <span style={{ fontSize: '1.1rem' }}>{language.flag}</span>
                <Typography variant="body2" fontWeight={500}>
                  {language.name}
                </Typography>
                {language.code === currentLanguage.code && (
                  <CheckIcon 
                    sx={{ 
                      fontSize: '1rem',
                      color: colors.primary,
                      ml: 'auto',
                    }}
                  />
                )}
              </Box>
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }

  // Enhanced Compact Variant
  if (variant === 'compact') {
    return (
      <FormControl size={size} sx={{ minWidth: 120 }}>
        <Select
          value={i18n.language}
          onChange={handleSelectChange}
          displayEmpty
          sx={{
            borderRadius: 2,
            backgroundColor: isDark 
              ? alpha(theme.palette.background.paper, 0.8)
              : alpha(theme.palette.background.paper, 0.95),
            border: `1px solid ${colors.border}`,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              borderColor: colors.primary,
              backgroundColor: colors.background,
              transform: 'translateY(-1px)',
              boxShadow: `0 4px 12px ${colors.shadow}`,
            },
            '&.Mui-focused': {
              borderColor: colors.primary,
              backgroundColor: colors.background,
            },
            '& .MuiSelect-select': {
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              py: size === 'small' ? 1 : 1.5,
              color: colors.text,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '& .MuiSelect-icon': {
              color: colors.text,
              transition: 'transform 0.2s',
            },
            '&.Mui-focused .MuiSelect-icon': {
              transform: 'rotate(180deg)',
            },
          }}
        >
          {languages.map((language) => (
            <MenuItem 
              key={language.code} 
              value={language.code}
              sx={{
                borderRadius: 1,
                mx: 1,
                my: 0.5,
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: colors.background,
                },
                '&.Mui-selected': {
                  backgroundColor: colors.background,
                  '&:hover': {
                    backgroundColor: colors.backgroundHover,
                  },
                },
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <span style={{ fontSize: '1.2em' }}>{language.flag}</span>
                <Typography variant="body2" fontWeight={500} color={colors.text}>
                  {language.code.toUpperCase()}
                </Typography>
                {showLabel && (
                  <Typography variant="caption" color="text.secondary">
                    {language.name}
                  </Typography>
                )}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  // Enhanced Full Variant
  return (
    <FormControl size={size} sx={{ minWidth: 200 }}>
      <Select
        value={i18n.language}
        onChange={handleSelectChange}
        displayEmpty
        sx={{
          borderRadius: 2,
          backgroundColor: isDark 
            ? alpha(theme.palette.background.paper, 0.9)
            : alpha(theme.palette.background.paper, 0.95),
          border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: colors.primary,
            backgroundColor: colors.background,
            transform: 'translateY(-1px)',
            boxShadow: `0 4px 12px ${colors.shadow}`,
          },
          '&.Mui-focused': {
            borderColor: colors.primary,
            backgroundColor: colors.background,
          },
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            py: size === 'small' ? 1.5 : 2,
            color: colors.text,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '& .MuiSelect-icon': {
            color: colors.text,
            transition: 'transform 0.2s',
          },
          '&.Mui-focused .MuiSelect-icon': {
            transform: 'rotate(180deg)',
          },
        }}
      >
        {languages.map((language) => (
          <MenuItem 
            key={language.code} 
            value={language.code}
            sx={{
              borderRadius: 1,
              mx: 1,
              my: 0.5,
              transition: 'all 0.2s',
              '&:hover': {
                backgroundColor: colors.background,
              },
              '&.Mui-selected': {
                backgroundColor: colors.background,
                '&:hover': {
                  backgroundColor: colors.backgroundHover,
                },
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
              <span style={{ fontSize: '1.3em' }}>{language.flag}</span>
              <Box>
                <Typography variant="body2" fontWeight={500} color={colors.text}>
                  {language.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {language.nativeName}
                </Typography>
              </Box>
              {language.code === currentLanguage.code && (
                <CheckIcon 
                  sx={{ 
                    fontSize: '1rem',
                    color: colors.primary,
                    ml: 'auto',
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