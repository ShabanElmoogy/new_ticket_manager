import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import {
  Box,
  Paper,
  Typography,
  Badge,
  Chip,
  Alert,
  useTheme
} from '@mui/material';
import type { KanbanColumn as KanbanColumnType, KanbanTicket, TicketStatus } from '../../types/kanban';
import KanbanTicketCard from './KanbanTicketCard';

interface KanbanColumnProps {
  column?: KanbanColumnType;
  status: TicketStatus;
  tickets: KanbanTicket[];
  boardId: string;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  status,
  tickets,
  boardId
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const getColumnTitle = () => {
    if (column) return column.name;
    
    // Fallback titles for default statuses
    switch (status) {
      case 'OPEN': return 'To Do';
      case 'IN_PROGRESS': return 'In Progress';
      case 'RESOLVED': return 'Review';
      case 'CLOSED': return 'Done';
      default: return status;
    }
  };

  const getColumnColor = () => {
    // Use theme-aware colors from column data
    if (column?.color && column?.darkColor) {
      return isDarkMode ? column.darkColor : column.color;
    }
    
    // If column has only one color, use it for light mode and generate dark variant
    if (column?.color) {
      return column.color;
    }
    
    // Default colors for statuses (theme-aware)
    if (isDarkMode) {
      switch (status) {
        case 'OPEN': return '#0d47a1';        // Blue dark
        case 'IN_PROGRESS': return '#e65100';  // Orange dark
        case 'RESOLVED': return '#4a148c';     // Purple dark
        case 'CLOSED': return '#1b5e20';       // Green dark
        default: return '#212121';             // Grey dark
      }
    } else {
      switch (status) {
        case 'OPEN': return '#e3f2fd';         // Blue light
        case 'IN_PROGRESS': return '#fff3e0';  // Orange light
        case 'RESOLVED': return '#f3e5f5';     // Purple light
        case 'CLOSED': return '#e8f5e8';       // Green light
        default: return '#fafafa';             // Grey light
      }
    }
  };

  const isWipLimitExceeded = column?.wipLimit && tickets.length > column.wipLimit;

  const getTextColor = () => {
    // Ensure good contrast for text based on background color
    if (isDarkMode && column?.darkColor) {
      // For dark theme with custom dark colors, use light text
      return 'rgba(255, 255, 255, 0.87)';
    }
    if (!isDarkMode && column?.color) {
      // For light theme with custom light colors, use dark text
      return 'rgba(0, 0, 0, 0.87)';
    }
    // Use theme default text color for fallback colors
    return theme.palette.text.primary;
  };

  return (
    <Paper
      sx={{
        minWidth: 300,
        maxWidth: 300,
        height: 'fit-content',
        maxHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: getColumnColor(),
        border: isWipLimitExceeded ? '2px solid #f44336' : 'none',
        color: getTextColor(),
        transition: 'background-color 0.3s ease, color 0.3s ease',
        // Add subtle border for better definition in dark mode
        ...(isDarkMode && {
          border: isWipLimitExceeded 
            ? '2px solid #f44336' 
            : '1px solid rgba(255, 255, 255, 0.12)'
        })
      }}
    >
      {/* Column Header */}
      <Box sx={{ 
        p: 2, 
        borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.12)' : '#e0e0e0'}` 
      }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="h2">
            {getColumnTitle()}
          </Typography>
          <Badge badgeContent={tickets.length} color="primary">
            <Box />
          </Badge>
        </Box>
        
        {column?.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {column.description}
          </Typography>
        )}

        {column?.wipLimit && (
          <Chip
            label={`WIP Limit: ${tickets.length}/${column.wipLimit}`}
            size="small"
            color={isWipLimitExceeded ? 'error' : 'default'}
            sx={{ mt: 1 }}
          />
        )}

        {isWipLimitExceeded && (
          <Alert severity="warning" sx={{ mt: 1 }}>
            WIP limit exceeded!
          </Alert>
        )}
      </Box>

      {/* Column Content */}
      <Droppable droppableId={`column-${status}`}>
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              flex: 1,
              p: 1,
              minHeight: 200,
              maxHeight: 'calc(100vh - 300px)',
              overflowY: 'auto',
              backgroundColor: snapshot.isDraggingOver 
                ? (isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)')
                : 'transparent',
              transition: 'background-color 0.2s ease'
            }}
          >
            {tickets.map((ticket, index) => (
              <Draggable
                key={ticket.id}
                draggableId={ticket.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      marginBottom: 8
                    }}
                  >
                    <KanbanTicketCard
                      ticket={ticket}
                      isDragging={snapshot.isDragging}
                      boardId={boardId}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            
            {tickets.length === 0 && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 100,
                  color: 'text.secondary',
                  fontStyle: 'italic'
                }}
              >
                No tickets
              </Box>
            )}
          </Box>
        )}
      </Droppable>
    </Paper>
  );
};

export default KanbanColumn;