import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalStyles } from '../constants/styles';

import WelcomeScreen from '../screens/authentication/WelcomeScreen';
import LoginScreen from '../screens/authentication/LoginScreen';
import SignupScreen1 from '../screens/authentication/SignupScreen1';
import SignupScreen2 from '../screens/authentication/SignupScreen2';
import PasswordResetScreen from '../screens/authentication/PasswordResetScreen';

const Stack = createNativeStackNavigator();

const AuthenticationStack = () => {
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
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitle: 'Login',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Signup1"
        component={SignupScreen1}
        options={{
          headerTitle: 'Sign up',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Signup2"
        component={SignupScreen2}
        options={{
          headerTitle: 'Sign up',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="PasswordReset"
        component={PasswordResetScreen}
        options={{
          headerTitle: 'Password Reset',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthenticationStack;
