import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalStyles } from '../constants/styles';
import { IconButton } from '../components';

import OrdersScreen from '../screens/orders/OrdersScreen';

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
          headerSearchBarOptions: {
            placeholder: 'Search',
            cancelButtonText: 'Отмена',
            hideWhenScrolling: false,
          },
          headerRight: () => (
            <IconButton
              icon="material"
              name="add"
              size={22}
              onPress={() => {}}
              color={GlobalStyles.colors.primary}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default OrderStack;
