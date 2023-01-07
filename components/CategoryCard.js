import { StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import PressableContainer from './ui/PressableContainer';

const CategoryCard = ({ title, productAmount, onPress }) => {
  return (
    <PressableContainer onPress={onPress}>
      <View style={styles.categoryContainer}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subText}>
            Товаров в категории: {productAmount}
          </Text>
        </View>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={24}
          color={GlobalStyles.colors.gray300}
        />
      </View>
    </PressableContainer>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: GlobalStyles.colors.white,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Roboto-regular',
    marginVertical: 3,
  },
  subText: {
    fontSize: 14,
    color: GlobalStyles.colors.gray300,
    marginVertical: 3,
  },
});
