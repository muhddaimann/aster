import type { SupportTicket } from '../../constants/ticket';
import { TicketConversation } from './ticketConversation';

type TicketDetailProps = {
  ticket: SupportTicket;
};

export function TicketDetail({ ticket }: TicketDetailProps) {
  return <TicketConversation ticket={ticket} />;
}