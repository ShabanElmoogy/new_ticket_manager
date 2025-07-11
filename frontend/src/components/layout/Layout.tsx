import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../dashboard/Header';
import TicketDetailsDialog from '../tickets/TicketDetailsDialog';
import { useAuthStore } from '../../stores/authStore';
import { type Ticket } from '../../services/api';

const Layout: React.FC = () => {
  const { token } = useAuthStore();
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setDetailsDialogOpen(true);
  };

  const handleUpdateTicketStatus = async (ticketId: string, status: string) => {
    // This will be handled by individual pages if needed
    // For now, just close the dialog and let the page handle the update
    setDetailsDialogOpen(false);
  };

  return (
    <Box>
      <Header onTicketClick={handleTicketClick} />
      <Outlet />
      
      <TicketDetailsDialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        ticket={selectedTicket}
        onUpdateStatus={handleUpdateTicketStatus}
        token={token || ""}
      />
    </Box>
  );
};

export default Layout;