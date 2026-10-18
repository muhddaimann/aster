import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { AppScreen } from '../../../src/components/shared/appScreen';
import { BottomBar } from '../../../src/components/tabs/bottomBar';
import { ThemeToggle } from '../../../src/components/theme/themeToggle';
import { appAbout } from '../../../src/constants/about';
import { useOverlay } from '../../../src/hooks/useOverlay';
import { useTheme } from '../../../src/hooks/useTheme';

export default function SettingsScreen() {
  const { mode, theme } = useTheme();
  const overlay = useOverlay();
  const router = useRouter();

  const openAboutModal = () => {
    overlay.customModal({
      content: <AboutAsterModal onDismiss={() => overlay.dismiss()} />,
    });
  };

  return (
    <>
      <AppScreen rightSlot={<Pressable accessibilityHint="Opens Aster app information" accessibilityLabel="About Aster" accessibilityRole="button" onPress={openAboutModal} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.pill, borderWidth: 1, height: 48, justifyContent: 'center', opacity: pressed ? theme.opacity.pressed : 1, width: 48 })}><Ionicons color={theme.colors.primary} name="information-circle-outline" size={24} /></Pressable>} rightSlotReservedWidth={48} routeKind="root" subtitle="PREFERENCES" title="Settings">
        <SettingsSectionLabel label="Account" />
        <SettingsNavigationRow description="View and update local demo customer details." icon="person-outline" label="Profile" onPress={() => router.push('/settings/profile')} theme={theme} />

        <SettingsSectionLabel label="Appearance" />
        <View style={{ alignItems: 'center', backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, flexDirection: 'row', gap: theme.spacing.lg, justifyContent: 'space-between', padding: theme.spacing.lg }}>
          <View style={{ flex: 1, gap: theme.spacing.xs }}>
            <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>Theme</Text>
            <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>Current session mode: {mode}</Text>
          </View>
          <ThemeToggle />
        </View>
      </AppScreen>
      <BottomBar activeTab="settings" onTabPress={(tab) => { if (tab !== 'settings') router.replace('/home'); }} />
    </>
  );
}

function SettingsSectionLabel({ label }: { label: string }) {
  const { theme } = useTheme();

  return <Text style={{ color: theme.colors.textMuted, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.eyebrow.fontSize, letterSpacing: theme.typography.eyebrow.letterSpacing, lineHeight: theme.typography.eyebrow.lineHeight }}>{label.toUpperCase()}</Text>;
}

function SettingsNavigationRow({ description, icon, label, onPress, theme }: { description: string; icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void; theme: ReturnType<typeof useTheme>['theme'] }) {
  return <Pressable accessibilityHint={description} accessibilityLabel={`Open ${label}`} accessibilityRole="button" onPress={onPress} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, flexDirection: 'row', gap: theme.spacing.md, minHeight: 72, opacity: pressed ? theme.opacity.pressed : 1, padding: theme.spacing.lg })}><View style={{ alignItems: 'center', backgroundColor: theme.colors.infoSoft, borderRadius: theme.radius.pill, height: 44, justifyContent: 'center', width: 44 }}><Ionicons color={theme.colors.info} name={icon} size={22} /></View><View style={{ flex: 1, gap: theme.spacing.xs }}><Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>{label}</Text><Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>{description}</Text></View><Ionicons color={theme.colors.textMuted} name="chevron-forward" size={22} /></Pressable>;
}

function AboutAsterModal({ onDismiss }: { onDismiss: () => void }) {
  const { theme } = useTheme();
  const latestChangelogEntry = appAbout.changelog[0];

  return (
    <View style={{ gap: theme.spacing.lg }}>
      <View style={{ alignItems: 'center', alignSelf: 'flex-start', backgroundColor: theme.colors.infoSoft, borderRadius: theme.radius.pill, height: 52, justifyContent: 'center', width: 52 }}><Ionicons color={theme.colors.info} name="information-circle-outline" size={28} /></View>
      <View style={{ gap: theme.spacing.sm }}>
        <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize, lineHeight: theme.typography.body.lineHeight }}>{appAbout.name}</Text>
        <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>{appAbout.about}</Text>
        <Text style={{ color: theme.colors.textMuted, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Version {appAbout.version}</Text>
      </View>
      <View style={{ backgroundColor: theme.colors.warningSoft, borderColor: theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, gap: theme.spacing.xs, padding: theme.spacing.md }}>
        <Text style={{ color: theme.colors.warning, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Local demo experience</Text>
        <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>Ticket, profile, and notification data remain in this app for the current session and are not sent to CelcomDigi.</Text>
      </View>
      <View style={{ gap: theme.spacing.sm }}>
        <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>What&apos;s new</Text>
        <View style={{ gap: theme.spacing.xs }}><Text style={{ color: theme.colors.primary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Version {latestChangelogEntry.version}</Text><Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>{latestChangelogEntry.summary}</Text></View>
      </View>
      <Pressable accessibilityHint="Closes the About Aster dialog" accessibilityLabel="Done" accessibilityRole="button" onPress={onDismiss} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, justifyContent: 'center', minHeight: 44, opacity: pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.lg })}><Text style={{ color: theme.colors.onPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Done</Text></Pressable>
    </View>
  );
}