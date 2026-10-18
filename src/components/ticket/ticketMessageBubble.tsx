import { Text, View } from 'react-native';
import { formatTicketDate, ticketMessageSenders, type TicketMessage } from '../../constants/ticket';
import { useTheme } from '../../hooks/useTheme';

type TicketMessageBubbleProps = {
  message: TicketMessage;
};

export function TicketMessageBubble({ message }: TicketMessageBubbleProps) {
  const { theme } = useTheme();
  const isCustomer = message.sender === ticketMessageSenders.customer;

  return (
    <View accessibilityRole="text" style={{ alignItems: isCustomer ? 'flex-end' : 'flex-start', gap: theme.spacing.xs }}>
      <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>
        {isCustomer ? 'You' : 'Aster support update'}
      </Text>
      <View style={{ backgroundColor: isCustomer ? theme.colors.primary : theme.colors.surfaceRaised, borderColor: isCustomer ? theme.colors.primary : theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, maxWidth: '88%', padding: theme.spacing.md }}>
        <Text style={{ color: isCustomer ? theme.colors.onPrimary : theme.colors.textPrimary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.body.fontSize, lineHeight: theme.typography.body.lineHeight }}>
          {message.text}
        </Text>
      </View>
      <Text style={{ color: theme.colors.textMuted, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize }}>
        {formatTicketDate(message.createdAt)}
      </Text>
    </View>
  );
}