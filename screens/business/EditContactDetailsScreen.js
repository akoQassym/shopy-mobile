import { useContext, useState, useLayoutEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { IconButton, TextField } from '../../components';
import { ShopContext } from '../../store';

const EditContactDetailsScreen = ({ navigation }) => {
  const shopCtx = useContext(ShopContext);
  const [isChanged, setIsChanged] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(
    shopCtx.shopInfo.phoneNumber ?? null,
  );
  const [instagram, setInstagram] = useState(
    shopCtx.shopInfo.instagram ?? null,
  );
  const [whatsapp, setWhatsapp] = useState(shopCtx.shopInfo.whatsapp ?? null);
  const [telegram, setTelegram] = useState(shopCtx.shopInfo.telegram ?? null);
  const [twoGis, setTwoGis] = useState(shopCtx.shopInfo.twoGis ?? null);

  const changeContactsInfo = (fieldName, value) => {
    !isChanged && setIsChanged(true);
    switch (fieldName) {
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      case 'instagram':
        setInstagram(value);
        break;
      case 'whatsapp':
        setWhatsapp(value);
        break;
      case 'telegram':
        setTelegram(value);
        break;
      case 'twoGis':
        setTwoGis(value);
        break;
      default:
        return;
    }
  };

  const submit = async () => {
    shopCtx.editShopInfo(
      shopCtx.shopInfo.shopName,
      shopCtx.shopInfo.description,
      shopCtx.shopInfo.address,
      shopCtx.shopInfo.workingTime,
      phoneNumber,
      instagram,
      telegram,
      whatsapp,
      twoGis,
    );
    navigation.goBack();
  };

  const cancelChanges = () => {
    Alert.alert('Вы уверены, что хотите отменить все изменения?', undefined, [
      { text: 'Продолжить редактирование', onPress: () => {} },
      {
        text: 'Отменить',
        onPress: () => {
          setIsChanged(false);
          navigation.goBack();
        },
      },
    ]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: !isChanged,
      headerRight: () => (
        <IconButton
          icon="ionicons"
          name="save-sharp"
          size={22}
          onPress={submit}
          label="Сохранить"
          labelColor={GlobalStyles.colors.primary}
          color={
            isChanged
              ? GlobalStyles.colors.primary
              : GlobalStyles.colors.darkGray
          }
          disabled={!isChanged}
        />
      ),
    });
    isChanged &&
      navigation.setOptions({
        headerLeft: () => (
          <IconButton
            onPress={cancelChanges}
            label="Отмена"
            labelColor={GlobalStyles.colors.error}
          />
        ),
      });
  }, [isChanged, phoneNumber, instagram, whatsapp, telegram, twoGis]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.root}>
        <View style={styles.content}>
          <View style={styles.formContainer}>
            <TextField
              label={'Номер телефона'}
              placeholder={'+7XXXXXXXXXX'}
              value={phoneNumber}
              onUpdateValue={changeContactsInfo.bind(this, 'phoneNumber')}
            />
            <TextField
              label={'Whatsapp'}
              placeholder={'7XXXXXXXXXX'}
              value={whatsapp}
              helperText={`Ссылка будет выглядеть вот так: https://wa.me/${
                whatsapp ?? '7XXXXXXXXXX'
              }`}
              onUpdateValue={changeContactsInfo.bind(this, 'whatsapp')}
            />
            <TextField
              label={'Instagram аккаунт'}
              placeholder={'vash_magazin'}
              value={instagram}
              helperText={`Ссылка будет выглядеть вот так: https://instagram.com/${
                instagram ?? 'vash_magazin'
              }`}
              onUpdateValue={changeContactsInfo.bind(this, 'instagram')}
            />
            <TextField
              label={'Telegram'}
              placeholder={'https://t.me/vash_magazin'}
              value={telegram}
              helperText={`Ссылка будет выглядеть вот так: https://t.me/${
                telegram ?? 'vash_magazin'
              }`}
              onUpdateValue={changeContactsInfo.bind(this, 'telegram')}
            />
            <TextField
              label={'2ГИС (необязательно)'}
              value={twoGis}
              onUpdateValue={changeContactsInfo.bind(this, 'twoGis')}
            />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default EditContactDetailsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
    backgroundColor: GlobalStyles.colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  formContainer: {
    paddingVertical: 10,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
  },
});
