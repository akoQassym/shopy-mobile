import { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './ui/Text';
import PressableContainer from './ui/PressableContainer';
import { GlobalStyles } from '../constants/styles';
import { DEFAULT_ORDER_STATUSES } from '../utils/constants/orderStatuses';

const OrderCard = ({
  itemId,
  clientId,
  status,
  products,
  createdAt,
  onPress,
}) => {
  const createdDate = new Date(createdAt);

  return (
    <PressableContainer style={styles.root} onPress={onPress}>
      <View style={styles.infoContainer}>
        <View style={styles.left}>
          <Text style={styles.orderIdText}>#{itemId}</Text>
          {clientId ? (
            <Text style={styles.title}>Aknur Kassym</Text>
          ) : (
            <Text style={[styles.title, styles.undefined]}>Unknown</Text>
          )}
          <Text style={styles.date}>
            {createdDate.getDate()}/{createdDate.getMonth()}/
            {createdDate.getFullYear()} {createdDate.getUTCMinutes()}
          </Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.price}>12000 ₸</Text>
          <View
            style={[
              {
                borderRadius: 5,
                paddingVertical: 5,
                marginVertical: 4,
                paddingHorizontal: 15,
              },
              { backgroundColor: DEFAULT_ORDER_STATUSES[status].bgColor },
            ]}
          >
            <Text style={{ fontSize: 12 }}>
              {DEFAULT_ORDER_STATUSES[status].label}
            </Text>
          </View>
        </View>
      </View>
      {/* {products?.map((product, key) => (
        <View
          key={key}
          style={{
            borderWidth: 1,
            paddingVertical: 5,
            paddingHorizontal: 7,
            borderRadius: 10,
          }}
        >
          <Text style={{ marginVertical: 4 }}>{product.pricePerUnit}</Text>
          <Text style={{ marginVertical: 4 }}>{product.amount}</Text>
          <Text style={{ marginVertical: 4 }}>{product.optionValue}</Text>
        </View>
      ))} */}
    </PressableContainer>
  );
};

export default memo(OrderCard);

const styles = StyleSheet.create({
  root: {
    marginVertical: 4,
    paddingVertical: 10,
    paddingHorizontal: 13,
    minHeight: 80,
    borderRadius: 10,
    backgroundColor: GlobalStyles.colors.white,
    flexDirection: 'column',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  left: {
    flexDirection: 'column',
    maxWidth: '70%',
  },
  orderIdText: {
    color: GlobalStyles.colors.gray,
    fontSize: 12,
    marginVertical: 3,
  },
  title: {
    fontFamily: 'Roboto-medium',
    fontSize: 17,
    marginVertical: 3,
  },
  undefined: {
    color: GlobalStyles.colors.gray,
  },
  date: {
    marginVertical: 3,
    fontSize: 12,
    color: GlobalStyles.colors.primary,
  },
  right: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  price: {
    fontFamily: 'Roboto-medium',
    fontSize: 17,
    marginVertical: 4,
    textAlign: 'right',
    flex: 1,
  },
});
