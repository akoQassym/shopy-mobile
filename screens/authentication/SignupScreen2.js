import { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import auth from '@react-native-firebase/auth';

import {
  Text,
  PrimaryButton,
  Link,
  LoadingOverlay,
  TextField,
  InformBadge,
} from '../../components';
import { AuthContext, ShopContext } from '../../store';

const windowWidth = Dimensions.get('window').width;
const loaderWidth = windowWidth * 0.8;

const SignupScreen1 = ({ route }) => {
  const authCtx = useContext(AuthContext);
  const shopCtx = useContext(ShopContext);
  const { enteredShopName } = route.params;
  const [status, setStatus] = useState(null);

  const [enteredFullName, setEnteredFullName] = useState(null);
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('+7');
  const [enteredPassword, setEnteredPassword] = useState(null);
  const [enteredEmail, setEnteredEmail] = useState(null);

  const [errors, setErrors] = useState({
    phoneError: false,
    emailError: false,
    passwordError: false,
  });

  const changeSignUpDetails = (fieldName, value) => {
    switch (fieldName) {
      case 'fullName':
        setEnteredFullName(value);
        break;
      case 'phoneNumber':
        setEnteredPhoneNumber(value);
        break;
      case 'email':
        setEnteredEmail(value);
        break;
      case 'password':
        setEnteredPassword(value);
        break;
      default:
        return;
    }
  };

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^(\+7)([0-9]{3})(\d{7})$/;
    return phoneRegex.test(value);
  };

  const validateEmail = (value) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return value !== null && emailRegex.test(value);
  };

  const validatePassword = (value) => {
    return value !== null && value.length > 6 ? true : false;
  };

  const submit = async () => {
    const phoneValid = validatePhoneNumber(enteredPhoneNumber);
    const emailValid = validateEmail(enteredEmail);
    const passwordValid = validatePassword(enteredPassword);
    setErrors({
      phoneError: !phoneValid,
      emailError: !emailValid,
      passwordError: !passwordValid,
    });
    if (!phoneValid || !emailValid || !passwordValid) return;

    setStatus('creating');
    let isSignupSuccessful = false;
    const signupResponse = await authCtx
      .signup(
        enteredEmail,
        enteredPhoneNumber,
        enteredPassword,
        enteredFullName,
        enteredFullName,
        enteredShopName,
      )
      .then((res) => {
        isSignupSuccessful = true;
        return res;
      })
      .catch(() => {
        setStatus(null);
      });

    if (!isSignupSuccessful) return;

    setStatus('entering');
    try {
      const userRes = await auth().signInWithEmailAndPassword(
        enteredEmail,
        enteredPassword,
      );
      authCtx.setUser(
        userRes.user.displayName,
        userRes.user.email,
        userRes.user.phoneNumber,
        userRes.user.uid,
      );
      await shopCtx.fetchShopInfo(signupResponse.shopId);
      userRes.user
        .getIdToken(true)
        .then((token) => authCtx.authenticate(token));
    } catch (error) {
      setStatus(null);
      Alert.alert(
        'Ошибка при входе!',
        `Обратитесь в службу поддержки или попробуйте позже. ${error}`,
      );
    }
  };

  if (status === 'creating') {
    return <LoadingOverlay message="Создаем аккаунт..." />;
  } else if (status === 'entering')
    return <LoadingOverlay message="Входим в систему..." />;

  return (
    <View style={styles.root}>
      <View style={styles.screen}>
        <View style={styles.loadingSlider} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 94 : 0}
          enabled
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View>
              <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.title}>Создание аккаунта</Text>
                {errors.phoneError && (
                  <InformBadge
                    type="error"
                    errorHighlightedText="номер телефона (+7XXXXXXXXXX)"
                  />
                )}
                {errors.emailError && (
                  <InformBadge type="error" errorHighlightedText="email" />
                )}
                {errors.passwordError && (
                  <InformBadge
                    type="error"
                    customMessage="Пароль должен содержать больше 6 символов"
                  />
                )}
                <View style={styles.form}>
                  <TextField
                    placeholder="Имя и Фамилия"
                    iconType="user"
                    value={enteredFullName}
                    onUpdateValue={changeSignUpDetails.bind(this, 'fullName')}
                  />
                  <TextField
                    placeholder="Номер телефона"
                    iconType="phone"
                    value={enteredPhoneNumber}
                    onUpdateValue={changeSignUpDetails.bind(
                      this,
                      'phoneNumber',
                    )}
                    keyboardType="phone-pad"
                  />
                  <TextField
                    placeholder="Email"
                    iconType="email"
                    value={enteredEmail}
                    onUpdateValue={changeSignUpDetails.bind(this, 'email')}
                  />
                  <TextField
                    placeholder="Пароль"
                    iconType="password"
                    type="password"
                    value={enteredPassword}
                    onUpdateValue={changeSignUpDetails.bind(this, 'password')}
                    helperText="Должен содержать больше 6 символов"
                  />
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View style={styles.buttonContainer}>
          <View style={styles.supplementaryTextContainer}>
            <Text style={styles.supplementaryText}>
              У вас уже есть аккаунт?{' '}
            </Text>
            <Link to={{ screen: 'Login' }} replace>
              Войти
            </Link>
          </View>
          <PrimaryButton
            onPress={submit}
            disabled={
              !enteredFullName ||
              !enteredPhoneNumber ||
              !enteredEmail ||
              !enteredPassword
            }
          >
            Создать
          </PrimaryButton>
        </View>
      </View>
    </View>
  );
};

export default SignupScreen1;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
    backgroundColor: GlobalStyles.colors.white,
  },
  screen: {
    flex: 1,
    justifyContent: 'space-between',
  },
  loadingSlider: {
    position: 'absolute',
    left: -18,
    top: 0,
    width: loaderWidth,
    height: 5,
    backgroundColor: GlobalStyles.colors.primary,
    zIndex: 10,
  },
  content: {
    paddingTop: 70,
  },
  title: {
    fontSize: 25,
    fontFamily: 'Roboto-semi-bold',
    textAlign: 'left',
    marginBottom: 15,
    width: 320,
  },
  form: {
    paddingVertical: 15,
    marginBottom: 70,
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
