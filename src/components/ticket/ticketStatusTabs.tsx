import { ScrollView, Pressable, Text, View } from 'react-native';
import { ticketLabels, ticketStatusFilters, type TicketStatusFilter } from '../../constants/ticket';
import { useTheme } from '../../hooks/useTheme';

type TicketStatusTabsProps = {
  counts: Record<TicketStatusFilter, number>;
  onSelect: (filter: TicketStatusFilter) => void;
  selectedFilter: TicketStatusFilter;
};

export function TicketStatusTabs({ counts, onSelect, selectedFilter }: TicketStatusTabsProps) {
  const { theme } = useTheme();
  const filters = Object.values(ticketStatusFilters) as TicketStatusFilter[];

  return (
    <View accessibilityRole="tablist">
      <ScrollView contentContainerStyle={{ gap: theme.spacing.sm }} horizontal showsHorizontalScrollIndicator={false}>
        {filters.map((filter) => {
          const selected = selectedFilter === filter;
          const label = ticketLabels.statusFilter[filter];

          return (
            <Pressable
              accessibilityLabel={`${label}, ${counts[filter]} tickets`}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
              key={filter}
              onPress={() => onSelect(filter)}
              style={({ pressed }) => ({ backgroundColor: selected ? theme.colors.infoSoft : theme.colors.surface, borderColor: selected ? theme.colors.focusRing : theme.colors.border, borderRadius: theme.radius.pill, borderWidth: 1, justifyContent: 'center', minHeight: 48, opacity: pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.md })}
            >
              <Text style={{ color: selected ? theme.colors.info : theme.colors.textSecondary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>
                {label} ({counts[filter]})
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}