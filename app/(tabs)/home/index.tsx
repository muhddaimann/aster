import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { ProfileCard } from '../../../src/components/profile/profileCard';
import { TicketCard } from '../../../src/components/ticket/ticketCard';
import { TicketEmptyState } from '../../../src/components/ticket/ticketEmptyState';
import { AppScreen } from '../../../src/components/shared/appScreen';
import { OptionPicker } from '../../../src/components/shared/optionPicker';
import { BottomBar } from '../../../src/components/tabs/bottomBar';
import { useOverlay } from '../../../src/hooks/useOverlay';
import { useAuth } from '../../../src/hooks/useAuth';
import { useTheme } from '../../../src/hooks/useTheme';
import { useTicket } from '../../../src/hooks/useTicket';

export default function HomeScreen() {
  const { theme } = useTheme();
  const overlay = useOverlay();
  const { logout } = useAuth();
  const router = useRouter();
  const { tickets } = useTicket();

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
        if (value === 'createTicket') {
          router.replace('/home/ticket');
          return;
        }
        if (value === 'ticketRecords') {
          router.replace('/home/ticket/record');
          return;
        }
        if (value === 'profile') {
          router.replace('/settings/profile');
          return;
        }
        confirmLogout();
      })} options={[{ description: 'Tell us about a local demo CelcomDigi support need.', label: 'Create ticket', value: 'createTicket' }, { description: 'View support tickets created in this local app session.', label: 'Ticket records', value: 'ticketRecords' }, { description: 'View and edit local demo customer details.', label: 'Profile', value: 'profile' }, { description: 'Remove the local demo session from this device.', label: 'Log out', value: 'logout' }]} title="Home actions" />,
    });
  };

  return (
    <>
      <AppScreen rightSlot={<Pressable accessibilityHint="Opens Home actions" accessibilityLabel="Open Home actions" accessibilityRole="button" onPress={openActionPicker} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.pill, borderWidth: 1, height: 48, justifyContent: 'center', opacity: pressed ? theme.opacity.pressed : 1, width: 48 })}><Ionicons color={theme.colors.primary} name="ellipsis-horizontal" size={22} /></Pressable>} routeKind="root" subtitle="ASTER SUPPORT" title="Home">
        <ProfileCard onPress={() => router.push('/settings/profile')} />
        {tickets.length === 0 ? <TicketEmptyState actionLabel="Create a ticket" onAction={() => router.push('/home/ticket')} /> : <View style={{ gap: theme.spacing.md }}><View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}><Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>Recent support tickets</Text><Pressable accessibilityRole="button" onPress={() => router.push('/home/ticket/record')} style={({ pressed }) => ({ minHeight: 44, justifyContent: 'center', opacity: pressed ? theme.opacity.pressed : 1 })}><Text style={{ color: theme.colors.primary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>View all</Text></Pressable></View><TicketCard onPress={() => router.push(`/home/ticket/${tickets[0].id}`)} ticket={tickets[0]} /><Pressable accessibilityRole="button" onPress={() => router.push('/home/ticket')} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, justifyContent: 'center', minHeight: 48, opacity: pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.lg })}><Text style={{ color: theme.colors.onPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Tell us what you need help with</Text></Pressable></View>}
      </AppScreen>
      <BottomBar activeTab="home" onTabPress={(tab) => { if (tab !== 'home') router.replace('/settings'); }} />
    </>
  );
}