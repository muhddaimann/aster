import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { layout } from '../../constants/layout';
import { createPressScale } from '../../helpers/animate';
import { useBar } from '../../hooks/useBar';
import { useTheme } from '../../hooks/useTheme';

export type BottomBarTab = 'home' | 'settings';

type BottomBarProps = {
  activeTab: BottomBarTab;
  onTabPress: (tab: BottomBarTab) => void;
};

export function BottomBar({ activeTab, onTabPress }: BottomBarProps) {
  const { canScrollToTop, showScrollToTop, showTabBar, scrollToTop } = useBar();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const tabOpacity = useRef(new Animated.Value(showTabBar ? 1 : 0)).current;
  const scrollOpacity = useRef(new Animated.Value(showScrollToTop ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(tabOpacity, { duration: 160, toValue: showTabBar ? 1 : 0, useNativeDriver: true }).start();
  }, [showTabBar, tabOpacity]);

  useEffect(() => {
    Animated.timing(scrollOpacity, { duration: 160, toValue: showScrollToTop ? 1 : 0, useNativeDriver: true }).start();
  }, [scrollOpacity, showScrollToTop]);

  return (
    <View pointerEvents="box-none" style={{ bottom: insets.bottom + layout.floatingControlBottomOffset, height: layout.floatingControlStageHeight, left: 0, position: 'absolute', right: 0 }}>
      <Animated.View pointerEvents={showTabBar ? 'auto' : 'none'} style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', opacity: tabOpacity, position: 'absolute', width: '100%' }}>
        <View style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.pill, borderWidth: 1, flexDirection: 'row', gap: theme.spacing.xs, padding: theme.spacing.xs, ...theme.shadow.card }}>
          <BottomBarItem active={activeTab === 'home'} icon="home-outline" label="Home" onPress={() => onTabPress('home')} theme={theme} />
          <BottomBarItem active={activeTab === 'settings'} icon="settings-outline" label="Settings" onPress={() => onTabPress('settings')} theme={theme} />
        </View>
      </Animated.View>
      <Animated.View pointerEvents={showScrollToTop && canScrollToTop ? 'auto' : 'none'} style={{ alignItems: 'center', opacity: scrollOpacity, position: 'absolute', width: '100%' }}>
        <ScrollTopButton onPress={scrollToTop} theme={theme} />
      </Animated.View>
    </View>
  );
}

function ScrollTopButton({ onPress, theme }: { onPress: () => void; theme: ReturnType<typeof useTheme>['theme'] }) {
  const pressScale = useRef(createPressScale()).current;

  return (
    <Animated.View style={{ transform: [{ scale: pressScale.scale }] }}>
      <Pressable accessibilityHint="Returns the current screen to the top" accessibilityLabel="Scroll to top" accessibilityRole="button" onPress={onPress} onPressIn={pressScale.onPressIn} onPressOut={pressScale.onPressOut} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: theme.colors.primary, borderRadius: theme.radius.pill, height: layout.scrollTopControlSize, justifyContent: 'center', opacity: pressed ? theme.opacity.pressed : 1, width: layout.scrollTopControlSize, ...theme.shadow.card })}>
        <Ionicons color={theme.colors.onPrimary} name="arrow-up" size={24} />
      </Pressable>
    </Animated.View>
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