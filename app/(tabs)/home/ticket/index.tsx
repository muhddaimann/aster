import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Pressable, Text, TextInput, View } from 'react-native';
import { TicketCategoryPicker } from '../../../../src/components/ticket/ticketCategoryPicker';
import { AppScreen } from '../../../../src/components/shared/appScreen';
import { initialTicketDraft, type TicketDraft, type TicketValidationErrors } from '../../../../src/constants/ticket';
import { profileLabels } from '../../../../src/constants/profile';
import { useOverlay } from '../../../../src/hooks/useOverlay';
import { useProfile } from '../../../../src/hooks/useProfile';
import { useTheme } from '../../../../src/hooks/useTheme';
import { useTicket } from '../../../../src/hooks/useTicket';

export default function CreateTicketScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const overlay = useOverlay();
  const { profile } = useProfile();
  const { createTicket } = useTicket();
  const [draft, setDraft] = useState<TicketDraft>(initialTicketDraft);
  const [errors, setErrors] = useState<TicketValidationErrors>({});
  const canSubmit = Boolean(draft.category && draft.description.trim());

  const submitTicket = () => {
    const result = createTicket(draft);
    setErrors(result.errors);

    if (!result.success || !result.ticket) {
      overlay.toast({ message: 'Review the highlighted ticket details before submitting.', tone: 'warning' });
      return;
    }

    overlay.toast({ message: `${result.ticket.reference} was created for this local demo session.`, tone: 'success' });
    router.replace(`/home/ticket/${result.ticket.id}`);
  };

  return (
    <AppScreen
      onBack={() => router.replace('/home')}
      rightSlot={(
        <Pressable
          accessibilityHint={canSubmit ? 'Creates your local demo ticket' : 'Choose an issue and describe it before submitting'}
          accessibilityLabel="Submit ticket"
          accessibilityRole="button"
          accessibilityState={{ disabled: !canSubmit }}
          disabled={!canSubmit}
          onPress={submitTicket}
          style={({ pressed }) => ({
            alignItems: 'center',
            backgroundColor: canSubmit ? theme.colors.primary : theme.colors.disabled,
            borderRadius: theme.radius.pill,
            height: 44,
            justifyContent: 'center',
            opacity: !canSubmit ? theme.opacity.disabled : pressed ? theme.opacity.pressed : 1,
            paddingHorizontal: theme.spacing.md,
          })}
        >
          <Text style={{ color: canSubmit ? theme.colors.onPrimary : theme.colors.textMuted, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Submit</Text>
        </Pressable>
      )}
      rightSlotReservedWidth={76}
      routeKind="nested"
      subtitle="LOCAL SUPPORT REQUEST"
      title="Tell us how we can help"
    >
      <View accessibilityRole="text" style={{ backgroundColor: theme.colors.warningSoft, borderColor: theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, flexDirection: 'row', gap: theme.spacing.md, padding: theme.spacing.md }}>
        <Ionicons color={theme.colors.warning} name="information-circle-outline" size={22} />
        <Text style={{ color: theme.colors.textSecondary, flex: 1, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>
          This is a local demo ticket only. Do not enter passwords, OTPs, payment-card details, or other sensitive information.
        </Text>
      </View>

      <View style={{ gap: theme.spacing.sm }}>
        <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>What do you need help with?</Text>
        <TicketCategoryPicker error={errors.category} onSelect={(category) => setDraft((current) => ({ ...current, category }))} selectedCategory={draft.category} />
      </View>

      <TicketTextField
        error={errors.description}
        label="Describe the issue"
        multiline
        onChangeText={(description) => setDraft((current) => ({ ...current, description }))}
        placeholder="Tell us what happened and when it started."
        theme={theme}
        value={draft.description}
      />

      <TicketTextField
        error={errors.remarks}
        label="Additional remarks (optional)"
        multiline
        onChangeText={(remarks) => setDraft((current) => ({ ...current, remarks }))}
        placeholder="Add anything else that may help explain the issue."
        theme={theme}
        value={draft.remarks}
      />

      <View style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, gap: theme.spacing.xs, padding: theme.spacing.lg }}>
        <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Preferred contact for this ticket</Text>
        <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>{profileLabels.contactChannel[profile.preferredContactChannel]}</Text>
        <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>
          Update this session-only preference from your Profile if needed.
        </Text>
        <Pressable accessibilityRole="button" onPress={() => router.push('/settings/profile')} style={({ pressed }) => ({ alignSelf: 'flex-start', justifyContent: 'center', minHeight: 44, opacity: pressed ? theme.opacity.pressed : 1 })}>
          <Text style={{ color: theme.colors.primary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Open Profile</Text>
        </Pressable>
      </View>
    </AppScreen>
  );
}

function TicketTextField({ error, label, multiline, onChangeText, placeholder, theme, value }: { error?: string; label: string; multiline?: boolean; onChangeText: (value: string) => void; placeholder: string; theme: ReturnType<typeof useTheme>['theme']; value: string }) {
  return (
    <View style={{ gap: theme.spacing.sm }}>
      <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        multiline={multiline}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        style={{ backgroundColor: theme.colors.surface, borderColor: error ? theme.colors.danger : theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, color: theme.colors.textPrimary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.body.fontSize, lineHeight: theme.typography.body.lineHeight, minHeight: multiline ? 120 : 48, padding: theme.spacing.md, textAlignVertical: multiline ? 'top' : 'center' }}
        value={value}
      />
      {error ? <Text style={{ color: theme.colors.danger, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize }}>{error}</Text> : null}
    </View>
  );
}