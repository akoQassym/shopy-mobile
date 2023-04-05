import { useContext } from 'react';
import { View, StyleSheet, Alert, ScrollView, Linking } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Text, IconButton, PrimaryButton, HintBox } from '../../components';
import { AuthContext, CatalogContext, ShopContext } from '../../store';
import { GlobalStyles } from '../../constants/styles';

const contactIcons = {
  whatsapp: (
    <FontAwesome5 name="whatsapp" size={25} color={GlobalStyles.colors.black} />
  ),
  instagram: (
    <FontAwesome5
      name="instagram"
      size={25}
      color={GlobalStyles.colors.black}
    />
  ),
  phone: (
    <FontAwesome5
      name="phone-alt"
      size={20}
      color={GlobalStyles.colors.black}
    />
  ),
};

const UserScreen = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const catalogCtx = useContext(CatalogContext);
  const shopCtx = useContext(ShopContext);

  const openEditUserInfoPage = () => {
    navigation.navigate('EditUserInfoScreen');
  };

  const callShopy = () => {
    Linking.openURL('tel:+77479357357');
  };

  const whatsappShopy = () => {
    Linking.openURL('https://wa.me/77474801027');
  };

  const instagramShopy = () => {
    Linking.openURL('https://instagram.com/shopy.ws/');
  };

  const logout = () => {
    Alert.alert('Вы хотите выйти из системы?', undefined, [
      {
        text: 'Выйти',
        onPress: () => {
          authCtx.logout();
          catalogCtx.clean();
          shopCtx.clean();
        },
      },
      { text: 'Отмена', onPress: () => {} },
    ]);
  };

  return (
    <ScrollView style={styles.root}>
      <View style={[styles.container, { alignItems: 'center' }]}>
        <View style={styles.iconContainer}>
          <IconButton
            icon="fontAwesome5"
            name="user-alt"
            size={26}
            color={GlobalStyles.colors.black}
          />
        </View>
        <Text style={styles.title}>{authCtx.user.fullName}</Text>
        <Text style={styles.text}>{authCtx.user.email}</Text>
        <Text style={styles.text}>{authCtx.user.phoneNumber}</Text>
        <PrimaryButton
          style={styles.editBtn}
          iconAfter={
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color={GlobalStyles.colors.white}
            />
          }
          onPress={openEditUserInfoPage}
        >
          Изменить
        </PrimaryButton>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Связаться с Shopy</Text>
        <HintBox
          style={styles.hintBox}
          label="При появлении вопросов или ошибок, обращайтесь к нам. Мы с нашей командой всегда рады помочь!"
        />
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <PrimaryButton
            iconBefore={contactIcons.phone}
            style={styles.socialIcon}
            color={GlobalStyles.colors.white}
            textColor={GlobalStyles.colors.black}
            onPress={callShopy}
          >
            +7 747 935 73 57
          </PrimaryButton>
          <PrimaryButton
            iconBefore={contactIcons.whatsapp}
            style={styles.socialIcon}
            color={GlobalStyles.colors.white}
            textColor={GlobalStyles.colors.black}
            onPress={whatsappShopy}
          >
            +7 747 480 10 27
          </PrimaryButton>
          <PrimaryButton
            iconBefore={contactIcons.instagram}
            style={styles.socialIcon}
            color={GlobalStyles.colors.white}
            textColor={GlobalStyles.colors.black}
            onPress={instagramShopy}
          >
            @shopy.ws
          </PrimaryButton>
        </View>
      </View>
      <IconButton
        icon="ionicons"
        name="exit-outline"
        size={28}
        color={GlobalStyles.colors.darkError}
        label="Выйти"
        labelColor={GlobalStyles.colors.darkError}
        onPress={logout}
        style={styles.exitBtn}
      />
    </ScrollView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 7,
  },
  container: {
    marginVertical: 8,
    paddingVertical: 25,
    paddingHorizontal: 15,
    backgroundColor: GlobalStyles.colors.white,
    borderRadius: 10,
  },
  iconContainer: {
    backgroundColor: GlobalStyles.colors.gray,
    padding: 30,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Roboto-medium',
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    marginVertical: 2,
  },
  socialIcon: {
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  hintBox: { marginVertical: 10 },
  editBtn: {
    marginTop: 10,
    paddingVertical: 12,
    paddingRight: 15,
    paddingLeft: 25,
  },
  exitBtn: {
    marginTop: 8,
    marginBottom: 20,
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: GlobalStyles.colors.lightError,
    borderRadius: 10,
  },
});
