import { StyleSheet, View } from 'react-native';
import PressableContainer from '../PressableContainer';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../../constants/styles';

const AddButton = ({ style, onPress }) => {
  return (
    <PressableContainer onPress={onPress}>
      <View style={[styles.iconContainer, style && style]}>
        <Ionicons
          name="md-add"
          size={35}
          color={GlobalStyles.colors.white}
          style={styles.icon}
        />
      </View>
    </PressableContainer>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  iconContainer: {
    padding: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: GlobalStyles.colors.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
    backgroundColor: GlobalStyles.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  icon: {
    marginLeft: 2,
  },
});
