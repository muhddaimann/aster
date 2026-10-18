import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { ProfileCard } from '../../../src/components/profile/profileCard';
import { AppScreen } from '../../../src/components/shared/appScreen';
import { EmptyState } from '../../../src/components/shared/emptyState';
import { LongList } from '../../../src/components/shared/longList';
import { OptionPicker } from '../../../src/components/shared/optionPicker';
import { BottomBar } from '../../../src/components/tabs/bottomBar';
import { useOverlay } from '../../../src/hooks/useOverlay';
import { useAuth } from '../../../src/hooks/useAuth';
import { useTheme } from '../../../src/hooks/useTheme';

export default function HomeScreen() {
  const { theme } = useTheme();
  const overlay = useOverlay();
  const { logout } = useAuth();
  const router = useRouter();

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

  const openActionPicker = () => {
    overlay.customModal({
      content: <OptionPicker mode="action" onSelect={(value) => overlay.dismiss(() => {
        if (value === 'homeDemo') {
          router.replace('/home/demo');
          return;
        }
        if (value === 'profile') {
          router.replace('/settings/profile');
          return;
        }
        confirmLogout();
      })} options={[{ description: 'Open the full-screen Home placeholder.', label: 'Home Demo', value: 'homeDemo' }, { description: 'View and edit local demo customer details.', label: 'Profile', value: 'profile' }, { description: 'Remove the local demo session from this device.', label: 'Log out', value: 'logout' }]} title="Home actions" />,
    });
  };

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <AppScreen rightSlot={<Pressable accessibilityHint="Opens Home actions" accessibilityLabel="Open Home actions" accessibilityRole="button" onPress={openActionPicker} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.pill, borderWidth: 1, height: 48, justifyContent: 'center', opacity: pressed ? theme.opacity.pressed : 1, width: 48 })}><Ionicons color={theme.colors.primary} name="ellipsis-horizontal" size={22} /></Pressable>} routeKind="root" subtitle="ASTER SUPPORT" title="Home">
        <ProfileCard onPress={() => router.push('/settings/profile')} />
        <EmptyState actionLabel="Open Home demo" description="The nested demo route hides the tab pill and can reveal only the scroll-to-top action." icon="folder-open-outline" onAction={() => router.push('/home/demo')} title="No active cases yet" />
        <LongList />
      </AppScreen>
      <BottomBar activeTab="home" onTabPress={(tab) => { if (tab !== 'home') router.replace('/settings'); }} />
    </View>
  );
}