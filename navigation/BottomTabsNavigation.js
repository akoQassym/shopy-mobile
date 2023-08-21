import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { GlobalStyles } from '../constants/styles';

import CatalogStack from './CatalogStack';
import MyBusinessStack from './MyBusinessStack';
import UserProfileStack from './UserProfileStack';

const BottomTabs = createBottomTabNavigator();

const BottomTabsNavigation = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={() => ({
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
        tabBarActiveTintColor: GlobalStyles.colors.primary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Roboto-regular',
        },
      })}
    >
      <BottomTabs.Screen
        name="MyBusinessStack"
        component={MyBusinessStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Website',
          tabBarIcon: ({ color }) => (
            <Entypo color={color} size={30} name="shop" />
          ),
        }}
      />
      <BottomTabs.Screen
        name="CatalogStack"
        component={CatalogStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Catalog',
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} size={30} name="grid" />
          ),
        }}
      />
      <BottomTabs.Screen
        name="UserProfileStack"
        component={UserProfileStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 color={color} size={26} name="user-alt" />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default BottomTabsNavigation;
