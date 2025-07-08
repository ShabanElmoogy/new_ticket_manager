import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Chip,
  Stack,
  Divider,
  useTheme,
  alpha,
  CircularProgress,
} from '@mui/material';
import {
  Warning as WarningIcon,
  Delete as DeleteIcon,
  MoveToInbox as MoveIcon,
  Info as InfoIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { useKanbanStore } from '../../stores/kanbanStore';
import { kanbanApi } from '../../services/kanbanApi';

interface DeleteBoardDialogProps {
  open: boolean;
  onClose: () => void;
  onDeleted?: () => void;
  boardId: string;
  boardName: string;
  boardType: 'TICKETS' | 'TASKS';
  ticketCount?: number;
  taskCount?: number;
  isDefault?: boolean;
}

interface TargetBoard {
  id: string;
  name: string;
  description?: string;
  isDefault: boolean;
  type: 'TICKETS' | 'TASKS';
  itemCount: number;
}

const DeleteBoardDialog: React.FC<DeleteBoardDialogProps> = ({
  open,
  onClose,
  onDeleted,
  boardId,
  boardName,
  boardType,
  ticketCount = 0,
  taskCount = 0,
  isDefault = false,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { deleteBoard, loading } = useKanbanStore();

  const [preserveItems, setPreserveItems] = useState(true);
  const [targetBoardId, setTargetBoardId] = useState('');
  const [targetBoards, setTargetBoards] = useState<TargetBoard[]>([]);
  const [loadingTargets, setLoadingTargets] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const itemCount = boardType === 'TICKETS' ? ticketCount : taskCount;
  const itemType = boardType === 'TICKETS' ? 'tickets' : 'tasks';

  useEffect(() => {
    if (open && preserveItems && itemCount > 0) {
      fetchTargetBoards();
    }
  }, [open, preserveItems, itemCount, boardId]);

  const fetchTargetBoards = async () => {
    try {
      setLoadingTargets(true);
      setError(null);
      const response = await kanbanApi.getTargetBoards(boardId);
      setTargetBoards(response.targetBoards);
      
      // Auto-select default board if available
      const defaultBoard = response.targetBoards.find(board => board.isDefault);
      if (defaultBoard) {
        setTargetBoardId(defaultBoard.id);
      } else if (response.targetBoards.length > 0) {
        setTargetBoardId(response.targetBoards[0].id);
      }
    } catch (error) {
      console.error('Error fetching target boards:', error);
      setError('Failed to load available boards');
    } finally {
      setLoadingTargets(false);
    }
  };

  const handleDelete = async () => {
    // Prevent deletion of default boards
    if (isDefault) {
      setError('Cannot delete the default board. Default boards are protected from deletion.');
      return;
    }

    try {
      setError(null);
      
      const deleteData: any = {
        preserveItems,
      };

      if (preserveItems && targetBoardId) {
        deleteData.targetBoardId = targetBoardId;
      }

      await deleteBoard(boardId, deleteData);
      onClose();
      // Call the onDeleted callback if provided
      if (onDeleted) {
        onDeleted();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete board');
    }
  };

  const handleClose = () => {
    setPreserveItems(true);
    setTargetBoardId('');
    setTargetBoards([]);
    setError(null);
    onClose();
  };

  const getDialogStyles = () => ({
    '& .MuiDialog-paper': {
      borderRadius: 3,
      border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
      backgroundColor: isDark
        ? alpha(theme.palette.background.paper, 0.95)
        : theme.palette.background.paper,
      backdropFilter: isDark ? 'blur(20px)' : 'none',
    }
  });

  const getWarningBoxStyles = () => ({
    p: 2.5,
    borderRadius: 2,
    backgroundColor: alpha(theme.palette.error.main, isDark ? 0.15 : 0.05),
    border: `1px solid ${alpha(theme.palette.error.main, isDark ? 0.3 : 0.2)}`,
    mb: 3,
  });

  const getInfoBoxStyles = () => ({
    p: 2,
    borderRadius: 2,
    backgroundColor: alpha(theme.palette.info.main, isDark ? 0.1 : 0.05),
    border: `1px solid ${alpha(theme.palette.info.main, isDark ? 0.2 : 0.15)}`,
    mb: 2,
  });

  const getSuccessBoxStyles = () => ({
    p: 2,
    borderRadius: 2,
    backgroundColor: alpha(theme.palette.success.main, isDark ? 0.1 : 0.05),
    border: `1px solid ${alpha(theme.palette.success.main, isDark ? 0.2 : 0.15)}`,
    mb: 2,
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      sx={getDialogStyles()}
    >
      <DialogTitle
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.error.main, isDark ? 0.1 : 0.05)}, transparent)`,
          borderBottom: `1px solid ${alpha(theme.palette.divider, isDark ? 0.2 : 0.12)}`,
          color: theme.palette.text.primary,
          fontSize: '1.3rem',
          fontWeight: 600,
          py: 3,
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <DeleteIcon 
            sx={{ 
              color: theme.palette.error.main,
              fontSize: '1.5rem',
            }} 
          />
          Delete Board
        </Box>
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3,
              borderRadius: 2,
            }}
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        {/* Default Board Protection Warning */}
        {isDefault && (
          <Box sx={{
            ...getWarningBoxStyles(),
            backgroundColor: alpha(theme.palette.warning.main, isDark ? 0.15 : 0.05),
            border: `1px solid ${alpha(theme.palette.warning.main, isDark ? 0.3 : 0.2)}`,
          }}>
            <Box display="flex" alignItems="flex-start" gap={2}>
              <WarningIcon 
                sx={{ 
                  color: theme.palette.warning.main,
                  fontSize: '1.5rem',
                  mt: 0.5,
                }} 
              />
              <Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: theme.palette.warning.main,
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  Default Board Protection
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    lineHeight: 1.5,
                  }}
                >
                  This is a default board and cannot be deleted. Default boards are protected to ensure system stability and data integrity.
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        {/* Warning Section */}
        {!isDefault && (
          <Box sx={getWarningBoxStyles()}>
            <Box display="flex" alignItems="flex-start" gap={2}>
              <WarningIcon 
                sx={{ 
                  color: theme.palette.error.main,
                  fontSize: '1.5rem',
                  mt: 0.5,
                }} 
              />
              <Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: theme.palette.error.main,
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  You are about to delete "{boardName}"
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    lineHeight: 1.5,
                  }}
                >
                  This action cannot be undone. The board and its columns will be permanently removed.
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        {/* Items Information */}
        {itemCount > 0 && (
          <Box sx={getInfoBoxStyles()}>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <InfoIcon 
                sx={{ 
                  color: theme.palette.info.main,
                  fontSize: '1.2rem',
                }} 
              />
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                }}
              >
                This board contains {itemCount} {itemType}
              </Typography>
            </Box>

            {/* Preserve Items Toggle */}
            <FormControlLabel
              control={
                <Switch
                  checked={preserveItems}
                  onChange={(e) => setPreserveItems(e.target.checked)}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: theme.palette.success.main,
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: theme.palette.success.main,
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ fontWeight: 500 }}>
                  Preserve {itemType} (move to another board)
                </Typography>
              }
            />

            {!preserveItems && (
              <Alert 
                severity="warning" 
                sx={{ 
                  mt: 2,
                  borderRadius: 1,
                }}
              >
                <Typography variant="body2">
                  {itemType} will be unassigned from this board but not deleted. 
                  They can be reassigned to other boards later.
                </Typography>
              </Alert>
            )}
          </Box>
        )}

        {/* Target Board Selection */}
        {preserveItems && itemCount > 0 && (
          <Box>
            {loadingTargets ? (
              <Box display="flex" alignItems="center" gap={2} p={2}>
                <CircularProgress size={20} />
                <Typography variant="body2" color="text.secondary">
                  Loading available boards...
                </Typography>
              </Box>
            ) : targetBoards.length > 0 ? (
              <Box sx={getSuccessBoxStyles()}>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <MoveIcon 
                    sx={{ 
                      color: theme.palette.success.main,
                      fontSize: '1.2rem',
                    }} 
                  />
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    }}
                  >
                    Move {itemType} to:
                  </Typography>
                </Box>

                <FormControl fullWidth>
                  <InputLabel>Target Board</InputLabel>
                  <Select
                    value={targetBoardId}
                    label="Target Board"
                    onChange={(e) => setTargetBoardId(e.target.value)}
                    sx={{
                      backgroundColor: alpha(theme.palette.background.paper, isDark ? 0.7 : 1),
                    }}
                  >
                    {targetBoards.map((board) => (
                      <MenuItem key={board.id} value={board.id}>
                        <Box sx={{ width: '100%' }}>
                          <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {board.name}
                            </Typography>
                            <Stack direction="row" spacing={1}>
                              {board.isDefault && (
                                <Chip 
                                  label="Default" 
                                  size="small" 
                                  color="primary" 
                                  variant="outlined"
                                />
                              )}
                              <Chip 
                                label={`${board.itemCount} ${itemType}`} 
                                size="small" 
                                variant="outlined"
                              />
                            </Stack>
                          </Box>
                          {board.description && (
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              sx={{ display: 'block', mt: 0.5 }}
                            >
                              {board.description}
                            </Typography>
                          )}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            ) : (
              <Alert 
                severity="error" 
                sx={{ 
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2">
                  No available {boardType.toLowerCase()} boards found to move {itemType} to. 
                  You must create another {boardType.toLowerCase()} board first or choose to unassign the {itemType}.
                </Typography>
              </Alert>
            )}
          </Box>
        )}

        {/* No Items Message */}
        {itemCount === 0 && (
          <Box sx={getSuccessBoxStyles()}>
            <Box display="flex" alignItems="center" gap={2}>
              <CheckIcon 
                sx={{ 
                  color: theme.palette.success.main,
                  fontSize: '1.2rem',
                }} 
              />
              <Typography 
                variant="body1" 
                sx={{ 
                  color: theme.palette.text.primary,
                }}
              >
                This board is empty and can be safely deleted.
              </Typography>
            </Box>
          </Box>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Summary */}
        <Box>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              fontWeight: 600,
              mb: 1,
              color: theme.palette.text.primary,
            }}
          >
            Summary:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Board "{boardName}" will be deleted
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Board columns will be removed
          </Typography>
          {itemCount > 0 && (
            <Typography variant="body2" color="text.secondary">
              • {itemCount} {itemType} will be {preserveItems && targetBoardId ? `moved to "${targetBoards.find(b => b.id === targetBoardId)?.name}"` : 'unassigned'}
            </Typography>
          )}
        </Box>
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
          onClick={handleDelete}
          variant="contained"
          color="error"
          disabled={isDefault || loading || (preserveItems && itemCount > 0 && !targetBoardId)}
          startIcon={loading ? <CircularProgress size={16} /> : <DeleteIcon />}
          sx={{
            '&:disabled': {
              background: theme.palette.action.disabledBackground,
              color: theme.palette.action.disabled,
            },
            textTransform: 'none',
            fontWeight: 600,
            px: 4,
          }}
        >
          {isDefault ? 'Cannot Delete Default Board' : loading ? 'Deleting...' : 'Delete Board'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteBoardDialog;