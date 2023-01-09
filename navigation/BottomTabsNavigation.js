import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { GlobalStyles } from '../constants/styles';

import CatalogStack from './CatalogStack';
import OrderStack from './OrderStack';
import MyBusinessStack from './MyBusinessStack';
import { Platform } from 'react-native';

const BottomTabs = createBottomTabNavigator();

const BottomTabsNavigation = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: GlobalStyles.colors.black,
        headerTitleStyle: {
          fontFamily: 'Roboto-regular',
        },
        tabBarStyle: {
          backgroundColor: 'white',
          height: Platform.OS === 'android' ? 70 : 65,
          paddingTop: 10,
          paddingBottom: Platform.OS === 'android' ? 10 : 0,
        },
        tabBarActiveTintColor: GlobalStyles.colors.primary500,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Roboto-regular',
        },
      })}
    >
      <BottomTabs.Screen
        name="CatalogStack"
        component={CatalogStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Каталог',
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} size={30} name={'grid'} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="OrderStack"
        component={OrderStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Заказы',
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} size={30} name={'layers-sharp'} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="MyBusinessStack"
        component={MyBusinessStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Бизнес',
          tabBarIcon: ({ color }) => (
            <Entypo color={color} size={30} name={'shop'} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default BottomTabsNavigation;
