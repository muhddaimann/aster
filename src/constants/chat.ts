import type { TicketCategory } from './ticket';

export const chatSenders = {
  customer: 'customer',
  system: 'system',
} as const;

export type ChatSender = (typeof chatSenders)[keyof typeof chatSenders];

export type ChatMessage = {
  createdAt: number;
  id: string;
  sender: ChatSender;
  text: string;
};

export type ChatConversationStatus = 'idle' | 'starting' | 'typing' | 'awaitingCategory' | 'replying' | 'ready';

export type ChatConversation = {
  createdAt: number;
  id: string;
  messages: ChatMessage[];
  selectedCategory: TicketCategory | null;
  status: ChatConversationStatus;
  updatedAt: number;
};

export const chatTiming = {
  greetingDelayMs: 500,
  firstReplyDelayMs: 650,
  categoryReplyDelayMs: 650,
  messageReplyDelayMs: 650,
};

export const chatCopy = {
  consentTitle: 'Start a demo chat?',
  consentDisclosure: 'This local demo does not record or send messages. Recording and retention terms must be clearly disclosed before any live support chat is offered.',
  initialCustomerMessage: 'Hi',
  initialSystemMessage: 'How can I help? Choose a support category below.',
  categoryAcknowledgement: 'This demo does not connect to a live support agent. You can create a local support ticket from Home for follow-up.',
  demoReply: 'Thanks for your message. This is an automated local demo, so a live support agent cannot reply here. You can create a local support ticket from Home for follow-up.',
} as const;

export const chatMessageLimit = 500;

export function formatChatDate(timestamp: number): string {
  return new Intl.DateTimeFormat('en-MY', { dateStyle: 'medium', timeStyle: 'short' }).format(timestamp);
}
