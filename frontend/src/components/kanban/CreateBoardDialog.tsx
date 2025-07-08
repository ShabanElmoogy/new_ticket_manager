import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Grid,
  IconButton,
  Alert,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Popover,
  Tooltip,
  Chip,
  Paper,
  Card,
  CardContent,
  Divider,
  useTheme,
  alpha,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  ColorLens as ColorIcon,
  Check as CheckIcon,
  Palette as PaletteIcon,
  Close as CloseIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { HexColorPicker } from 'react-colorful';
import { useKanbanStore } from '../../stores/kanbanStore';
import { getColorPair } from '../../utils/colorContrast';

interface CreateBoardDialogProps {
  open: boolean;
  onClose: () => void;
}

interface ColumnData {
  name: string;
  description: string;
  color: string;
  darkColor: string;
  wipLimit: string;
}

// MUI Color palette optimized for both light and dark themes
const MUI_COLORS = {
  blue: {
    light: '#e3f2fd',
    main: '#2196f3',
    dark: '#0d47a1',
    name: 'Blue'
  },
  indigo: {
    light: '#e8eaf6',
    main: '#3f51b5',
    dark: '#1a237e',
    name: 'Indigo'
  },
  purple: {
    light: '#f3e5f5',
    main: '#9c27b0',
    dark: '#4a148c',
    name: 'Purple'
  },
  deepPurple: {
    light: '#ede7f6',
    main: '#673ab7',
    dark: '#311b92',
    name: 'Deep Purple'
  },
  cyan: {
    light: '#e0f2f1',
    main: '#00bcd4',
    dark: '#006064',
    name: 'Cyan'
  },
  teal: {
    light: '#e0f2f1',
    main: '#009688',
    dark: '#004d40',
    name: 'Teal'
  },
  green: {
    light: '#e8f5e8',
    main: '#4caf50',
    dark: '#1b5e20',
    name: 'Green'
  },
  lightGreen: {
    light: '#f1f8e9',
    main: '#8bc34a',
    dark: '#33691e',
    name: 'Light Green'
  },
  lime: {
    light: '#f9fbe7',
    main: '#cddc39',
    dark: '#827717',
    name: 'Lime'
  },
  yellow: {
    light: '#fffde7',
    main: '#ffeb3b',
    dark: '#f57f17',
    name: 'Yellow'
  },
  amber: {
    light: '#fff8e1',
    main: '#ffc107',
    dark: '#ff6f00',
    name: 'Amber'
  },
  orange: {
    light: '#fff3e0',
    main: '#ff9800',
    dark: '#e65100',
    name: 'Orange'
  },
  deepOrange: {
    light: '#fbe9e7',
    main: '#ff5722',
    dark: '#bf360c',
    name: 'Deep Orange'
  },
  red: {
    light: '#ffebee',
    main: '#f44336',
    dark: '#b71c1c',
    name: 'Red'
  },
  pink: {
    light: '#fce4ec',
    main: '#e91e63',
    dark: '#880e4f',
    name: 'Pink'
  },
  brown: {
    light: '#efebe9',
    main: '#795548',
    dark: '#3e2723',
    name: 'Brown'
  },
  grey: {
    light: '#fafafa',
    main: '#9e9e9e',
    dark: '#212121',
    name: 'Grey'
  },
  blueGrey: {
    light: '#eceff1',
    main: '#607d8b',
    dark: '#263238',
    name: 'Blue Grey'
  }
};

const COLOR_KEYS = Object.keys(MUI_COLORS) as Array<keyof typeof MUI_COLORS>;

const CreateBoardDialog: React.FC<CreateBoardDialogProps> = ({
  open,
  onClose
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { createBoard, loading } = useKanbanStore();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isDefault: false,
    type: 'tickets', // 'tickets' or 'tasks'
  });

  const [columns, setColumns] = useState<ColumnData[]>(() => {
    const defaultMuiColors = [
      MUI_COLORS.blue,
      MUI_COLORS.orange,
      MUI_COLORS.purple,
      MUI_COLORS.green
    ];
    const defaultData = [
      { name: 'To Do', description: 'Tasks to be started', wipLimit: '' },
      { name: 'In Progress', description: 'Tasks currently being worked on', wipLimit: '3' },
      { name: 'Review', description: 'Tasks ready for review', wipLimit: '2' },
      { name: 'Done', description: 'Completed tasks', wipLimit: '' }
    ];
    
    return defaultData.map((item, index) => ({
      ...item,
      color: defaultMuiColors[index].light,
      darkColor: defaultMuiColors[index].dark,
    }));
  });

  const [colorPickerAnchor, setColorPickerAnchor] = useState<HTMLElement | null>(null);
  const [colorPickerIndex, setColorPickerIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Theme-aware styling helpers
  const getCardStyles = () => ({
    mb: 2,
    background: isDark
      ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.default, 0.6)})`
      : theme.palette.background.paper,
    border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.2 : 0.12)}`,
    borderRadius: 2,
    boxShadow: isDark
      ? `0 4px 20px ${alpha(theme.palette.common.black, 0.3)}`
      : `0 2px 8px ${alpha(theme.palette.common.black, 0.08)}`,
    backdropFilter: isDark ? 'blur(10px)' : 'none',
  });

  const getColumnCardStyles = () => ({
    p: 2.5,
    background: isDark
      ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.default, 0.7)})`
      : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)}, ${alpha(theme.palette.background.paper, 0.8)})`,
    border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.2 : 0.12)}`,
    borderRadius: 2,
    mb: 2,
    boxShadow: isDark
      ? `0 2px 12px ${alpha(theme.palette.common.black, 0.2)}`
      : `0 1px 4px ${alpha(theme.palette.common.black, 0.05)}`,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      borderColor: alpha(theme.palette.primary.main, isDark ? 0.4 : 0.3),
      boxShadow: isDark
        ? `0 4px 20px ${alpha(theme.palette.common.black, 0.3)}`
        : `0 2px 8px ${alpha(theme.palette.primary.main, 0.1)}`,
    },
  });

  const getDialogPaperStyles = () => ({
    backgroundColor: isDark
      ? alpha(theme.palette.background.paper, 0.95)
      : theme.palette.background.paper,
    backgroundImage: isDark
      ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, transparent)`
      : 'none',
    backdropFilter: isDark ? 'blur(20px)' : 'none',
  });

  const getColorPreviewStyles = (color: string, isLeft = true) => ({
    width: 32,
    height: 36,
    backgroundColor: color,
    borderRadius: isLeft ? '6px 0 0 6px' : '0 6px 6px 0',
    cursor: 'pointer',
    border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.3 : 0.2)}`,
    borderRight: isLeft ? 'none' : undefined,
    borderLeft: !isLeft ? 'none' : undefined,
    boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.common.white, 0.1)}`,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
      zIndex: 1,
      boxShadow: `0 4px 12px ${alpha(color, 0.4)}`,
    },
  });

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      setError('Board name is required');
      return;
    }

    if (columns.length === 0) {
      setError('At least one column is required');
      return;
    }

    setError(null);

    try {
      const boardData = {
        name: formData.name,
        description: formData.description,
        isDefault: formData.isDefault,
        type: formData.type,
        columns: columns.map((col, index) => ({
          name: col.name,
          description: col.description,
          color: col.color,
          darkColor: col.darkColor,
          position: index,
          wipLimit: col.wipLimit ? parseInt(col.wipLimit) : undefined
        }))
      };

      await createBoard(boardData);
      handleClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create board');
    }
  };

  const handleClose = () => {
    setFormData({ name: '', description: '', isDefault: false, type: 'tickets' });
    const defaultMuiColors = [
      MUI_COLORS.blue,
      MUI_COLORS.orange,
      MUI_COLORS.purple,
      MUI_COLORS.green
    ];
    const defaultData = [
      { name: 'To Do', description: 'Tasks to be started', wipLimit: '' },
      { name: 'In Progress', description: 'Tasks currently being worked on', wipLimit: '3' },
      { name: 'Review', description: 'Tasks ready for review', wipLimit: '2' },
      { name: 'Done', description: 'Completed tasks', wipLimit: '' }
    ];
    
    setColumns(defaultData.map((item, index) => ({
      ...item,
      color: defaultMuiColors[index].light,
      darkColor: defaultMuiColors[index].dark,
    })));
    setError(null);
    setColorPickerAnchor(null);
    setColorPickerIndex(null);
    onClose();
  };

  const addColumn = () => {
    const defaultMuiColor = MUI_COLORS.grey;
    setColumns([...columns, {
      name: '',
      description: '',
      color: defaultMuiColor.light,
      darkColor: defaultMuiColor.dark,
      wipLimit: ''
    }]);
  };

  const removeColumn = (index: number) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  const updateColumn = (index: number, field: keyof ColumnData, value: string) => {
    const updatedColumns = [...columns];
    
    if (field === 'color') {
      // When color changes, automatically calculate dark mode color
      const colorPair = getColorPair(value);
      updatedColumns[index] = { 
        ...updatedColumns[index], 
        color: colorPair.lightColor,
        darkColor: colorPair.darkColor
      };
    } else {
      updatedColumns[index] = { ...updatedColumns[index], [field]: value };
    }
    
    setColumns(updatedColumns);
  };

  const updateColumnWithMuiColor = (index: number, colorKey: keyof typeof MUI_COLORS) => {
    const updatedColumns = [...columns];
    const muiColor = MUI_COLORS[colorKey];
    updatedColumns[index] = { 
      ...updatedColumns[index], 
      color: muiColor.light,
      darkColor: muiColor.dark
    };
    setColumns(updatedColumns);
  };

  const handleColorPickerOpen = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setColorPickerAnchor(event.currentTarget);
    setColorPickerIndex(index);
  };

  const handleColorPickerClose = () => {
    setColorPickerAnchor(null);
    setColorPickerIndex(null);
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="lg" 
      fullWidth
      PaperProps={{
        sx: {
          ...getDialogPaperStyles(),
          borderRadius: 3,
          border: isDark ? `1px solid ${alpha(theme.palette.divider, 0.2)}` : 'none',
        }
      }}
      TransitionComponent={Fade}
    >
      <DialogTitle
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, isDark ? 0.1 : 0.05)}, transparent)`,
          borderBottom: `1px solid ${alpha(theme.palette.divider, isDark ? 0.2 : 0.12)}`,
          color: theme.palette.text.primary,
          fontSize: '1.3rem',
          fontWeight: 600,
          py: 3,
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <PaletteIcon 
            sx={{ 
              color: theme.palette.primary.main,
              fontSize: '1.5rem',
            }} 
          />
          Create New Board
        </Box>
      </DialogTitle>
      
      <DialogContent sx={{ py: 3 }}>
        {error && (
          <Zoom in={Boolean(error)}>
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.error.main, isDark ? 0.15 : 0.05),
                border: `1px solid ${alpha(theme.palette.error.main, isDark ? 0.3 : 0.2)}`,
                color: theme.palette.error.main,
                '& .MuiAlert-icon': {
                  color: theme.palette.error.main,
                },
              }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          </Zoom>
        )}

        {/* Board Details Card */}
        <Card sx={getCardStyles()}>
          <CardContent sx={{ p: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2.5,
                color: theme.palette.text.primary,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <InfoIcon sx={{ color: theme.palette.primary.main, fontSize: '1.2rem' }} />
              Board Details
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Board Name"
                  fullWidth
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: alpha(theme.palette.background.paper, isDark ? 0.5 : 1),
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: 2,
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: alpha(theme.palette.background.paper, isDark ? 0.5 : 1),
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: 2,
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl 
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: alpha(theme.palette.background.paper, isDark ? 0.5 : 1),
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: 2,
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  <InputLabel id="board-type-label">Board Type</InputLabel>
                  <Select
                    labelId="board-type-label"
                    value={formData.type}
                    label="Board Type"
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  >
                    <MenuItem value="tickets">Tickets (for support, bug, or issue tracking)</MenuItem>
                    <MenuItem value="tasks">Tasks (for general workflow or agile tasks)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isDefault}
                      onChange={(e) => setFormData(prev => ({ ...prev, isDefault: e.target.checked }))}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: theme.palette.primary.main,
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: theme.palette.primary.main,
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                      Set as default board
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Columns Configuration Card */}
        <Card sx={getCardStyles()}>
          <CardContent sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography 
                variant="h6"
                sx={{ 
                  color: theme.palette.text.primary,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <ColorIcon sx={{ color: theme.palette.primary.main, fontSize: '1.2rem' }} />
                Columns Configuration
              </Typography>
              <Button 
                startIcon={<AddIcon />} 
                onClick={addColumn}
                variant="contained"
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  boxShadow: `0 3px 10px ${alpha(theme.palette.primary.main, 0.3)}`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                    transform: 'translateY(-1px)',
                    boxShadow: `0 5px 15px ${alpha(theme.palette.primary.main, 0.4)}`,
                  },
                  transition: 'all 0.2s ease-in-out',
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Add Column
              </Button>
            </Box>

            {columns.map((column, index) => (
              <Paper key={index} sx={getColumnCardStyles()}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Column Name"
                      fullWidth
                      required
                      value={column.name}
                      onChange={(e) => updateColumn(index, 'name', e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: alpha(theme.palette.background.paper, isDark ? 0.7 : 1),
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                            borderWidth: 2,
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Description"
                      fullWidth
                      value={column.description}
                      onChange={(e) => updateColumn(index, 'description', e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: alpha(theme.palette.background.paper, isDark ? 0.7 : 1),
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                            borderWidth: 2,
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <TextField
                      label="WIP Limit"
                      type="number"
                      fullWidth
                      value={column.wipLimit}
                      onChange={(e) => updateColumn(index, 'wipLimit', e.target.value)}
                      inputProps={{ min: 0 }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: alpha(theme.palette.background.paper, isDark ? 0.7 : 1),
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                            borderWidth: 2,
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Box>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          mb: 1,
                          color: theme.palette.text.secondary,
                          fontWeight: 500,
                        }}
                      >
                        Theme Colors:
                      </Typography>
                      <Box display="flex" gap={0}>
                        <Tooltip title="Light theme color" arrow>
                          <Box
                            sx={getColorPreviewStyles(column.color, true)}
                            onClick={(e) => handleColorPickerOpen(e, index)}
                          />
                        </Tooltip>
                        <Tooltip title="Dark theme color" arrow>
                          <Box
                            sx={getColorPreviewStyles(column.darkColor, false)}
                            onClick={(e) => handleColorPickerOpen(e, index)}
                          />
                        </Tooltip>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <IconButton 
                      onClick={() => removeColumn(index)}
                      disabled={columns.length <= 1}
                      sx={{
                        color: theme.palette.error.main,
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.error.main, 0.1),
                          transform: 'scale(1.1)',
                        },
                        '&.Mui-disabled': {
                          color: theme.palette.action.disabled,
                        },
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </CardContent>
        </Card>

        {/* Enhanced Color Picker Popover */}
        <Popover
          open={Boolean(colorPickerAnchor) && colorPickerIndex !== null}
          anchorEl={colorPickerAnchor}
          onClose={handleColorPickerClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{
            sx: {
              p: 0,
              maxWidth: 450,
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.2 : 0.12)}`,
              backgroundColor: isDark 
                ? alpha(theme.palette.background.paper, 0.95)
                : theme.palette.background.paper,
              backdropFilter: isDark ? 'blur(20px)' : 'none',
              boxShadow: isDark
                ? `0 12px 40px ${alpha(theme.palette.common.black, 0.4)}`
                : `0 8px 32px ${alpha(theme.palette.common.black, 0.12)}`,
            }
          }}
        >
          {colorPickerIndex !== null && (
            <Box sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography 
                  variant="h6"
                  sx={{ 
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                  }}
                >
                  Select Color Theme
                </Typography>
                <IconButton 
                  onClick={handleColorPickerClose}
                  size="small"
                  sx={{
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.action.hover, 0.1),
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              
              <Typography 
                variant="body2" 
                sx={{ 
                  color: theme.palette.text.secondary,
                  mb: 3,
                  lineHeight: 1.5,
                }}
              >
                Choose from Material-UI colors optimized for both light and dark themes
              </Typography>

              {/* MUI Color Grid */}
              <Box 
                display="grid" 
                gridTemplateColumns="repeat(6, 1fr)" 
                gap={1.5} 
                mb={3}
              >
                {COLOR_KEYS.map((colorKey) => {
                  const muiColor = MUI_COLORS[colorKey];
                  const isSelected = columns[colorPickerIndex]?.color === muiColor.light;
                  
                  return (
                    <Tooltip key={colorKey} title={muiColor.name} arrow>
                      <Box
                        sx={{
                          position: 'relative',
                          cursor: 'pointer',
                          borderRadius: 2,
                          overflow: 'hidden',
                          border: '2px solid',
                          borderColor: isSelected ? theme.palette.primary.main : 'transparent',
                          '&:hover': {
                            borderColor: isSelected ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.5),
                            transform: 'scale(1.05)',
                          },
                          transition: 'all 0.2s ease-in-out',
                        }}
                        onClick={() => {
                          updateColumnWithMuiColor(colorPickerIndex, colorKey);
                          handleColorPickerClose();
                        }}
                      >
                        {/* Light theme color */}
                        <Box
                          sx={{
                            width: '100%',
                            height: 30,
                            backgroundColor: muiColor.light,
                          }}
                        />
                        {/* Dark theme color */}
                        <Box
                          sx={{
                            width: '100%',
                            height: 30,
                            backgroundColor: muiColor.dark,
                          }}
                        />
                        {isSelected && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              color: 'white',
                              backgroundColor: alpha(theme.palette.primary.main, 0.9),
                              borderRadius: '50%',
                              width: 24,
                              height: 24,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.3)}`,
                            }}
                          >
                            <CheckIcon sx={{ fontSize: 16 }} />
                          </Box>
                        )}
                      </Box>
                    </Tooltip>
                  );
                })}
              </Box>

              {/* Current Selection Preview */}
              <Paper 
                sx={{ 
                  p: 2.5, 
                  backgroundColor: alpha(theme.palette.background.default, isDark ? 0.3 : 0.5),
                  border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.2 : 0.12)}`,
                  borderRadius: 2,
                  mb: 3,
                }}
              >
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    color: theme.palette.text.primary,
                    mb: 2,
                    fontWeight: 600,
                  }}
                >
                  Current Selection Preview:
                </Typography>
                <Box display="flex" gap={3} alignItems="center">
                  <Box textAlign="center">
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: theme.palette.text.secondary,
                        display: 'block',
                        mb: 1,
                        fontWeight: 500,
                      }}
                    >
                      Light Theme
                    </Typography>
                    <Box
                      sx={{
                        width: 80,
                        height: 40,
                        backgroundColor: columns[colorPickerIndex]?.color,
                        border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                        borderRadius: 1,
                        boxShadow: `0 2px 8px ${alpha(columns[colorPickerIndex]?.color || '#000', 0.2)}`,
                      }}
                    />
                  </Box>
                  <Box textAlign="center">
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: theme.palette.text.secondary,
                        display: 'block',
                        mb: 1,
                        fontWeight: 500,
                      }}
                    >
                      Dark Theme
                    </Typography>
                    <Box
                      sx={{
                        width: 80,
                        height: 40,
                        backgroundColor: columns[colorPickerIndex]?.darkColor,
                        border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                        borderRadius: 1,
                        boxShadow: `0 2px 8px ${alpha(columns[colorPickerIndex]?.darkColor || '#000', 0.2)}`,
                      }}
                    />
                  </Box>
                </Box>
              </Paper>

              {/* Custom Color Picker */}
              <Box>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    color: theme.palette.text.primary,
                    mb: 2,
                    fontWeight: 600,
                  }}
                >
                  Custom Color Picker:
                </Typography>
                <Box 
                  sx={{ 
                    '& .react-colorful': {
                      width: '100% !important',
                      height: '150px !important',
                      borderRadius: '8px !important',
                    },
                    '& .react-colorful__saturation': {
                      borderRadius: '8px 8px 0 0 !important'
                    },
                    '& .react-colorful__hue': {
                      height: '24px !important',
                      borderRadius: '0 0 8px 8px !important'
                    },
                    '& .react-colorful__pointer': {
                      width: '18px !important',
                      height: '18px !important'
                    }
                  }}
                >
                  <HexColorPicker
                    color={columns[colorPickerIndex]?.color || '#e3f2fd'}
                    onChange={(color) => updateColumn(colorPickerIndex, 'color', color)}
                  />
                </Box>
              </Box>
            </Box>
          )}
        </Popover>
      </DialogContent>

      <DialogActions 
        sx={{ 
          p: 3,
          backgroundColor: alpha(theme.palette.background.default, isDark ? 0.3 : 0.5),
          borderTop: `1px solid ${alpha(theme.palette.divider, isDark ? 0.2 : 0.12)}`,
        }}
      >
        <Button 
          onClick={handleClose}
          sx={{
            color: theme.palette.text.secondary,
            '&:hover': {
              backgroundColor: alpha(theme.palette.action.hover, 0.1),
            },
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading || !formData.name.trim()}
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            boxShadow: `0 3px 10px ${alpha(theme.palette.primary.main, 0.3)}`,
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
              transform: 'translateY(-1px)',
              boxShadow: `0 5px 15px ${alpha(theme.palette.primary.main, 0.4)}`,
            },
            '&:disabled': {
              background: theme.palette.action.disabledBackground,
              color: theme.palette.action.disabled,
            },
            transition: 'all 0.2s ease-in-out',
            textTransform: 'none',
            fontWeight: 600,
            px: 4,
          }}
        >
          {loading ? 'Creating...' : 'Create Board'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBoardDialog;