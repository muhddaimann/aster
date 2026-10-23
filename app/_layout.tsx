import { Inter_400Regular, Inter_600SemiBold, useFonts } from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { OverlayProvider } from '../src/contexts/overlayProvider';
import { BarProvider } from '../src/contexts/barContext';
import { AuthProvider } from '../src/contexts/authContext';
import { ProfileProvider } from '../src/contexts/profileContext';
import { TicketProvider } from '../src/contexts/ticketContext';
import { NotificationProvider } from '../src/contexts/notificationContext';
import { ChatProvider } from '../src/contexts/chatContext';
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
          <AuthProvider>
            <ProfileProvider>
              <TicketProvider>
                <ChatProvider>
                  <NotificationProvider>
                    <BarProvider>
                      <RootShell />
                    </BarProvider>
                  </NotificationProvider>
                </ChatProvider>
              </TicketProvider>
            </ProfileProvider>
          </AuthProvider>
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
      <Stack screenOptions={{ animation: 'none', contentStyle: { backgroundColor: theme.colors.background }, headerShown: false }} />
    </SafeAreaView>
  );
}
