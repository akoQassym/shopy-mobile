import { View, StyleSheet } from 'react-native';
import Text from './ui/Text';
import PressableContainer from './ui/PressableContainer';
import { GlobalStyles } from '../constants/styles';

const FilterBadge = ({
  id,
  title,
  onPress,
  activeBackgroundColor,
  activeLabelColor,
  active,
}) => {
  return (
    <PressableContainer onPress={onPress.bind(this, id)}>
      <View
        style={[
          styles.container,
          active && { backgroundColor: activeBackgroundColor },
        ]}
      >
        <Text style={[styles.label, active && { color: activeLabelColor }]}>
          {title}
        </Text>
      </View>
    </PressableContainer>
  );
};

export default FilterBadge;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 9,
    paddingHorizontal: 15,
    backgroundColor: GlobalStyles.colors.white,
    marginRight: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 14,
    color: GlobalStyles.colors.black,
  },
});
