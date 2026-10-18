import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { ticketCategories, ticketLabels, type TicketCategory } from '../../constants/ticket';
import { useTheme } from '../../hooks/useTheme';

type TicketCategoryPickerProps = {
  error?: string;
  onSelect: (category: TicketCategory) => void;
  selectedCategory: TicketCategory | null;
};

export function TicketCategoryPicker({ error, onSelect, selectedCategory }: TicketCategoryPickerProps) {
  const { theme } = useTheme();

  return <View accessibilityRole="radiogroup" style={{ gap: theme.spacing.sm }}>{Object.values(ticketCategories).map((category) => {
    const selected = category === selectedCategory;
    return <Pressable key={category} accessibilityRole="radio" accessibilityState={{ selected }} onPress={() => onSelect(category)} style={({ pressed }) => ({ backgroundColor: selected ? theme.colors.infoSoft : theme.colors.surfaceRaised, borderColor: selected ? theme.colors.focusRing : theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, flexDirection: 'row', gap: theme.spacing.md, minHeight: 56, opacity: pressed ? theme.opacity.pressed : 1, padding: theme.spacing.md })}><View style={{ flex: 1, gap: theme.spacing.xs }}><Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>{ticketLabels.category[category]}</Text><Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>{ticketLabels.categoryDescription[category]}</Text></View><Ionicons color={selected ? theme.colors.info : theme.colors.textMuted} name={selected ? 'radio-button-on' : 'radio-button-off'} size={22} /></Pressable>;
  })}{error ? <Text style={{ color: theme.colors.danger, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize }}>{error}</Text> : null}</View>;
}