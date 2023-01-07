import { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

const ProductInfoScreen = ({ route, navigation }) => {
  const { productId, productName } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: productName });
  }, [productName]);

  return (
    <View style={styles.root}>
      <Text>Product Card Screen</Text>
    </View>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
