import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { createInitialTicketMessages, initialTickets, validateTicketDraft, type SupportTicket, type TicketDraft, type TicketValidationErrors } from '../constants/ticket';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';

type TicketCreateResult = {
  errors: TicketValidationErrors;
  success: boolean;
  ticket: SupportTicket | null;
};

type TicketContextValue = {
  createTicket: (draft: TicketDraft) => TicketCreateResult;
  getTicketById: (id: string) => SupportTicket | null;
  resetTickets: () => void;
  tickets: SupportTicket[];
};

export const TicketContext = createContext<TicketContextValue | null>(null);

type TicketProviderProps = {
  children: ReactNode;
};

function createTicketReference(tickets: SupportTicket[]): string {
  return `AST-${1000 + tickets.length + 1}`;
}

export function TicketProvider({ children }: TicketProviderProps) {
  const { status } = useAuth();
  const { profile } = useProfile();
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);

  useEffect(() => {
    if (status !== 'authenticated') {
      setTickets(initialTickets);
    }
  }, [status]);

  const resetTickets = useCallback(() => {
    setTickets(initialTickets);
  }, []);

  const createTicket = useCallback((draft: TicketDraft): TicketCreateResult => {
    const errors = validateTicketDraft(draft);
    if (Object.keys(errors).length > 0 || !draft.category) {
      return { errors, success: false, ticket: null };
    }

    const createdAt = Date.now();
    const id = `ticket-${createdAt.toString(36)}`;
    const description = draft.description.trim();
    const remarks = draft.remarks.trim();
    const nextTicket: SupportTicket = {
      category: draft.category,
      contactChannel: profile.preferredContactChannel,
      createdAt,
      description,
      id,
      messages: createInitialTicketMessages({ description, id, remarks, timestamp: createdAt }),
      reference: createTicketReference(tickets),
      remarks,
      status: 'submitted',
    };

    setTickets((currentTickets) => [nextTicket, ...currentTickets]);
    return { errors: {}, success: true, ticket: nextTicket };
  }, [profile.preferredContactChannel, tickets]);

  const getTicketById = useCallback((id: string) => tickets.find((ticket) => ticket.id === id) ?? null, [tickets]);

  const value = useMemo(() => ({ createTicket, getTicketById, resetTickets, tickets }), [createTicket, getTicketById, resetTickets, tickets]);

  return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>;
}