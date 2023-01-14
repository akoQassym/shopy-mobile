import { useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';

import PrimaryButton from '../../components/ui/buttons/PrimaryButton';
import Link from '../../components/ui/Link';
import TextField from '../../components/form/TextField';
import LoadingOverlay from '../../components/ui/LoadingOverlay';

import { GlobalStyles } from '../../constants/styles';
import { AuthContext } from '../../store/authContext';
import InformBadge from '../../components/form/InformBadge';

const windowWidth = Dimensions.get('window').width;
const loaderWidth = windowWidth * 0.8;

const SignupScreen1 = ({ navigation, route }) => {
  const authCtx = useContext(AuthContext);
  const { enteredShopName } = route.params;
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [enteredName, setEnteredName] = useState(null);
  const [enteredSurname, setEnteredSurname] = useState(null);
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState(null);
  const [enteredPassword, setEnteredPassword] = useState(null);
  const [enteredEmail, setEnteredEmail] = useState(null);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const changeName = (value) => setEnteredName(value);
  const changeSurname = (value) => setEnteredSurname(value);
  const changePhoneNumber = (value) => setEnteredPhoneNumber(value);
  const changeEmail = (value) => setEnteredEmail(value);
  const changePassword = (value) => setEnteredPassword(value);

  const validatePhoneNumber = (value) => {
    const phoneRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phoneRegex.test(value);
  };

  const validateEmail = (value) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return value !== null && emailRegex.test(value);
  };

  const validatePassword = (value) => {
    return value !== null && value.length > 6;
  };

  const submit = async () => {
    const phoneValid = validatePhoneNumber(enteredPhoneNumber);
    const emailValid = validateEmail(enteredEmail);
    const passwordValid = validatePassword(enteredPassword);
    if (!phoneValid || !passwordValid || !emailValid) {
      if (!phoneValid) setPhoneError(true);
      if (!emailValid) setEmailError(true);
      if (!passwordValid) setPasswordError(true);
      return;
    }
    if (phoneValid) setPhoneError(false);
    if (emailValid) setEmailError(false);
    if (passwordValid) setPasswordError(false);

    setIsCreatingAccount(true);
    await functions()
      .httpsCallable('signup')({
        email: enteredEmail,
        phoneNumber: enteredPhoneNumber,
        password: enteredPassword,
        displayName: enteredName,
        name: enteredName,
        surname: enteredSurname,
        shopName: enteredShopName,
      })
      .then((response) => {
        console.log(response);
        setIsCreatingAccount(false);
      })
      .catch((error) => {
        console.log(error);
        setIsCreatingAccount(false);
        Alert.alert(
          'Ошибка при регистрации!',
          'Обратитесь в службу поддержки или попробуйте позже.',
        );
        return;
      });

    setIsAuthenticating(true);
    await auth()
      .signInWithEmailAndPassword(enteredEmail, enteredPassword)
      .then((token) => {
        console.log(token.user);
        setIsAuthenticating(false);
        authCtx.authenticate(token.user);
      })
      .catch((error) => {
        console.log(error);
        setIsAuthenticating(false);
        Alert.alert(
          'Ошибка при входе!',
          'Обратитесь в службу поддержки или попробуйте позже.',
        );
      });
  };

  if (isCreatingAccount) {
    return <LoadingOverlay message="Создаем аккаунт..." />;
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Входим в систему..." />;
  }

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
                {phoneError && (
                  <InformBadge
                    type="error"
                    errorHighlightedText="номер телефона"
                  />
                )}
                {emailError && (
                  <InformBadge type="error" errorHighlightedText="email" />
                )}
                {passwordError && (
                  <InformBadge
                    type="error"
                    customMessage="Пароль должен содержать больше 6 символов"
                  />
                )}
                <View style={styles.form}>
                  <TextField
                    placeholder="Имя"
                    iconType="user"
                    value={enteredName}
                    onUpdateValue={changeName}
                  />
                  <TextField
                    placeholder="Фамилия"
                    iconType="user"
                    value={enteredSurname}
                    onUpdateValue={changeSurname}
                  />
                  <TextField
                    placeholder="Номер телефона"
                    iconType="phone"
                    value={enteredPhoneNumber}
                    onUpdateValue={changePhoneNumber}
                    keyboardType="phone-pad"
                  />
                  <TextField
                    placeholder="Email"
                    iconType="email"
                    value={enteredEmail}
                    onUpdateValue={changeEmail}
                  />
                  <TextField
                    placeholder="Пароль"
                    iconType="password"
                    type="password"
                    value={enteredPassword}
                    onUpdateValue={changePassword}
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
              enteredName === null ||
              enteredSurname === null ||
              enteredPhoneNumber === null ||
              enteredEmail === null ||
              enteredPassword === null
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
    backgroundColor: GlobalStyles.colors.primary400,
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
    color: GlobalStyles.colors.gray300,
  },
});
