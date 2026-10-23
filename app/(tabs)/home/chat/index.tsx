import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';
import { ChatCategoryOptions } from '../../../../src/components/chat/chatCategoryOptions';
import { ChatConsole } from '../../../../src/components/chat/chatConsole';
import { ChatMessageBubble } from '../../../../src/components/chat/chatMessageBubble';
import { ChatTypingIndicator } from '../../../../src/components/chat/chatTypingIndicator';
import { AppScreen } from '../../../../src/components/shared/appScreen';
import { useChat } from '../../../../src/hooks/useChat';
import { useTheme } from '../../../../src/hooks/useTheme';

export default function ChatScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { activeConversation, selectCategory, sendMessage } = useChat();

  useFocusEffect(useCallback(() => {
    if (!activeConversation) {
      router.replace('/home/chat/record');
      return undefined;
    }
  }, [activeConversation, router]));

  if (!activeConversation) return null;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <AppScreen
        autoScrollToEndOnContentChange
        bottomSlot={<ChatConsole onSend={sendMessage} status={activeConversation.status} />}
        onBack={() => router.replace('/home')}
        rightSlot={<HistoryAction onPress={() => router.push('/home/chat/record')} theme={theme} />}
        rightSlotReservedWidth={88}
        routeKind="nested"
        showFloatingControls={false}
        subtitle="LOCAL DEMO CHAT"
        title="Chat with support"
      >
        <View accessibilityRole="text" style={{ backgroundColor: theme.colors.infoSoft, borderColor: theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, padding: theme.spacing.md }}>
          <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>Local demo only. No live agent is connected, and messages are not recorded or sent.</Text>
        </View>
        <View accessibilityLabel="Chat messages" style={{ gap: theme.spacing.md }}>
          {activeConversation.messages.map((message) => <ChatMessageBubble key={message.id} message={message} />)}
          {activeConversation.status === 'starting' ? <ChatTypingIndicator label="Connecting to demo support" /> : null}
          {activeConversation.status === 'typing' || activeConversation.status === 'replying' ? <ChatTypingIndicator /> : null}
        </View>
        {activeConversation.status === 'awaitingCategory' ? <ChatCategoryOptions onSelect={selectCategory} selectedCategory={activeConversation.selectedCategory} /> : null}
      </AppScreen>
    </KeyboardAvoidingView>
  );
}

function HistoryAction({ onPress, theme }: { onPress: () => void; theme: ReturnType<typeof useTheme>['theme'] }) {
  return <Pressable accessibilityHint="Opens your session chat records" accessibilityLabel="Chat records" accessibilityRole="button" onPress={onPress} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.pill, borderWidth: 1, justifyContent: 'center', minHeight: 44, opacity: pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.md })}><Text style={{ color: theme.colors.primary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>History</Text></Pressable>;
}
