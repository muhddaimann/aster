import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createPressScale } from '../../helpers/animate';
import { useTheme } from '../../hooks/useTheme';

export type BottomBarTab = 'home' | 'settings';

type BottomBarProps = {
  activeTab: BottomBarTab;
  onTabPress: (tab: BottomBarTab) => void;
};

export function BottomBar({ activeTab, onTabPress }: BottomBarProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View pointerEvents="box-none" style={{ bottom: insets.bottom + theme.spacing.md, left: 0, position: 'absolute', right: 0 }}>
      <View style={{ alignSelf: 'center', backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.pill, borderWidth: 1, flexDirection: 'row', gap: theme.spacing.xs, padding: theme.spacing.xs, ...theme.shadow.card }}>
        <BottomBarItem active={activeTab === 'home'} icon="home-outline" label="Home" onPress={() => onTabPress('home')} theme={theme} />
        <BottomBarItem active={activeTab === 'settings'} icon="settings-outline" label="Settings" onPress={() => onTabPress('settings')} theme={theme} />
      </View>
    </View>
  );
}

type BottomBarItemProps = {
  active: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  theme: ReturnType<typeof useTheme>['theme'];
};

function BottomBarItem({ active, icon, label, onPress, theme }: BottomBarItemProps) {
  const pressScale = useRef(createPressScale()).current;

  return (
    <Animated.View style={{ transform: [{ scale: pressScale.scale }] }}>
      <Pressable
        accessibilityLabel={label}
        accessibilityRole="tab"
        accessibilityState={{ selected: active }}
        onPress={onPress}
        onPressIn={pressScale.onPressIn}
        onPressOut={pressScale.onPressOut}
        style={({ pressed }) => ({ alignItems: 'center', backgroundColor: active ? theme.colors.primary : 'transparent', borderRadius: theme.radius.pill, flexDirection: 'row', gap: theme.spacing.sm, justifyContent: 'center', minHeight: 48, minWidth: 48, opacity: pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.lg })}
      >
        <Ionicons color={active ? theme.colors.onPrimary : theme.colors.textSecondary} name={icon} size={20} />
        <Text style={{ color: active ? theme.colors.onPrimary : theme.colors.textSecondary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}