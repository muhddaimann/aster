import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { profileLabels } from '../../constants/profile';
import { useProfile } from '../../hooks/useProfile';
import { useTheme } from '../../hooks/useTheme';

type ProfileCardProps = {
  onPress: () => void;
};

export function ProfileCard({ onPress }: ProfileCardProps) {
  const { profile } = useProfile();
  const { theme } = useTheme();

  return (
    <Pressable accessibilityHint="Opens your customer profile details and edit options" accessibilityLabel={`Open profile for ${profile.fullName}`} accessibilityRole="button" onPress={onPress} style={({ pressed }) => ({ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, gap: theme.spacing.md, minHeight: 48, opacity: pressed ? theme.opacity.pressed : 1, padding: theme.spacing.lg })}>
      <View style={{ alignItems: 'center', flexDirection: 'row', gap: theme.spacing.md }}>
        <View style={{ alignItems: 'center', backgroundColor: theme.colors.infoSoft, borderRadius: theme.radius.pill, height: 52, justifyContent: 'center', width: 52 }}><Ionicons color={theme.colors.primary} name="person-outline" size={28} /></View>
        <View style={{ flex: 1, gap: theme.spacing.xs }}>
          <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Customer profile</Text>
          <Text numberOfLines={1} style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>{profile.fullName}</Text>
          <Text numberOfLines={1} style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize }}>{profileLabels.accountType}</Text>
        </View>
        <Ionicons color={theme.colors.primary} name="chevron-forward" size={22} />
      </View>
      <View style={{ backgroundColor: theme.colors.surfaceRaised, borderRadius: theme.radius.md, gap: theme.spacing.xs, padding: theme.spacing.md }}>
        <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>{profile.mobileNumberDisplay} · {profileLabels.contactChannel[profile.preferredContactChannel]}</Text>
        <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize }}>View and update your local demo profile.</Text>
      </View>
    </Pressable>
  );
}