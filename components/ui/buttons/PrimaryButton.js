import { StyleSheet, View, Text, Pressable } from 'react-native';
import { GlobalStyles } from '../../../constants/styles';

const PrimaryButton = ({ children, onPress, style, textStyle, icon }) => {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: GlobalStyles.colors.primary200 }}
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, style, styles.pressed]
            : [styles.buttonInnerContainer, style]
        }
      >
        {icon && icon}
        <Text style={[styles.buttonText, textStyle && textStyle]}>
          {children}
        </Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 10,
    marginVertical: 5,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    paddingVertical: 18,
    backgroundColor: GlobalStyles.colors.primary500,
    paddingHorizontal: 16,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Roboto-medium',
  },
  pressed: {
    opacity: 0.75,
  },
});