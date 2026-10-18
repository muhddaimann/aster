import { useContext } from 'react';
import { TicketContext } from '../contexts/ticketContext';

export function useTicket() {
  const context = useContext(TicketContext);

  if (!context) {
    throw new Error('useTicket must be used within a TicketProvider.');
  }

  return context;
}