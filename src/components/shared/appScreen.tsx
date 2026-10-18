import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { useFocusEffect } from 'expo-router';
import { Animated, Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';
import { layout } from '../../constants/layout';
import type { BarRouteKind } from '../../contexts/barContext';
import { useBar } from '../../hooks/useBar';
import { useTheme } from '../../hooks/useTheme';

type AppScreenProps = {
  children: ReactNode;
  onBack?: () => void;
  onRefresh?: () => void;
  refreshing?: boolean;
  rightSlot?: ReactNode;
  routeKind: BarRouteKind;
  subtitle?: string;
  title?: string;
};

type ScrollControllerRef = {
  scrollTo: (options: { animated?: boolean; x?: number; y?: number }) => void;
};

export function AppScreen({ children, onBack, onRefresh, refreshing = false, rightSlot, routeKind, subtitle, title }: AppScreenProps) {
  const { theme } = useTheme();
  const { registerScreen, reportScroll } = useBar();
  const scrollViewRef = useRef<ScrollControllerRef | null>(null);
  const screenIdRef = useRef(`app-screen-${Math.random().toString(36).slice(2)}`);
  const presence = useRef(new Animated.Value(0)).current;

  useFocusEffect(useCallback(() => registerScreen(screenIdRef.current, {
    scrollToTop: () => scrollViewRef.current?.scrollTo({ animated: true, y: 0 }),
  }, routeKind), [registerScreen, routeKind]));

  useEffect(() => {
    presence.setValue(0);
    Animated.timing(presence, { duration: 180, toValue: 1, useNativeDriver: true }).start();
  }, [presence]);

  return (
    <Animated.View style={{ backgroundColor: theme.colors.background, flex: 1, opacity: presence, transform: [{ translateY: presence.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }] }}>
      <ScrollView
        contentContainerStyle={{ gap: theme.spacing.xl, padding: theme.spacing.xl, paddingBottom: routeKind === 'root' ? layout.rootScreenBottomClearance : theme.spacing.xxl }}
        onScroll={(event) => reportScroll(screenIdRef.current, event.nativeEvent.contentOffset.y)}
        refreshControl={onRefresh ? <RefreshControl colors={[theme.colors.accent]} onRefresh={onRefresh} refreshing={refreshing} tintColor={theme.colors.accent} /> : undefined}
        ref={scrollViewRef as never}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        {title || subtitle || rightSlot || onBack ? (
          <View style={{ alignItems: 'center', flexDirection: 'row', gap: theme.spacing.md }}>
            {onBack ? <Pressable accessibilityLabel="Go back" accessibilityRole="button" onPress={onBack} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.pill, borderWidth: 1, height: 44, justifyContent: 'center', opacity: pressed ? theme.opacity.pressed : 1, width: 44 })}><Ionicons color={theme.colors.textPrimary} name="chevron-back" size={24} /></Pressable> : null}
            <View style={{ flex: 1, flexShrink: 1, gap: theme.spacing.xs }}>
                {subtitle ? <Text style={{ color: theme.colors.accent, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.eyebrow.fontSize, letterSpacing: theme.typography.eyebrow.letterSpacing, lineHeight: theme.typography.eyebrow.lineHeight }}>{subtitle}</Text> : null}
                {title ? <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.title.fontSize, letterSpacing: theme.typography.title.letterSpacing, lineHeight: theme.typography.title.lineHeight }}>{title}</Text> : null}
            </View>
            {rightSlot}
          </View>
        ) : null}
        {children}
      </ScrollView>
    </Animated.View>
  );
}