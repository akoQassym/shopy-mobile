import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalStyles } from '../constants/styles';

import MyBusinessScreen from '../screens/business/MyBusinessScreen';
import EditBusinessInfoScreen from '../screens/business/EditBusinessInfoScreen';
import EditDesignScreen from '../screens/business/EditDesignScreen';
import EditColorScreen from '../screens/business/EditColorScreen';
import EditSubdomainScreen from '../screens/business/EditSubdomainScreen';
import EditContactDetailsScreen from '../screens/business/EditContactDetailsScreen';
import EditLinksScreen from '../screens/business/EditLinksScreen';

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
        name="EditSubdomainScreen"
        component={EditSubdomainScreen}
        options={{
          title: null,
        }}
      />
      <Stack.Screen
        name="EditBusinessInfoScreen"
        component={EditBusinessInfoScreen}
        options={{
          title: null,
        }}
      />
      <Stack.Screen
        name="EditContactDetailsScreen"
        component={EditContactDetailsScreen}
        options={{
          title: null,
        }}
      />
      <Stack.Screen
        name="EditDesignScreen"
        component={EditDesignScreen}
        options={{
          title: null,
        }}
      />
      <Stack.Screen
        name="EditColorScreen"
        component={EditColorScreen}
        options={{
          title: 'Цветовая палитра',
        }}
      />
      <Stack.Screen
        name="EditLinksScreen"
        component={EditLinksScreen}
        options={{
          title: 'Ссылки',
        }}
      />
    </Stack.Navigator>
  );
};

export default MyBusinessStack;
