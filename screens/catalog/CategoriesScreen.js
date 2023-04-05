import { useCallback, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, RefreshControl, Alert } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { GlobalStyles } from '../../constants/styles';

import CategoryCard from '../../components/CategoryCard';
import { PrimaryButton, IconButton, LoadingOverlay } from '../../components';
import { CatalogContext } from '../../store';

const CategoriesScreen = ({ navigation }) => {
  const catalogCtx = useContext(CatalogContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await catalogCtx.fetchCategories();
    setIsRefreshing(false);
  }, []);

  const addCategory = () => {
    navigation.navigate('AddCategoryScreen');
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      await catalogCtx
        .fetchCategories()
        .catch((error) => Alert.alert('Ошибка!', error.message));
      setIsFetching(false);
    };

    if (!catalogCtx.categories || !catalogCtx.categories.length) {
      fetchData();
    }
  }, []);

  const RenderCategoryItem = ({ item }) => {
    const openCategoryPage = () => {
      navigation.navigate('CategoryInfoScreen', {
        categoryId: item.id,
        categoryData: item.data,
      });
    };

    return (
      item.data.active && (
        <CategoryCard title={item.data.name} onPress={openCategoryPage} />
      )
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          style={styles.addButton}
          textStyle={styles.addButtonText}
          iconBefore={
            <IconButton
              icon="ionicons"
              name="md-add"
              size={25}
              style={styles.buttonIcon}
              color={GlobalStyles.colors.primary}
            />
          }
          onPress={addCategory}
        >
          Создать категорию
        </PrimaryButton>
      </View>
      {isFetching && <LoadingOverlay />}
      <FlashList
        data={catalogCtx.categories}
        renderItem={(itemData) => RenderCategoryItem(itemData)}
        keyExtractor={(item) => item.id}
        estimatedItemSize={60}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
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
    backgroundColor: GlobalStyles.colors.veryLightPrimary,
    paddingVertical: 12,
  },
  addButtonText: {
    color: GlobalStyles.colors.primary,
    fontFamily: 'Roboto-regular',
  },
  buttonIcon: {
    marginHorizontal: 2,
  },
});
