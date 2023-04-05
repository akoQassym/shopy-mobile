import { StyleSheet } from 'react-native';
import PressableContainer from './PressableContainer';
import IconButton from './buttons/IconButton';
import { GlobalStyles } from '../../constants/styles';

const Card = ({ children, style, onPress, withArrow }) => {
  return (
    <PressableContainer
      style={[styles.container, style && style]}
      onPress={onPress}
    >
      {children}
      {withArrow && (
        <IconButton
          icon="material"
          name="arrow-forward-ios"
          size={14}
          color={GlobalStyles.colors.darkGray}
        />
      )}
    </PressableContainer>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: GlobalStyles.colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.darkGray,
  },
});
