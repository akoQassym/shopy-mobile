import { Text as NativeText, StyleSheet } from 'react-native';

const Text = ({ children, style }) => {
  return <NativeText style={[styles.text, style]}>{children}</NativeText>;
};

export default Text;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-light',
  },
});
