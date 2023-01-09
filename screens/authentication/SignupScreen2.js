import { useContext } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import PrimaryButton from '../../components/ui/buttons/PrimaryButton';
import Link from '../../components/ui/Link';
import TextField from '../../components/form/TextField';

import { GlobalStyles } from '../../constants/styles';
import { AuthContext } from '../../store/authContext';

const windowWidth = Dimensions.get('window').width;
const loaderWidth = windowWidth * 0.8;

const SignupScreen1 = ({ navigation }) => {
  const authCtx = useContext(AuthContext);

  const onSubmit = () => {
    authCtx.authenticate('HelloWorldToken');
    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [
    //       {
    //         name: 'BottomTabs',
    //       },
    //     ],
    //   }),
    // );
  };

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <View style={styles.loadingSlider} />
        <View>
          <Text style={styles.title}>Создание аккаунта</Text>
          <TextField placeholder="Имя" iconType="user" />
          <TextField placeholder="Фамилия" iconType="user" />
          <TextField placeholder="Номер телефона" iconType="phone" />
          <TextField placeholder="Пароль" iconType="password" />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.supplementaryTextContainer}>
            <Text style={styles.supplementaryText}>
              У вас уже есть аккаунт?{' '}
            </Text>
            <Link to={{ screen: 'Login' }} replace>
              Войти
            </Link>
          </View>
          <PrimaryButton onPress={onSubmit}>Создать</PrimaryButton>
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
  content: {
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
