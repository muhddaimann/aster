import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { AppScreen } from '../../../../src/components/shared/appScreen';
import { LongList } from '../../../../src/components/shared/longList';
import { BottomBar } from '../../../../src/components/tabs/bottomBar';
import { useTheme } from '../../../../src/hooks/useTheme';

export default function SettingsDemoScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return <View style={{ backgroundColor: theme.colors.background, flex: 1 }}><AppScreen onBack={() => router.replace('/settings')} routeKind="nested" subtitle="SETTINGS" title="Demo"><Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.body.fontSize, lineHeight: theme.typography.body.lineHeight }}>This nested route never renders the tab pill. Scroll down to reveal the centered scroll-to-top control.</Text><LongList count={22} title="Settings demo content" /></AppScreen><BottomBar activeTab="settings" onTabPress={() => undefined} /></View>;
}