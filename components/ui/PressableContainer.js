import { Pressable, StyleSheet } from 'react-native';

const PressableContainer = ({ onPress, style, children }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed, style]}
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
