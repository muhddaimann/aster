import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import type { AppNotification } from '../../constants/notification';
import { useTheme } from '../../hooks/useTheme';

type ServiceNoticeCardProps = {
  notice: AppNotification;
  onPress: () => void;
};

export function ServiceNoticeCard({ notice, onPress }: ServiceNoticeCardProps) {
  const { theme } = useTheme();

  return (
    <View style={{ gap: theme.spacing.md }}>
      <Text style={{ color: theme.colors.textMuted, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.eyebrow.fontSize, letterSpacing: theme.typography.eyebrow.letterSpacing, lineHeight: theme.typography.eyebrow.lineHeight }}>SERVICE NOTICE</Text>
      <Pressable accessibilityHint="Opens local support updates" accessibilityLabel={`${notice.title}. Open updates.`} accessibilityRole="button" onPress={onPress} style={({ pressed }) => ({ backgroundColor: theme.colors.warningSoft, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, gap: theme.spacing.md, opacity: pressed ? theme.opacity.pressed : 1, padding: theme.spacing.lg })}>
        <View style={{ alignItems: 'flex-start', flexDirection: 'row', gap: theme.spacing.md }}>
          <View style={{ alignItems: 'center', backgroundColor: theme.colors.surface, borderRadius: theme.radius.pill, height: 40, justifyContent: 'center', width: 40 }}><Ionicons color={theme.colors.warning} name="alert-circle-outline" size={21} /></View>
          <View style={{ flex: 1, gap: theme.spacing.xs }}>
            <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>{notice.title}</Text>
            <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>{notice.message}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', flexDirection: 'row', gap: theme.spacing.sm }}><Text style={{ color: theme.colors.warning, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>View updates</Text><Ionicons color={theme.colors.warning} name="arrow-forward" size={18} /></View>
      </Pressable>
    </View>
  );
}