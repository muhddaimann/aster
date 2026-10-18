import { createContext, useCallback, useMemo, useRef, useState, type ReactNode } from 'react';
import { layout } from '../constants/layout';

export type BarRouteKind = 'root' | 'nested';

type ScrollController = {
  scrollToTop: () => void;
};

export type BarContextValue = {
  activeRouteKind: BarRouteKind;
  canScrollToTop: boolean;
  registerScreen: (id: string, controller: ScrollController, routeKind: BarRouteKind) => () => void;
  reportScroll: (id: string, offsetY: number) => void;
  scrollToTop: () => void;
  showScrollToTop: boolean;
  showTabBar: boolean;
};

export const BarContext = createContext<BarContextValue | null>(null);

type BarProviderProps = {
  children: ReactNode;
};

export function BarProvider({ children }: BarProviderProps) {
  const controllersRef = useRef(new Map<string, ScrollController>());
  const activeScreenRef = useRef<string | null>(null);
  const lastOffsetRef = useRef(0);
  const [activeRouteKind, setActiveRouteKind] = useState<BarRouteKind>('root');
  const [canScrollToTop, setCanScrollToTop] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const registerScreen = useCallback((id: string, controller: ScrollController, routeKind: BarRouteKind) => {
    controllersRef.current.set(id, controller);
    activeScreenRef.current = id;
    lastOffsetRef.current = 0;
    setActiveRouteKind(routeKind);
    setCanScrollToTop(false);
    setShowScrollToTop(false);

    return () => {
      controllersRef.current.delete(id);
      if (activeScreenRef.current === id) {
        activeScreenRef.current = null;
        setCanScrollToTop(false);
        setShowScrollToTop(false);
      }
    };
  }, []);

  const reportScroll = useCallback((id: string, offsetY: number) => {
    if (activeScreenRef.current !== id) {
      return;
    }

    const normalizedOffset = Math.max(0, offsetY);
    const delta = normalizedOffset - lastOffsetRef.current;
    const canRevealScrollTop = normalizedOffset >= layout.scrollRevealDistance;
    setCanScrollToTop(canRevealScrollTop);

    if (!canRevealScrollTop) {
      setShowScrollToTop(false);
    } else if (delta >= layout.scrollDirectionHysteresis) {
      setShowScrollToTop(true);
    } else if (delta <= -layout.scrollDirectionHysteresis) {
      setShowScrollToTop(false);
    }

    lastOffsetRef.current = normalizedOffset;
  }, []);

  const scrollToTop = useCallback(() => {
    const activeScreen = activeScreenRef.current;
    if (activeScreen) {
      controllersRef.current.get(activeScreen)?.scrollToTop();
    }
  }, []);

  const value = useMemo(() => ({
    activeRouteKind,
    canScrollToTop,
    registerScreen,
    reportScroll,
    scrollToTop,
    showScrollToTop,
    showTabBar: activeRouteKind === 'root' && !showScrollToTop,
  }), [activeRouteKind, canScrollToTop, registerScreen, reportScroll, scrollToTop, showScrollToTop]);

  return <BarContext.Provider value={value}>{children}</BarContext.Provider>;
}