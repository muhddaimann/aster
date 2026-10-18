import { EmptyState } from '../shared/emptyState';

type TicketEmptyStateProps = {
  actionLabel: string;
  onAction: () => void;
};

export function TicketEmptyState({ actionLabel, onAction }: TicketEmptyStateProps) {
  return <EmptyState actionLabel={actionLabel} description="Create a local demo support ticket to describe your CelcomDigi service need. It will stay only in this app session." icon="ticket-outline" onAction={onAction} title="No support tickets yet" />;
}