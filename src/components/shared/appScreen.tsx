import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { useFocusEffect } from 'expo-router';
import { Animated, Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';
import { layout } from '../../constants/layout';
import type { BarRouteKind } from '../../contexts/barContext';
import { useBar } from '../../hooks/useBar';
import { useTheme } from '../../hooks/useTheme';
import { FloatingControls } from '../tabs/bottomBar';

type AppScreenProps = {
  children: ReactNode;
  onBack?: () => void;
  onRefresh?: () => void;
  refreshing?: boolean;
  rightSlot?: ReactNode;
  rightSlotReservedWidth?: number;
  routeKind: BarRouteKind;
  scrollEnabled?: boolean;
  subtitle?: string;
  title?: string;
};

type ScrollControllerRef = {
  scrollTo: (options: { animated?: boolean; x?: number; y?: number }) => void;
};

export function AppScreen({ children, onBack, onRefresh, refreshing = false, rightSlot, rightSlotReservedWidth = 48, routeKind, scrollEnabled = true, subtitle, title }: AppScreenProps) {
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
    Animated.timing(presence, { duration: 200, toValue: 1, useNativeDriver: true }).start();
  }, [presence]);

  return (
    <Animated.View style={{ backgroundColor: theme.colors.background, flex: 1, opacity: presence, transform: [{ translateY: presence.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) }] }}>
      {scrollEnabled ? (
        <ScrollView
          contentContainerStyle={{ gap: theme.spacing.xl, padding: theme.spacing.xl, paddingBottom: routeKind === 'root' ? layout.rootScreenBottomClearance : theme.spacing.xxl }}
          onScroll={(event) => reportScroll(screenIdRef.current, event.nativeEvent.contentOffset.y)}
          refreshControl={onRefresh ? <RefreshControl colors={[theme.colors.accent]} onRefresh={onRefresh} refreshing={refreshing} tintColor={theme.colors.accent} /> : undefined}
          ref={scrollViewRef as never}
          scrollEventThrottle={16}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <ScreenContent hasBackControl={Boolean(onBack)} rightSlotReservedWidth={rightSlot ? rightSlotReservedWidth : 0} subtitle={subtitle} theme={theme} title={title}>
            {children}
          </ScreenContent>
        </ScrollView>
      ) : (
        <View style={{ flex: 1, gap: theme.spacing.xl, padding: theme.spacing.xl, paddingBottom: routeKind === 'root' ? layout.rootScreenBottomClearance : theme.spacing.xxl }}>
          <ScreenContent hasBackControl={Boolean(onBack)} rightSlotReservedWidth={rightSlot ? rightSlotReservedWidth : 0} subtitle={subtitle} theme={theme} title={title}>
            {children}
          </ScreenContent>
        </View>
      )}
      {onBack || rightSlot ? (
        <View pointerEvents="box-none" style={{ left: 0, position: 'absolute', right: 0, top: theme.spacing.xl }}>
          {onBack ? <View style={{ left: theme.spacing.xl, position: 'absolute', top: 0 }}><BackControl onPress={onBack} theme={theme} /></View> : null}
          {rightSlot ? <View style={{ position: 'absolute', right: theme.spacing.xl, top: 0 }}>{rightSlot}</View> : null}
        </View>
      ) : null}
      {routeKind === 'nested' ? <FloatingControls /> : null}
    </Animated.View>
  );
}

function ScreenContent({ children, hasBackControl, rightSlotReservedWidth, subtitle, theme, title }: Pick<AppScreenProps, 'children' | 'subtitle' | 'title'> & { hasBackControl: boolean; rightSlotReservedWidth: number; theme: ReturnType<typeof useTheme>['theme'] }) {
  const hasHeader = Boolean(title || subtitle);

  return (
    <>
      {hasHeader ? (
        <View style={{ gap: theme.spacing.xs, paddingLeft: hasBackControl ? 44 + theme.spacing.md : 0, paddingRight: rightSlotReservedWidth ? rightSlotReservedWidth + theme.spacing.md : 0 }}>
            {title ? <Text style={{ color: theme.colors.primary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize, lineHeight: theme.typography.body.lineHeight }}>{title}</Text> : null}
            {subtitle ? <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>{subtitle}</Text> : null}
        </View>
      ) : null}
      {children}
    </>
  );
}

function BackControl({ onPress, theme }: { onPress: () => void; theme: ReturnType<typeof useTheme>['theme'] }) {
  return <Pressable accessibilityHint="Returns to the previous support screen" accessibilityLabel="Go back" accessibilityRole="button" onPress={onPress} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: theme.colors.surface, borderColor: pressed ? theme.colors.focusRing : theme.colors.border, borderRadius: theme.radius.pill, borderWidth: 1, height: 44, justifyContent: 'center', opacity: pressed ? theme.opacity.pressed : 1, width: 44 })}><Ionicons color={theme.colors.textPrimary} name="chevron-back" size={24} /></Pressable>;
}