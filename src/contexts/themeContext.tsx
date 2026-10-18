import { createContext, useMemo, useState, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { createTheme, type Theme, type ThemeMode } from '../constants/theme';

type ThemeContextValue = {
  mode: ThemeMode;
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const deviceColorScheme = useColorScheme();
  const deviceMode: ThemeMode = deviceColorScheme === 'dark' ? 'dark' : 'light';
  const [manualMode, setManualMode] = useState<ThemeMode | null>(null);
  const mode = manualMode ?? deviceMode;
  const theme = useMemo(() => createTheme(mode), [mode]);

  const value = useMemo(
    () => ({
      mode,
      theme,
      toggleTheme: () => setManualMode((currentMode) => (currentMode ?? mode) === 'dark' ? 'light' : 'dark'),
    }),
    [mode, theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}