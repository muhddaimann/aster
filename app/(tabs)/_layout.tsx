import { ActivityIndicator, View } from 'react-native';
import { Redirect, Tabs } from 'expo-router';
import { useAuth } from '../../src/hooks/useAuth';
import { useTheme } from '../../src/hooks/useTheme';

export default function TabsLayout() {
  const { status } = useAuth();
  const { theme } = useTheme();

  if (status === 'hydrating') {
    return <View accessibilityLabel="Restoring local session" accessibilityRole="progressbar" style={{ alignItems: 'center', backgroundColor: theme.colors.background, flex: 1, justifyContent: 'center' }}><ActivityIndicator color={theme.colors.accent} /></View>;
  }

  if (status !== 'authenticated') {
    return <Redirect href="/" />;
  }

  return (
    <Tabs screenOptions={{ animation: 'none', headerShown: false, tabBarStyle: { display: 'none' } }}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}