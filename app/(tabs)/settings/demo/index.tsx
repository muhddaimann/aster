import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../../../../src/hooks/useTheme';

export default function SettingsDemoScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1, gap: theme.spacing.xl, justifyContent: 'center', padding: theme.spacing.xl }}>
      <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.title.fontSize, lineHeight: theme.typography.title.lineHeight }}>Settings demo</Text>
      <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.body.fontSize, lineHeight: theme.typography.body.lineHeight }}>This is a full-screen nested placeholder. The floating tab bar is intentionally hidden.</Text>
      <Pressable accessibilityRole="button" onPress={() => router.back()} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, justifyContent: 'center', minHeight: 48, opacity: pressed ? theme.opacity.pressed : 1 })}><Text style={{ color: theme.colors.onPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Back to Settings</Text></Pressable>
    </View>
  );
}