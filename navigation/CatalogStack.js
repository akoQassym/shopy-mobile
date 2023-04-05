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
          title: 'Товары',
        }}
      />
      <TopTab.Screen
        name="CategoriesScreen"
        component={CategoriesScreen}
        options={{
          title: 'Категории',
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
          title: 'Каталог',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductInfoScreen"
        component={ProductInfoScreen}
        options={{
          title: 'Загрузка...',
        }}
      />
      <Stack.Screen
        name="AddProductScreen"
        component={AddProductScreen}
        options={{
          title: 'Добавить товар',
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
          title: 'Загрузка...',
        }}
      />
      <Stack.Screen
        name="AddCategoryScreen"
        component={AddCategoryScreen}
        options={{
          title: 'Новая категория',
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
          title: 'Новая опция',
        }}
      />
      <Stack.Screen
        name="SelectOptionGroupsScreen"
        component={SelectOptionGroupsScreen}
        options={{
          title: 'Опции',
        }}
      />
      <Stack.Screen
        name="EditOptionGroupScreen"
        component={EditOptionGroupScreen}
        options={{
          title: 'Информация о заказе',
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

export default CatalogStack;
