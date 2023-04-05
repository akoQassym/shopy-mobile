import { Pressable, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const PressableContainer = ({
  onPress,
  style,
  children,
  android_ripple,
  pressedStyle,
  disabled,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        style,
        pressed && styles.pressed,
        pressed && pressedStyle,
      ]}
      android_ripple={{
        color: android_ripple ?? GlobalStyles.colors.veryLightGray,
      }}
      disabled={disabled}
    >
      {children}
    </Pressable>
  );
};

export default PressableContainer;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
});
