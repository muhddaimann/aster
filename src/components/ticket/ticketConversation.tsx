import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { ticketLabels, type SupportTicket } from '../../constants/ticket';
import { useTheme } from '../../hooks/useTheme';
import { TicketMessageBubble } from './ticketMessageBubble';
import { TicketStatusBadge } from './ticketStatusBadge';

type TicketConversationProps = {
  ticket: SupportTicket;
};

export function TicketConversation({ ticket }: TicketConversationProps) {
  const { theme } = useTheme();

  return (
    <View style={{ gap: theme.spacing.lg }}>
      <View style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, gap: theme.spacing.md, padding: theme.spacing.lg }}>
        <View style={{ alignItems: 'center', flexDirection: 'row', gap: theme.spacing.md, justifyContent: 'space-between' }}>
          <View style={{ flex: 1, gap: theme.spacing.xs }}>
            <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>{ticket.reference}</Text>
            <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>{ticketLabels.category[ticket.category]}</Text>
          </View>
          <TicketStatusBadge status={ticket.status} />
        </View>
      </View>

      <View style={{ gap: theme.spacing.lg }}>
        {ticket.messages.map((message) => <TicketMessageBubble key={message.id} message={message} />)}
      </View>

      <View accessibilityRole="text" style={{ backgroundColor: theme.colors.infoSoft, borderColor: theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, flexDirection: 'row', gap: theme.spacing.md, padding: theme.spacing.md }}>
        <Ionicons color={theme.colors.info} name="information-circle-outline" size={22} />
        <Text style={{ color: theme.colors.textSecondary, flex: 1, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>
          This conversation is a local demo timeline. Live agent replies, ticket delivery, and real CelcomDigi case updates are not available.
        </Text>
      </View>
    </View>
  );
}