export type ThemeMode = 'light' | 'dark';

export const themeTokens = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  radius: {
    sm: 8,
    md: 14,
    lg: 20,
    pill: 999,
  },
  opacity: {
    disabled: 0.45,
    muted: 0.68,
    pressed: 0.82,
  },
  fontFamily: {
    regular: 'Inter_400Regular',
    semibold: 'Inter_600SemiBold',
  },
  typography: {
    eyebrow: {
      fontSize: 12,
      letterSpacing: 1.4,
      lineHeight: 18,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    label: {
      fontSize: 14,
      lineHeight: 20,
    },
    title: {
      fontSize: 36,
      letterSpacing: -1,
      lineHeight: 43,
    },
  },
  shadow: {
    card: {
      elevation: 3,
      shadowColor: '#071A33',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.14,
      shadowRadius: 10,
    },
    overlay: {
      elevation: 0,
      shadowColor: '#071A33',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.18,
      shadowRadius: 18,
    },
  },
  light: {
    background: '#F4F8FC',
    surface: '#FFFFFF',
    surfaceRaised: '#EAF2FA',
    border: '#C7D8EA',
    primary: '#075D9D',
    accent: '#0E9FBA',
    textPrimary: '#0C2440',
    textSecondary: '#36526F',
    textMuted: '#5D7893',
    focusRing: '#16B7D4',
    pressed: '#064B7D',
    disabled: '#AFC1D2',
    overlayBackdrop: 'rgba(7, 26, 51, 0.56)',
    success: '#18794E',
    successSoft: '#DDF7E9',
    danger: '#BA1A1A',
    dangerSoft: '#FFE8E6',
    warning: '#8A5A00',
    warningSoft: '#FFF1D6',
    info: '#075D9D',
    infoSoft: '#E1F0FC',
    onPrimary: '#FFFFFF',
    onDanger: '#FFFFFF',
  },
  dark: {
    background: '#071A33',
    surface: '#0D294C',
    surfaceRaised: '#10345F',
    border: '#1E5B8E',
    primary: '#67E8F9',
    accent: '#22D3EE',
    textPrimary: '#F7FBFF',
    textSecondary: '#C7D8EE',
    textMuted: '#8EAFD1',
    focusRing: '#67E8F9',
    pressed: '#A5F3FC',
    disabled: '#587595',
    overlayBackdrop: 'rgba(0, 10, 24, 0.72)',
    success: '#79E2AE',
    successSoft: '#103D2A',
    danger: '#FFB4AB',
    dangerSoft: '#5C1718',
    warning: '#FFD08A',
    warningSoft: '#4A3100',
    info: '#8FD9FF',
    infoSoft: '#123B5B',
    onPrimary: '#062033',
    onDanger: '#5C1718',
  },
} as const;

export type Theme = {
  mode: ThemeMode;
  colors: (typeof themeTokens)[ThemeMode];
  spacing: typeof themeTokens.spacing;
  radius: typeof themeTokens.radius;
  opacity: typeof themeTokens.opacity;
  fontFamily: typeof themeTokens.fontFamily;
  typography: typeof themeTokens.typography;
  shadow: typeof themeTokens.shadow;
};

export function createTheme(mode: ThemeMode): Theme {
  return {
    mode,
    colors: themeTokens[mode],
    spacing: themeTokens.spacing,
    radius: themeTokens.radius,
    opacity: themeTokens.opacity,
    fontFamily: themeTokens.fontFamily,
    typography: themeTokens.typography,
    shadow: themeTokens.shadow,
  };
}