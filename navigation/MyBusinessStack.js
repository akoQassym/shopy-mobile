import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalStyles } from '../constants/styles';

import MyBusinessScreen from '../screens/business/MyBusinessScreen';
import EditBusinessInfoScreen from '../screens/business/EditBusinessInfoScreen';
import EditDesignScreen from '../screens/business/EditDesignScreen';
import EditColorScreen from '../screens/business/EditColorScreen';

const Stack = createNativeStackNavigator();

const MyBusinessStack = () => {
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
        name="MyBusinessScreen"
        component={MyBusinessScreen}
        options={{
          title: 'Мой Бизнес',
        }}
      />
      <Stack.Screen
        name="EditBusinessInfoScreen"
        component={EditBusinessInfoScreen}
        options={{
          title: 'Информация о бизнесе',
        }}
      />
      <Stack.Screen
        name="EditDesignScreen"
        component={EditDesignScreen}
        options={{
          title: 'Дизайн сайта',
        }}
      />
      <Stack.Screen
        name="EditColorScreen"
        component={EditColorScreen}
        options={{
          title: 'Цветовая палитра',
        }}
      />
    </Stack.Navigator>
  );
};

export default MyBusinessStack;
