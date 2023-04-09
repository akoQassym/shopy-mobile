import { View, StyleSheet, Dimensions, Linking } from 'react-native';
import {
  Text,
  PrimaryButton,
  Link,
  ProgressiveImage,
  PressableContainer,
} from '../../components';
import { GlobalStyles } from '../../constants/styles';

const windowHeight = Dimensions.get('window').height;

const WelcomeScreen = ({ navigation }) => {
  const proceedToNextPage = () => {
    navigation.navigate('Signup1');
  };

  const openPrivacyPolicy = () => {
    Linking.openURL(
      'https://www.privacypolicies.com/live/795bc214-e653-4a88-8183-2cabd322c39a',
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.imageContainer}>
        <ProgressiveImage
          source={
            windowHeight < 700
              ? require('../../assets/images/welcomeBanner1.jpg')
              : require('../../assets/images/welcomeBanner2.jpg')
          }
          style={styles.image}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.welcomeText}>
          <Text style={styles.title}>Онлайн-магазин за 3 минуты</Text>
          <Text style={styles.subtitle}>
            Запусти сайт для своего бизнеса, прикрепи к Instagram и Whatsapp, и
            получай заказы
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.supplementaryTextContainer}>
            <Text style={styles.supplementaryText}>
              У вас уже есть аккаунт?{' '}
            </Text>
            <Link to={{ screen: 'Login' }}>Логин</Link>
          </View>
          <PrimaryButton onPress={proceedToNextPage}>
            Создать аккаунт
          </PrimaryButton>
          <PressableContainer
            style={{ marginTop: 10 }}
            onPress={openPrivacyPolicy}
          >
            <Text
              style={[
                styles.supplementaryText,
                { fontSize: 10, textDecorationLine: 'underline' },
              ]}
            >
              Политика конфиденциальности
            </Text>
          </PressableContainer>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
    backgroundColor: GlobalStyles.colors.white,
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: 10,
    width: '100%',
    height: windowHeight < 700 ? 200 : 300,
    marginVertical: 15,
  },
  image: {
    width: '100%',
    height: windowHeight < 700 ? 200 : 300,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  welcomeText: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Roboto-semi-bold',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 20,
    width: 320,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    width: 290,
    color: GlobalStyles.colors.darkGray,
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
