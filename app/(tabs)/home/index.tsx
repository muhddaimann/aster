import { useRouter } from 'expo-router';
import { AccountBillingCard } from '../../../src/components/profile/accountBillingCard';
import { HomeQuickActions } from '../../../src/components/home/homeQuickActions';
import { PromoBanner } from '../../../src/components/home/promoBanner';
import { NotificationHeaderActions } from '../../../src/components/notification/notificationHeaderActions';
import { AppScreen } from '../../../src/components/shared/appScreen';
import { OptionPicker } from '../../../src/components/shared/optionPicker';
import { BottomBar } from '../../../src/components/tabs/bottomBar';
import { chatCopy } from '../../../src/constants/chat';
import { useAuth } from '../../../src/hooks/useAuth';
import { useChat } from '../../../src/hooks/useChat';
import { useOverlay } from '../../../src/hooks/useOverlay';
import { useProfile } from '../../../src/hooks/useProfile';

export default function HomeScreen() {
  const overlay = useOverlay();
  const { logout } = useAuth();
  const { conversations, createChat, resumeChat } = useChat();
  const { profile } = useProfile();
  const router = useRouter();
  const greetingName = profile.nickname.trim() || profile.fullName.trim().split(/\s+/)[0] || 'there';

  const openDemoChat = () => {
    const latestConversation = conversations[0];
    if (latestConversation) {
      resumeChat(latestConversation.id);
      router.push('/home/chat');
      return;
    }

    overlay.confirm({
      cancelLabel: 'Not now',
      confirmLabel: 'Continue',
      message: chatCopy.consentDisclosure,
      onConfirm: () => {
        createChat();
        router.push('/home/chat');
      },
      title: chatCopy.consentTitle,
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

  const openActionPicker = () => {
    overlay.customModal({
      content: (
        <OptionPicker
          mode="action"
          onSelect={(value) => overlay.dismiss(() => {
            if (value === 'sendTicket') {
              router.replace('/home/ticket');
              return;
            }
            if (value === 'chat') {
              openDemoChat();
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
              description: 'Create a local support request.',
              label: 'Send us a ticket',
              value: 'sendTicket',
            },
            {
              description: 'Continue or start a demo chat.',
              label: 'Chat with us',
              value: 'chat',
            },
            {
              description: 'View or update your details.',
              label: 'Manage profile',
              value: 'profile',
            },
            {
              description: 'End your demo session.',
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
        subtitle={profile.mobileNumberDisplay}
        title={`Good day, ${greetingName}`}
      >
        <AccountBillingCard />
        <PromoBanner />
        <HomeQuickActions onChat={openDemoChat} onManageTickets={() => router.push('/home/ticket/record')} />
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
