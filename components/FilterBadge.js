import { View, StyleSheet } from 'react-native';
import PressableContainer from './ui/PressableContainer';
import Text from './ui/Text';

const FilterBadge = ({ id, title, onPress, backgroundColor, active }) => {
  return (
    <PressableContainer onPress={onPress.bind(this, id)}>
      <View
        style={[
          styles.container,
          active && styles.containerActive,
          active && { backgroundColor: backgroundColor },
        ]}
      >
        <Text style={styles.label}>{title}</Text>
      </View>
    </PressableContainer>
  );
};

export default FilterBadge;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 9,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
    marginRight: 17,
    borderRadius: 5,
  },
  containerActive: {
    paddingHorizontal: 15,
  },
  label: {
    textTransform: 'uppercase',
    fontFamily: 'Roboto-regular',
  },
});
