import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { TicketDetail } from '../../../../src/components/ticket/ticketDetail';
import { AppScreen } from '../../../../src/components/shared/appScreen';
import { useTheme } from '../../../../src/hooks/useTheme';
import { useTicket } from '../../../../src/hooks/useTicket';

export default function TicketDetailScreen() {
  const { theme } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getTicketById } = useTicket();
  const router = useRouter();
  const ticket = id ? getTicketById(id) : null;

  return (
    <AppScreen
      onBack={() => router.replace('/home/ticket/record')}
      routeKind="nested"
      subtitle="LOCAL DEMO TICKET"
      title={ticket ? ticket.reference : 'Ticket unavailable'}
    >
      {ticket ? (
        <>
          <View accessibilityRole="text" style={{ backgroundColor: theme.colors.infoSoft, borderColor: theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, flexDirection: 'row', gap: theme.spacing.md, padding: theme.spacing.md }}>
            <Ionicons color={theme.colors.info} name="information-circle-outline" size={22} />
            <Text style={{ color: theme.colors.textSecondary, flex: 1, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>
              This ticket is available only in the current local demo session and was not sent to CelcomDigi.
            </Text>
          </View>
          <TicketDetail ticket={ticket} />
        </>
      ) : (
        <View style={{ alignItems: 'center', backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, gap: theme.spacing.md, padding: theme.spacing.xl }}>
          <Ionicons color={theme.colors.warning} name="alert-circle-outline" size={32} />
          <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>This ticket is unavailable</Text>
          <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight, textAlign: 'center' }}>
            It may have been cleared after logout or app restart.
          </Text>
          <Pressable accessibilityRole="button" onPress={() => router.replace('/home/ticket/record')} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, justifyContent: 'center', minHeight: 48, opacity: pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.lg })}>
            <Text style={{ color: theme.colors.onPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>View ticket records</Text>
          </Pressable>
        </View>
      )}
    </AppScreen>
  );
}