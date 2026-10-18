import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export type OptionPickerItem = {
  description?: string;
  label: string;
  value: string;
};

type OptionPickerProps = {
  mode: 'action' | 'preference';
  onSelect: (value: string) => void;
  options: OptionPickerItem[];
  selectedValue?: string;
  title: string;
};

export function OptionPicker({ mode, onSelect, options, selectedValue, title }: OptionPickerProps) {
  const { theme } = useTheme();

  return (
    <View style={{ gap: theme.spacing.md }}>
      <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.body.fontSize }}>{title}</Text>
      {options.map((option) => {
        const selected = option.value === selectedValue;
        return <Pressable key={option.value} accessibilityRole={mode === 'preference' ? 'radio' : 'button'} accessibilityState={mode === 'preference' ? { selected } : undefined} onPress={() => onSelect(option.value)} style={({ pressed }) => ({ alignItems: 'center', backgroundColor: selected ? theme.colors.infoSoft : theme.colors.surfaceRaised, borderColor: selected ? theme.colors.focusRing : theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, flexDirection: 'row', gap: theme.spacing.md, justifyContent: 'space-between', minHeight: 48, opacity: pressed ? theme.opacity.pressed : 1, padding: theme.spacing.md })}><View style={{ flex: 1, gap: theme.spacing.xs }}><Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fontFamily.semibold, fontSize: theme.typography.label.fontSize }}>{option.label}</Text>{option.description ? <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fontFamily.regular, fontSize: theme.typography.label.fontSize, lineHeight: theme.typography.label.lineHeight }}>{option.description}</Text> : null}</View>{mode === 'preference' ? <Ionicons color={selected ? theme.colors.info : theme.colors.textMuted} name={selected ? 'radio-button-on' : 'radio-button-off'} size={22} /> : <Ionicons color={theme.colors.textMuted} name="chevron-forward" size={22} />}</Pressable>;
      })}
    </View>
  );
}