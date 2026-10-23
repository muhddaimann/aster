import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { demoBillingSummary, formatBillingAmount, formatBillingDate } from '../../constants/billing';
import { useTheme } from '../../hooks/useTheme';

export function AccountBillingCard({ featured = false, summary = demoBillingSummary }: { featured?: boolean; summary?: typeof demoBillingSummary }) {
  const { theme } = useTheme();
  const foreground = featured ? theme.colors.onPrimary : theme.colors.textPrimary;
  const secondary = featured ? theme.colors.onPrimary : theme.colors.textSecondary;
  const hasAmountDue = summary.amountDue > 0;

  return (
    <View accessibilityLabel={`Demo total due ${formatBillingAmount(summary.amountDue, summary.currency)}, ${hasAmountDue ? `payment due ${formatBillingDate(summary.dueDate)}` : 'no payment due'}`} accessibilityRole="text" style={{ backgroundColor: featured ? theme.colors.primary : theme.colors.surface, borderColor: featured ? theme.colors.primary : theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, gap: theme.spacing.lg, padding: theme.spacing.lg }}>
      <View style={{ alignItems: 'center', flexDirection: 'row', gap: theme.spacing.sm }}>
        <Ionicons color={featured ? theme.colors.onPrimary : theme.colors.info} name="receipt-outline" size={22} />
        <Text style={{ color: secondary, flex: 1, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>DEMO BILLING SUMMARY</Text>
        <Text style={{ color: secondary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.eyebrow.fontSize }}>{summary.statementPeriod}</Text>
      </View>
      <View style={{ gap: theme.spacing.xs }}>
        <Text style={{ color: secondary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Total due</Text>
        <Text style={{ color: foreground, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.title.fontSize, lineHeight: theme.typography.title.lineHeight }}>{formatBillingAmount(summary.amountDue, summary.currency)}</Text>
      </View>
      <View style={{ alignItems: 'center', borderTopColor: featured ? theme.colors.onPrimary : theme.colors.border, borderTopWidth: 1, flexDirection: 'row', gap: theme.spacing.sm, paddingTop: theme.spacing.md }}>
        <Ionicons color={secondary} name="calendar-outline" size={19} />
        <Text style={{ color: secondary, flex: 1, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize }}>Payment due</Text>
        <Text style={{ color: foreground, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>{hasAmountDue ? formatBillingDate(summary.dueDate) : 'No payment due'}</Text>
      </View>
      <Text style={{ color: secondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.eyebrow.fontSize, lineHeight: theme.typography.label.lineHeight }}>Sample data only. This is not a real bill and no payment can be made here.</Text>
    </View>
  );
}
