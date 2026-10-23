import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { chatMessageLimit, type ChatConversationStatus } from '../../constants/chat';
import { useTheme } from '../../hooks/useTheme';

type ChatConsoleProps = {
  onSend: (text: string) => boolean;
  status: ChatConversationStatus;
};

export function ChatConsole({ onSend, status }: ChatConsoleProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [draft, setDraft] = useState('');
  const canSend = status === 'ready' && Boolean(draft.trim()) && draft.trim().length <= chatMessageLimit;
  const placeholder = status === 'ready' ? 'Write a message…' : status === 'awaitingCategory' ? 'Choose a help category above' : 'Please wait for the demo reply…';

  const submit = () => {
    if (canSend && onSend(draft)) setDraft('');
  };

  return (
    <View style={{ backgroundColor: theme.colors.surface, borderTopColor: theme.colors.border, borderTopWidth: 1, paddingBottom: Math.max(insets.bottom, theme.spacing.md), paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.sm }}>
      <View style={{ alignItems: 'flex-end', flexDirection: 'row', gap: theme.spacing.sm }}>
        <TextInput
          accessibilityLabel="Chat message"
          editable={status === 'ready'}
          maxLength={chatMessageLimit}
          multiline
          onChangeText={setDraft}
          onSubmitEditing={submit}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textMuted}
          returnKeyType="send"
          style={{ backgroundColor: theme.colors.surfaceRaised, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, color: theme.colors.textPrimary, flex: 1, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.body.fontSize, lineHeight: theme.typography.body.lineHeight, maxHeight: 104, minHeight: 48, paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.sm, textAlignVertical: 'center' }}
          value={draft}
        />
        <Pressable accessibilityHint={canSend ? 'Sends this message in the local demo chat' : 'Enter a message after the demo assistant is ready'} accessibilityLabel="Send message" accessibilityRole="button" accessibilityState={{ disabled: !canSend }} disabled={!canSend} onPress={submit} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: canSend ? theme.colors.primary : theme.colors.disabled, borderRadius: theme.radius.pill, height: 48, justifyContent: 'center', opacity: !canSend ? theme.opacity.disabled : pressed ? theme.opacity.pressed : 1, width: 48 })}>
          <Ionicons color={canSend ? theme.colors.onPrimary : theme.colors.textMuted} name="send" size={20} />
        </Pressable>
      </View>
      <Text style={{ color: theme.colors.textMuted, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.eyebrow.fontSize, lineHeight: theme.typography.label.lineHeight, paddingTop: theme.spacing.xs }}>Local demo only. Messages stay in memory and are not sent.</Text>
    </View>
  );
}
