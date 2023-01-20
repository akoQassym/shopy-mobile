import { View, StyleSheet } from 'react-native';
import Text from '../components/ui/Text';

const OrderInfoScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Order Detailed Information Screen</Text>
    </View>
  );
};

export default OrderInfoScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
