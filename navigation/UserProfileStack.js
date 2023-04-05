import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalStyles } from '../constants/styles';

import UserScreen from '../screens/user/UserScreen';
import EditUserInfoScreen from '../screens/user/EditUserInfoScreen';

const Stack = createNativeStackNavigator();

const UserProfileStack = () => {
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
        name="UserScreen"
        component={UserScreen}
        options={{
          title: 'Профиль',
        }}
      />
      <Stack.Screen
        name="EditUserInfoScreen"
        component={EditUserInfoScreen}
        options={{
          title: 'Изменить',
        }}
      />
    </Stack.Navigator>
  );
};

export default UserProfileStack;
