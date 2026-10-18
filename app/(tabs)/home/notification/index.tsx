import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { NotificationCard } from '../../../../src/components/notification/notificationCard';
import { NotificationEmptyState } from '../../../../src/components/notification/notificationEmptyState';
import { AppScreen } from '../../../../src/components/shared/appScreen';
import { useNotification } from '../../../../src/hooks/useNotification';
import { useOverlay } from '../../../../src/hooks/useOverlay';
import { useTheme } from '../../../../src/hooks/useTheme';
import { useTicket } from '../../../../src/hooks/useTicket';

export default function NotificationScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const overlay = useOverlay();
  const { acknowledgeNotification, markAllRead, markRead, notifications, unreadCount } = useNotification();
  const { getTicketById } = useTicket();
  const canMarkAllRead = unreadCount > 0;

  const openNotificationTicket = (notificationId: string, ticketId: string) => {
    markRead(notificationId);
    if (!getTicketById(ticketId)) {
      overlay.toast({ message: 'This local ticket is no longer available in the current session.', tone: 'warning' });
      return;
    }
    router.push(`/home/ticket/${ticketId}`);
  };

  return (
    <AppScreen
      onBack={() => router.replace('/home')}
      rightSlot={(
        <Pressable accessibilityLabel="Mark all notifications read" accessibilityRole="button" accessibilityState={{ disabled: !canMarkAllRead }} disabled={!canMarkAllRead} onPress={markAllRead} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: canMarkAllRead ? theme.colors.surface : theme.colors.disabled, borderColor: theme.colors.border, borderRadius: theme.radius.pill, borderWidth: 1, height: 44, justifyContent: 'center', opacity: !canMarkAllRead ? theme.opacity.disabled : pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.md })}>
          <Text style={{ color: canMarkAllRead ? theme.colors.primary : theme.colors.textMuted, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Read all</Text>
        </Pressable>
      )}
      rightSlotReservedWidth={78}
      routeKind="nested"
      subtitle="LOCAL UPDATES"
      title="Notifications"
    >
      <View accessibilityRole="text" style={{ backgroundColor: theme.colors.infoSoft, borderColor: theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, gap: theme.spacing.xs, padding: theme.spacing.md }}>
        <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>{unreadCount ? `${unreadCount} unread update${unreadCount === 1 ? '' : 's'}` : 'All updates read'}</Text>
        <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>These are local demo updates for this app session. Aster does not send device push notifications in this version.</Text>
      </View>
      {notifications.length ? notifications.map((notification) => <NotificationCard key={notification.id} notification={notification} onAcknowledge={() => acknowledgeNotification(notification.id)} onOpen={() => notification.ticketId && openNotificationTicket(notification.id, notification.ticketId)} />) : <NotificationEmptyState />}
    </AppScreen>
  );
}