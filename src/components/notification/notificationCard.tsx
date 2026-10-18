import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { formatNotificationDate, notificationKinds, type AppNotification } from '../../constants/notification';
import { useTheme } from '../../hooks/useTheme';

type NotificationCardProps = {
  notification: AppNotification;
  onAcknowledge: () => void;
  onOpen: () => void;
};

export function NotificationCard({ notification, onAcknowledge, onOpen }: NotificationCardProps) {
  const { theme } = useTheme();
  const isUnread = !notification.readAt;
  const hasTicketAction = Boolean(notification.ticketId);
  const icon = notification.kind === notificationKinds.ticketCreated
    ? 'checkmark-circle-outline'
    : notification.kind === notificationKinds.ticketStatus
      ? 'receipt-outline'
      : notification.kind === notificationKinds.serviceNotice
        ? 'alert-circle-outline'
        : 'information-circle-outline';
  const toneColor = notification.tone === 'success' ? theme.colors.success : notification.tone === 'warning' ? theme.colors.warning : theme.colors.info;
  const toneBackground = notification.tone === 'success' ? theme.colors.successSoft : notification.tone === 'warning' ? theme.colors.warningSoft : theme.colors.infoSoft;

  return (
    <View accessibilityLabel={`${isUnread ? 'Unread. ' : ''}${notification.title}. ${notification.message}${notification.ticketReference ? ` ${notification.ticketReference}.` : ''}`} accessibilityRole="text" style={{ backgroundColor: isUnread ? theme.colors.surface : theme.colors.surfaceRaised, borderColor: isUnread ? theme.colors.focusRing : theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, gap: theme.spacing.md, padding: theme.spacing.lg }}>
      <View style={{ alignItems: 'flex-start', flexDirection: 'row', gap: theme.spacing.md }}>
        <View style={{ alignItems: 'center', backgroundColor: toneBackground, borderRadius: theme.radius.pill, height: 40, justifyContent: 'center', width: 40 }}><Ionicons color={toneColor} name={icon} size={21} /></View>
        <View style={{ flex: 1, gap: theme.spacing.xs }}>
          <View style={{ alignItems: 'center', flexDirection: 'row', gap: theme.spacing.sm, justifyContent: 'space-between' }}>
            <Text style={{ color: theme.colors.textPrimary, flex: 1, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>{notification.title}</Text>
            {isUnread ? <View accessibilityLabel="Unread" accessibilityRole="text" style={{ backgroundColor: theme.colors.accent, borderRadius: theme.radius.pill, height: 8, width: 8 }} /> : null}
          </View>
          <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>{notification.message}</Text>
          <Text style={{ color: theme.colors.textMuted, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize }}>{formatNotificationDate(notification.createdAt)}</Text>
        </View>
      </View>
      {hasTicketAction ? <Pressable accessibilityHint="Marks this notification read and opens the related local ticket" accessibilityLabel={`Open ${notification.ticketReference ?? 'ticket'}`} accessibilityRole="button" onPress={onOpen} style={({ pressed }) => ({ alignItems: 'center', alignSelf: 'flex-start', justifyContent: 'center', minHeight: 44, opacity: pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.sm })}><Text style={{ color: theme.colors.primary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Open ticket</Text></Pressable> : null}
      {!hasTicketAction && notification.kind === notificationKinds.serviceNotice ? <Pressable accessibilityLabel={notification.acknowledgedAt ? 'Service notice acknowledged' : 'Acknowledge service notice'} accessibilityRole="button" accessibilityState={{ disabled: Boolean(notification.acknowledgedAt) }} disabled={Boolean(notification.acknowledgedAt)} onPress={onAcknowledge} style={({ pressed }) => ({ alignItems: 'center', alignSelf: 'flex-start', backgroundColor: notification.acknowledgedAt ? theme.colors.disabled : theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, justifyContent: 'center', minHeight: 44, opacity: notification.acknowledgedAt ? theme.opacity.disabled : pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.md })}><Text style={{ color: notification.acknowledgedAt ? theme.colors.textMuted : theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>{notification.acknowledgedAt ? 'Acknowledged' : 'Acknowledge'}</Text></Pressable> : null}
    </View>
  );
}