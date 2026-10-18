import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type {
  AlertOptions,
  BlockingOverlay,
  BottomSheetOptions,
  ConfirmOptions,
  CustomModalOptions,
  DestructiveConfirmOptions,
  LoaderOptions,
  ToastOptions,
  ToastOverlay,
} from '../constants/overlay';
import { overlayLayout } from '../constants/overlay';
import { OverlayHost } from '../components/overlay/overlayHost';
import { OverlayContext } from './overlayContext';

type OverlayProviderProps = {
  children: ReactNode;
};

export function OverlayProvider({ children }: OverlayProviderProps) {
  const [overlay, setOverlay] = useState<BlockingOverlay | null>(null);
  const [toast, setToast] = useState<ToastOverlay | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [toastIsExiting, setToastIsExiting] = useState(false);
  const overlayRef = useRef<BlockingOverlay | null>(null);
  const toastRef = useRef<ToastOverlay | null>(null);
  const completionRef = useRef<(() => void) | undefined>(undefined);
  const loaderTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastIdRef = useRef(0);

  const clearLoaderTimer = useCallback(() => {
    if (loaderTimerRef.current) {
      clearTimeout(loaderTimerRef.current);
      loaderTimerRef.current = null;
    }
  }, []);

  const clearToastTimer = useCallback(() => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
  }, []);

  const dismiss = useCallback((onComplete?: () => void) => {
    if (!overlayRef.current || isExiting) {
      return;
    }

    clearLoaderTimer();
    completionRef.current = onComplete;
    setIsExiting(true);
  }, [clearLoaderTimer, isExiting]);

  const completeDismissal = useCallback(() => {
    const dismissedOverlay = overlayRef.current;
    const completion = completionRef.current;
    completionRef.current = undefined;
    overlayRef.current = null;
    setOverlay(null);
    setIsExiting(false);
    if (dismissedOverlay?.kind !== 'loader') {
      dismissedOverlay?.onDismiss?.();
    }
    completion?.();
  }, []);

  const openOverlay = useCallback((nextOverlay: BlockingOverlay) => {
    if (overlayRef.current) {
      return;
    }

    completionRef.current = undefined;
    overlayRef.current = nextOverlay;
    setIsExiting(false);
    setOverlay(nextOverlay);
  }, []);

  const alert = useCallback((options: AlertOptions) => {
    openOverlay({
      kind: 'alert',
      title: options.title,
      message: options.message,
      onDismiss: options.onDismiss,
      primaryAction: { label: options.actionLabel ?? 'OK' },
    });
  }, [openOverlay]);

  const confirm = useCallback((options: ConfirmOptions) => {
    openOverlay({
      kind: 'confirm',
      title: options.title,
      message: options.message,
      primaryAction: { label: options.confirmLabel ?? 'Confirm', onPress: options.onConfirm },
      cancelAction: { label: options.cancelLabel ?? 'Cancel', onPress: options.onCancel },
    });
  }, [openOverlay]);

  const destructiveConfirm = useCallback((options: DestructiveConfirmOptions) => {
    openOverlay({
      kind: 'destructiveConfirm',
      title: options.title,
      message: options.message,
      primaryAction: { label: options.destructiveLabel ?? options.confirmLabel ?? 'Delete', onPress: options.onConfirm },
      cancelAction: { label: options.cancelLabel ?? 'Cancel', onPress: options.onCancel },
    });
  }, [openOverlay]);

  const customModal = useCallback((options: CustomModalOptions) => {
    openOverlay({ kind: 'customModal', content: options.content, onDismiss: options.onDismiss });
  }, [openOverlay]);

  const bottomSheet = useCallback((options: BottomSheetOptions) => {
    openOverlay({ kind: 'bottomSheet', content: options.content, onDismiss: options.onDismiss });
  }, [openOverlay]);

  const showLoader = useCallback((options: LoaderOptions = {}) => {
    openOverlay({ kind: 'loader', label: options.label });
    clearLoaderTimer();

    if (options.duration && options.duration > 0) {
      loaderTimerRef.current = setTimeout(() => dismiss(), options.duration);
    }
  }, [clearLoaderTimer, dismiss, openOverlay]);

  const hideLoader = useCallback(() => {
    if (overlayRef.current?.kind === 'loader') {
      dismiss();
    }
  }, [dismiss]);

  const dismissToast = useCallback(() => {
    if (!toastRef.current || toastIsExiting) {
      return;
    }

    clearToastTimer();
    setToastIsExiting(true);
  }, [clearToastTimer, toastIsExiting]);

  const completeToastDismissal = useCallback(() => {
    toastRef.current = null;
    setToast(null);
    setToastIsExiting(false);
  }, []);

  const toastAction = useCallback((options: ToastOptions) => {
    clearToastTimer();
    const nextToast: ToastOverlay = {
      id: toastIdRef.current + 1,
      message: options.message,
      tone: options.tone ?? 'info',
    };
    toastIdRef.current = nextToast.id;
    toastRef.current = nextToast;
    setToastIsExiting(false);
    setToast(nextToast);

    const duration = options.duration ?? overlayLayout.toastDuration;
    if (duration > 0) {
      toastTimerRef.current = setTimeout(() => dismissToast(), duration);
    }
  }, [clearToastTimer, dismissToast]);

  useEffect(() => () => {
    clearLoaderTimer();
    clearToastTimer();
  }, [clearLoaderTimer, clearToastTimer]);

  const value = useMemo(
    () => ({
      alert,
      bottomSheet,
      confirm,
      customModal,
      destructiveConfirm,
      dismiss,
      hideLoader,
      isOverlayActive: overlay !== null,
      showLoader,
      toast: toastAction,
    }),
    [alert, bottomSheet, confirm, customModal, destructiveConfirm, dismiss, hideLoader, overlay, showLoader, toastAction],
  );

  return (
    <OverlayContext.Provider value={value}>
      {children}
      <OverlayHost
        completeDismissal={completeDismissal}
        completeToastDismissal={completeToastDismissal}
        dismiss={dismiss}
        dismissToast={dismissToast}
        isExiting={isExiting}
        overlay={overlay}
        toast={toast}
        toastIsExiting={toastIsExiting}
      />
    </OverlayContext.Provider>
  );
}