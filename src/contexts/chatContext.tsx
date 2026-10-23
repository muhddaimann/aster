import { createContext, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { chatCopy, chatMessageLimit, chatSenders, chatTiming, type ChatConversation, type ChatConversationStatus, type ChatMessage } from '../constants/chat';
import { ticketLabels, type TicketCategory } from '../constants/ticket';
import { useAuth } from '../hooks/useAuth';

type ChatContextValue = {
  activeConversation: ChatConversation | null;
  conversations: ChatConversation[];
  createChat: () => string;
  resumeChat: (id: string) => void;
  sendMessage: (text: string) => boolean;
  selectCategory: (category: TicketCategory) => void;
};

export const ChatContext = createContext<ChatContextValue | null>(null);

type ChatProviderProps = {
  children: ReactNode;
};

export function ChatProvider({ children }: ChatProviderProps) {
  const { status: authStatus } = useAuth();
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const timersRef = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const clearTimer = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) clearTimeout(timer);
    timersRef.current.delete(id);
  }, []);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
  }, []);

  const schedule = useCallback((id: string, delay: number, callback: () => void) => {
    clearTimer(id);
    timersRef.current.set(id, setTimeout(() => {
      timersRef.current.delete(id);
      callback();
    }, delay));
  }, [clearTimer]);

  const updateConversation = useCallback((id: string, update: (current: ChatConversation) => ChatConversation) => {
    setConversations((current) => current
      .map((conversation) => conversation.id === id
        ? { ...update(conversation), updatedAt: Date.now() }
        : conversation)
      .sort((first, second) => second.updatedAt - first.updatedAt));
  }, []);

  const appendMessage = useCallback((id: string, sender: ChatMessage['sender'], text: string, status: ChatConversationStatus) => {
    updateConversation(id, (current) => ({
      ...current,
      messages: [...current.messages, {
        createdAt: Date.now(),
        id: `${id}-message-${current.messages.length + 1}`,
        sender,
        text,
      }],
      status,
    }));
  }, [updateConversation]);

  const createChat = useCallback(() => {
    const now = Date.now();
    const id = `chat-${now.toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
    const conversation: ChatConversation = {
      createdAt: now,
      id,
      messages: [],
      selectedCategory: null,
      status: 'starting',
      updatedAt: now,
    };
    setConversations((current) => [conversation, ...current]);
    setActiveConversationId(id);

    schedule(id, chatTiming.greetingDelayMs, () => {
      appendMessage(id, chatSenders.customer, chatCopy.initialCustomerMessage, 'typing');
      schedule(id, chatTiming.firstReplyDelayMs, () => {
        appendMessage(id, chatSenders.system, chatCopy.initialSystemMessage, 'awaitingCategory');
      });
    });

    return id;
  }, [appendMessage, schedule]);

  const resumeChat = useCallback((id: string) => {
    setActiveConversationId(id);
  }, []);

  const activeConversation = conversations.find((conversation) => conversation.id === activeConversationId) ?? null;

  const selectCategory = useCallback((category: TicketCategory) => {
    if (!activeConversation || activeConversation.selectedCategory || activeConversation.status !== 'awaitingCategory') return;
    updateConversation(activeConversation.id, (current) => ({
      ...current,
      messages: [...current.messages, {
        createdAt: Date.now(),
        id: `${current.id}-category-${category}`,
        sender: chatSenders.customer,
        text: `I need help with ${ticketLabels.category[category]}.`,
      }],
      selectedCategory: category,
      status: 'typing',
    }));
    schedule(activeConversation.id, chatTiming.categoryReplyDelayMs, () => {
      appendMessage(activeConversation.id, chatSenders.system, chatCopy.categoryAcknowledgement, 'ready');
    });
  }, [activeConversation, appendMessage, schedule, updateConversation]);

  const sendMessage = useCallback((text: string) => {
    const messageText = text.trim();
    if (!activeConversation || activeConversation.status !== 'ready' || !messageText || messageText.length > chatMessageLimit) return false;
    appendMessage(activeConversation.id, chatSenders.customer, messageText, 'replying');
    schedule(activeConversation.id, chatTiming.messageReplyDelayMs, () => {
      appendMessage(activeConversation.id, chatSenders.system, chatCopy.demoReply, 'ready');
    });
    return true;
  }, [activeConversation, appendMessage, schedule]);

  useEffect(() => {
    if (authStatus !== 'authenticated') {
      clearAllTimers();
      setConversations([]);
      setActiveConversationId(null);
    }
  }, [authStatus, clearAllTimers]);

  useEffect(() => clearAllTimers, [clearAllTimers]);

  const value = useMemo(() => ({ activeConversation, conversations, createChat, resumeChat, selectCategory, sendMessage }), [activeConversation, conversations, createChat, resumeChat, selectCategory, sendMessage]);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
