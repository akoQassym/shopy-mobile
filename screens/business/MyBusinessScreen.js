import { useContext, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Linking,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import * as Clipboard from 'expo-clipboard';
import { GlobalStyles } from '../../constants/styles';
import {
  IconButton,
  Text,
  HintBox,
  PressableContainer,
} from '../../components';
import { AuthContext, ShopContext, CatalogContext } from '../../store';

const MyBusinessScreen = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const shopCtx = useContext(ShopContext);
  const catalogCtx = useContext(CatalogContext);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const shopInfo = {
    shopName: shopCtx.shopInfo?.shopName ?? '-',
    subdomain: shopCtx.shopInfo?.subdomain ?? null,
    websiteActivated: shopCtx.shopInfo?.websiteActivated ?? null,
    description: shopCtx.shopInfo?.description ?? '-',
    address: shopCtx.shopInfo?.address ?? '-',
    workingHours: shopCtx.shopInfo?.workingHours ?? '-',
    phoneNumber: shopCtx.shopInfo?.phoneNumber ?? '-',
    instagram: shopCtx.shopInfo?.instagram ?? '-',
    whatsapp: shopCtx.shopInfo?.whatsapp ?? '-',
    telegram: shopCtx.shopInfo?.telegram ?? '-',
    twoGis: shopCtx.shopInfo?.twoGis ?? '-',
    colorAccent: shopCtx.shopInfo?.colorAccent ?? null,
    logo: shopCtx.shopInfo?.logo ?? null,
    backgroundBanner: shopCtx.shopInfo?.backgroundBanner ?? null,
    links: shopCtx.shopInfo?.links ?? null,
  };

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await shopCtx.fetchShopInfo();
    setIsRefreshing(false);
  }, []);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(`https://${shopInfo.subdomain}.shopy.ws/`)
      .then(() => setCopiedToClipboard(true))
      .then(() =>
        setTimeout(() => {
          setCopiedToClipboard(false);
        }, 3000),
      );
  };

  const openWebsite = () => {
    Linking.openURL(`https://${shopInfo.subdomain}.shopy.ws/`);
  };

  const navigateToScreen = (screen) => {
    switch (screen) {
      case 'editSubdomain':
        navigation.navigate('EditSubdomainScreen');
        break;
      case 'editBusinessInfo':
        navigation.navigate('EditBusinessInfoScreen');
        break;
      case 'editContactDetails':
        navigation.navigate('EditContactDetailsScreen');
        break;
      case 'editDesign':
        navigation.navigate('EditDesignScreen');
        break;
      case 'editLinks':
        navigation.navigate('EditLinksScreen');
        break;
      default:
        return;
    }
  };

  return (
    <ScrollView
      style={styles.root}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.screenView}>
        <View
          style={[
            styles.section,
            styles.header,
            shopInfo.colorAccent && {
              borderColor: shopInfo.colorAccent,
              borderWidth: 3,
            },
          ]}
        >
          <Text style={[styles.companyName]}>{shopInfo.shopName}</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your store's website</Text>
            <IconButton
              icon="ionicons"
              name="arrow-forward-circle-sharp"
              size={30}
              color={GlobalStyles.colors.black}
              onPress={navigateToScreen.bind(this, 'editSubdomain')}
            />
          </View>
          <View>
            {!shopInfo.websiteActivated && !shopInfo.subdomain ? (
              <View style={styles.websiteActivationWarningContainer}>
                <IconButton
                  icon="material"
                  name="warning"
                  size={18}
                  color={GlobalStyles.colors.warning}
                />
                <Text style={{ marginLeft: 10 }}>
                  To activate, specify the{' '}
                  <Text style={{ fontFamily: 'Roboto-medium' }}>domain</Text> -
                  the name of your website
                </Text>
              </View>
            ) : (
              <View
                style={[
                  styles.linkContainer,
                  copiedToClipboard && {
                    backgroundColor: GlobalStyles.colors.success,
                  },
                ]}
              >
                <PressableContainer
                  onPress={openWebsite}
                  style={styles.linkUnderline}
                >
                  <Text style={styles.link}>
                    https://
                    {shopInfo.subdomain}
                    .shopy.ws/
                  </Text>
                </PressableContainer>
                {!copiedToClipboard ? (
                  <IconButton
                    icon="ionicons"
                    name="copy-outline"
                    size={18}
                    color={GlobalStyles.colors.white}
                    onPress={copyToClipboard}
                  />
                ) : (
                  <IconButton
                    icon="material"
                    name="file-download-done"
                    size={19}
                    color={GlobalStyles.colors.white}
                  />
                )}
              </View>
            )}
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Store information</Text>
            <IconButton
              icon="ionicons"
              name="arrow-forward-circle-sharp"
              size={30}
              color={GlobalStyles.colors.black}
              onPress={navigateToScreen.bind(this, 'editBusinessInfo')}
            />
          </View>
          <HintBox
            style={styles.hintBox}
            label="Up-to-date information about your store will be displayed on the website"
          />
          <View style={styles.infoElementContainer}>
            <Text style={styles.infoTitle}>Name</Text>
            <View style={styles.infoElement}>
              <Text style={styles.infoElementText}>{shopInfo.shopName}</Text>
            </View>
          </View>
          <View style={styles.infoElementContainer}>
            <Text style={styles.infoTitle}>Description</Text>
            <View style={styles.infoElement}>
              <Text style={styles.infoElementText}>{shopInfo.description}</Text>
            </View>
          </View>
          <View style={styles.sectionContent}>
            <View style={styles.infoElementContainer}>
              <Text style={styles.infoTitle}>Address</Text>
              <View style={styles.infoElement}>
                <Text style={styles.infoElementText}>{shopInfo.address}</Text>
              </View>
            </View>
            <View style={[styles.infoElementContainer, styles.last]}>
              <Text style={styles.infoTitle}>Working Hours</Text>
              <View style={styles.infoElement}>
                <Text style={styles.infoElementText}>
                  {shopInfo.workingHours}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Contact details</Text>
            <IconButton
              icon="ionicons"
              name="arrow-forward-circle-sharp"
              size={30}
              color={GlobalStyles.colors.black}
              onPress={navigateToScreen.bind(this, 'editContactDetails')}
            />
          </View>
          <HintBox
            style={styles.hintBox}
            label="Provide contact information so that customers can easily get in touch with you"
          />
          <View style={styles.infoElementContainer}>
            <Text style={styles.infoTitle}>Phone number</Text>
            <View style={styles.infoElement}>
              <IconButton
                icon="feather"
                name="phone"
                size={16}
                color={GlobalStyles.colors.black}
                style={styles.infoElementIcon}
              />
              <Text style={styles.infoElementText}>{shopInfo.phoneNumber}</Text>
            </View>
          </View>
          <View style={styles.infoElementContainer}>
            <Text style={styles.infoTitle}>WhatsApp</Text>
            <View style={styles.infoElement}>
              <IconButton
                icon="ionicons"
                name="logo-whatsapp"
                size={18}
                color={GlobalStyles.colors.black}
                style={styles.infoElementIcon}
              />
              <Text style={styles.infoElementText}>{shopInfo.whatsapp}</Text>
            </View>
          </View>
          <View style={styles.infoElementContainer}>
            <Text style={styles.infoTitle}>Instagram</Text>
            <View style={styles.infoElement}>
              <IconButton
                icon="ionicons"
                name="logo-instagram"
                size={18}
                color={GlobalStyles.colors.black}
                style={styles.infoElementIcon}
              />
              <Text style={styles.infoElementText}>{shopInfo.instagram}</Text>
            </View>
          </View>
          <View style={styles.infoElementContainer}>
            <Text style={styles.infoTitle}>Telegram</Text>
            <View style={styles.infoElement}>
              <IconButton
                icon="fontAwesome5"
                name="telegram-plane"
                size={18}
                color={GlobalStyles.colors.black}
                style={styles.infoElementIcon}
              />
              <Text style={styles.infoElementText}>{shopInfo.telegram}</Text>
            </View>
          </View>
          <View style={[styles.infoElementContainer, styles.last]}>
            <Text style={styles.infoTitle}>2Gis</Text>
            <View style={styles.infoElement}>
              <IconButton
                icon="foundation"
                name="map"
                size={18}
                color={GlobalStyles.colors.black}
                style={styles.infoElementIcon}
              />
              <Text style={styles.infoElementText}>{shopInfo.twoGis}</Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Website design</Text>
            <IconButton
              icon="ionicons"
              name="arrow-forward-circle-sharp"
              size={30}
              color={GlobalStyles.colors.black}
              onPress={navigateToScreen.bind(this, 'editDesign')}
            />
          </View>
          <HintBox
            style={styles.hintBox}
            label="Personalize your website by changing the design"
          />
          <View style={styles.sectionContent}>
            <View
              style={[
                styles.infoElementContainer,
                styles.flexHorizontalContainer,
              ]}
            >
              <Text style={[styles.infoTitle, styles.flexHorizontalElement]}>
                Accent color
              </Text>
              <Text
                style={[styles.infoElementText, styles.flexHorizontalElement]}
              >
                <View
                  style={[
                    styles.colorView,
                    {
                      backgroundColor:
                        shopInfo.colorAccent ?? GlobalStyles.colors.black,
                    },
                  ]}
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
                Logo
              </Text>
              <View style={[styles.flexHorizontalElement]}>
                {shopInfo.logo ? (
                  <View style={styles.logoContainer}>
                    <FastImage
                      source={{ uri: shopInfo.logo.uri }}
                      style={styles.logo}
                    />
                  </View>
                ) : (
                  <Text style={styles.infoElementText}>-</Text>
                )}
              </View>
            </View>
            <View
              style={[
                styles.infoElementContainer,
                styles.flexHorizontalContainer,
                styles.last,
              ]}
            >
              <Text style={[styles.infoTitle, styles.flexHorizontalElement]}>
                Background image
              </Text>
              <View style={[styles.flexHorizontalElement]}>
                {shopInfo.backgroundBanner ? (
                  <View style={styles.bgBannerContainer}>
                    <FastImage
                      source={{ uri: shopInfo.backgroundBanner.uri }}
                      style={styles.bgBanner}
                    />
                  </View>
                ) : (
                  <Text style={styles.infoElementText}>-</Text>
                )}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Links</Text>
            <IconButton
              icon="ionicons"
              name="arrow-forward-circle-sharp"
              size={30}
              color={GlobalStyles.colors.black}
              onPress={navigateToScreen.bind(this, 'editLinks')}
            />
          </View>
          <HintBox
            style={styles.hintBox}
            label="The links will be displayed on your website"
          />
          {shopInfo.links?.length > 0 ? (
            shopInfo.links.map((linkElement, key) => (
              <View style={styles.infoElementContainer} key={key}>
                <View style={{ paddingLeft: 15, borderLeftWidth: 2 }}>
                  <Text
                    style={[
                      styles.infoElementText,
                      { fontFamily: 'Roboto-medium' },
                    ]}
                  >
                    {linkElement.title}
                  </Text>
                  <Text style={styles.infoElementText}>
                    {linkElement.subtitle}
                  </Text>
                  <Text
                    style={[
                      styles.infoElementText,
                      { color: GlobalStyles.colors.gray },
                    ]}
                  >
                    {linkElement.link}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.infoElementContainer}>
              <Text style={styles.infoTitle}>-</Text>
            </View>
          )}
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
    borderWidth: 1,
    borderColor: GlobalStyles.colors.gray,
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
  hintBox: {
    marginTop: 10,
    marginBottom: 0,
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
  websiteActivationWarningContainer: {
    backgroundColor: GlobalStyles.colors.white,
    borderWidth: 2,
    borderColor: GlobalStyles.colors.warning,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginTop: 15,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: GlobalStyles.colors.primary,
    padding: 20,
    marginTop: 15,
  },
  linkUnderline: {
    borderBottomColor: GlobalStyles.colors.darkGray,
    borderBottomWidth: 1,
    paddingBottom: 2,
    maxWidth: '92%',
  },
  link: {
    fontFamily: 'Roboto-medium',
    color: GlobalStyles.colors.white,
  },
  infoElementContainer: {
    flexDirection: 'column',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.gray,
  },
  last: {
    borderBottomWidth: 0,
  },
  infoElement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  infoElementIcon: {
    marginVertical: 2,
    marginRight: 7,
  },
  infoElementText: {
    fontSize: 14,
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
    borderColor: GlobalStyles.colors.darkError,
    borderRadius: 10,
  },
  logoutButtonText: {
    color: GlobalStyles.colors.darkError,
  },
});
