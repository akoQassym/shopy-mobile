import { createContext, useContext, useState } from 'react';
import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SnackbarContext } from './snackbarContext';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  user: {
    fullName: '',
    email: '',
    phoneNumber: '',
    uid: '',
  },
  authenticate: (token) => {},
  signup: async (
    email,
    phoneNumber,
    password,
    displayName,
    fullName,
    shopName,
  ) => {},
  setUser: () => {},
  editUserInfo: async (fullName) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const snackbarCtx = useContext(SnackbarContext);
  const [token, setToken] = useState();
  const [userInfo, setUserInfo] = useState();

  const signup = async (
    email,
    phoneNumber,
    password,
    displayName,
    fullName,
    shopName,
  ) => {
    const response = await functions()
      .httpsCallable('signup')({
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        displayName: displayName,
        fullName: fullName,
        shopName: shopName,
      })
      .catch((error) => {
        snackbarCtx.createSnackbar(
          'error',
          fullName,
          `Sign up error! (${error})`,
          3500,
        );
      });

    return response.data;
  };

  const authenticate = (token) => {
    setToken(token);
  };

  const setUser = (displayName, email, phoneNumber, uid) => {
    setUserInfo({
      fullName: displayName,
      email: email,
      phoneNumber: phoneNumber,
      uid: uid,
    });
  };

  const editUserInfo = async (fullName) => {
    const response = await functions()
      .httpsCallable('updateUserInfo')({
        fullName: fullName,
      })
      .catch((error) => {
        snackbarCtx.createSnackbar(
          'error',
          fullName,
          `Sign up error! (${error})`,
          3500,
        );
      });

    return response.data;
  };

  const logout = () => {
    const removeCredentials = async () => {
      try {
        await AsyncStorage.removeItem('shopId');
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('loggedIn');
      } catch (e) {
        console.log('There was an error when logging out of the account', e);
      }
    };
    removeCredentials();
    auth().signOut();
    setToken(null);
    setUserInfo(null);
  };

  const value = {
    token: token,
    isAuthenticated: !!token,
    user: userInfo,
    signup: signup,
    authenticate: authenticate,
    setUser: setUser,
    editUserInfo: editUserInfo,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
