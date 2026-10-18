import { Stack } from 'expo-router';
import { useTheme } from '../../../src/hooks/useTheme';

export default function SettingsStackLayout() {
  const { theme } = useTheme();

  return <Stack screenOptions={{ animation: 'none', contentStyle: { backgroundColor: theme.colors.background }, headerShown: false }} />;
}