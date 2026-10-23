import { ActivityIndicator, Text, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export function ChatTypingIndicator({ label = 'Demo assistant is typing' }: { label?: string }) {
  const { theme } = useTheme();

  return (
    <View accessibilityLabel={label} accessibilityRole="progressbar" style={{ alignItems: 'center', alignSelf: 'flex-start', backgroundColor: theme.colors.surfaceRaised, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, flexDirection: 'row', gap: theme.spacing.sm, paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.sm }}>
      <ActivityIndicator color={theme.colors.accent} size="small" />
      <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize }}>{label}</Text>
    </View>
  );
}
