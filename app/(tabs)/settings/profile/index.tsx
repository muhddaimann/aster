import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Pressable, Text, TextInput, View } from 'react-native';
import { ProfileDetail } from '../../../../src/components/profile/profileDetail';
import { AccountBillingCard } from '../../../../src/components/profile/accountBillingCard';
import { AppScreen } from '../../../../src/components/shared/appScreen';
import { preferredContactChannels, profileLabels, supportLanguages, type EditableCustomerProfile, type ProfileValidationErrors } from '../../../../src/constants/profile';
import { useOverlay } from '../../../../src/hooks/useOverlay';
import { useProfile } from '../../../../src/hooks/useProfile';
import { useTheme } from '../../../../src/hooks/useTheme';

export default function ProfileScreen() {
  const { profile, updateProfile } = useProfile();
  const { theme } = useTheme();
  const overlay = useOverlay();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<EditableCustomerProfile>({ email: profile.email, fullName: profile.fullName, language: profile.language, nickname: profile.nickname, preferredContactChannel: profile.preferredContactChannel });
  const [errors, setErrors] = useState<ProfileValidationErrors>({});

  const beginEditing = () => {
    setDraft({ email: profile.email, fullName: profile.fullName, language: profile.language, nickname: profile.nickname, preferredContactChannel: profile.preferredContactChannel });
    setErrors({});
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraft({ email: profile.email, fullName: profile.fullName, language: profile.language, nickname: profile.nickname, preferredContactChannel: profile.preferredContactChannel });
    setErrors({});
    setIsEditing(false);
  };

  const saveProfile = () => {
    const result = updateProfile(draft);
    setErrors(result.errors);
    if (!result.success) {
      overlay.toast({ message: 'Review the highlighted profile details before saving.', tone: 'warning' });
      return;
    }

    setIsEditing(false);
    overlay.toast({ message: 'Your local demo profile was updated for this session.', tone: 'success' });
  };

  const fieldLabelStyle = { color: theme.colors.textSecondary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize };
  const cardStyle = { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, gap: theme.spacing.md, padding: theme.spacing.lg };

  return (
    <AppScreen onBack={() => router.replace('/settings')} routeKind="nested" subtitle="CUSTOMER ACCOUNT" title="Profile">
      <View accessibilityRole="text" style={{ backgroundColor: theme.colors.infoSoft, borderColor: theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, flexDirection: 'row', gap: theme.spacing.md, padding: theme.spacing.md }}>
        <Ionicons color={theme.colors.info} name="information-circle-outline" size={22} />
        <Text style={{ color: theme.colors.textSecondary, flex: 1, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>This is local demo profile data. Changes are available only during this app session and are not sent to CelcomDigi.</Text>
      </View>

      {!isEditing ? (
        <>
          <View style={{ alignItems: 'center', ...cardStyle }}>
            <View style={{ alignItems: 'center', backgroundColor: theme.colors.infoSoft, borderRadius: theme.radius.pill, height: 72, justifyContent: 'center', width: 72 }}><Ionicons color={theme.colors.primary} name="person-outline" size={36} /></View>
            <View style={{ alignItems: 'center', gap: theme.spacing.xs }}><Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>{profile.fullName}</Text><Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize }}>{profileLabels.accountType}</Text></View>
          </View>
          <AccountBillingCard />
          <View style={cardStyle}>
            <ProfileDetail icon="person-outline" label="Nickname" value={profile.nickname || 'Not set'} />
            <ProfileDetail icon="person-circle-outline" label="Full name" value={profile.fullName} />
            <ProfileDetail icon="call-outline" label="Mobile number" value={profile.mobileNumberDisplay} />
            <ProfileDetail icon="mail-outline" label="Email" value={profile.email} />
            <ProfileDetail icon="language-outline" label="Language" value={profileLabels.language[profile.language]} />
            <ProfileDetail icon="chatbubble-ellipses-outline" label="Preferred contact" value={profileLabels.contactChannel[profile.preferredContactChannel]} />
          </View>
          <Pressable accessibilityHint="Updates local demo customer details" accessibilityLabel="Edit profile" accessibilityRole="button" onPress={beginEditing} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, justifyContent: 'center', minHeight: 48, opacity: pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.lg })}><Text style={{ color: theme.colors.onPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Edit profile</Text></Pressable>
        </>
      ) : (
        <View style={cardStyle}>
          <ProfileTextField error={errors.nickname} label="Nickname (optional)" maxLength={30} onChangeText={(nickname) => setDraft((currentDraft) => ({ ...currentDraft, nickname }))} theme={theme} value={draft.nickname} />
          <ProfileTextField error={errors.fullName} label="Full name" onChangeText={(fullName) => setDraft((currentDraft) => ({ ...currentDraft, fullName }))} theme={theme} value={draft.fullName} />
          <ProfileTextField autoComplete="email" error={errors.email} keyboardType="email-address" label="Email" onChangeText={(email) => setDraft((currentDraft) => ({ ...currentDraft, email }))} theme={theme} value={draft.email} />
          <View style={{ gap: theme.spacing.sm }}><Text style={fieldLabelStyle}>Language</Text><PreferenceButtons onSelect={(language) => setDraft((currentDraft) => ({ ...currentDraft, language }))} options={[{ label: profileLabels.language[supportLanguages.english], value: supportLanguages.english }, { label: profileLabels.language[supportLanguages.bahasaMalaysia], value: supportLanguages.bahasaMalaysia }]} selectedValue={draft.language} theme={theme} /></View>
          <View style={{ gap: theme.spacing.sm }}><Text style={fieldLabelStyle}>Preferred contact</Text><PreferenceButtons onSelect={(preferredContactChannel) => setDraft((currentDraft) => ({ ...currentDraft, preferredContactChannel }))} options={[{ label: profileLabels.contactChannel[preferredContactChannels.phone], value: preferredContactChannels.phone }, { label: profileLabels.contactChannel[preferredContactChannels.email], value: preferredContactChannels.email }]} selectedValue={draft.preferredContactChannel} theme={theme} /></View>
          <View style={{ flexDirection: 'row', gap: theme.spacing.md }}><Pressable accessibilityRole="button" onPress={cancelEditing} style={({ pressed }) => ({ alignItems: 'center', borderColor: theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, flex: 1, justifyContent: 'center', minHeight: 48, opacity: pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.md })}><Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Cancel</Text></Pressable><Pressable accessibilityRole="button" onPress={saveProfile} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, flex: 1, justifyContent: 'center', minHeight: 48, opacity: pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.md })}><Text style={{ color: theme.colors.onPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Save changes</Text></Pressable></View>
        </View>
      )}
    </AppScreen>
  );
}

function ProfileTextField({ autoComplete, error, keyboardType, label, maxLength, onChangeText, theme, value }: { autoComplete?: 'email'; error?: string; keyboardType?: 'default' | 'email-address'; label: string; maxLength?: number; onChangeText: (value: string) => void; theme: ReturnType<typeof useTheme>['theme']; value: string }) {
  return <View style={{ gap: theme.spacing.sm }}><Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>{label}</Text><TextInput accessibilityLabel={label} autoCapitalize={label === 'Email' ? 'none' : 'words'} autoComplete={autoComplete} keyboardType={keyboardType} maxLength={maxLength} onChangeText={onChangeText} placeholderTextColor={theme.colors.textMuted} style={{ backgroundColor: theme.colors.background, borderColor: error ? theme.colors.danger : theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, color: theme.colors.textPrimary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.body.fontSize, minHeight: 48, paddingHorizontal: theme.spacing.md }} value={value} />{error ? <Text style={{ color: theme.colors.danger, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize }}>{error}</Text> : null}</View>;
}

function PreferenceButtons<T extends string>({ onSelect, options, selectedValue, theme }: { onSelect: (value: T) => void; options: { label: string; value: T }[]; selectedValue: T; theme: ReturnType<typeof useTheme>['theme'] }) {
  return <View style={{ gap: theme.spacing.sm }}>{options.map((option) => { const selected = option.value === selectedValue; return <Pressable key={option.value} accessibilityRole="radio" accessibilityState={{ selected }} onPress={() => onSelect(option.value)} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: selected ? theme.colors.infoSoft : theme.colors.surfaceRaised, borderColor: selected ? theme.colors.focusRing : theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, flexDirection: 'row', gap: theme.spacing.md, justifyContent: 'space-between', minHeight: 48, opacity: pressed ? theme.opacity.pressed : 1, padding: theme.spacing.md })}><Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>{option.label}</Text><Ionicons color={selected ? theme.colors.info : theme.colors.textMuted} name={selected ? 'radio-button-on' : 'radio-button-off'} size={22} /></Pressable>; })}</View>;
}
