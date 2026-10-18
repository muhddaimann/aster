import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { BottomBar } from '../../../src/components/tabs/bottomBar';
import { ThemeToggle } from '../../../src/components/theme/themeToggle';
import { useTheme } from '../../../src/hooks/useTheme';

export default function SettingsScreen() {
  const { mode, theme } = useTheme();
  const router = useRouter();

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <ScrollView contentContainerStyle={{ gap: theme.spacing.xl, padding: theme.spacing.xl, paddingBottom: 136 }} style={{ flex: 1 }}>
        <View style={{ gap: theme.spacing.sm }}>
          <Text style={{ color: theme.colors.accent, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.eyebrow.fontSize, letterSpacing: theme.typography.eyebrow.letterSpacing, lineHeight: theme.typography.eyebrow.lineHeight }}>
            PREFERENCES
          </Text>
          <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.title.fontSize, letterSpacing: theme.typography.title.letterSpacing, lineHeight: theme.typography.title.lineHeight }}>
            Settings
          </Text>
        </View>
        <View style={{ alignItems: 'center', backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, flexDirection: 'row', gap: theme.spacing.lg, justifyContent: 'space-between', padding: theme.spacing.lg }}>
          <View style={{ flex: 1, gap: theme.spacing.xs }}>
            <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>Appearance</Text>
            <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize }}>Current session mode: {mode}</Text>
          </View>
          <ThemeToggle />
        </View>
        <View style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, gap: theme.spacing.md, padding: theme.spacing.lg }}>
          <Ionicons color={theme.colors.accent} name="options-outline" size={28} />
          <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>Settings placeholder</Text>
          <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>This Phase 4 placeholder establishes the primary Settings route.</Text>
        </View>
        <Pressable accessibilityRole="button" onPress={() => router.push('/settings/demo')} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, justifyContent: 'center', minHeight: 48, opacity: pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.lg })}><Text style={{ color: theme.colors.onPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Open Settings demo</Text></Pressable>
      </ScrollView>
      <BottomBar activeTab="settings" onTabPress={(tab) => { if (tab !== 'settings') router.replace('/home'); }} />
    </View>
  );
}