import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { formatChatDate, type ChatConversation } from '../../constants/chat';
import { ticketLabels } from '../../constants/ticket';
import { useTheme } from '../../hooks/useTheme';

export function ChatRecordCard({ conversation, onPress }: { conversation: ChatConversation; onPress: () => void }) {
  const { theme } = useTheme();
  const lastMessage = conversation.messages[conversation.messages.length - 1]?.text ?? 'Connecting to demo support…';
  const category = conversation.selectedCategory ? ticketLabels.category[conversation.selectedCategory] : 'Category not selected';

  return (
    <Pressable accessibilityHint="Continues this local demo conversation" accessibilityLabel={`Continue chat. ${category}. Updated ${formatChatDate(conversation.updatedAt)}. ${lastMessage}`} accessibilityRole="button" onPress={onPress} style={({ pressed }) => ({ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, gap: theme.spacing.sm, opacity: pressed ? theme.opacity.pressed : 1, padding: theme.spacing.lg })}>
      <View style={{ alignItems: 'center', flexDirection: 'row', gap: theme.spacing.sm }}>
        <View style={{ alignItems: 'center', backgroundColor: theme.colors.infoSoft, borderRadius: theme.radius.pill, height: 40, justifyContent: 'center', width: 40 }}><Ionicons color={theme.colors.info} name="chatbubble-ellipses-outline" size={21} /></View>
        <View style={{ flex: 1, gap: theme.spacing.xs }}>
          <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>{category}</Text>
          <Text style={{ color: theme.colors.textMuted, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.eyebrow.fontSize }}>{formatChatDate(conversation.updatedAt)}</Text>
        </View>
        <Ionicons color={theme.colors.textMuted} name="chevron-forward" size={22} />
      </View>
      <Text numberOfLines={2} style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>{lastMessage}</Text>
    </Pressable>
  );
}
