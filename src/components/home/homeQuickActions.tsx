import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

type HomeQuickActionsProps = {
  onChat: () => void;
  onManageTickets: () => void;
};

export function HomeQuickActions({ onChat, onManageTickets }: HomeQuickActionsProps) {
  const { theme } = useTheme();

  return (
    <View style={{ gap: theme.spacing.md }}>
      <Text style={{ color: theme.colors.textMuted, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.eyebrow.fontSize, letterSpacing: theme.typography.eyebrow.letterSpacing }}>QUICK ACTIONS</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.md }}>
        <QuickAction icon="chatbubble-ellipses-outline" label="Continue chat" onPress={onChat} theme={theme} />
        <QuickAction icon="ticket-outline" label="Manage ticket" onPress={onManageTickets} theme={theme} />
      </View>
    </View>
  );
}

function QuickAction({ icon, label, onPress, theme }: { icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void; theme: ReturnType<typeof useTheme>['theme'] }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: theme.colors.surfaceRaised, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, flex: 1, flexDirection: 'row', gap: theme.spacing.sm, justifyContent: 'center', minHeight: 56, minWidth: 140, opacity: pressed ? theme.opacity.pressed : 1, padding: theme.spacing.md })}>
      <Ionicons color={theme.colors.primary} name={icon} size={21} />
      <Text style={{ color: theme.colors.textPrimary, flexShrink: 1, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>{label}</Text>
    </Pressable>
  );
}
