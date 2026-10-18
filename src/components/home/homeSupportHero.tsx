import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import type { CustomerProfile } from '../../constants/profile';
import { useTheme } from '../../hooks/useTheme';

type HomeSupportHeroProps = {
  onCreateTicket: () => void;
  profile: CustomerProfile;
};

export function HomeSupportHero({ onCreateTicket, profile }: HomeSupportHeroProps) {
  const { theme } = useTheme();
  const firstName = profile.fullName.trim().split(/\s+/)[0] || 'there';

  return (
    <View style={{ backgroundColor: theme.colors.primary, borderRadius: theme.radius.lg, gap: theme.spacing.lg, overflow: 'hidden', padding: theme.spacing.xl }}>
      <View pointerEvents="none" style={{ backgroundColor: theme.colors.accent, borderRadius: theme.radius.pill, height: 132, opacity: theme.opacity.muted, position: 'absolute', right: -42, top: -58, width: 132 }} />
      <View style={{ gap: theme.spacing.sm }}>
        <Text style={{ color: theme.colors.onPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Good day, {firstName}</Text>
        <Text style={{ color: theme.colors.onPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.title.fontSize, lineHeight: theme.typography.title.lineHeight }}>How can we support you today?</Text>
        <Text style={{ color: theme.colors.onPrimary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>Tell us about an issue with your mobile service, data, billing, account, calls, or SMS.</Text>
      </View>
      <Pressable accessibilityHint="Opens the local demo support ticket form" accessibilityLabel="Create a support ticket" accessibilityRole="button" onPress={onCreateTicket} style={({ pressed }) => ({ alignItems: 'center', alignSelf: 'flex-start', backgroundColor: theme.colors.onPrimary, borderRadius: theme.radius.md, flexDirection: 'row', gap: theme.spacing.sm, justifyContent: 'center', minHeight: 48, opacity: pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.lg })}>
        <Ionicons color={theme.colors.primary} name="add-circle-outline" size={20} />
        <Text style={{ color: theme.colors.primary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Create a support ticket</Text>
      </Pressable>
      <View accessibilityRole="text" style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
        <Ionicons color={theme.colors.onPrimary} name="shield-checkmark-outline" size={18} />
        <Text style={{ color: theme.colors.onPrimary, flex: 1, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>Local demo only. Do not include passwords, OTPs, payment-card details, or other sensitive information.</Text>
      </View>
    </View>
  );
}