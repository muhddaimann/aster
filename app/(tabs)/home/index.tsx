import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { BottomBar } from '../../../src/components/tabs/bottomBar';
import { useTheme } from '../../../src/hooks/useTheme';

export default function HomeScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <ScrollView contentContainerStyle={{ gap: theme.spacing.xl, padding: theme.spacing.xl, paddingBottom: 136 }} style={{ flex: 1 }}>
        <View style={{ gap: theme.spacing.sm }}>
          <Text style={{ color: theme.colors.accent, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.eyebrow.fontSize, letterSpacing: theme.typography.eyebrow.letterSpacing, lineHeight: theme.typography.eyebrow.lineHeight }}>
            ASTER SUPPORT
          </Text>
          <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.title.fontSize, letterSpacing: theme.typography.title.letterSpacing, lineHeight: theme.typography.title.lineHeight }}>
            Home
          </Text>
          <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.body.fontSize, lineHeight: theme.typography.body.lineHeight }}>
            Your primary support workspace will live here.
          </Text>
        </View>
        <View style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, gap: theme.spacing.md, padding: theme.spacing.lg }}>
          <Ionicons color={theme.colors.accent} name="chatbubbles-outline" size={28} />
          <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>Support overview</Text>
          <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>This Phase 4 placeholder establishes the primary Home route.</Text>
        </View>
        <NavigationButton label="Open Home demo" onPress={() => router.push('/home/demo')} theme={theme} />
        <NavigationButton label="Back to landing screen" onPress={() => router.replace('/')} secondary theme={theme} />
      </ScrollView>
      <BottomBar activeTab="home" onTabPress={(tab) => { if (tab !== 'home') router.replace('/settings'); }} />
    </View>
  );
}

function NavigationButton({ label, onPress, secondary = false, theme }: { label: string; onPress: () => void; secondary?: boolean; theme: ReturnType<typeof useTheme>['theme'] }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: secondary ? theme.colors.surface : theme.colors.primary, borderColor: secondary ? theme.colors.border : 'transparent', borderRadius: theme.radius.md, borderWidth: secondary ? 1 : 0, justifyContent: 'center', minHeight: 48, opacity: pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.lg })}><Text style={{ color: secondary ? theme.colors.textPrimary : theme.colors.onPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>{label}</Text></Pressable>;
}