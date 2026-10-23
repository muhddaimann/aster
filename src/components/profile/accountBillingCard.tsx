import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';
import { demoBillingSummary, formatBillingAmount, formatBillingDate } from '../../constants/billing';
import { useTheme } from '../../hooks/useTheme';

export function AccountBillingCard({ summary = demoBillingSummary }: { summary?: typeof demoBillingSummary }) {
  const { theme } = useTheme();
  const hasAmountDue = summary.amountDue > 0;

  return (
    <View accessibilityLabel={`Demo bill summary. Total due ${formatBillingAmount(summary.amountDue, summary.currency)}, ${hasAmountDue ? `payment due ${formatBillingDate(summary.dueDate)}` : 'no payment due'}`} accessibilityRole="text" style={{ borderRadius: theme.radius.lg, overflow: 'hidden' }}>
      <LinearGradient colors={[theme.colors.primary, theme.colors.accent]} end={{ x: 1, y: 1 }} start={{ x: 0, y: 0 }} style={{ gap: theme.spacing.lg, padding: theme.spacing.lg }}>
        <View style={{ alignItems: 'center', flexDirection: 'row', gap: theme.spacing.sm }}>
          <Ionicons color={theme.colors.onPrimary} name="receipt-outline" size={22} />
          <Text style={{ color: theme.colors.onPrimary, flex: 1, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>BILL SUMMARY</Text>
          <View style={{ backgroundColor: theme.colors.onPrimary, borderRadius: theme.radius.pill, paddingHorizontal: theme.spacing.sm, paddingVertical: theme.spacing.xs }}>
            <Text style={{ color: theme.colors.primary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.eyebrow.fontSize }}>DEMO</Text>
          </View>
        </View>
        <View style={{ gap: theme.spacing.xs }}>
          <Text style={{ color: theme.colors.onPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Total due</Text>
          <Text style={{ color: theme.colors.onPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.title.fontSize, lineHeight: theme.typography.title.lineHeight }}>{formatBillingAmount(summary.amountDue, summary.currency)}</Text>
        </View>
        <View style={{ backgroundColor: theme.colors.onPrimary, height: 1, opacity: theme.opacity.muted }} />
        <View style={{ alignItems: 'center', flexDirection: 'row', gap: theme.spacing.sm }}>
          <Ionicons color={theme.colors.onPrimary} name="calendar-outline" size={19} />
          <Text style={{ color: theme.colors.onPrimary, flex: 1, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize }}>Payment due</Text>
          <Text style={{ color: theme.colors.onPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>{hasAmountDue ? formatBillingDate(summary.dueDate) : 'No payment due'}</Text>
        </View>
      </LinearGradient>
    </View>
  );
}
