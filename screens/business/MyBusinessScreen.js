import { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import PressableContainer from '../../components/ui/PressableContainer';
import PrimaryButton from '../../components/ui/buttons/PrimaryButton';
import { GlobalStyles } from '../../constants/styles';

const MyBusinessScreen = ({ navigation }) => {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync('https://iris.shopy.ws/')
      .then(() => setCopiedToClipboard(true))
      .then(() =>
        setTimeout(() => {
          setCopiedToClipboard(false);
        }, 3000),
      );
  };

  const onOpenEditBusinessInfo = () => {
    navigation.navigate('EditBusinessInfoScreen');
  };

  const onOpenEditDesign = () => {
    navigation.navigate('EditDesignScreen');
  };

  return (
    <ScrollView style={styles.root}>
      <View style={styles.screenView}>
        <View style={[styles.section, styles.header]}>
          <Text style={styles.companyName}>IRIS cosmetics</Text>
          <View style={styles.websiteContainer}>
            <Text style={styles.introText}>Ссылка на сайт вашего бизнеса:</Text>
            <View
              style={[
                styles.linkContainer,
                copiedToClipboard && {
                  backgroundColor: GlobalStyles.colors.green300,
                },
              ]}
            >
              <Text style={styles.link}>https://iris.shopy.ws/</Text>
              <PressableContainer onPress={copyToClipboard}>
                {!copiedToClipboard ? (
                  <Ionicons
                    name="copy-outline"
                    size={18}
                    color={GlobalStyles.colors.white}
                  />
                ) : (
                  <MaterialIcons
                    name="file-download-done"
                    size={19}
                    color={GlobalStyles.colors.white}
                  />
                )}
              </PressableContainer>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Информация о магазине</Text>
            <PressableContainer onPress={onOpenEditBusinessInfo}>
              <Ionicons
                name="arrow-forward-circle-sharp"
                size={30}
                color={GlobalStyles.colors.black}
              />
            </PressableContainer>
          </View>
          <View style={styles.sectionContent}>
            <View style={styles.infoElementContainer}>
              <Text style={styles.infoTitle}>Название</Text>
              <Text style={styles.infoElement}>IRIS cosmetics</Text>
            </View>
            <View style={styles.infoElementContainer}>
              <Text style={styles.infoTitle}>Адрес</Text>
              <Text style={styles.infoElement}>
                г. Астана, ул. Кабанбай батыра, 5
              </Text>
            </View>
            <View style={styles.infoElementContainer}>
              <Text style={styles.infoTitle}>Рабочее время</Text>
              <Text style={styles.infoElement}>Пон-Пят, 9.00 - 18.00</Text>
            </View>
            <View style={styles.infoElementContainer}>
              <Text style={styles.infoTitle}>Ссылка на соц. сети</Text>
              <Text style={styles.infoElement}>Instagram, Whatsapp</Text>
            </View>
            <View
              style={[styles.infoElementContainer, { borderBottomWidth: 0 }]}
            >
              <Text style={styles.infoTitle}>Дополнительная информация</Text>
              <Text style={styles.infoElement}>-</Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Дизайн сайта</Text>
            <PressableContainer onPress={onOpenEditDesign}>
              <Ionicons
                name="arrow-forward-circle-sharp"
                size={30}
                color={GlobalStyles.colors.black}
              />
            </PressableContainer>
          </View>
          <View style={styles.sectionContent}>
            <View
              style={[
                styles.infoElementContainer,
                styles.flexHorizontalContainer,
              ]}
            >
              <Text style={[styles.infoTitle, styles.flexHorizontalElement]}>
                Акцентирующий цвет
              </Text>
              <Text style={[styles.infoElement, styles.flexHorizontalElement]}>
                <View
                  style={[styles.colorView, { backgroundColor: '#ECAFF3' }]}
                />
              </Text>
            </View>
            <View
              style={[
                styles.infoElementContainer,
                styles.flexHorizontalContainer,
              ]}
            >
              <Text style={[styles.infoTitle, styles.flexHorizontalElement]}>
                Лого
              </Text>
              <Text style={[styles.infoElement, styles.flexHorizontalElement]}>
                <View style={styles.logoContainer}>
                  <Image
                    source={require('../../assets/images/sampleLogo.jpg')}
                    style={styles.logo}
                  />
                </View>
              </Text>
            </View>
            <View
              style={[
                styles.infoElementContainer,
                styles.flexHorizontalContainer,
                { borderBottomWidth: 0 },
              ]}
            >
              <Text style={[styles.infoTitle, styles.flexHorizontalElement]}>
                Задний фон
              </Text>
              <Text style={[styles.infoElement, styles.flexHorizontalElement]}>
                <View style={styles.bgBannerContainer}>
                  <Image
                    source={require('../../assets/images/sampleBgBanner.jpg')}
                    style={styles.bgBanner}
                  />
                </View>
              </Text>
            </View>
          </View>
        </View>
        <View>
          <PrimaryButton>Оставить отзыв</PrimaryButton>
          <PrimaryButton
            style={styles.logoutButton}
            textStyle={styles.logoutButtonText}
          >
            Выйти
          </PrimaryButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default MyBusinessScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
  },
  screenView: {
    marginBottom: 20,
  },
  section: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: GlobalStyles.colors.white,
    borderRadius: 10,
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: GlobalStyles.colors.black,
    fontFamily: 'Roboto-medium',
    maxWidth: '80%',
    fontSize: 25,
  },
  sectionContent: {
    marginTop: 7,
  },
  header: {
    marginTop: 15,
    backgroundColor: GlobalStyles.colors.deepBlack,
    paddingVertical: 30,
  },
  companyName: {
    fontSize: 32,
    fontFamily: 'Roboto-semi-bold',
    textAlign: 'left',
    color: GlobalStyles.colors.white,
  },
  websiteContainer: {
    marginTop: 15,
  },
  introText: {
    color: GlobalStyles.colors.white,
    marginVertical: 10,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: GlobalStyles.colors.primary500,
    padding: 20,
  },
  link: {
    fontFamily: 'Roboto-medium',
    color: GlobalStyles.colors.white,
    maxWidth: '80%',
  },
  infoElementContainer: {
    flexDirection: 'column',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.gray200,
  },
  flexHorizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexHorizontalElement: {
    maxWidth: '50%',
  },
  infoTitle: {
    fontSize: 18,
  },
  infoElement: {
    fontSize: 14,
    marginTop: 8,
  },
  colorView: {
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    overflow: 'hidden',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  bgBannerContainer: {
    width: 160,
    height: 90,
    borderRadius: 5,
    overflow: 'hidden',
  },
  bgBanner: {
    width: '100%',
    height: '100%',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: GlobalStyles.colors.error500,
    borderRadius: 10,
  },
  logoutButtonText: {
    color: GlobalStyles.colors.error500,
  },
});
