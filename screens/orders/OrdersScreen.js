import { useContext, useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Text, LoadingOverlay, OrderCard } from '../../components';
import { OrderContext } from '../../store/orderContext';
import { GlobalStyles } from '../../constants/styles';

const RenderOrderItem = ({ item, onPress }) => {
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

  return (
    <OrderCard
      itemId={item.id}
      clientId={item.data.clientId}
      status={item.data.status}
      products={item.data.products}
      createdAt={item.data.createdAt}
      onPress={onPress}
    />
  );
};

const OrdersScreen = ({ navigation }) => {
  const orderCtx = useContext(OrderContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await orderCtx.firstTimeFetchOrders();
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsFetching(true);
      await orderCtx.firstTimeFetchOrders();
      setIsFetching(false);
    };
    if (!orderCtx.orders || !orderCtx.orders.length) fetchOrders();
  }, []);

  return (
    <View style={styles.root}>
      {orderCtx.orders?.length > 0 ? (
        <FlashList
          data={
            orderCtx.lastSnapshot.last
              ? [...DUMMY_DATA, { id: '1', customComponent: 'endOfList' }]
              : [...DUMMY_DATA, { id: '0', customComponent: 'loader' }]
          }
          renderItem={({ item }) => (
            <RenderOrderItem item={item} onPress={() => {}} />
          )}
          keyExtractor={(item) => item.id}
          estimatedItemSize={95}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          contentInsetAdjustmentBehavior="automatic"
        />
      ) : isFetching ? (
        <LoadingOverlay />
      ) : (
        <ScrollView
          contentContainerStyle={styles.emptyMsgContainer}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        >
          <Text
            style={{
              fontFamily: 'Roboto-medium',
              fontSize: 16,
              marginVertical: 4,
            }}
          >
            Заказов пока нет
          </Text>
          <Text style={{ textAlign: 'center', marginVertical: 4 }}>
            Заказ, сделанный на сайте, появится здесь. Также вы можете вручную
            создать новый заказ.
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

export default OrdersScreen;

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
});
