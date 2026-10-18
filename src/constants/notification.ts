import type { SupportTicket } from './ticket';

export const notificationKinds = {
  serviceNotice: 'serviceNotice',
  telcoUpdate: 'telcoUpdate',
  ticketCreated: 'ticketCreated',
  ticketStatus: 'ticketStatus',
} as const;

export type NotificationKind = (typeof notificationKinds)[keyof typeof notificationKinds];

export const notificationTones = {
  info: 'info',
  success: 'success',
  warning: 'warning',
} as const;

export type NotificationTone = (typeof notificationTones)[keyof typeof notificationTones];

export type AppNotification = {
  acknowledgedAt: number | null;
  createdAt: number;
  id: string;
  kind: NotificationKind;
  message: string;
  readAt: number | null;
  ticketId: string | null;
  ticketReference: string | null;
  title: string;
  tone: NotificationTone;
};

export const notificationLabels = {
  kind: {
    [notificationKinds.serviceNotice]: 'Service notice',
    [notificationKinds.telcoUpdate]: 'Telco update',
    [notificationKinds.ticketCreated]: 'Ticket created',
    [notificationKinds.ticketStatus]: 'Ticket update',
  },
} as const;

export const initialNotifications: AppNotification[] = [
  {
    acknowledgedAt: null,
    createdAt: new Date('2026-10-17T09:00:00').getTime(),
    id: 'notice-network-maintenance',
    kind: notificationKinds.serviceNotice,
    message: 'This demo notice represents a planned maintenance update. No live network status is connected.',
    readAt: null,
    ticketId: null,
    ticketReference: null,
    title: 'Planned service maintenance',
    tone: notificationTones.warning,
  },
  {
    acknowledgedAt: null,
    createdAt: new Date('2026-10-16T10:00:00').getTime(),
    id: 'ticket-update-demo-network-001',
    kind: notificationKinds.ticketStatus,
    message: 'AST-1001 is in review in this local demo. A live support agent is not connected.',
    readAt: null,
    ticketId: 'demo-network-001',
    ticketReference: 'AST-1001',
    title: 'Your ticket is in review',
    tone: notificationTones.info,
  },
  {
    acknowledgedAt: null,
    createdAt: new Date('2026-10-13T09:30:00').getTime(),
    id: 'ticket-update-demo-billing-002',
    kind: notificationKinds.ticketStatus,
    message: 'AST-1002 is marked resolved in this local demo. No real billing review occurred.',
    readAt: new Date('2026-10-13T10:00:00').getTime(),
    ticketId: 'demo-billing-002',
    ticketReference: 'AST-1002',
    title: 'Your ticket is resolved',
    tone: notificationTones.success,
  },
  {
    acknowledgedAt: null,
    createdAt: new Date('2026-10-11T08:00:00').getTime(),
    id: 'update-support-self-service',
    kind: notificationKinds.telcoUpdate,
    message: 'Aster demo support tools now keep ticket records available for the current app session only.',
    readAt: new Date('2026-10-11T08:30:00').getTime(),
    ticketId: null,
    ticketReference: null,
    title: 'Support update',
    tone: notificationTones.info,
  },
];

export function createTicketNotification(ticket: SupportTicket): AppNotification {
  return {
    acknowledgedAt: null,
    createdAt: ticket.createdAt,
    id: `ticket-created-${ticket.id}`,
    kind: notificationKinds.ticketCreated,
    message: `${ticket.reference} was created in this local demo session. Live support delivery is not connected.`,
    readAt: null,
    ticketId: ticket.id,
    ticketReference: ticket.reference,
    title: 'Your support ticket was created',
    tone: notificationTones.success,
  };
}

export function formatNotificationDate(createdAt: number): string {
  return new Intl.DateTimeFormat('en-MY', { dateStyle: 'medium', timeStyle: 'short' }).format(createdAt);
}