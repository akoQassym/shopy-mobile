import { StyleSheet, View } from 'react-native';
import Text from '../Text';
import PressableContainer from '../PressableContainer';
import { GlobalStyles } from '../../../constants/styles';

const FILLED = 'filled';
const OUTLINED = 'outlined';

const PrimaryButton = ({
  children,
  onPress,
  style,
  textStyle,
  iconBefore,
  iconAfter,
  disabled,
  type = FILLED,
  color,
  textColor,
}) => {
  return (
    <View style={[styles.buttonOuterContainer, disabled && styles.disabled]}>
      <PressableContainer
        onPress={onPress}
        android_ripple={{ color: GlobalStyles.colors.lightPrimary }}
        style={[
          styles.buttonInnerContainer,
          type === FILLED
            ? styles.filledContainer
            : type === OUTLINED
            ? styles.outlinedContainer
            : {},
          color && {
            backgroundColor: color,
          },
          style && style,
        ]}
        disabled={disabled}
      >
        {iconBefore && <View style={{ marginRight: 10 }}>{iconBefore}</View>}
        <Text
          style={[
            styles.buttonText,
            type === FILLED
              ? styles.filledText
              : type === OUTLINED
              ? styles.outlinedText
              : {},
            textColor && {
              color: textColor,
            },
            textStyle && textStyle,
          ]}
        >
          {children}
        </Text>
        {iconAfter && <View style={{ marginLeft: 10 }}>{iconAfter}</View>}
      </PressableContainer>
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
    borderRadius: 10,
    paddingHorizontal: 16,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  filledContainer: {
    backgroundColor: GlobalStyles.colors.primary,
  },
  filledText: {
    color: GlobalStyles.colors.white,
  },
  outlinedContainer: {
    backgroundColor: GlobalStyles.colors.white,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary,
  },
  outlinedText: {
    color: GlobalStyles.colors.primary,
    fontFamily: 'Roboto-regular',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Roboto-medium',
  },
  pressed: {
    opacity: 0.75,
  },
  disabled: {
    opacity: 0.3,
  },
});
