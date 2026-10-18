import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { useNotification } from '../../hooks/useNotification';
import { useTheme } from '../../hooks/useTheme';

type NotificationHeaderActionsProps = {
  onOpenActions: () => void;
  onOpenNotifications: () => void;
};

export function NotificationHeaderActions({ onOpenActions, onOpenNotifications }: NotificationHeaderActionsProps) {
  const { unreadCount } = useNotification();
  const { theme } = useTheme();
  const unreadLabel = unreadCount > 9 ? '9+' : String(unreadCount);

  return (
    <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
      <Pressable accessibilityHint="Opens local ticket and telco-support updates" accessibilityLabel={unreadCount ? `Notifications, ${unreadCount} unread` : 'Notifications'} accessibilityRole="button" onPress={onOpenNotifications} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.pill, borderWidth: 1, height: 48, justifyContent: 'center', opacity: pressed ? theme.opacity.pressed : 1, width: 48 })}>
        <Ionicons color={theme.colors.primary} name="notifications-outline" size={22} />
        {unreadCount ? <View pointerEvents="none" style={{ alignItems: 'center', backgroundColor: theme.colors.danger, borderColor: theme.colors.surface, borderRadius: theme.radius.pill, borderWidth: 2, justifyContent: 'center', minWidth: 18, paddingHorizontal: 3, position: 'absolute', right: -3, top: -3 }}><Text style={{ color: theme.colors.onDanger, fontFamily: theme.fontFamily.semibold, fontSize: 10, lineHeight: 14 }}>{unreadLabel}</Text></View> : null}
      </Pressable>
      <Pressable accessibilityHint="Opens Home shortcuts" accessibilityLabel="Open Home shortcuts" accessibilityRole="button" onPress={onOpenActions} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.pill, borderWidth: 1, height: 48, justifyContent: 'center', opacity: pressed ? theme.opacity.pressed : 1, width: 48 })}>
        <Ionicons color={theme.colors.primary} name="grid-outline" size={22} />
      </Pressable>
    </View>
  );
}