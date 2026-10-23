import { Text, View } from 'react-native';
import type { ChatMessage } from '../../constants/chat';
import { useTheme } from '../../hooks/useTheme';

export function ChatMessageBubble({ message }: { message: ChatMessage }) {
  const { theme } = useTheme();
  const isCustomer = message.sender === 'customer';

  return (
    <View accessibilityRole="text" style={{ alignSelf: isCustomer ? 'flex-end' : 'flex-start', backgroundColor: isCustomer ? theme.colors.primary : theme.colors.surfaceRaised, borderColor: isCustomer ? theme.colors.primary : theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, maxWidth: '88%', padding: theme.spacing.md }}>
      <Text style={{ color: isCustomer ? theme.colors.onPrimary : theme.colors.textPrimary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.body.fontSize, lineHeight: theme.typography.body.lineHeight }}>{message.text}</Text>
    </View>
  );
}
