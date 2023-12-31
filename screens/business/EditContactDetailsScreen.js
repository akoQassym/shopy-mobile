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
  const [instagram2, setInstagram2] = useState(
    shopCtx.shopInfo.instagram2 ?? null,
  );
  const [whatsapp, setWhatsapp] = useState(shopCtx.shopInfo.whatsapp ?? null);
  const [whatsapp2, setWhatsapp2] = useState(
    shopCtx.shopInfo.whatsapp2 ?? null,
  );
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
      case 'instagram2':
        setInstagram2(value);
        break;
      case 'whatsapp':
        setWhatsapp(value);
        break;
      case 'whatsapp2':
        setWhatsapp2(value);
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
      shopCtx.shopInfo.isAddressShown,
      shopCtx.shopInfo.workingHours,
      phoneNumber,
      instagram,
      telegram,
      whatsapp,
      twoGis,
      instagram2,
      whatsapp2,
    );
    navigation.goBack();
  };

  const cancelChanges = () => {
    Alert.alert('Are you sure you want to undo all the changes?', undefined, [
      { text: 'Continue editing', onPress: () => {} },
      {
        text: 'Cancel',
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
          label="Save"
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
            label="Cancel"
            labelColor={GlobalStyles.colors.error}
          />
        ),
      });
  }, [
    isChanged,
    phoneNumber,
    instagram,
    whatsapp,
    telegram,
    twoGis,
    instagram2,
    whatsapp2,
  ]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.root}>
        <View style={styles.content}>
          <View style={styles.formContainer}>
            <TextField
              label={'Phone number'}
              placeholder={'+7XXXXXXXXXX'}
              value={phoneNumber}
              onUpdateValue={changeContactsInfo.bind(this, 'phoneNumber')}
            />
            <TextField
              label={'WhatsApp'}
              placeholder={'7XXXXXXXXXX'}
              value={whatsapp}
              helperText={`The link will look like this: https://wa.me/${
                whatsapp ?? '7XXXXXXXXXX'
              }`}
              onUpdateValue={changeContactsInfo.bind(this, 'whatsapp')}
            />
            <TextField
              label={'Whatsapp 2 (optional)'}
              placeholder={'7XXXXXXXXXX'}
              value={whatsapp2}
              helperText={`The link will look like this: https://wa.me/${
                whatsapp2 ?? '7XXXXXXXXXX'
              }`}
              onUpdateValue={changeContactsInfo.bind(this, 'whatsapp2')}
            />
            <TextField
              label={'Instagram'}
              placeholder={'vash_magazin'}
              value={instagram}
              helperText={`The link will look like this: https://instagram.com/${
                instagram ?? 'vash_magazin'
              }`}
              onUpdateValue={changeContactsInfo.bind(this, 'instagram')}
            />
            <TextField
              label={'Instagram 2 (optional)'}
              placeholder={'vash_magazin'}
              value={instagram2}
              helperText={`The link will look like this: https://instagram.com/${
                instagram2 ?? 'vash_magazin'
              }`}
              onUpdateValue={changeContactsInfo.bind(this, 'instagram2')}
            />
            <TextField
              label={'Telegram'}
              placeholder={'https://t.me/vash_magazin'}
              value={telegram}
              helperText={`The link will look like this: https://t.me/${
                telegram ?? 'vash_magazin'
              }`}
              onUpdateValue={changeContactsInfo.bind(this, 'telegram')}
            />
            <TextField
              label={'2Gis (optional)'}
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
