import { EmptyState } from '../shared/emptyState';

export function NotificationEmptyState() {
  return <EmptyState description="There are no local updates to review in this app session." icon="notifications-off-outline" title="You are all caught up" />;
}