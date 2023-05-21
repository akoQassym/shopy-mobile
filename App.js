import { useCallback, useContext, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  View,
  Platform,
  NativeModules,
  UIManager,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { firebase } from '@react-native-firebase/analytics';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import {
  AuthContextProvider,
  AuthContext,
  SnackbarContextProvider,
  SnackbarContext,
  ShopContextProvider,
  CatalogContextProvider,
} from './store';
import { SnackbarGroup } from './components';
import AuthenticationStack from './navigation/AuthenticationStack';
import BottomTabsNavigation from './navigation/BottomTabsNavigation';
import OrderContextProvider from './store/orderContext';

const { StatusBarManager } = NativeModules;

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Navigation = () => {
  const authCtx = useContext(AuthContext);
  const snackbarCtx = useContext(SnackbarContext);

  return (
    <NavigationContainer>
      {snackbarCtx.snackbar && snackbarCtx.snackbar.length > 0 && (
        <SnackbarGroup data={snackbarCtx.snackbar} />
      )}
      {authCtx.isAuthenticated ? (
        <BottomTabsNavigation />
      ) : (
        <AuthenticationStack />
      )}
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

  useEffect(() => {
    (async () => {
      const { status } = await requestTrackingPermissionsAsync();
      if (status === 'granted') {
        await firebase.analytics().setAnalyticsCollectionEnabled(true);
      }
    })();
  }, []);

  if (!fontsLoaded) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <SafeAreaView style={[styles.rootScreen]} onLayout={onLayoutRootView}>
        <SnackbarContextProvider>
          <AuthContextProvider>
            <ShopContextProvider>
              <CatalogContextProvider>
                <OrderContextProvider>
                  <Navigation />
                </OrderContextProvider>
              </CatalogContextProvider>
            </ShopContextProvider>
          </AuthContextProvider>
        </SnackbarContextProvider>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    fontFamily: 'Roboto-regular',
    paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,
  },
});
