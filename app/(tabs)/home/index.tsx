import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { HomeSupportHero } from '../../../src/components/home/homeSupportHero';
import { ServiceNoticeCard } from '../../../src/components/home/serviceNoticeCard';
import { SupportSummary } from '../../../src/components/home/supportSummary';
import { SupportTopicGrid } from '../../../src/components/home/supportTopicGrid';
import { NotificationHeaderActions } from '../../../src/components/notification/notificationHeaderActions';
import { AppScreen } from '../../../src/components/shared/appScreen';
import { OptionPicker } from '../../../src/components/shared/optionPicker';
import { TicketCard } from '../../../src/components/ticket/ticketCard';
import { BottomBar } from '../../../src/components/tabs/bottomBar';
import { notificationKinds } from '../../../src/constants/notification';
import { ticketStatuses, type TicketCategory } from '../../../src/constants/ticket';
import { useAuth } from '../../../src/hooks/useAuth';
import { useNotification } from '../../../src/hooks/useNotification';
import { useOverlay } from '../../../src/hooks/useOverlay';
import { useProfile } from '../../../src/hooks/useProfile';
import { useTheme } from '../../../src/hooks/useTheme';
import { useTicket } from '../../../src/hooks/useTicket';

export default function HomeScreen() {
  const { theme } = useTheme();
  const overlay = useOverlay();
  const { logout } = useAuth();
  const { notifications } = useNotification();
  const { profile } = useProfile();
  const router = useRouter();
  const { tickets } = useTicket();
  const openTicketCount = tickets.filter((ticket) => ticket.status !== ticketStatuses.resolved).length;
  const resolvedTicketCount = tickets.filter((ticket) => ticket.status === ticketStatuses.resolved).length;
  const latestTicket = tickets[0] ?? null;
  const serviceNotice = notifications.find((notification) => notification.kind === notificationKinds.serviceNotice && !notification.acknowledgedAt) ?? null;

  const openCreateTicket = (category?: TicketCategory) => {
    router.push(category ? `/home/ticket?category=${category}` : '/home/ticket');
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

  const openActionPicker = () => {
    overlay.customModal({
      content: (
        <OptionPicker
          mode="action"
          onSelect={(value) => overlay.dismiss(() => {
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
          })}
          options={[
            {
              description: 'Tell us about a local demo CelcomDigi support need.',
              label: 'Create ticket',
              value: 'createTicket',
            },
            {
              description: 'View support tickets created in this local app session.',
              label: 'Ticket records',
              value: 'ticketRecords',
            },
            {
              description: 'View and edit local demo customer details.',
              label: 'Profile',
              value: 'profile',
            },
            {
              description: 'Remove the local demo session from this device.',
              label: 'Log out',
              value: 'logout',
            },
          ]}
          title="Home actions"
        />
      ),
    });
  };

  return (
    <>
      <AppScreen
        rightSlot={(
          <NotificationHeaderActions
            onOpenActions={openActionPicker}
            onOpenNotifications={() => router.push('/home/notification')}
          />
        )}
        rightSlotReservedWidth={112}
        routeKind="root"
        subtitle="ASTER SUPPORT"
        title="Home"
      >
        <HomeSupportHero onCreateTicket={() => openCreateTicket()} profile={profile} />
        <SupportSummary onOpenRecords={() => router.push('/home/ticket/record')} openCount={openTicketCount} resolvedCount={resolvedTicketCount} />
        <RecentTicketSection onCreateTicket={() => openCreateTicket()} onOpenRecords={() => router.push('/home/ticket/record')} onOpenTicket={() => latestTicket && router.push(`/home/ticket/${latestTicket.id}`)} ticket={latestTicket} />
        <SupportTopicGrid onSelect={openCreateTicket} />
        {serviceNotice ? <ServiceNoticeCard notice={serviceNotice} onPress={() => router.push('/home/notification')} /> : null}
      </AppScreen>
      <BottomBar
        activeTab="home"
        onTabPress={(tab) => {
          if (tab !== 'home') router.replace('/settings');
        }}
      />
    </>
  );
}

function RecentTicketSection({ onCreateTicket, onOpenRecords, onOpenTicket, ticket }: { onCreateTicket: () => void; onOpenRecords: () => void; onOpenTicket: () => void; ticket: ReturnType<typeof useTicket>['tickets'][number] | null }) {
  const { theme } = useTheme();

  return (
    <View style={{ gap: theme.spacing.md }}>
      <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: theme.colors.textMuted, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.eyebrow.fontSize, letterSpacing: theme.typography.eyebrow.letterSpacing, lineHeight: theme.typography.eyebrow.lineHeight }}>RECENT ACTIVITY</Text>
        {ticket ? <Pressable accessibilityHint="Opens all local ticket records" accessibilityLabel="View all support tickets" accessibilityRole="button" onPress={onOpenRecords} style={({ pressed }) => ({ justifyContent: 'center', minHeight: 44, opacity: pressed ? theme.opacity.pressed : 1 })}><Text style={{ color: theme.colors.primary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>View all</Text></Pressable> : null}
      </View>
      {ticket ? <TicketCard onPress={onOpenTicket} ticket={ticket} /> : <View style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, gap: theme.spacing.md, padding: theme.spacing.lg }}><View style={{ alignItems: 'center', flexDirection: 'row', gap: theme.spacing.md }}><View style={{ alignItems: 'center', backgroundColor: theme.colors.infoSoft, borderRadius: theme.radius.pill, height: 44, justifyContent: 'center', width: 44 }}><Ionicons color={theme.colors.info} name="ticket-outline" size={22} /></View><View style={{ flex: 1, gap: theme.spacing.xs }}><Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>No support requests yet</Text><Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>Create a ticket when you need help with a local demo service issue.</Text></View></View><Pressable accessibilityHint="Opens the local demo support ticket form" accessibilityLabel="Create a ticket" accessibilityRole="button" onPress={onCreateTicket} style={({ pressed }) => ({ alignItems: 'center', alignSelf: 'flex-start', backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, justifyContent: 'center', minHeight: 44, opacity: pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.lg })}><Text style={{ color: theme.colors.onPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Create a ticket</Text></Pressable></View>}
    </View>
  );
}