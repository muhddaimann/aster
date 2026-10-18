import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { AppScreen } from '../../../src/components/shared/appScreen';
import { LongList } from '../../../src/components/shared/longList';
import { OptionPicker } from '../../../src/components/shared/optionPicker';
import { BottomBar } from '../../../src/components/tabs/bottomBar';
import { ThemeToggle } from '../../../src/components/theme/themeToggle';
import { useOverlay } from '../../../src/hooks/useOverlay';
import { useAuth } from '../../../src/hooks/useAuth';
import { useTheme } from '../../../src/hooks/useTheme';

export default function SettingsScreen() {
  const { mode, theme } = useTheme();
  const overlay = useOverlay();
  const { logout } = useAuth();
  const router = useRouter();
  const [preference, setPreference] = useState('balanced');

  const openPreferencePicker = () => {
    overlay.bottomSheet({
      content: <OptionPicker mode="preference" onSelect={(value) => { setPreference(value); overlay.dismiss(); }} options={[{ description: 'Receive the standard support update cadence.', label: 'Balanced updates', value: 'balanced' }, { description: 'Receive only major support status changes.', label: 'Essential updates', value: 'essential' }, { description: 'Receive all available support activity updates.', label: 'Detailed updates', value: 'detailed' }]} selectedValue={preference} title="Support update preference" />,
    });
  };

  const confirmLogout = () => {
    overlay.destructiveConfirm({
      cancelLabel: 'Stay signed in',
      confirmLabel: 'Log out',
      message: 'This removes the local demo session from this device.',
      onConfirm: async () => {
        const deleted = await logout();
        if (!deleted) {
          overlay.toast({ message: 'Aster could not remove the stored session completely.', tone: 'warning' });
        }
        router.replace('/');
      },
      title: 'Log out of Aster?',
    });
  };

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <AppScreen routeKind="root" subtitle="PREFERENCES" title="Settings">
        <View style={{ alignItems: 'center', backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, flexDirection: 'row', gap: theme.spacing.lg, justifyContent: 'space-between', padding: theme.spacing.lg }}>
          <View style={{ flex: 1, gap: theme.spacing.xs }}>
            <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>Appearance</Text>
            <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize }}>Current session mode: {mode}</Text>
          </View>
          <ThemeToggle />
        </View>
        <Pressable accessibilityHint="Choose the support update preference for this session" accessibilityLabel="Choose support update preference" accessibilityRole="button" onPress={openPreferencePicker} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, flexDirection: 'row', gap: theme.spacing.md, justifyContent: 'space-between', minHeight: 72, opacity: pressed ? theme.opacity.pressed : 1, padding: theme.spacing.lg })}><View style={{ flex: 1, gap: theme.spacing.xs }}><Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>Support update preference</Text><Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize }}>Session only: {preference}</Text></View><Ionicons color={theme.colors.textMuted} name="chevron-forward" size={22} /></Pressable>
        <LongList count={14} title="Settings reference content" />
        <Pressable accessibilityRole="button" onPress={() => router.push('/settings/demo')} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, justifyContent: 'center', minHeight: 48, opacity: pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.lg })}><Text style={{ color: theme.colors.onPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Open Settings demo</Text></Pressable>
        <Pressable accessibilityHint="Removes the local demo session and returns to login" accessibilityLabel="Log out" accessibilityRole="button" onPress={confirmLogout} style={({ pressed }) => ({ alignItems: 'center', borderColor: theme.colors.danger, borderRadius: theme.radius.md, borderWidth: 1, justifyContent: 'center', minHeight: 48, opacity: pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.lg })}><Text style={{ color: theme.colors.danger, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Log out</Text></Pressable>
      </AppScreen>
      <BottomBar activeTab="settings" onTabPress={(tab) => { if (tab !== 'settings') router.replace('/home'); }} />
    </View>
  );
}