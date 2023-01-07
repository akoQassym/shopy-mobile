import { FlashList } from '@shopify/flash-list';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CategoryCard from '../../components/CategoryCard';
import PrimaryButton from '../../components/ui/buttons/PrimaryButton';
import { GlobalStyles } from '../../constants/styles';

const DUMMY_DATA = [
  {
    id: '1',
    title: 'День Рождения',
    active: true,
    amount: 4,
  },
  {
    id: '2',
    title: 'Милота',
    active: true,
    amount: 3,
  },
  {
    id: '3',
    title: 'Маме',
    active: true,
    amount: 1,
  },
  {
    id: '4',
    title: 'Love',
    active: true,
    amount: 1,
  },
];

const CategoriesScreen = ({ navigation }) => {
  const onAddCategory = () => {
    navigation.navigate('AddCategoryScreen');
  };

  const RenderCategoryItem = ({ item }) => {
    const onCategoryPress = () => {
      navigation.navigate('CategoryInfoScreen', {
        id: item.id,
      });
    };

    return (
      item.active && (
        <CategoryCard
          title={item.title}
          onPress={onCategoryPress}
          productAmount={item.amount}
        />
      )
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          style={styles.addButton}
          textStyle={styles.addButtonText}
          icon={<Ionicons name="md-add" size={25} style={styles.buttonIcon} />}
          onPress={onAddCategory}
        >
          Создать категорию
        </PrimaryButton>
      </View>
      <FlashList
        data={DUMMY_DATA}
        renderItem={(itemData) => RenderCategoryItem(itemData)}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={60}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: GlobalStyles.colors.primary100,
    paddingVertical: 12,
  },
  addButtonText: {
    color: GlobalStyles.colors.primary500,
    fontFamily: 'Roboto-regular',
  },
  buttonIcon: {
    color: GlobalStyles.colors.primary500,
    marginHorizontal: 2,
  },
});
