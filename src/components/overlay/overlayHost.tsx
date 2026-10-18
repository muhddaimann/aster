import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  BackHandler,
  Dimensions,
  Modal,
  PanResponder,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { overlayLayout, type DialogOverlay, type ToastTone } from '../../constants/overlay';
import type { Theme } from '../../constants/theme';
import type { OverlayHostProps } from '../../contexts/overlayContext';
import { useTheme } from '../../hooks/useTheme';

const transitionDuration = 180;

export function OverlayHost({ completeDismissal, completeToastDismissal, dismiss, dismissToast, isExiting, overlay, toast, toastIsExiting }: OverlayHostProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const dialogScale = useRef(new Animated.Value(0.96)).current;
  const sheetTranslateY = useRef(new Animated.Value(0)).current;
  const toastOpacity = useRef(new Animated.Value(0)).current;
  const toastTranslateY = useRef(new Animated.Value(-12)).current;
  const sheetHeightRef = useRef(0);
  const [sheetHeight, setSheetHeight] = useState(0);
  const [sheetIsReady, setSheetIsReady] = useState(false);
  const exitCompletedRef = useRef(false);
  const isSheet = overlay?.kind === 'bottomSheet';
  const isDialog = overlay?.kind === 'alert' || overlay?.kind === 'confirm' || overlay?.kind === 'destructiveConfirm' || overlay?.kind === 'customModal';

  useEffect(() => {
    if (!overlay) return;
    exitCompletedRef.current = false;
    setSheetIsReady(false);
    overlayOpacity.setValue(0);
    dialogScale.setValue(0.96);
    if (isSheet) {
      sheetTranslateY.setValue(Math.max(sheetHeight, 280));
      Animated.timing(overlayOpacity, { duration: transitionDuration, toValue: 1, useNativeDriver: true }).start();
      return;
    }

    Animated.parallel([
      Animated.timing(overlayOpacity, { duration: transitionDuration, toValue: 1, useNativeDriver: true }),
      Animated.spring(dialogScale, { bounciness: 0, speed: 24, toValue: 1, useNativeDriver: true }),
    ]).start();
  }, [dialogScale, isSheet, overlay, overlayOpacity, sheetHeight, sheetTranslateY]);

  useEffect(() => {
    if (!overlay || !isSheet || sheetHeight === 0 || isExiting) return;
    sheetTranslateY.setValue(Math.max(sheetHeight, 280));
    Animated.spring(sheetTranslateY, { bounciness: 0, speed: 22, toValue: 0, useNativeDriver: true }).start(({ finished }) => {
      if (finished) {
        setSheetIsReady(true);
      }
    });
  }, [isExiting, isSheet, overlay, sheetHeight, sheetTranslateY]);

  useEffect(() => {
    if (!overlay || !isExiting) return;
    const exitMotion = isSheet
      ? Animated.timing(sheetTranslateY, { duration: transitionDuration, toValue: Math.max(sheetHeightRef.current, 280), useNativeDriver: true })
      : Animated.timing(dialogScale, { duration: transitionDuration, toValue: 0.96, useNativeDriver: true });
    Animated.parallel([
      Animated.timing(overlayOpacity, { duration: transitionDuration, toValue: 0, useNativeDriver: true }),
      exitMotion,
    ]).start(({ finished }) => {
      if (finished && !exitCompletedRef.current) {
        exitCompletedRef.current = true;
        completeDismissal();
      }
    });
  }, [completeDismissal, dialogScale, isExiting, isSheet, overlay, overlayOpacity, sheetTranslateY]);

  useEffect(() => {
    if (!overlay || overlay.kind === 'loader') return;
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      dismiss();
      return true;
    });
    return () => subscription.remove();
  }, [dismiss, overlay]);

  useEffect(() => {
    if (!toast) return;
    toastOpacity.setValue(0);
    toastTranslateY.setValue(-12);
    Animated.parallel([
      Animated.timing(toastOpacity, { duration: transitionDuration, toValue: 1, useNativeDriver: true }),
      Animated.spring(toastTranslateY, { bounciness: 0, speed: 24, toValue: 0, useNativeDriver: true }),
    ]).start();
  }, [toast, toastOpacity, toastTranslateY]);

  useEffect(() => {
    if (!toast || !toastIsExiting) return;
    Animated.parallel([
      Animated.timing(toastOpacity, { duration: transitionDuration, toValue: 0, useNativeDriver: true }),
      Animated.timing(toastTranslateY, { duration: transitionDuration, toValue: -12, useNativeDriver: true }),
    ]).start(({ finished }) => {
      if (finished) completeToastDismissal();
    });
  }, [completeToastDismissal, toast, toastIsExiting, toastOpacity, toastTranslateY]);

  const sheetPanResponder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => sheetIsReady && !isExiting,
    onStartShouldSetPanResponderCapture: () => sheetIsReady && !isExiting,
    onMoveShouldSetPanResponder: (_, gesture) => sheetIsReady && !isExiting && gesture.dy > 3 && Math.abs(gesture.dy) > Math.abs(gesture.dx),
    onMoveShouldSetPanResponderCapture: (_, gesture) => sheetIsReady && !isExiting && gesture.dy > 3 && Math.abs(gesture.dy) > Math.abs(gesture.dx),
    onPanResponderGrant: () => {
      if (sheetIsReady && !isExiting) {
        sheetTranslateY.stopAnimation();
      }
    },
    onPanResponderMove: (_, gesture) => {
      if (sheetIsReady && !isExiting) {
        sheetTranslateY.setValue(Math.max(0, gesture.dy));
      }
    },
    onPanResponderRelease: (_, gesture) => {
      if (!sheetIsReady || isExiting) {
        return;
      }
      if (gesture.dy >= sheetHeightRef.current * overlayLayout.sheetDismissDistance || gesture.vy > overlayLayout.sheetDismissVelocity) {
        dismiss();
        return;
      }
      Animated.spring(sheetTranslateY, { bounciness: 0, speed: 24, toValue: 0, useNativeDriver: true }).start();
    },
    onPanResponderTerminate: () => {
      if (sheetIsReady && !isExiting) {
        Animated.spring(sheetTranslateY, { bounciness: 0, speed: 24, toValue: 0, useNativeDriver: true }).start();
      }
    },
    onPanResponderTerminationRequest: () => false,
    onShouldBlockNativeResponder: () => true,
  }), [dismiss, isExiting, sheetIsReady, sheetTranslateY]);

  const dialogWidth = Math.min(overlayLayout.dialogPreferredWidth, Dimensions.get('window').width - overlayLayout.dialogHorizontalPadding * 2);

  return (
    <>
      {overlay ? (
        <Modal animationType="none" onRequestClose={overlay.kind === 'loader' ? undefined : () => dismiss()} statusBarTranslucent transparent visible>
          <View style={{ flex: 1 }}>
            <Animated.View style={{ backgroundColor: theme.colors.overlayBackdrop, bottom: 0, left: 0, opacity: overlayOpacity, position: 'absolute', right: 0, top: 0 }} />
            {overlay.kind !== 'loader' ? <Pressable accessibilityLabel="Dismiss overlay" accessibilityRole="button" disabled={isExiting} onPress={() => dismiss()} style={{ bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 }} /> : null}
            {isDialog ? (
              <View pointerEvents="box-none" style={{ alignItems: 'center', flex: 1, justifyContent: 'center', paddingHorizontal: overlayLayout.dialogHorizontalPadding }}>
                <Animated.View style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, maxWidth: dialogWidth, padding: theme.spacing.xl, transform: [{ scale: dialogScale }], width: dialogWidth, ...theme.shadow.overlay }}>
                  {overlay.kind === 'customModal' ? overlay.content : <DialogContent dismiss={dismiss} overlay={overlay} />}
                </Animated.View>
              </View>
            ) : null}
            {isSheet && overlay.kind === 'bottomSheet' ? (
              <View pointerEvents="box-none" style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Animated.View onLayout={(event) => { const nextHeight = event.nativeEvent.layout.height; sheetHeightRef.current = nextHeight; setSheetHeight((currentHeight) => currentHeight === nextHeight ? currentHeight : nextHeight); }} style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderTopLeftRadius: theme.radius.lg, borderTopRightRadius: theme.radius.lg, borderWidth: 1, borderBottomWidth: 0, paddingBottom: insets.bottom + theme.spacing.lg, paddingHorizontal: theme.spacing.xl, transform: [{ translateY: sheetTranslateY }] }}>
                  <View accessible accessibilityHint="Drag downward to dismiss the sheet" accessibilityLabel="Bottom sheet drag handle" accessibilityRole="adjustable" collapsable={false} pointerEvents={isExiting || !sheetIsReady ? 'none' : 'auto'} {...sheetPanResponder.panHandlers} style={{ alignItems: 'center', height: overlayLayout.sheetHandleHitSlop, justifyContent: 'center', marginHorizontal: -theme.spacing.xl }}>
                    <View pointerEvents="none" style={{ backgroundColor: theme.colors.border, borderRadius: theme.radius.pill, height: 4, width: 44 }} />
                  </View>
                  {overlay.content}
                </Animated.View>
              </View>
            ) : null}
            {overlay.kind === 'loader' ? (
              <View pointerEvents="none" style={{ alignItems: 'center', flex: 1, justifyContent: 'center', padding: overlayLayout.dialogHorizontalPadding }}>
                <Animated.View style={{ alignItems: 'center', backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, gap: theme.spacing.md, padding: theme.spacing.xl, transform: [{ scale: dialogScale }], ...theme.shadow.overlay }}>
                  <ActivityIndicator color={theme.colors.accent} size="large" />
                  {overlay.label ? <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>{overlay.label}</Text> : null}
                </Animated.View>
              </View>
            ) : null}
          </View>
        </Modal>
      ) : null}
      {toast ? (
        <View pointerEvents="box-none" style={{ left: 0, position: 'absolute', right: 0, top: insets.top + theme.spacing.md, zIndex: 1000 }}>
          <Animated.View style={{ opacity: toastOpacity, paddingHorizontal: theme.spacing.lg, transform: [{ translateY: toastTranslateY }] }}>
            <Pressable accessibilityHint="Dismisses this notification" accessibilityLabel={toast.message} accessibilityRole="alert" onPress={dismissToast} style={{ alignItems: 'center', backgroundColor: toastBackground(toast.tone, theme), borderRadius: theme.radius.md, flexDirection: 'row', gap: theme.spacing.sm, justifyContent: 'center', minHeight: 48, paddingHorizontal: theme.spacing.lg, ...theme.shadow.overlay }}>
              <Ionicons color={toastForeground(toast.tone, theme)} name={toastIcon(toast.tone)} size={20} />
              <Text style={{ color: toastForeground(toast.tone, theme), flexShrink: 1, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>{toast.message}</Text>
            </Pressable>
          </Animated.View>
        </View>
      ) : null}
    </>
  );
}

function DialogContent({ dismiss, overlay }: { dismiss: (onComplete?: () => void) => void; overlay: DialogOverlay }) {
  const { theme } = useTheme();
  const destructive = overlay.kind === 'destructiveConfirm';
  return (
    <View style={{ gap: theme.spacing.lg }}>
      <View style={{ gap: theme.spacing.sm }}>
        {overlay.title ? <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize, lineHeight: theme.typography.body.lineHeight }}>{overlay.title}</Text> : null}
        {overlay.message ? <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>{overlay.message}</Text> : null}
      </View>
      <View style={{ flexDirection: 'row', gap: theme.spacing.sm, justifyContent: 'flex-end' }}>
        {overlay.cancelAction ? <Pressable accessibilityRole="button" onPress={() => dismiss(overlay.cancelAction?.onPress)} style={({ pressed }) => ({ alignItems: 'center', borderColor: theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, justifyContent: 'center', minHeight: 44, opacity: pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.lg })}><Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>{overlay.cancelAction.label}</Text></Pressable> : null}
        {overlay.primaryAction ? <Pressable accessibilityRole="button" onPress={() => dismiss(overlay.primaryAction?.onPress)} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: destructive ? theme.colors.danger : theme.colors.primary, borderRadius: theme.radius.md, justifyContent: 'center', minHeight: 44, opacity: pressed ? theme.opacity.pressed : 1, paddingHorizontal: theme.spacing.lg })}><Text style={{ color: destructive ? theme.colors.onDanger : theme.colors.onPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>{overlay.primaryAction.label}</Text></Pressable> : null}
      </View>
    </View>
  );
}

function toastBackground(tone: ToastTone, theme: Theme) {
  return theme.colors[`${tone}Soft`];
}

function toastForeground(tone: ToastTone, theme: Theme) {
  return theme.colors[tone];
}

function toastIcon(tone: ToastTone): keyof typeof Ionicons.glyphMap {
  if (tone === 'success') return 'checkmark-circle';
  if (tone === 'danger') return 'alert-circle';
  if (tone === 'warning') return 'warning';
  return 'information-circle';
}