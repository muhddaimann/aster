import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { ThemeToggle } from '../src/components/theme/themeToggle';
import { appAbout } from '../src/constants/about';
import { authConstants, authCopy, isSupportedDemoCelcomDigiNumber, normalizeMalaysianPhoneNumber } from '../src/constants/auth';
import { useAuth } from '../src/hooks/useAuth';
import { useOverlay } from '../src/hooks/useOverlay';
import { useTheme } from '../src/hooks/useTheme';

export default function LandingScreen() {
  const { completeCelcomDigiDemoOtp, status } = useAuth();
  const { toast } = useOverlay();
  const { theme } = useTheme();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authStep, setAuthStep] = useState<'phoneEntry' | 'otpDemoConfirmation'>('phoneEntry');

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/home');
    }
  }, [router, status]);

  const showStorageFailure = () => toast({ message: 'Aster could not create a local demo session. Please try again.', tone: 'danger' });

  const continueWithCelcomDigiNumber = () => {
    if (!isSupportedDemoCelcomDigiNumber(phoneNumber)) {
      toast({ message: authCopy.unsupportedNumberMessage, tone: 'warning' });
      return;
    }

    setAuthStep('otpDemoConfirmation');
  };

  const proceedWithCelcomDigiDemo = async () => {
    setIsSubmitting(true);
    const created = await completeCelcomDigiDemoOtp();
    setIsSubmitting(false);
    if (!created) {
      showStorageFailure();
      return;
    }

    router.replace('/home');
  };

  const showRandomDemoUnavailable = () => toast({ message: 'Random demo numbers are not available in this build. Use the supported CelcomDigi demo number instead.', tone: 'info' });

  if (status === 'hydrating') {
    return <View accessibilityLabel="Restoring local session" accessibilityRole="progressbar" style={{ alignItems: 'center', backgroundColor: theme.colors.background, flex: 1, gap: theme.spacing.md, justifyContent: 'center', padding: theme.spacing.xl }}><ActivityIndicator color={theme.colors.accent} /><Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize }}>Preparing your support workspace…</Text></View>;
  }

  return (
    <KeyboardAvoidingView behavior={Platform.select({ android: undefined, ios: 'padding' })} style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, gap: theme.spacing.xxl, justifyContent: 'center', padding: theme.spacing.xl, paddingBottom: theme.spacing.xxl }} keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between' }}>
          <View accessible accessibilityLabel="Aster customer support" style={{ alignItems: 'center', backgroundColor: theme.colors.surfaceRaised, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, height: 64, justifyContent: 'center', width: 64 }}><Ionicons color={theme.colors.accent} name="shield-checkmark-outline" size={32} /></View>
          <ThemeToggle />
        </View>
        <View style={{ gap: theme.spacing.md }}>
          <Text style={{ color: theme.colors.accent, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.eyebrow.fontSize, letterSpacing: theme.typography.eyebrow.letterSpacing, lineHeight: theme.typography.eyebrow.lineHeight }}>CELCOMDIGI SUPPORT</Text>
          <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.title.fontSize, letterSpacing: theme.typography.title.letterSpacing, lineHeight: theme.typography.title.lineHeight }}>Welcome to {appAbout.name}</Text>
          <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.body.fontSize, lineHeight: theme.typography.body.lineHeight }}>Sign in to explore Aster’s customer-support workspace.</Text>
        </View>
        <View style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, gap: theme.spacing.lg, padding: theme.spacing.lg, ...theme.shadow.card }}>
          {authStep === 'phoneEntry' ? (
            <>
              <View style={{ gap: theme.spacing.xs }}>
                <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>Use your CelcomDigi number</Text>
                <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>Demo test number: {authConstants.demoCelcomDigiNumberDisplay}</Text>
              </View>
              <View style={{ gap: theme.spacing.sm }}>
                <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Mobile number</Text>
                <TextInput accessibilityHint="Enter the supported CelcomDigi demo number" accessibilityLabel="Mobile number" autoComplete="tel" keyboardType="phone-pad" onChangeText={(value) => setPhoneNumber(normalizeMalaysianPhoneNumber(value).slice(0, 12))} placeholder="011-0000-0000" placeholderTextColor={theme.colors.textMuted} style={{ backgroundColor: theme.colors.background, borderColor: theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, color: theme.colors.textPrimary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.body.fontSize, minHeight: 52, paddingHorizontal: theme.spacing.md }} textContentType="telephoneNumber" value={phoneNumber} />
              </View>
              <Pressable accessibilityHint="Checks the supported demo number and opens the non-production OTP confirmation" accessibilityLabel="Continue with CelcomDigi number" accessibilityRole="button" disabled={isSubmitting} onPress={continueWithCelcomDigiNumber} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, justifyContent: 'center', minHeight: 52, opacity: isSubmitting ? theme.opacity.disabled : pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.lg })}><Text style={{ color: theme.colors.onPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>Continue with CelcomDigi number</Text></Pressable>
              <Pressable accessibilityHint="Explains the random demo number availability" accessibilityLabel="Use a random demo number" accessibilityRole="button" onPress={showRandomDemoUnavailable} style={({ pressed }) => ({ alignItems: 'center', borderColor: theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, justifyContent: 'center', minHeight: 52, opacity: pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.lg })}><Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>Use a random demo number</Text></Pressable>
            </>
          ) : (
            <>
              <Pressable accessibilityHint="Returns to mobile number entry without authenticating" accessibilityLabel="Use a different number" accessibilityRole="button" disabled={isSubmitting} onPress={() => setAuthStep('phoneEntry')} style={({ pressed }) => ({ alignItems: 'center', alignSelf: 'flex-start', flexDirection: 'row', gap: theme.spacing.sm, minHeight: 48, opacity: isSubmitting ? theme.opacity.disabled : pressed ? theme.opacity.pressed : 1 })}><Ionicons color={theme.colors.primary} name="arrow-back" size={20} /><Text style={{ color: theme.colors.primary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Use a different number</Text></Pressable>
              <View style={{ gap: theme.spacing.sm }}>
                <Text style={{ color: theme.colors.accent, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.eyebrow.fontSize, letterSpacing: theme.typography.eyebrow.letterSpacing }}>DEMO OTP STEP</Text>
                <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.title.fontSize, lineHeight: theme.typography.title.lineHeight }}>Continue to Aster</Text>
                <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.body.fontSize, lineHeight: theme.typography.body.lineHeight }}>{authConstants.demoCelcomDigiNumberDisplay} is eligible for this local walkthrough.</Text>
              </View>
              <View accessibilityRole="text" style={{ backgroundColor: theme.colors.warningSoft, borderColor: theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, flexDirection: 'row', gap: theme.spacing.md, padding: theme.spacing.md }}><Ionicons color={theme.colors.warning} name="information-circle-outline" size={22} /><Text style={{ color: theme.colors.textSecondary, flex: 1, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>{authCopy.otpPendingMessage} No OTP was sent, received, entered, or verified.</Text></View>
              <Pressable accessibilityHint="Creates a one-day local demo session and opens Aster" accessibilityLabel="Proceed to Aster" accessibilityRole="button" disabled={isSubmitting} onPress={() => void proceedWithCelcomDigiDemo()} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, justifyContent: 'center', minHeight: 52, opacity: isSubmitting ? theme.opacity.disabled : pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.lg })}>{isSubmitting ? <ActivityIndicator color={theme.colors.onPrimary} /> : <Text style={{ color: theme.colors.onPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>Proceed to Aster</Text>}</Pressable>
            </>
          )}
        </View>
        <View accessibilityRole="text" style={{ backgroundColor: theme.colors.infoSoft, borderColor: theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, flexDirection: 'row', gap: theme.spacing.md, padding: theme.spacing.md }}><Ionicons color={theme.colors.info} name="information-circle-outline" size={22} /><Text style={{ color: theme.colors.textSecondary, flex: 1, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>{authCopy.nonProductionNotice}</Text></View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
