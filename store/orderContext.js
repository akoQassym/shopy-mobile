import { createContext, useContext, useState } from 'react';
import functions from '@react-native-firebase/functions';
import { ShopContext } from './shopContext';
import { SnackbarContext } from './snackbarContext';

export const OrderContext = createContext({
  orders: [],
  lastSnapshot: {},
  fetchOrders: async () => {},
  firstTimeFetchOrders: async () => {},
  addOrder: async () => {},
  editOrder: async () => {},
  clean: () => {},
});

const OrderContextProvider = ({ children }) => {
  const shopCtx = useContext(ShopContext);
  const snackbarCtx = useContext(SnackbarContext);
  const [ordersList, setOrdersList] = useState([]);
  const [lastSnapshot, setLastSnapshot] = useState({ id: null, last: false });

  const firstTimeFetchOrders = async () => {
    const shopId = shopCtx.shopInfo.shopId;
    await functions()
      .httpsCallable('getAllOrders')({
        shopId: shopId,
      })
      .then((ordersRes) => {
        setOrdersList(ordersRes.data);
      })
      .catch((error) => {
        snackbarCtx.createSnackbar(
          'error',
          null,
          `Произошла ошибка при загрузке заказов. Попробуйте еще раз или обратитесь в службу поддержки. ${error}`,
          3500,
        );
      });
  };

  const fetchOrders = async () => {
    const shopId = shopCtx.shopInfo.shopId;
    if (lastSnapshot.last) return;
    await functions()
      .httpsCallable('getAllOrders')({
        shopId: shopId,
        lastSnapshotId: lastSnapshot?.id ?? null,
      })
      .then((productsRes) => {
        if (!productsRes.data.length)
          setLastSnapshot({ ...lastSnapshot, last: true });
        else if (productsRes.data.lastSnapshotId === lastSnapshot.id) {
          return;
        } else {
          setLastSnapshot({ id: productsRes.data.lastSnapshotId, last: false });
          setProductsList((prev) => [...prev, ...productsRes.data.data]);
        }
      })
      .catch((error) => {
        snackbarCtx.createSnackbar(
          'error',
          null,
          `Произошла ошибка при загрузке заказов. Попробуйте еще раз или обратитесь в службу поддержки. ${error}`,
          3500,
        );
      });
  };

  const clean = () => {
    setOrdersList([]);
    setLastSnapshot({ id: null, last: false });
  };

  const value = {
    orders: ordersList,
    lastSnapshot: lastSnapshot,
    fetchOrders: fetchOrders,
    firstTimeFetchOrders: firstTimeFetchOrders,
    addOrder: async () => {},
    editOrder: async () => {},
    clean: clean,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export default OrderContextProvider;
