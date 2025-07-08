import React from "react";
import {
  Box,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
  Tooltip,
  Typography,
  useTheme,
  useMediaQuery,
  Chip,
  Stack,
  Divider,
  Badge,
  alpha,
  Card,
  CardContent,
} from "@mui/material";
import {
  Add as AddIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  Dashboard as DashboardIcon,
  Task as TaskIcon,
  Tune as TuneIcon,
  Speed as SpeedIcon,
  PlaylistAdd as PlaylistAddIcon,
} from "@mui/icons-material";
import type { KanbanBoard } from "../../../types/kanban";

interface BoardControlsProps {
  boards: any[];
  selectedBoardId: string;
  currentBoard: KanbanBoard;
  hasActiveFilters: boolean;
  onBoardChange: (id: string) => void;
  onCreateBoard: () => void;
  onCreateTicket: () => void;
  onToggleFilters: () => void;
  onMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const BoardControls: React.FC<BoardControlsProps> = ({
  boards,
  selectedBoardId,
  currentBoard,
  hasActiveFilters,
  onBoardChange,
  onCreateBoard,
  onCreateTicket,
  onToggleFilters,
  onMenuClick,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isDark = theme.palette.mode === "dark";

  // Get board color for theming
  const getBoardColor = () => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.info.main,
    ];

    const hash = currentBoard.name.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);

    return colors[Math.abs(hash) % colors.length];
  };

  const boardColor = getBoardColor();

  // Theme-aware styling helpers
  const getGradientBackground = (color: string, isSecondary = false) => {
    const baseColor = isSecondary ? theme.palette.secondary.main : color;
    const darkColor = isSecondary ? theme.palette.secondary.dark : alpha(color, 0.8);
    
    return isDark
      ? `linear-gradient(135deg, ${alpha(baseColor, 0.8)}, ${alpha(darkColor, 0.6)})`
      : `linear-gradient(135deg, ${baseColor}, ${darkColor})`;
  };

  const getShadow = (color: string, intensity = 0.25) => {
    const shadowIntensity = isDark ? intensity * 1.5 : intensity;
    const shadowSpread = isDark ? "0 6px 20px" : "0 3px 12px";
    return `${shadowSpread} ${alpha(color, shadowIntensity)}`;
  };

  const getHoverShadow = (color: string, intensity = 0.35) => {
    const shadowIntensity = isDark ? intensity * 1.5 : intensity;
    const shadowSpread = isDark ? "0 10px 30px" : "0 5px 18px";
    return `${shadowSpread} ${alpha(color, shadowIntensity)}`;
  };

  const getCardBackground = () => {
    return isDark
      ? alpha(theme.palette.background.paper, 0.7)
      : alpha(theme.palette.background.paper, 0.95);
  };

  const getActionAreaBackground = () => {
    return isDark
      ? alpha(theme.palette.background.default, 0.6)
      : alpha(theme.palette.background.paper, 0.8);
  };

  // Mobile Layout
  if (isMobile) {
    return (
      <Box sx={{ mb: 2 }}>
        {/* Board Selector Card */}
        <Card
          elevation={isDark ? 8 : 2}
          sx={{
            mb: 2,
            background: `linear-gradient(135deg, ${alpha(
              boardColor,
              isDark ? 0.08 : 0.05
            )} 0%, ${alpha(boardColor, isDark ? 0.04 : 0.02)} 100%)`,
            border: `1px solid ${alpha(boardColor, isDark ? 0.2 : 0.1)}`,
            backdropFilter: isDark ? "blur(10px)" : "none",
            backgroundColor: getCardBackground(),
          }}
        >
          <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
            <Stack spacing={2}>
              {/* Board Selector with Stats in same row */}
              <Box>
                {/* Board Title and Stats Row */}
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={1.5}
                >
                  <Typography
                    variant="body2"
                    sx={{ 
                      fontSize: "0.8rem",
                      color: theme.palette.text.secondary,
                      fontWeight: 500,
                    }}
                  >
                    Current Board
                  </Typography>
                  {/* Board Stats - Same row as title */}
                  {currentBoard.tickets && (
                    <Stack direction="row" spacing={0.5}>
                      <Chip
                        label={`${currentBoard.tickets.length} Items`}
                        size="small"
                        variant="outlined"
                        sx={{
                          fontSize: "0.65rem",
                          height: 20,
                          borderColor: alpha(boardColor, isDark ? 0.4 : 0.3),
                          color: boardColor,
                          backgroundColor: alpha(boardColor, isDark ? 0.1 : 0.05),
                          "& .MuiChip-label": { px: 1, fontWeight: 500 },
                        }}
                      />
                      <Chip
                        label={`${currentBoard.columns?.length || 0} Cols`}
                        size="small"
                        variant="outlined"
                        sx={{
                          fontSize: "0.65rem",
                          height: 20,
                          borderColor: alpha(boardColor, isDark ? 0.4 : 0.3),
                          color: boardColor,
                          backgroundColor: alpha(boardColor, isDark ? 0.1 : 0.05),
                          "& .MuiChip-label": { px: 1, fontWeight: 500 },
                        }}
                      />
                    </Stack>
                  )}
                </Stack>

                {/* Board Selector */}
                <FormControl fullWidth size="small">
                  <InputLabel
                    sx={{
                      fontSize: "0.875rem",
                      color: theme.palette.text.secondary,
                      "&.Mui-focused": { color: boardColor },
                    }}
                  >
                    Select Board
                  </InputLabel>
                  <Select
                    value={selectedBoardId}
                    label="Select Board"
                    onChange={(e) => onBoardChange(e.target.value)}
                    sx={{
                      backgroundColor: alpha(theme.palette.background.paper, isDark ? 0.8 : 1),
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: boardColor,
                        borderWidth: 2,
                      },
                      "& .MuiSelect-select": {
                        fontSize: "0.875rem",
                        color: theme.palette.text.primary,
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.divider,
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: alpha(boardColor, 0.7),
                      },
                    }}
                  >
                    {boards.map((board) => (
                      <MenuItem 
                        key={board.id} 
                        value={board.id}
                        sx={{
                          "&:hover": {
                            backgroundColor: alpha(boardColor, isDark ? 0.1 : 0.05),
                          },
                          "&.Mui-selected": {
                            backgroundColor: alpha(boardColor, isDark ? 0.15 : 0.08),
                            "&:hover": {
                              backgroundColor: alpha(boardColor, isDark ? 0.2 : 0.12),
                            },
                          },
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          sx={{ width: "100%" }}
                        >
                          {board.type === "TASKS" ? (
                            <TaskIcon
                              sx={{ 
                                fontSize: "1rem", 
                                color: theme.palette.text.secondary 
                              }}
                            />
                          ) : (
                            <DashboardIcon
                              sx={{ 
                                fontSize: "1rem", 
                                color: theme.palette.text.secondary 
                              }}
                            />
                          )}
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography 
                              variant="body2" 
                              noWrap
                              sx={{ color: theme.palette.text.primary }}
                            >
                              {board.name}
                            </Typography>
                            {board.isDefault && (
                              <Typography
                                variant="caption"
                                sx={{ color: theme.palette.text.secondary }}
                              >
                                (Default)
                              </Typography>
                            )}
                          </Box>
                        </Stack>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Action Buttons Grid */}
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1.5} mb={2}>
          {/* Create Board Button */}
          <Button
            variant="contained"
            startIcon={<PlaylistAddIcon />}
            onClick={onCreateBoard}
            size="large"
            sx={{
              py: 1.5,
              background: getGradientBackground(theme.palette.primary.main, true),
              boxShadow: getShadow(theme.palette.primary.main),
              border: isDark
                ? `1px solid ${alpha(theme.palette.primary.light, 0.3)}`
                : "none",
              color: theme.palette.primary.contrastText,
              "&:hover": {
                background: isDark
                  ? `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`
                  : `linear-gradient(135deg, ${theme.palette.primary.dark}, ${alpha(theme.palette.primary.dark, 0.9)})`,
                transform: "translateY(-2px)",
                boxShadow: getHoverShadow(theme.palette.primary.main),
              },
              "&:active": {
                transform: "translateY(0px)",
              },
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              fontSize: "0.8rem",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            New Board
          </Button>

          {/* Create Ticket/Task Button */}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onCreateTicket}
            size="large"
            sx={{
              py: 1.5,
              background: getGradientBackground(boardColor),
              boxShadow: getShadow(boardColor),
              border: isDark
                ? `1px solid ${alpha(boardColor, 0.4)}`
                : "none",
              color: theme.palette.getContrastText(boardColor),
              "&:hover": {
                background: isDark
                  ? `linear-gradient(135deg, ${alpha(boardColor, 0.9)}, ${boardColor})`
                  : `linear-gradient(135deg, ${alpha(boardColor, 0.9)}, ${alpha(boardColor, 0.7)})`,
                transform: "translateY(-2px)",
                boxShadow: getHoverShadow(boardColor),
              },
              "&:active": {
                transform: "translateY(0px)",
              },
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              fontSize: "0.8rem",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            {currentBoard.type === "TASKS" ? "New Task" : "New Ticket"}
          </Button>
        </Box>

        {/* Action Icons Row */}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{
            p: 2,
            backgroundColor: getActionAreaBackground(),
            borderRadius: 3,
            backdropFilter: "blur(10px)",
            border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.2 : 0.15)}`,
            boxShadow: isDark
              ? `0 4px 20px ${alpha(theme.palette.common.black, 0.4)}`
              : `0 2px 8px ${alpha(theme.palette.common.black, 0.08)}`,
          }}
        >
          <Tooltip title="Toggle Filters" arrow>
            <Badge
              variant="dot"
              color="primary"
              invisible={!hasActiveFilters}
              sx={{
                "& .MuiBadge-dot": {
                  right: 6,
                  top: 6,
                  backgroundColor: theme.palette.primary.main,
                },
              }}
            >
              <IconButton
                onClick={onToggleFilters}
                size="large"
                sx={{
                  width: 48,
                  height: 48,
                  backgroundColor: hasActiveFilters
                    ? alpha(theme.palette.primary.main, isDark ? 0.25 : 0.12)
                    : alpha(theme.palette.action.hover, isDark ? 0.4 : 0.08),
                  color: hasActiveFilters
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                  border: `1px solid ${alpha(
                    hasActiveFilters ? theme.palette.primary.main : theme.palette.divider,
                    isDark ? 0.3 : 0.2
                  )}`,
                  boxShadow: isDark
                    ? `0 2px 8px ${alpha(theme.palette.common.black, 0.4)}`
                    : `0 1px 4px ${alpha(theme.palette.common.black, 0.08)}`,
                  "&:hover": {
                    backgroundColor: hasActiveFilters
                      ? alpha(theme.palette.primary.main, isDark ? 0.35 : 0.18)
                      : alpha(theme.palette.action.hover, isDark ? 0.6 : 0.12),
                    transform: "scale(1.05)",
                    boxShadow: isDark
                      ? `0 4px 12px ${alpha(theme.palette.common.black, 0.5)}`
                      : `0 2px 8px ${alpha(theme.palette.common.black, 0.12)}`,
                  },
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <FilterIcon />
              </IconButton>
            </Badge>
          </Tooltip>

          <Tooltip title="Board Settings" arrow>
            <IconButton
              onClick={onMenuClick}
              size="large"
              sx={{
                width: 48,
                height: 48,
                backgroundColor: alpha(theme.palette.action.hover, isDark ? 0.4 : 0.08),
                color: theme.palette.text.secondary,
                border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.3 : 0.2)}`,
                boxShadow: isDark
                  ? `0 2px 8px ${alpha(theme.palette.common.black, 0.4)}`
                  : `0 1px 4px ${alpha(theme.palette.common.black, 0.08)}`,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.action.hover, isDark ? 0.6 : 0.12),
                  color: theme.palette.text.primary,
                  transform: "scale(1.05)",
                  boxShadow: isDark
                    ? `0 4px 12px ${alpha(theme.palette.common.black, 0.5)}`
                    : `0 2px 8px ${alpha(theme.palette.common.black, 0.12)}`,
                },
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <TuneIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Quick Actions" arrow>
            <IconButton
              onClick={onMenuClick}
              size="large"
              sx={{
                width: 48,
                height: 48,
                backgroundColor: alpha(theme.palette.action.hover, isDark ? 0.4 : 0.08),
                color: theme.palette.text.secondary,
                border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.3 : 0.2)}`,
                boxShadow: isDark
                  ? `0 2px 8px ${alpha(theme.palette.common.black, 0.4)}`
                  : `0 1px 4px ${alpha(theme.palette.common.black, 0.08)}`,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.action.hover, isDark ? 0.6 : 0.12),
                  color: theme.palette.text.primary,
                  transform: "scale(1.05)",
                  boxShadow: isDark
                    ? `0 4px 12px ${alpha(theme.palette.common.black, 0.5)}`
                    : `0 2px 8px ${alpha(theme.palette.common.black, 0.12)}`,
                },
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <SpeedIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        {/* Empty State */}
        {boards.length === 0 && (
          <Card
            sx={{
              mt: 2,
              textAlign: "center",
              background: `linear-gradient(135deg, ${alpha(
                theme.palette.warning.main,
                isDark ? 0.08 : 0.05
              )} 0%, ${alpha(theme.palette.warning.main, isDark ? 0.04 : 0.02)} 100%)`,
              border: `1px solid ${alpha(theme.palette.warning.main, isDark ? 0.3 : 0.2)}`,
              backgroundColor: getCardBackground(),
            }}
          >
            <CardContent sx={{ py: 3 }}>
              <DashboardIcon
                sx={{
                  fontSize: "2.5rem",
                  color: theme.palette.warning.main,
                  mb: 1,
                }}
              />
              <Typography
                variant="body2"
                sx={{ 
                  fontSize: "0.85rem", 
                  lineHeight: 1.5,
                  color: theme.palette.text.secondary,
                }}
              >
                No boards available yet.{"\n"}
                Create your first board to get started!
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    );
  }

  // Desktop/Tablet Layout
  return (
    <Box sx={{ mb: 2 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 2, md: 3 }}
        alignItems={{ xs: "stretch", md: "center" }}
        justifyContent="space-between"
      >
        {/* Board Selector */}
        <FormControl
          sx={{
            minWidth: { sm: 280, md: 320 },
            maxWidth: { sm: 400, md: 450 },
          }}
          size="small"
        >
          <InputLabel
            sx={{
              color: theme.palette.text.secondary,
              "&.Mui-focused": { color: boardColor },
            }}
          >
            Select Board
          </InputLabel>
          <Select
            value={selectedBoardId}
            label="Select Board"
            onChange={(e) => onBoardChange(e.target.value)}
            sx={{
              backgroundColor: alpha(theme.palette.background.paper, isDark ? 0.8 : 1),
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: boardColor,
                borderWidth: 2,
              },
              "& .MuiSelect-select": {
                color: theme.palette.text.primary,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.divider,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: alpha(boardColor, 0.7),
              },
            }}
          >
            {boards.map((board) => (
              <MenuItem 
                key={board.id} 
                value={board.id}
                sx={{
                  "&:hover": {
                    backgroundColor: alpha(boardColor, isDark ? 0.1 : 0.05),
                  },
                  "&.Mui-selected": {
                    backgroundColor: alpha(boardColor, isDark ? 0.15 : 0.08),
                    "&:hover": {
                      backgroundColor: alpha(boardColor, isDark ? 0.2 : 0.12),
                    },
                  },
                }}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  sx={{ width: "100%" }}
                >
                  {board.type === "TASKS" ? (
                    <TaskIcon
                      sx={{ 
                        fontSize: "1.1rem", 
                        color: theme.palette.text.secondary 
                      }}
                    />
                  ) : (
                    <DashboardIcon
                      sx={{ 
                        fontSize: "1.1rem", 
                        color: theme.palette.text.secondary 
                      }}
                    />
                  )}
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="body2" 
                      noWrap
                      sx={{ color: theme.palette.text.primary }}
                    >
                      {board.name}
                    </Typography>
                    {board.isDefault && (
                      <Typography 
                        variant="caption" 
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        (Default)
                      </Typography>
                    )}
                  </Box>
                </Stack>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            variant="contained"
            startIcon={<PlaylistAddIcon />}
            onClick={onCreateBoard}
            sx={{
              px: 3,
              py: 1,
              background: getGradientBackground(theme.palette.primary.main, true),
              boxShadow: getShadow(theme.palette.primary.main),
              color: theme.palette.primary.contrastText,
              "&:hover": {
                background: isDark
                  ? `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`
                  : `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                transform: "translateY(-1px)",
                boxShadow: getHoverShadow(theme.palette.primary.main),
              },
              transition: "all 0.2s ease-in-out",
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Create Board
          </Button>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onCreateTicket}
            sx={{
              px: 3,
              py: 1,
              background: getGradientBackground(boardColor),
              boxShadow: getShadow(boardColor),
              color: theme.palette.getContrastText(boardColor),
              "&:hover": {
                background: isDark
                  ? `linear-gradient(135deg, ${alpha(boardColor, 0.9)}, ${boardColor})`
                  : `linear-gradient(135deg, ${alpha(boardColor, 0.8)}, ${boardColor})`,
                transform: "translateY(-1px)",
                boxShadow: getHoverShadow(boardColor),
              },
              transition: "all 0.2s ease-in-out",
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            {currentBoard.type === "TASKS" ? "Create Task" : "Create Ticket"}
          </Button>

          <Divider 
            orientation="vertical" 
            flexItem 
            sx={{ 
              mx: 1,
              borderColor: theme.palette.divider,
              opacity: isDark ? 0.3 : 0.12,
            }} 
          />

          <Stack direction="row" spacing={1}>
            <Tooltip title="Toggle Filters" arrow>
              <Badge
                variant="dot"
                color="primary"
                invisible={!hasActiveFilters}
                sx={{
                  "& .MuiBadge-dot": {
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
              >
                <IconButton
                  onClick={onToggleFilters}
                  sx={{
                    width: 42,
                    height: 42,
                    backgroundColor: hasActiveFilters
                      ? alpha(theme.palette.primary.main, isDark ? 0.2 : 0.1)
                      : "transparent",
                    color: hasActiveFilters
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                    border: `1px solid ${
                      hasActiveFilters
                        ? alpha(theme.palette.primary.main, isDark ? 0.5 : 0.3)
                        : "transparent"
                    }`,
                    "&:hover": {
                      backgroundColor: hasActiveFilters
                        ? alpha(theme.palette.primary.main, isDark ? 0.3 : 0.2)
                        : alpha(theme.palette.action.hover, isDark ? 0.2 : 0.1),
                      color: hasActiveFilters
                        ? theme.palette.primary.main
                        : theme.palette.text.primary,
                      transform: "scale(1.05)",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <FilterIcon />
                </IconButton>
              </Badge>
            </Tooltip>

            <Tooltip title="Board Options" arrow>
              <IconButton
                onClick={onMenuClick}
                sx={{
                  width: 42,
                  height: 42,
                  color: theme.palette.text.secondary,
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.action.hover, isDark ? 0.2 : 0.1),
                    color: theme.palette.text.primary,
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Stack>

      {/* Empty State - Desktop */}
      {boards.length === 0 && (
        <Box
          sx={{
            mt: 3,
            p: 4,
            textAlign: "center",
            backgroundColor: alpha(theme.palette.warning.main, isDark ? 0.08 : 0.05),
            borderRadius: 2,
            border: `1px dashed ${alpha(theme.palette.warning.main, isDark ? 0.4 : 0.3)}`,
          }}
        >
          <DashboardIcon
            sx={{
              fontSize: "3rem",
              color: theme.palette.warning.main,
              mb: 2,
            }}
          />
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ color: theme.palette.text.primary }}
          >
            No boards available
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ color: theme.palette.text.secondary }}
          >
            Create your first board to start organizing your tasks and tickets
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default BoardControls;