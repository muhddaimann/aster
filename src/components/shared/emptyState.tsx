import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

type EmptyStateProps = {
  actionLabel?: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  onAction?: () => void;
  title: string;
};

export function EmptyState({ actionLabel, description, icon, onAction, title }: EmptyStateProps) {
  const { theme } = useTheme();

  return (
    <View style={{ alignItems: 'center', backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, gap: theme.spacing.md, padding: theme.spacing.xl }}>
      <View style={{ alignItems: 'center', backgroundColor: theme.colors.infoSoft, borderRadius: theme.radius.pill, height: 56, justifyContent: 'center', width: 56 }}><Ionicons color={theme.colors.info} name={icon} size={26} /></View>
      <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>{title}</Text>
      <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight, textAlign: 'center' }}>{description}</Text>
      {actionLabel && onAction ? <Pressable accessibilityRole="button" onPress={onAction} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, justifyContent: 'center', minHeight: 44, opacity: pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.lg })}><Text style={{ color: theme.colors.onPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>{actionLabel}</Text></Pressable> : null}
    </View>
  );
}