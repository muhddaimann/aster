import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { ticketCategories, ticketLabels, type TicketCategory } from '../../constants/ticket';
import { useTheme } from '../../hooks/useTheme';

type ChatCategoryOptionsProps = {
  onSelect: (category: TicketCategory) => void;
  selectedCategory: TicketCategory | null;
};

export function ChatCategoryOptions({ onSelect, selectedCategory }: ChatCategoryOptionsProps) {
  const { theme } = useTheme();

  return (
    <View accessibilityLabel="Choose a help category" style={{ gap: theme.spacing.sm }}>
      {Object.values(ticketCategories).map((category) => {
        const selected = category === selectedCategory;
        return (
          <Pressable key={category} accessibilityRole="button" accessibilityState={{ disabled: Boolean(selectedCategory), selected }} disabled={Boolean(selectedCategory)} onPress={() => onSelect(category)} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: selected ? theme.colors.infoSoft : theme.colors.surface, borderColor: selected ? theme.colors.focusRing : theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, flexDirection: 'row', gap: theme.spacing.md, minHeight: 48, opacity: selectedCategory && !selected ? theme.opacity.disabled : pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.sm })}>
            <Text style={{ color: theme.colors.textPrimary, flex: 1, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>{ticketLabels.category[category]}</Text>
            <Ionicons color={selected ? theme.colors.info : theme.colors.textMuted} name={selected ? 'checkmark-circle' : 'chevron-forward'} size={22} />
          </Pressable>
        );
      })}
    </View>
  );
}
