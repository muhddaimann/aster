import type { PreferredContactChannel } from './profile';

export const ticketCategories = {
  account: 'account',
  billing: 'billing',
  connectivity: 'connectivity',
  mobileService: 'mobileService',
  other: 'other',
} as const;

export type TicketCategory = (typeof ticketCategories)[keyof typeof ticketCategories];

export const ticketStatuses = {
  inReview: 'inReview',
  resolved: 'resolved',
  submitted: 'submitted',
} as const;

export type TicketStatus = (typeof ticketStatuses)[keyof typeof ticketStatuses];

export const ticketMessageSenders = {
  customer: 'customer',
  system: 'system',
} as const;

export type TicketMessageSender = (typeof ticketMessageSenders)[keyof typeof ticketMessageSenders];

export type TicketMessage = {
  createdAt: number;
  id: string;
  sender: TicketMessageSender;
  text: string;
};

export const ticketStatusFilters = {
  all: 'all',
  inReview: ticketStatuses.inReview,
  resolved: ticketStatuses.resolved,
  submitted: ticketStatuses.submitted,
} as const;

export type TicketStatusFilter = (typeof ticketStatusFilters)[keyof typeof ticketStatusFilters];

export type TicketDraft = {
  category: TicketCategory | null;
  description: string;
  remarks: string;
};

export type TicketValidationErrors = Partial<Record<'category' | 'description' | 'remarks', string>>;

export type SupportTicket = {
  category: TicketCategory;
  contactChannel: PreferredContactChannel;
  createdAt: number;
  description: string;
  id: string;
  messages: TicketMessage[];
  reference: string;
  remarks: string;
  status: TicketStatus;
};

export const initialTicketDraft: TicketDraft = {
  category: null,
  description: '',
  remarks: '',
};

export const ticketLabels = {
  category: {
    [ticketCategories.account]: 'Account or SIM',
    [ticketCategories.billing]: 'Billing or payment',
    [ticketCategories.connectivity]: 'Mobile data or network',
    [ticketCategories.mobileService]: 'Calls or SMS',
    [ticketCategories.other]: 'Other support issue',
  },
  categoryDescription: {
    [ticketCategories.account]: 'Help with your demo account, SIM, or account access.',
    [ticketCategories.billing]: 'Questions about charges, bills, payments, or top-ups.',
    [ticketCategories.connectivity]: 'Trouble with mobile data, coverage, or network service.',
    [ticketCategories.mobileService]: 'Issues with calls, SMS, voicemail, or roaming.',
    [ticketCategories.other]: 'Tell us about another telco support need.',
  },
  status: {
    [ticketStatuses.inReview]: 'In review',
    [ticketStatuses.resolved]: 'Resolved',
    [ticketStatuses.submitted]: 'Submitted',
  },
  statusFilter: {
    [ticketStatusFilters.all]: 'All',
    [ticketStatusFilters.inReview]: 'In review',
    [ticketStatusFilters.resolved]: 'Resolved',
    [ticketStatusFilters.submitted]: 'Submitted',
  },
} as const;

export const initialTickets: SupportTicket[] = [
  {
    category: ticketCategories.connectivity,
    contactChannel: 'phone',
    createdAt: new Date('2026-10-16T09:30:00').getTime(),
    description: 'Mobile data has been intermittent since this morning.',
    id: 'demo-network-001',
    messages: [
      {
        createdAt: new Date('2026-10-16T09:30:00').getTime(),
        id: 'demo-network-001-customer-issue',
        sender: ticketMessageSenders.customer,
        text: 'Mobile data has been intermittent since this morning.',
      },
      {
        createdAt: new Date('2026-10-16T09:31:00').getTime(),
        id: 'demo-network-001-customer-remarks',
        sender: ticketMessageSenders.customer,
        text: 'Issue is most noticeable at home.',
      },
      {
        createdAt: new Date('2026-10-16T09:32:00').getTime(),
        id: 'demo-network-001-system-acknowledgement',
        sender: ticketMessageSenders.system,
        text: 'Your local demo ticket is in review. Live agent replies are not connected in this version of Aster.',
      },
    ],
    reference: 'AST-1001',
    remarks: 'Issue is most noticeable at home.',
    status: ticketStatuses.inReview,
  },
  {
    category: ticketCategories.billing,
    contactChannel: 'email',
    createdAt: new Date('2026-10-12T14:15:00').getTime(),
    description: 'I need help understanding a charge on my latest bill.',
    id: 'demo-billing-002',
    messages: [
      {
        createdAt: new Date('2026-10-12T14:15:00').getTime(),
        id: 'demo-billing-002-customer-issue',
        sender: ticketMessageSenders.customer,
        text: 'I need help understanding a charge on my latest bill.',
      },
      {
        createdAt: new Date('2026-10-12T14:16:00').getTime(),
        id: 'demo-billing-002-system-acknowledgement',
        sender: ticketMessageSenders.system,
        text: 'This local demo ticket has been marked resolved. No live agent or real billing review is connected.',
      },
    ],
    reference: 'AST-1002',
    remarks: '',
    status: ticketStatuses.resolved,
  },
];

export function validateTicketDraft(draft: TicketDraft): TicketValidationErrors {
  const errors: TicketValidationErrors = {};

  if (!draft.category) {
    errors.category = 'Choose the type of help you need.';
  }

  if (!draft.description.trim()) {
    errors.description = 'Describe the issue you need help with.';
  } else if (draft.description.trim().length > 500) {
    errors.description = 'Keep the issue description to 500 characters or fewer.';
  }

  if (draft.remarks.trim().length > 500) {
    errors.remarks = 'Keep additional remarks to 500 characters or fewer.';
  }

  return errors;
}

export function formatTicketDate(createdAt: number): string {
  return new Intl.DateTimeFormat('en-MY', { dateStyle: 'medium', timeStyle: 'short' }).format(createdAt);
}

export function createInitialTicketMessages({ description, id, remarks, timestamp }: Pick<SupportTicket, 'description' | 'id' | 'remarks'> & { timestamp: number }): TicketMessage[] {
  const messages: TicketMessage[] = [
    {
      createdAt: timestamp,
      id: `${id}-customer-issue`,
      sender: ticketMessageSenders.customer,
      text: description,
    },
  ];

  if (remarks) {
    messages.push({
      createdAt: timestamp + 1,
      id: `${id}-customer-remarks`,
      sender: ticketMessageSenders.customer,
      text: remarks,
    });
  }

  messages.push({
    createdAt: timestamp + 2,
    id: `${id}-system-acknowledgement`,
    sender: ticketMessageSenders.system,
    text: 'Your local demo ticket has been created. A live support agent is not connected in this version of Aster.',
  });

  return messages;
}