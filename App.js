import { useCallback, useContext } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import AuthContextProvider from './store/authContext';
import { AuthContext } from './store/authContext';

import AuthenticationStack from './navigation/AuthenticationStack';
import BottomTabsNavigation from './navigation/BottomTabsNavigation';

const Navigation = () => {
  const authCtx = useContext(AuthContext);
  console.log('--> Authenticated:', authCtx.isAuthenticated);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthenticationStack />}
      {authCtx.isAuthenticated && <BottomTabsNavigation />}
    </NavigationContainer>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-regular': require('./assets/fonts/Roboto/Rubik-Regular.ttf'),
    'Roboto-bold': require('./assets/fonts/Roboto/Rubik-Bold.ttf'),
    'Roboto-bold-italic': require('./assets/fonts/Roboto/Rubik-BoldItalic.ttf'),
    'Roboto-semi-bold': require('./assets/fonts/Roboto/Rubik-SemiBold.ttf'),
    'Roboto-semi-bold-italic': require('./assets/fonts/Roboto/Rubik-SemiBoldItalic.ttf'),
    'Roboto-extra-bold': require('./assets/fonts/Roboto/Rubik-ExtraBold.ttf'),
    'Roboto-extra-bold-italic': require('./assets/fonts/Roboto/Rubik-ExtraBoldItalic.ttf'),
    'Roboto-italic': require('./assets/fonts/Roboto/Rubik-Italic.ttf'),
    'Roboto-medium': require('./assets/fonts/Roboto/Rubik-Medium.ttf'),
    'Roboto-medium-italic': require('./assets/fonts/Roboto/Rubik-MediumItalic.ttf'),
    'Roboto-light': require('./assets/fonts/Roboto/Rubik-Light.ttf'),
    'Roboto-light-italic': require('./assets/fonts/Roboto/Rubik-LightItalic.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.rootScreen} onLayout={onLayoutRootView}>
        <AuthContextProvider>
          <Navigation />
        </AuthContextProvider>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    fontFamily: 'Roboto-regular',
  },
});
