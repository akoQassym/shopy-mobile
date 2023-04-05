import { View, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PrimaryButton, Text } from '../../components';

const PasswordResetScreen = () => {
  const whatsappShopy = () => {
    Linking.openURL(
      `https://wa.me/77474801027?text=Здравствуйте!%20Хочу%20восстановить%20пароль%20от%20своего%20аккаунта`,
    );
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Восстановление пароля</Text>
      <Text style={styles.text}>
        Напишите нам в WhatsApp и наша команда поможет вам с восстановлением
        пароля
      </Text>
      <PrimaryButton
        style={styles.btn}
        onPress={whatsappShopy}
        iconBefore={<Ionicons name="logo-whatsapp" size={24} color="white" />}
      >
        Написать
      </PrimaryButton>
    </View>
  );
};

export default PasswordResetScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Roboto-medium',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
  },
  btn: {
    marginVertical: 10,
    paddingHorizontal: 30,
  },
});
