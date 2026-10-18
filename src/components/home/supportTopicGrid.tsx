import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { ticketCategories, ticketLabels, type TicketCategory } from '../../constants/ticket';
import { useTheme } from '../../hooks/useTheme';

type SupportTopicGridProps = {
  onSelect: (category: TicketCategory) => void;
};

const supportTopics: { category: TicketCategory; icon: keyof typeof Ionicons.glyphMap }[] = [
  { category: ticketCategories.account, icon: 'person-circle-outline' },
  { category: ticketCategories.billing, icon: 'card-outline' },
  { category: ticketCategories.connectivity, icon: 'cellular-outline' },
  { category: ticketCategories.mobileService, icon: 'chatbubble-ellipses-outline' },
];

export function SupportTopicGrid({ onSelect }: SupportTopicGridProps) {
  const { theme } = useTheme();

  return (
    <View style={{ gap: theme.spacing.md }}>
      <Text style={{ color: theme.colors.textMuted, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.eyebrow.fontSize, letterSpacing: theme.typography.eyebrow.letterSpacing, lineHeight: theme.typography.eyebrow.lineHeight }}>COMMON SUPPORT TOPICS</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.md }}>
        {supportTopics.map((topic) => <Pressable key={topic.category} accessibilityHint={`Starts a ticket for ${ticketLabels.category[topic.category].toLowerCase()}`} accessibilityLabel={ticketLabels.category[topic.category]} accessibilityRole="button" onPress={() => onSelect(topic.category)} style={({ pressed }) => ({ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, flexBasis: '47%', flexGrow: 1, gap: theme.spacing.md, minHeight: 132, opacity: pressed ? theme.opacity.pressed : 1, padding: theme.spacing.lg })}><View style={{ alignItems: 'center', backgroundColor: theme.colors.infoSoft, borderRadius: theme.radius.pill, height: 40, justifyContent: 'center', width: 40 }}><Ionicons color={theme.colors.info} name={topic.icon} size={21} /></View><Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>{ticketLabels.category[topic.category]}</Text></Pressable>)}
      </View>
    </View>
  );
}