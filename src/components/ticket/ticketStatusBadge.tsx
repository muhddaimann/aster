import { Text, View } from 'react-native';
import { ticketLabels, ticketStatuses, type TicketStatus } from '../../constants/ticket';
import { useTheme } from '../../hooks/useTheme';

type TicketStatusBadgeProps = {
  status: TicketStatus;
};

export function TicketStatusBadge({ status }: TicketStatusBadgeProps) {
  const { theme } = useTheme();
  const colors = status === ticketStatuses.resolved
    ? { backgroundColor: theme.colors.successSoft, color: theme.colors.success }
    : status === ticketStatuses.inReview
      ? { backgroundColor: theme.colors.warningSoft, color: theme.colors.warning }
      : { backgroundColor: theme.colors.infoSoft, color: theme.colors.info };

  return <View style={{ alignSelf: 'flex-start', backgroundColor: colors.backgroundColor, borderRadius: theme.radius.pill, paddingHorizontal: theme.spacing.sm, paddingVertical: theme.spacing.xs }}><Text style={{ color: colors.color, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>{ticketLabels.status[status]}</Text></View>;
}