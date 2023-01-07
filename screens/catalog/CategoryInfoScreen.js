import { StyleSheet, Text, View } from 'react-native';

const CategoryInfoScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Catalog View Screen</Text>
    </View>
  );
};

export default CategoryInfoScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
  },
});
