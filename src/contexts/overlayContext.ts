import { createContext } from 'react';
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

export type OverlayContextValue = {
  alert: (options: AlertOptions) => void;
  confirm: (options: ConfirmOptions) => void;
  destructiveConfirm: (options: DestructiveConfirmOptions) => void;
  customModal: (options: CustomModalOptions) => void;
  bottomSheet: (options: BottomSheetOptions) => void;
  showLoader: (options?: LoaderOptions) => void;
  hideLoader: () => void;
  toast: (options: ToastOptions) => void;
  dismiss: (onComplete?: () => void) => void;
  isOverlayActive: boolean;
};

export const OverlayContext = createContext<OverlayContextValue | null>(null);

export type OverlayHostProps = {
  completeDismissal: () => void;
  completeToastDismissal: () => void;
  dismiss: (onComplete?: () => void) => void;
  dismissToast: () => void;
  isExiting: boolean;
  overlay: BlockingOverlay | null;
  toast: ToastOverlay | null;
  toastIsExiting: boolean;
};