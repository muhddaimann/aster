import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { AppScreen } from '../../../../src/components/shared/appScreen';
import { LongList } from '../../../../src/components/shared/longList';
import { BottomBar } from '../../../../src/components/tabs/bottomBar';
import { useTheme } from '../../../../src/hooks/useTheme';

export default function HomeDemoScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return <View style={{ backgroundColor: theme.colors.background, flex: 1 }}><AppScreen onBack={() => router.replace('/home')} routeKind="nested" subtitle="HOME" title="Demo"><Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.body.fontSize, lineHeight: theme.typography.body.lineHeight }}>This nested route never renders the tab pill. Scroll down to reveal the centered scroll-to-top control.</Text><LongList count={22} title="Home demo content" /></AppScreen><BottomBar activeTab="home" onTabPress={() => undefined} /></View>;
}