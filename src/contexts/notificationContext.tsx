import { createContext, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { createTicketNotification, initialNotifications, type AppNotification } from '../constants/notification';
import { useAuth } from '../hooks/useAuth';
import { useTicket } from '../hooks/useTicket';

type NotificationContextValue = {
  acknowledgeNotification: (id: string) => void;
  markAllRead: () => void;
  markRead: (id: string) => void;
  notifications: AppNotification[];
  unreadCount: number;
};

export const NotificationContext = createContext<NotificationContextValue | null>(null);

type NotificationProviderProps = {
  children: ReactNode;
};

export function NotificationProvider({ children }: NotificationProviderProps) {
  const { status } = useAuth();
  const { tickets } = useTicket();
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);
  const knownTicketIdsRef = useRef(new Set(tickets.map((ticket) => ticket.id)));

  useEffect(() => {
    if (status !== 'authenticated') {
      setNotifications(initialNotifications);
      knownTicketIdsRef.current = new Set(tickets.map((ticket) => ticket.id));
    }
  }, [status, tickets]);

  useEffect(() => {
    if (status !== 'authenticated') {
      return;
    }

    const newTickets = tickets.filter((ticket) => !knownTicketIdsRef.current.has(ticket.id));
    if (newTickets.length > 0) {
      setNotifications((currentNotifications) => [
        ...newTickets.map(createTicketNotification),
        ...currentNotifications,
      ]);
    }
    knownTicketIdsRef.current = new Set(tickets.map((ticket) => ticket.id));
  }, [status, tickets]);

  const markRead = useCallback((id: string) => {
    setNotifications((currentNotifications) => currentNotifications.map((notification) => (
      notification.id === id && !notification.readAt
        ? { ...notification, readAt: Date.now() }
        : notification
    )));
  }, []);

  const markAllRead = useCallback(() => {
    const readAt = Date.now();
    setNotifications((currentNotifications) => currentNotifications.map((notification) => (
      notification.readAt ? notification : { ...notification, readAt }
    )));
  }, []);

  const acknowledgeNotification = useCallback((id: string) => {
    const timestamp = Date.now();
    setNotifications((currentNotifications) => currentNotifications.map((notification) => (
      notification.id === id
        ? { ...notification, acknowledgedAt: notification.acknowledgedAt ?? timestamp, readAt: notification.readAt ?? timestamp }
        : notification
    )));
  }, []);

  const unreadCount = notifications.filter((notification) => !notification.readAt).length;
  const value = useMemo(() => ({ acknowledgeNotification, markAllRead, markRead, notifications, unreadCount }), [acknowledgeNotification, markAllRead, markRead, notifications, unreadCount]);

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}