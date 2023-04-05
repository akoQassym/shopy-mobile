import { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';

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
      authCtx.setUser(
        userRes.user.displayName,
        userRes.user.email,
        userRes.user.phoneNumber,
        userRes.user.uid,
      );
      const shopsRes = await functions().httpsCallable('getShops')();
      shopCtx.setShopsList(shopsRes.data);
      await shopCtx.fetchShopInfo(shopsRes.data[0]);
      await userRes.user.getIdToken(true).then((token) => {
        authCtx.authenticate(token);
      });
    } catch (error) {
      setStatus(null);
      Alert.alert('Ошибка при входе!', error.toString());
    }
  };

  if (status === 'authenticating') {
    return <LoadingOverlay message="Сверяем данные..." />;
  } else if (status === 'retrievingData') {
    return <LoadingOverlay message="Загружаем ваш магазин..." />;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        <View style={styles.content}>
          <View>
            <Text style={styles.title}>
              Рады видеть вас снова, войдите в систему
            </Text>
            {phoneError && (
              <InformBadge
                type="error"
                errorHighlightedText="номер телефона (+7XXXXXXXXXX)"
              />
            )}
            {passwordError && (
              <InformBadge
                type="error"
                customMessage="Пароль должен содержать больше 6 символов"
              />
            )}
            <View style={styles.form}>
              <TextField
                placeholder="Номер телефона"
                iconType="phone"
                onUpdateValue={changePhoneNumber}
                value={enteredPhoneNumber}
                keyboardType="phone-pad"
              />
              <TextField
                placeholder="Пароль"
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
              Забыли пароль?
            </Link>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.supplementaryTextContainer}>
              <Text style={styles.supplementaryText}>
                У вас нет аккаунта?{' '}
                <Link to={{ screen: 'Signup1' }} replace>
                  Регистрация
                </Link>
              </Text>
            </View>
            <PrimaryButton
              onPress={submit}
              disabled={!enteredPhoneNumber || !enteredPassword}
            >
              Войти
            </PrimaryButton>
          </View>
        </View>
      </View>
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
