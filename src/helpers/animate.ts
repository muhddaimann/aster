import { Animated } from 'react-native';

export function createPressScale() {
  const scale = new Animated.Value(1);

  const animateTo = (toValue: number) => {
    Animated.spring(scale, {
      toValue,
      useNativeDriver: true,
      speed: 28,
      bounciness: 0,
    }).start();
  };

  return {
    scale,
    onPressIn: () => animateTo(0.94),
    onPressOut: () => animateTo(1),
  };
}