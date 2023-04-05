import { createContext, useContext, useState } from 'react';
import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';
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
          `Ошибка при регистрации! (${error})`,
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
          `Ошибка при регистрации! (${error})`,
          3500,
        );
      });

    return response.data;
  };

  const logout = () => {
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
