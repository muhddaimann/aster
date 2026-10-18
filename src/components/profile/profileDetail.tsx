import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

type ProfileDetailProps = {
  icon?: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
};

export function ProfileDetail({ icon, label, value }: ProfileDetailProps) {
  const { theme } = useTheme();

  return (
    <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
      {icon ? <View style={{ alignItems: 'center', backgroundColor: theme.colors.infoSoft, borderRadius: theme.radius.pill, height: 36, justifyContent: 'center', width: 36 }}><Ionicons color={theme.colors.info} name={icon} size={18} /></View> : null}
      <View style={{ flex: 1, gap: theme.spacing.xs }}>
        <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>{label}</Text>
        <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.body.fontSize, lineHeight: theme.typography.body.lineHeight }}>{value}</Text>
      </View>
    </View>
  );
}