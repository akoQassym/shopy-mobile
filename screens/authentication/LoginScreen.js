import { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Text,
  Link,
  LoadingOverlay,
  PrimaryButton,
  TextField,
  InformBadge,
} from '../../components';
import { AuthContext, ShopContext } from '../../store';

const LoginScreen = () => {
  const authCtx = useContext(AuthContext);
  const shopCtx = useContext(ShopContext);
  const [status, setStatus] = useState(null);

  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('+7');
  const [enteredPassword, setEnteredPassword] = useState(null);
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const changePhoneNumber = (value) => setEnteredPhoneNumber(value);
  const changePassword = (value) => setEnteredPassword(value);

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^(\+7)([0-9]{3})(\d{7})$/;
    return phoneRegex.test(value);
  };

  const validatePassword = (value) => {
    return value !== null && value.length > 6;
  };

  const submit = async () => {
    const phoneValid = validatePhoneNumber(enteredPhoneNumber);
    const passwordValid = validatePassword(enteredPassword);
    if (!phoneValid || !passwordValid) {
      if (!phoneValid) setPhoneError(true);
      if (!passwordValid) setPasswordError(true);
      return;
    }
    if (phoneValid) setPhoneError(false);
    if (passwordValid) setPasswordError(false);

    setStatus('authenticating');
    try {
      const email = await functions().httpsCallable('getEmailByPhoneNumber')({
        phoneNumber: enteredPhoneNumber,
      });
      const userRes = await auth().signInWithEmailAndPassword(
        email.data.email,
        enteredPassword,
      );
      setStatus('retrievingData');
      const userDisplayName = userRes.user.displayName;
      const userEmail = userRes.user.email;
      const userPhoneNumber = userRes.user.phoneNumber;
      const userUID = userRes.user.uid;
      authCtx.setUser(userDisplayName, userEmail, userPhoneNumber, userUID);
      const shopsRes = await functions().httpsCallable('getShops')();
      shopCtx.setShopsList(shopsRes.data);
      await shopCtx.fetchShopInfo(shopsRes.data[0]);
      await userRes.user.getIdToken(true).then(async (token) => {
        try {
          await AsyncStorage.setItem(
            'user',
            JSON.stringify({
              displayName: userDisplayName,
              email: userEmail,
              phoneNumber: userPhoneNumber,
              uid: userUID,
            }),
          );
          await AsyncStorage.setItem('shopId', shopsRes.data[0]);
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('loggedIn', JSON.stringify(true));
        } catch (e) {
          console.log('Ошибка при сохранении данных!');
        }
        authCtx.authenticate(token);
      });
    } catch (error) {
      setStatus(null);
      Alert.alert('Ошибка при входе!', error.toString());
    }
  };

  if (status === 'authenticating') {
    return <LoadingOverlay message="Verifying the user..." />;
  } else if (status === 'retrievingData') {
    return <LoadingOverlay message="Loading your storefront..." />;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.root}
      >
        <View style={styles.content}>
          <View>
            <Text style={styles.title}>
              Good to see you again, please login
            </Text>
            {phoneError && (
              <InformBadge
                type="error"
                errorHighlightedText="Phone number (+7XXXXXXXXXX)"
              />
            )}
            {passwordError && (
              <InformBadge
                type="error"
                customMessage="Password must contain more than 6 characters"
              />
            )}
            <View style={styles.form}>
              <TextField
                placeholder="Phone number"
                iconType="phone"
                onUpdateValue={changePhoneNumber}
                value={enteredPhoneNumber}
                keyboardType="phone-pad"
              />
              <TextField
                placeholder="Password"
                type="password"
                iconType="password"
                onUpdateValue={changePassword}
                value={enteredPassword}
              />
            </View>
            <Link
              style={[styles.supplementaryText, { textAlign: 'right' }]}
              to={{ screen: 'PasswordReset' }}
            >
              Forgot your password?
            </Link>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.supplementaryTextContainer}>
              <Text style={styles.supplementaryText}>
                You don't have an account?{' '}
                <Link to={{ screen: 'Signup1' }} replace>
                  Sign up
                </Link>
              </Text>
            </View>
            <PrimaryButton
              onPress={submit}
              disabled={!enteredPhoneNumber || !enteredPassword}
            >
              Login
            </PrimaryButton>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
    backgroundColor: GlobalStyles.colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 25,
    fontFamily: 'Roboto-semi-bold',
    textAlign: 'left',
    marginTop: 100,
    marginBottom: 25,
    width: 320,
  },
  form: {
    paddingVertical: 15,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  supplementaryTextContainer: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  supplementaryText: {
    textAlign: 'center',
    color: GlobalStyles.colors.darkGray,
  },
});
