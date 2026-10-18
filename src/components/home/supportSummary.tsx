import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

type SupportSummaryProps = {
  onOpenRecords: () => void;
  openCount: number;
  resolvedCount: number;
};

export function SupportSummary({ onOpenRecords, openCount, resolvedCount }: SupportSummaryProps) {
  const { theme } = useTheme();

  return (
    <View style={{ gap: theme.spacing.md }}>
      <Text style={{ color: theme.colors.textMuted, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.eyebrow.fontSize, letterSpacing: theme.typography.eyebrow.letterSpacing, lineHeight: theme.typography.eyebrow.lineHeight }}>YOUR SUPPORT</Text>
      <Pressable accessibilityHint="Opens your local support ticket records" accessibilityLabel={`${openCount} open support tickets and ${resolvedCount} resolved support tickets. Open ticket records.`} accessibilityRole="button" onPress={onOpenRecords} style={({ pressed }) => ({ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, gap: theme.spacing.lg, opacity: pressed ? theme.opacity.pressed : 1, padding: theme.spacing.lg })}>
        <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
          <SummaryMetric color={theme.colors.info} icon="time-outline" label="Open cases" softColor={theme.colors.infoSoft} theme={theme} value={openCount} />
          <SummaryMetric color={theme.colors.success} icon="checkmark-circle-outline" label="Resolved" softColor={theme.colors.successSoft} theme={theme} value={resolvedCount} />
        </View>
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: theme.colors.primary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>View ticket records</Text>
          <Ionicons color={theme.colors.primary} name="arrow-forward" size={20} />
        </View>
      </Pressable>
    </View>
  );
}

function SummaryMetric({ color, icon, label, softColor, theme, value }: { color: string; icon: keyof typeof Ionicons.glyphMap; label: string; softColor: string; theme: ReturnType<typeof useTheme>['theme']; value: number }) {
  return <View style={{ flex: 1, gap: theme.spacing.sm }}><View style={{ alignItems: 'center', flexDirection: 'row', gap: theme.spacing.sm }}><View style={{ alignItems: 'center', backgroundColor: softColor, borderRadius: theme.radius.pill, height: 36, justifyContent: 'center', width: 36 }}><Ionicons color={color} name={icon} size={19} /></View><Text style={{ color: theme.colors.textSecondary, flex: 1, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>{label}</Text></View><Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.title.fontSize, lineHeight: theme.typography.title.lineHeight }}>{value}</Text></View>;
}