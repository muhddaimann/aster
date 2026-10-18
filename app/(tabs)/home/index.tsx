import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { AppScreen } from '../../../src/components/shared/appScreen';
import { EmptyState } from '../../../src/components/shared/emptyState';
import { LongList } from '../../../src/components/shared/longList';
import { OptionPicker } from '../../../src/components/shared/optionPicker';
import { BottomBar } from '../../../src/components/tabs/bottomBar';
import { useOverlay } from '../../../src/hooks/useOverlay';
import { useTheme } from '../../../src/hooks/useTheme';

export default function HomeScreen() {
  const { theme } = useTheme();
  const { customModal, dismiss } = useOverlay();
  const router = useRouter();

  const openActionPicker = () => {
    customModal({
      content: <OptionPicker mode="action" onSelect={(value) => dismiss(() => { if (value === 'demo') router.replace('/home/demo'); })} options={[{ description: 'Open the full-screen Home placeholder.', label: 'Open Home demo', value: 'demo' }, { description: 'Stay in the current workspace.', label: 'Keep exploring Home', value: 'stay' }]} title="Home actions" />,
    });
  };

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <AppScreen rightSlot={<Pressable accessibilityHint="Opens Home actions" accessibilityLabel="Open Home actions" accessibilityRole="button" onPress={openActionPicker} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.pill, borderWidth: 1, height: 48, justifyContent: 'center', opacity: pressed ? theme.opacity.pressed : 1, width: 48 })}><Ionicons color={theme.colors.primary} name="ellipsis-horizontal" size={22} /></Pressable>} routeKind="root" subtitle="ASTER SUPPORT" title="Home">
        <View style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, gap: theme.spacing.md, padding: theme.spacing.lg }}>
          <Ionicons color={theme.colors.accent} name="chatbubbles-outline" size={28} />
          <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>Support overview</Text>
          <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>This shared root screen demonstrates the active-screen scroll controller and global floating controls.</Text>
        </View>
        <EmptyState actionLabel="Open Home demo" description="The nested demo route hides the tab pill and can reveal only the scroll-to-top action." icon="folder-open-outline" onAction={() => router.push('/home/demo')} title="No active cases yet" />
        <LongList />
        <Pressable accessibilityRole="button" onPress={() => router.replace('/')} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, justifyContent: 'center', minHeight: 48, opacity: pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.lg })}><Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Back to landing screen</Text></Pressable>
      </AppScreen>
      <BottomBar activeTab="home" onTabPress={(tab) => { if (tab !== 'home') router.replace('/settings'); }} />
    </View>
  );
}