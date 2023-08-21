import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GlobalStyles } from '../constants/styles';

import CatalogScreen from '../screens/catalog/CatalogScreen';
import ProductInfoScreen from '../screens/catalog/ProductInfoScreen';
import AddProductScreen from '../screens/catalog/AddProductScreen';
import CategoriesScreen from '../screens/catalog/CategoriesScreen';
import AddCategoryScreen from '../screens/catalog/AddCategoryScreen';
import CategoryInfoScreen from '../screens/catalog/CategoryInfoScreen';
import EditProductScreen from '../screens/catalog/EditProductScreen';
import EditCategoryScreen from '../screens/catalog/EditCategoryScreen';
import AddOptionGroupScreen from '../screens/catalog/AddOptionGroupScreen';
import SelectOptionGroupsScreen from '../screens/catalog/SelectOptionGroupsScreen';
import EditOptionGroupScreen from '../screens/catalog/EditOptionGroupScreen';

const Stack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();

const CatalogTabs = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontFamily: 'Roboto-regular',
        },
        tabBarActiveTintColor: GlobalStyles.colors.primary,
        tabBarIndicatorStyle: {
          backgroundColor: GlobalStyles.colors.primary,
        },
      }}
      initialRouteName={'CatalogScreen'}
    >
      <TopTab.Screen
        name="CatalogScreen"
        component={CatalogScreen}
        options={{
          title: 'Products',
        }}
      />
      <TopTab.Screen
        name="CategoriesScreen"
        component={CategoriesScreen}
        options={{
          title: 'Categories',
        }}
      />
    </TopTab.Navigator>
  );
};

const CatalogStack = () => {
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
        name="CatalogTabs"
        component={CatalogTabs}
        options={{
          title: 'Catalog',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductInfoScreen"
        component={ProductInfoScreen}
        options={{
          title: 'Loading...',
        }}
      />
      <Stack.Screen
        name="AddProductScreen"
        component={AddProductScreen}
        options={{
          title: 'Add product',
        }}
      />
      <Stack.Screen
        name="EditProductScreen"
        component={EditProductScreen}
        options={{
          title: null,
        }}
      />
      <Stack.Screen
        name="CategoryInfoScreen"
        component={CategoryInfoScreen}
        options={{
          title: 'Loading...',
        }}
      />
      <Stack.Screen
        name="AddCategoryScreen"
        component={AddCategoryScreen}
        options={{
          title: 'New category',
        }}
      />
      <Stack.Screen
        name="EditCategoryScreen"
        component={EditCategoryScreen}
        options={{
          title: null,
        }}
      />
      <Stack.Screen
        name="AddOptionGroupScreen"
        component={AddOptionGroupScreen}
        options={{
          title: 'New option',
        }}
      />
      <Stack.Screen
        name="SelectOptionGroupsScreen"
        component={SelectOptionGroupsScreen}
        options={{
          title: 'Options',
        }}
      />
      <Stack.Screen
        name="EditOptionGroupScreen"
        component={EditOptionGroupScreen}
        options={{
          title: 'Order details',
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

export default CatalogStack;
