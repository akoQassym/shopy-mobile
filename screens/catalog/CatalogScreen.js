import { useCallback, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { GlobalStyles } from '../../constants/styles';

import { Text, AddButton, LoadingOverlay, FilterBadge } from '../../components';
import ProductCard from '../../components/ProductCard';
import { CatalogContext } from '../../store';

const FILTERS = [
  {
    name: 'all',
    label: 'Все',
    activeBgColor: GlobalStyles.colors.veryLightPrimary,
    activeLabelColor: GlobalStyles.colors.primary,
  },
  {
    name: 'active',
    label: 'Активные',
    activeBgColor: GlobalStyles.colors.veryLightPrimary,
    activeLabelColor: GlobalStyles.colors.primary,
  },
  {
    name: 'archived',
    label: 'Неактивные',
    activeBgColor: GlobalStyles.colors.veryLightPrimary,
    activeLabelColor: GlobalStyles.colors.primary,
  },
];

const RenderCatalogItem = ({ item, onPress, filterValue }) => {
  if (item.customComponent) {
    return (
      <Text
        style={{
          textAlign: 'center',
          marginVertical: 20,
          color: GlobalStyles.colors.darkGray,
        }}
      >
        {item.customComponent === 'loader'
          ? 'Загрузка...'
          : item.customComponent === 'endOfList'
          ? 'Конец списка'
          : ''}
      </Text>
    );
  }

  return (filterValue === FILTERS[1].name && item.data.active) ||
    (filterValue === FILTERS[2].name && !item.data.active) ? (
    <ProductCard
      title={item.data.name}
      imageUri={
        item.data.content && item.data.content[0] && item.data.content[0].uri
      }
      category={item.data.categoryName}
      price={item.data.price}
      options={[]}
      isActive={true}
      onPress={onPress.bind(this, item.id, item.data)}
    />
  ) : (
    filterValue === FILTERS[0].name && (
      <ProductCard
        title={item.data.name}
        imageUri={
          item.data.content && item.data.content[0] && item.data.content[0].uri
        }
        category={item.data.categoryName}
        price={item.data.price}
        options={[]}
        isActive={item.data.active}
        onPress={onPress.bind(this, item.id, item.data)}
      />
    )
  );
};

const CatalogScreen = ({ navigation }) => {
  const catalogCtx = useContext(CatalogContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [filter, setFilter] = useState(FILTERS[0].name);
  const [page, setPage] = useState(0);

  const addProductToCatalog = () => {
    navigation.navigate('AddProductScreen');
  };

  const openProductPage = (id, data) => {
    navigation.navigate('ProductInfoScreen', {
      productId: id,
      productData: data,
    });
  };

  const changeFilter = (filterName) => {
    setFilter(filterName);
  };

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await catalogCtx.firstTimeFetchProducts();
    setIsRefreshing(false);
  }, []);

  const loadNextPage = () => {
    if (catalogCtx.lastSnapshot.last || isFetching) return;
    setPage(page + 1);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsFetching(true);
      await catalogCtx.fetchProducts();
      setIsFetching(false);
    };
    fetchProducts();
  }, [page]);

  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: 'Search',
      },
    });
  }, [navigation]);

  return (
    <View style={styles.root}>
      <Text style={styles.text}>
        Загружено товаров:{' '}
        {catalogCtx.products ? catalogCtx.products.length : 0}
      </Text>

      {catalogCtx.products?.length > 0 ? (
        <>
          <View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              contentContainerStyle={{
                paddingBottom: 10,
              }}
            >
              {FILTERS.map((elem, key) => (
                <FilterBadge
                  key={key}
                  title={elem.label}
                  activeBackgroundColor={elem.activeBgColor}
                  activeLabelColor={elem.activeLabelColor}
                  onPress={changeFilter.bind(this, elem.name)}
                  active={filter === elem.name}
                />
              ))}
            </ScrollView>
          </View>

          <FlashList
            data={
              catalogCtx.lastSnapshot.last
                ? [
                    ...catalogCtx.products,
                    { id: '1', customComponent: 'endOfList' },
                  ]
                : [
                    ...catalogCtx.products,
                    { id: '0', customComponent: 'loader' },
                  ]
            }
            renderItem={({ item }) => (
              <RenderCatalogItem
                item={item}
                onPress={openProductPage}
                filterValue={filter}
              />
            )}
            keyExtractor={(item) => item.id}
            estimatedItemSize={115}
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
            onEndReached={loadNextPage}
            onEndReachedThreshold={0.5}
          />
        </>
      ) : isFetching ? (
        <LoadingOverlay />
      ) : (
        <ScrollView
          contentContainerStyle={styles.emptyMsgContainer}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        >
          <Text style={{ fontFamily: 'Roboto-medium', fontSize: 16 }}>
            Добро пожаловать!
          </Text>
          <Text style={{ textAlign: 'center', marginVertical: 4 }}>
            Создайте свой первый товар.
          </Text>
        </ScrollView>
      )}
      <AddButton style={styles.addButton} onPress={addProductToCatalog} />
    </View>
  );
};

export default CatalogScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
  },
  text: {
    fontSize: 14,
    marginVertical: 10,
    color: GlobalStyles.colors.darkGray,
  },
  emptyMsgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: -5,
    zIndex: 10,
  },
});
