import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../../constants/styles';
import PressableContainer from '../PressableContainer';

const CloseButton = ({ color, style, onPress }) => {
  return (
    <PressableContainer
      onPress={onPress}
      style={[styles.iconContainer, style && style]}
    >
      <Ionicons
        name="close"
        size={18}
        color={color ?? GlobalStyles.colors.white}
        style={styles.icon}
      />
    </PressableContainer>
  );
};

export default CloseButton;

const styles = StyleSheet.create({
  iconContainer: {
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: GlobalStyles.colors.error250,
    borderRadius: '50%',
  },
  icon: {},
});
