import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { ChatRecordCard } from '../../../../src/components/chat/chatRecordCard';
import { EmptyState } from '../../../../src/components/shared/emptyState';
import { AppScreen } from '../../../../src/components/shared/appScreen';
import { chatCopy } from '../../../../src/constants/chat';
import { useChat } from '../../../../src/hooks/useChat';
import { useOverlay } from '../../../../src/hooks/useOverlay';
import { useTheme } from '../../../../src/hooks/useTheme';

export default function ChatRecordsScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const overlay = useOverlay();
  const { activeConversation, conversations, createChat, resumeChat } = useChat();

  const startNewChat = () => {
    overlay.confirm({
      cancelLabel: 'Not now',
      confirmLabel: 'Continue',
      message: chatCopy.consentDisclosure,
      onConfirm: () => {
        createChat();
        router.replace('/home/chat');
      },
      title: chatCopy.consentTitle,
    });
  };

  return (
    <AppScreen
      onBack={() => router.replace(activeConversation ? '/home/chat' : '/home')}
      rightSlot={(
        <Pressable accessibilityHint="Starts a separate local demo chat" accessibilityRole="button" onPress={startNewChat} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: theme.colors.primary, borderRadius: theme.radius.pill, justifyContent: 'center', minHeight: 44, opacity: pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.md })}>
          <Text style={{ color: theme.colors.onPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>New chat</Text>
        </Pressable>
      )}
      rightSlotReservedWidth={90}
      routeKind="nested"
      subtitle="THIS APP SESSION ONLY"
      title="Chat records"
    >
      <View accessibilityRole="text" style={{ backgroundColor: theme.colors.infoSoft, borderColor: theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, padding: theme.spacing.md }}>
        <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>These demo conversations are kept in memory only. They are cleared when you log out or close the app.</Text>
      </View>
      {conversations.length
        ? conversations.map((conversation) => <ChatRecordCard key={conversation.id} conversation={conversation} onPress={() => { resumeChat(conversation.id); router.push('/home/chat'); }} />)
        : <EmptyState actionLabel="Start a chat" description="Start a local demo conversation. It will remain available only for this app session." icon="chatbubble-ellipses-outline" onAction={startNewChat} title="No chat records yet" />}
    </AppScreen>
  );
}
