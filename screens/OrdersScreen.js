import { View, StyleSheet, Text } from 'react-native';

const OrdersScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Orders Screen</Text>
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
