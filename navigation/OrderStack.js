import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalStyles } from '../constants/styles';

import OrdersScreen from '../screens/OrdersScreen';
import OrderInfoScreen from '../screens/OrderInfoScreen';

const Stack = createNativeStackNavigator();

const OrderStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.white,
        },
        headerTintColor: GlobalStyles.colors.black,
        headerTitleStyle: {
          fontFamily: 'Roboto-regular',
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={{
          title: 'Заказы',
        }}
      />
      <Stack.Screen
        name="OrderInfoScreen"
        component={OrderInfoScreen}
        options={{
          title: 'Информация о заказе',
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

export default OrderStack;
