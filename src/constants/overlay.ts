import type { ReactNode } from 'react';

export const overlayLayout = {
  dialogPreferredWidth: 360,
  dialogHorizontalPadding: 24,
  sheetDismissDistance: 0.18,
  sheetDismissVelocity: 0.7,
  sheetHandleHitSlop: 44,
  toastDuration: 4000,
} as const;

export type OverlayAction = {
  label: string;
  onPress?: () => void;
};

export type AlertOptions = {
  title: string;
  message?: string;
  actionLabel?: string;
  onDismiss?: () => void;
};

export type ConfirmOptions = {
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

export type DestructiveConfirmOptions = ConfirmOptions & {
  destructiveLabel?: string;
};

export type CustomModalOptions = {
  content: ReactNode;
  onDismiss?: () => void;
};

export type BottomSheetOptions = {
  content: ReactNode;
  onDismiss?: () => void;
};

export type LoaderOptions = {
  label?: string;
  duration?: number;
};

export type ToastTone = 'success' | 'danger' | 'warning' | 'info';

export type ToastOptions = {
  message: string;
  tone?: ToastTone;
  duration?: number;
};

export type DialogOverlay = {
  kind: 'alert' | 'confirm' | 'destructiveConfirm' | 'customModal';
  title?: string;
  message?: string;
  content?: ReactNode;
  primaryAction?: OverlayAction;
  cancelAction?: OverlayAction;
  onDismiss?: () => void;
};

export type SheetOverlay = {
  kind: 'bottomSheet';
  content: ReactNode;
  onDismiss?: () => void;
};

export type LoaderOverlay = {
  kind: 'loader';
  label?: string;
};

export type BlockingOverlay = DialogOverlay | SheetOverlay | LoaderOverlay;

export type ToastOverlay = {
  id: number;
  message: string;
  tone: ToastTone;
};