import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import AddButton from '../../components/ui/buttons/AddButton';
import FilterBadge from '../../components/FilterBadge';
import ProductCard from '../../components/ProductCard';
import { GlobalStyles } from '../../constants/styles';

import { Products } from '../../utils/dummyData';

const filterOptions = [
  {
    id: '1',
    title: 'Активные',
    backgroundColor: GlobalStyles.colors.primary50,
  },
  {
    id: '2',
    title: 'Архив',
    backgroundColor: GlobalStyles.colors.accent500,
  },
];

const CatalogScreen = ({ navigation }) => {
  // const [filter, setFilter] = useState();

  const RenderCatalogItem = ({ item }) => {
    const openProductPage = () => {
      navigation.navigate('ProductInfoScreen', {
        productId: item.id,
        productName: item.title,
      });
    };

    // if (filter && filter !== item.activeId) {
    //   return;
    // }

    return (
      <ProductCard
        title={item.title}
        imageUri={item.imageUri}
        category={item.category}
        price={item.price}
        options={item.options}
        isActive={item.activeId === filterOptions[0].id}
        onPress={openProductPage}
      />
    );
  };

  const addProductToCatalog = () => {
    console.log('hello2');
    navigation.navigate('AddProductScreen');
  };

  // const onChangeFilter = (id) => {
  //   setFilter((prevId) => (prevId === id ? undefined : id));
  // };

  return (
    <View style={styles.root}>
      {/* <ScrollView horizontal={true} style={styles.filtersContainer}>
        {filterOptions.map((filterOption, key) => (
          <FilterBadge
            key={key}
            id={filterOption.id}
            title={filterOption.title}
            backgroundColor={filterOption.backgroundColor}
            active={filterOption.id === filter ? true : false}
            onPress={onChangeFilter}
          />
        ))}
      </ScrollView> */}
      <Text style={styles.text}>Всего товаров: {Products.length}</Text>
      <FlashList
        data={Products}
        renderItem={(itemData) => RenderCatalogItem(itemData)}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={115}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
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
    color: GlobalStyles.colors.gray300,
  },
  filtersContainer: {
    marginVertical: 8,
    maxHeight: 35,
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: -5,
    zIndex: 10,
  },
});
