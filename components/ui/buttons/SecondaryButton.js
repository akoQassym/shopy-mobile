import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../../constants/styles';
import PressableContainer from '../PressableContainer';

const SecondaryButton = ({
  icon,
  style,
  textStyle,
  onPress,
  form,
  children,
}) => {
  return (
    <PressableContainer onPress={onPress}>
      <View
        style={[
          styles.container,
          form === 'square' && styles.square,
          form === 'rectangle' && styles.rectangle,
          style && style,
        ]}
      >
        {icon && icon}
        <Text style={[styles.label, textStyle && textStyle]}>{children}</Text>
      </View>
    </PressableContainer>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: GlobalStyles.colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rectangle: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  square: {
    height: 130,
    width: 130,
    padding: 20,
    margin: 10,
  },
  label: {
    fontSize: 10,
    color: GlobalStyles.colors.black,
    textAlign: 'center',
    marginTop: 2,
  },
});
