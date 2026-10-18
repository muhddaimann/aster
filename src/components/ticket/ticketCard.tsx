import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { formatTicketDate, ticketLabels, type SupportTicket } from '../../constants/ticket';
import { useTheme } from '../../hooks/useTheme';
import { TicketStatusBadge } from './ticketStatusBadge';

type TicketCardProps = {
  onPress: () => void;
  ticket: SupportTicket;
};

export function TicketCard({ onPress, ticket }: TicketCardProps) {
  const { theme } = useTheme();

  return <Pressable accessibilityHint="Opens ticket details" accessibilityLabel={`${ticket.reference}, ${ticketLabels.category[ticket.category]}, ${ticketLabels.status[ticket.status]}`} accessibilityRole="button" onPress={onPress} style={({ pressed }) => ({ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, gap: theme.spacing.md, minHeight: 48, opacity: pressed ? theme.opacity.pressed : 1, padding: theme.spacing.lg })}><View style={{ alignItems: 'center', flexDirection: 'row', gap: theme.spacing.md }}><View style={{ flex: 1, gap: theme.spacing.xs }}><Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>{ticket.reference}</Text><Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>{ticketLabels.category[ticket.category]}</Text></View><Ionicons color={theme.colors.primary} name="chevron-forward" size={22} /></View><TicketStatusBadge status={ticket.status} /><Text numberOfLines={2} style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>{ticket.description}</Text><Text style={{ color: theme.colors.textMuted, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize }}>{formatTicketDate(ticket.createdAt)}</Text></Pressable>;
}