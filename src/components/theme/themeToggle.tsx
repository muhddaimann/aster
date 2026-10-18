import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import { Animated, Pressable, type ViewStyle } from 'react-native';
import { createPressScale } from '../../helpers/animate';
import { useTheme } from '../../hooks/useTheme';

type ThemeToggleProps = {
  style?: ViewStyle;
};

export function ThemeToggle({ style }: ThemeToggleProps) {
  const { mode, theme, toggleTheme } = useTheme();
  const pressScale = useRef(createPressScale()).current;
  const nextMode = mode === 'dark' ? 'light' : 'dark';

  return (
    <Animated.View style={[{ transform: [{ scale: pressScale.scale }] }, style]}>
      <Pressable
        accessibilityHint={`Switches to ${nextMode} mode for this session.`}
        accessibilityLabel={`Switch to ${nextMode} mode`}
        accessibilityRole="switch"
        accessibilityState={{ checked: mode === 'dark' }}
        onPress={toggleTheme}
        onPressIn={pressScale.onPressIn}
        onPressOut={pressScale.onPressOut}
        style={({ pressed }) => ({
          alignItems: 'center',
          backgroundColor: pressed ? theme.colors.surfaceRaised : theme.colors.surface,
          borderColor: pressed ? theme.colors.focusRing : theme.colors.border,
          borderRadius: theme.radius.pill,
          borderWidth: pressed ? 3 : 1,
          height: 48,
          justifyContent: 'center',
          opacity: pressed ? theme.opacity.pressed : 1,
          width: 48,
        })}
      >
        <Ionicons
          color={theme.colors.primary}
          name={mode === 'dark' ? 'sunny-outline' : 'moon-outline'}
          size={22}
        />
      </Pressable>
    </Animated.View>
  );
}