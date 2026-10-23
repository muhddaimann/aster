import { Image, Text, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

const promoImage = require('../../../assets/ads/image.png');

export function PromoBanner() {
  const { theme } = useTheme();

  return (
    <View style={{ gap: theme.spacing.sm }}>
      <Text style={{ color: theme.colors.textMuted, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.eyebrow.fontSize, letterSpacing: theme.typography.eyebrow.letterSpacing }}>FEATURED PROMOTION</Text>
      <View style={{ borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, height: 110, overflow: 'hidden', width: '100%' }}>
        <Image accessible accessibilityLabel="Promotional image showing a person holding a smartphone" resizeMode="cover" source={promoImage} style={{ height: '100%', width: '100%' }} />
      </View>
    </View>
  );
}
