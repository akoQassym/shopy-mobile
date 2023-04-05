import { useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Text,
  IconButton,
  ImageScroller,
  SectionWrapper,
  ToggleSwitch,
  Card,
} from '../../components';
import { GlobalStyles } from '../../constants/styles';
import { DEFAULT_OPTION_GROUPS } from '../../utils/constants/optionGroups';

const ProductInfoScreen = ({ route, navigation }) => {
  const { productId, productData } = route.params;

  const optionGroup =
    productData.optionVariants &&
    DEFAULT_OPTION_GROUPS.find(
      (elem) => elem.id === productData?.optionVariants[0]?.id,
    );

  const openEditProduct = () => {
    navigation.navigate('EditProductScreen', {
      productId: productId,
      productData: productData,
    });
  };

  useEffect(() => {
    navigation.setOptions({ title: productData.name });
  }, [productData]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="feather"
          name="edit"
          size={22}
          onPress={openEditProduct}
        />
      ),
    });
  }, [productId]);

  return (
    <ScrollView style={styles.root}>
      <SectionWrapper style={styles.productInfoContainer}>
        <Text style={styles.title}>{productData.name}</Text>
        {productData.categoryName && (
          <Text style={[styles.text, styles.secondaryText]}>
            {productData.categoryName}
          </Text>
        )}
        <Text style={styles.price}>
          {productData.price} {productData.currency}
        </Text>
      </SectionWrapper>
      <SectionWrapper>
        <View style={styles.fieldContainer}>
          <Text
            style={[
              styles.text,
              {
                fontFamily: 'Roboto-medium',
                opacity: 0.5,
                color: productData.inStock
                  ? GlobalStyles.colors.success
                  : GlobalStyles.colors.darkError,
              },
            ]}
          >
            Есть в наличии
          </Text>
          <ToggleSwitch
            value={productData.inStock}
            activeThumbColor={
              productData.inStock && GlobalStyles.colors.success
            }
            inactiveThumbColor={
              !productData.inStock && GlobalStyles.colors.darkError
            }
            disabled
          />
        </View>
      </SectionWrapper>
      <SectionWrapper label="Галерея">
        <ImageScroller images={productData.content ?? []} />
      </SectionWrapper>
      <SectionWrapper label="Описание">
        <Text style={styles.text}>
          {!productData.description || productData.description === ''
            ? '-'
            : productData.description}
        </Text>
      </SectionWrapper>
      <SectionWrapper label="Опции товара">
        <Card>
          {productData.optionVariants?.length ? (
            <View>
              <Text style={styles.cardTitle}>
                {productData.optionVariants[0].name}
              </Text>
              <Text style={styles.cardSubtitle}>
                {productData.optionVariants[0].items?.length} выбрано:{' '}
                {productData.optionVariants[0].items.map((itemIndex, key) =>
                  key === productData.optionVariants[0].items?.length - 1
                    ? `${optionGroup.data.optionGroupVariants[itemIndex]}`
                    : `${optionGroup.data.optionGroupVariants[itemIndex]}, `,
                )}
              </Text>
            </View>
          ) : (
            <Text style={styles.text}>-</Text>
          )}
        </Card>
      </SectionWrapper>
      <SectionWrapper>
        <View style={styles.fieldContainer}>
          <Text style={styles.text}>Показано на сайте</Text>
          <ToggleSwitch value={productData.active} disabled />
        </View>
      </SectionWrapper>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
  },
  productInfoContainer: {
    paddingVertical: 20,
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
  },
  text: {
    fontSize: 16,
    marginVertical: 2,
  },
  secondaryText: {
    color: GlobalStyles.colors.darkGray,
  },
  price: {
    fontSize: 20,
    fontFamily: 'Roboto-medium',
    marginTop: 8,
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  cardSubtitle: {
    color: GlobalStyles.colors.darkGray,
  },
});
