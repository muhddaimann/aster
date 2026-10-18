import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { ThemeToggle } from '../src/components/theme/themeToggle';
import { appAbout } from '../src/constants/about';
import type { Theme } from '../src/constants/theme';
import { useTheme } from '../src/hooks/useTheme';

export default function LandingScreen() {
  const { mode, theme } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{ gap: theme.spacing.xxl, padding: theme.spacing.xl, paddingBottom: theme.spacing.xxl }}
      style={{ backgroundColor: theme.colors.background, flex: 1 }}
    >
      <View style={{ alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 1, paddingRight: theme.spacing.lg }}>
          <View
            accessible
            accessibilityLabel="Aster support ticket icon"
            style={{
              alignItems: 'center',
              backgroundColor: theme.colors.surfaceRaised,
              borderColor: theme.colors.border,
              borderRadius: theme.radius.lg,
              borderWidth: 1,
              height: 72,
              justifyContent: 'center',
              marginBottom: theme.spacing.lg,
              width: 72,
            }}
          >
            <Ionicons color={theme.colors.accent} name="ticket-outline" size={36} />
          </View>
          <Text style={{ color: theme.colors.accent, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.eyebrow.fontSize, letterSpacing: theme.typography.eyebrow.letterSpacing, lineHeight: theme.typography.eyebrow.lineHeight }}>
            CELCOMDIGI SUPPORT
          </Text>
          <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.title.fontSize, letterSpacing: theme.typography.title.letterSpacing, lineHeight: theme.typography.title.lineHeight, marginTop: theme.spacing.sm }}>
            {appAbout.name}
          </Text>
        </View>
        <ThemeToggle />
      </View>

      <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.body.fontSize, lineHeight: theme.typography.body.lineHeight }}>
        {appAbout.about}
      </Text>

      <View style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, gap: theme.spacing.sm, padding: theme.spacing.lg }}>
        <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>
          Theme reference
        </Text>
        <Text style={{ color: theme.colors.textMuted, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>
          Active mode: {mode} · Version {appAbout.version}
        </Text>
      </View>

      <TokenSection title="Semantic colors" theme={theme}>
        {Object.entries(theme.colors).map(([name, value]) => (
          <View key={name} style={{ alignItems: 'center', flexDirection: 'row', gap: theme.spacing.md }}>
            <View style={{ backgroundColor: value, borderColor: theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, height: 44, width: 44 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>{name}</Text>
              <Text style={{ color: theme.colors.textMuted, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize }}>{value}</Text>
            </View>
          </View>
        ))}
      </TokenSection>

      <TokenSection title="Typography" theme={theme}>
        {Object.entries(theme.typography).map(([name, value]) => (
          <View key={name} style={{ gap: theme.spacing.xs }}>
            <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, ...value }}>{name} — Aster support</Text>
            <Text style={{ color: theme.colors.textMuted, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize }}>{value.fontSize}px · {value.lineHeight}px line height</Text>
          </View>
        ))}
      </TokenSection>

      <TokenSection title="Font families" theme={theme}>
        {Object.entries(theme.fontFamily).map(([name, value]) => (
          <View key={name} style={{ gap: theme.spacing.xs }}>
            <Text style={{ color: theme.colors.textPrimary, fontFamily: value, fontSize: theme.typography.body.fontSize }}>{name} — Inter</Text>
            <Text style={{ color: theme.colors.textMuted, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize }}>{value}</Text>
          </View>
        ))}
      </TokenSection>

      <TokenSection title="Spacing" theme={theme}>
        {Object.entries(theme.spacing).map(([name, value]) => (
          <View key={name} style={{ gap: theme.spacing.xs }}>
            <View style={{ backgroundColor: theme.colors.accent, borderRadius: theme.radius.pill, height: 8, opacity: theme.opacity.pressed, width: value * 6 }} />
            <Text style={{ color: theme.colors.textMuted, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize }}>{name} — {value}px</Text>
          </View>
        ))}
      </TokenSection>

      <TokenSection title="Radius and opacity" theme={theme}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.md }}>
          {Object.entries(theme.radius).map(([name, value]) => (
            <View key={name} style={{ alignItems: 'center', gap: theme.spacing.xs }}>
              <View style={{ backgroundColor: theme.colors.surfaceRaised, borderColor: theme.colors.border, borderRadius: value, borderWidth: 1, height: 52, width: 72 }} />
              <Text style={{ color: theme.colors.textMuted, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize }}>{name} · {value}px</Text>
            </View>
          ))}
        </View>
        {Object.entries(theme.opacity).map(([name, value]) => (
          <View key={name} style={{ gap: theme.spacing.xs }}>
            <View style={{ backgroundColor: theme.colors.primary, borderRadius: theme.radius.sm, height: 28, opacity: value }} />
            <Text style={{ color: theme.colors.textMuted, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize }}>{name} — {value}</Text>
          </View>
        ))}
      </TokenSection>

      <TokenSection title="Shadow, elevation, and focus" theme={theme}>
        <View style={{ backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, padding: theme.spacing.lg, ...theme.shadow.card }}>
          <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>
            card shadow · elevation {theme.shadow.card.elevation}
          </Text>
        </View>
        <View style={{ borderColor: theme.colors.focusRing, borderRadius: theme.radius.md, borderWidth: 3, padding: theme.spacing.lg }}>
          <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>
            focusRing — {theme.colors.focusRing}
          </Text>
        </View>
      </TokenSection>
    </ScrollView>
  );
}

type TokenSectionProps = {
  children: ReactNode;
  theme: Theme;
  title: string;
};

function TokenSection({ children, theme, title }: TokenSectionProps) {
  return (
    <View style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, gap: theme.spacing.lg, padding: theme.spacing.lg }}>
      <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize, lineHeight: theme.typography.body.lineHeight }}>
        {title}
      </Text>
      {children}
    </View>
  );
}