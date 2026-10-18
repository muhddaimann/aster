import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { TicketCard } from '../../../../src/components/ticket/ticketCard';
import { TicketEmptyState } from '../../../../src/components/ticket/ticketEmptyState';
import { TicketStatusTabs } from '../../../../src/components/ticket/ticketStatusTabs';
import { AppScreen } from '../../../../src/components/shared/appScreen';
import { EmptyState } from '../../../../src/components/shared/emptyState';
import { ticketLabels, ticketStatusFilters, type TicketStatusFilter } from '../../../../src/constants/ticket';
import { useTicket } from '../../../../src/hooks/useTicket';

export default function TicketRecordScreen() {
  const { tickets } = useTicket();
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<TicketStatusFilter>(ticketStatusFilters.all);
  const counts = useMemo(() => ({
    [ticketStatusFilters.all]: tickets.length,
    [ticketStatusFilters.inReview]: tickets.filter((ticket) => ticket.status === ticketStatusFilters.inReview).length,
    [ticketStatusFilters.resolved]: tickets.filter((ticket) => ticket.status === ticketStatusFilters.resolved).length,
    [ticketStatusFilters.submitted]: tickets.filter((ticket) => ticket.status === ticketStatusFilters.submitted).length,
  }), [tickets]);
  const filteredTickets = selectedFilter === ticketStatusFilters.all
    ? tickets
    : tickets.filter((ticket) => ticket.status === selectedFilter);

  return (
    <AppScreen onBack={() => router.replace('/home')} routeKind="nested" subtitle="LOCAL DEMO RECORDS" title="Support tickets">
      {tickets.length === 0 ? (
        <TicketEmptyState actionLabel="Create a ticket" onAction={() => router.replace('/home/ticket')} />
      ) : (
        <>
          <TicketStatusTabs counts={counts} onSelect={setSelectedFilter} selectedFilter={selectedFilter} />
          {filteredTickets.length === 0 ? (
            <EmptyState
              actionLabel="Create a ticket"
              description="Try another status or create a new local ticket."
              icon="funnel-outline"
              onAction={() => router.replace('/home/ticket')}
              title={`No ${ticketLabels.statusFilter[selectedFilter].toLowerCase()} tickets`}
            />
          ) : filteredTickets.map((ticket) => (
            <TicketCard key={ticket.id} onPress={() => router.push(`/home/ticket/${ticket.id}`)} ticket={ticket} />
          ))}
        </>
      )}
    </AppScreen>
  );
}