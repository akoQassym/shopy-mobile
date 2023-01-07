import { useState, useContext } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { AuthContext } from '../../store/authContext';
import { GlobalStyles } from '../../constants/styles';

import PrimaryButton from '../../components/ui/buttons/PrimaryButton';
import Link from '../../components/ui/Link';
import TextField from '../../components/form/TextField';
import LoadingOverlay from '../../components/ui/LoadingOverlay';

const LoginScreen = () => {
  const authCtx = useContext(AuthContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [enteredPhone, setEnteredPhone] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const recaptchaVerifier = useRef(null);

  const updateInputValueHandler = (inputType, enteredValue) => {
    switch (inputType) {
      case 'phone':
        setEnteredPhone(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
    }
  };

  const login = async (phone, password) => {
    console.log('signing in...', phone, password);
    return 'token123';
  };

  const handleLogin = async ({ phone, password }) => {
    setIsAuthenticating(true);
    try {
      const token = await login(phone, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert('Authentication failed!', 'Please check your credentials');
      setIsAuthenticating(false);
    }
  };

  const submitHandler = () => {
    const phone = enteredPhone.trim();
    const password = enteredPassword.trim();

    // Validation
    const demoIsValid = true;

    if (!demoIsValid) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      return;
    }
    handleLogin({ phone, password });
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Сверяем данные..." />;
  }

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>
            Рады видеть вас снова, войдите в систему
          </Text>
          <TextField
            placeholder="Номер телефона"
            iconType="phone"
            onUpdateValue={updateInputValueHandler.bind(this, 'phone')}
            value={enteredPhone}
          />
          <TextField
            placeholder="Пароль"
            type={'password'}
            iconType="password"
            onUpdateValue={updateInputValueHandler.bind(this, 'password')}
            value={enteredPassword}
          />
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
          <PrimaryButton onPress={submitHandler}>Войти</PrimaryButton>
        </View>
      </View>
    </View>
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
    marginBottom: 40,
    width: 320,
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
    color: GlobalStyles.colors.gray300,
  },
});
