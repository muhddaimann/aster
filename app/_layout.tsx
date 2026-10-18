import { Inter_400Regular, Inter_600SemiBold, useFonts } from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { OverlayProvider } from '../src/contexts/overlayProvider';
import { BarProvider } from '../src/contexts/barContext';
import { ThemeProvider } from '../src/contexts/themeContext';
import { useOverlay } from '../src/hooks/useOverlay';
import { useTheme } from '../src/hooks/useTheme';

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ alignItems: 'center', backgroundColor: '#071A33', flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator color="#22D3EE" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <OverlayProvider>
          <BarProvider>
            <RootShell />
          </BarProvider>
        </OverlayProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function RootShell() {
  const { mode, theme } = useTheme();
  const { isOverlayActive } = useOverlay();

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <StatusBar style={isOverlayActive || mode === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ animation: 'none', headerShown: false }} />
    </SafeAreaView>
  );
}