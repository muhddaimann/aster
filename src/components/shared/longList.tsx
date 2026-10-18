import { Text, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

type LongListProps = {
  count?: number;
  title?: string;
};

export function LongList({ count = 18, title = 'Recent support activity' }: LongListProps) {
  const { theme } = useTheme();

  return (
    <View style={{ gap: theme.spacing.sm }}>
      <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>{title}</Text>
      {Array.from({ length: count }, (_, index) => <View key={index} style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, gap: theme.spacing.xs, padding: theme.spacing.lg }}><Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>Support update {index + 1}</Text><Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>Scrollable reference content for the shared floating-control behavior.</Text></View>)}
    </View>
  );
}