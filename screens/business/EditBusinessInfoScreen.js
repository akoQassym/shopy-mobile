import { useContext, useState, useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { IconButton, TextField } from '../../components';
import { ShopContext } from '../../store';
import { GlobalStyles } from '../../constants/styles';

const EditBusinessInfoScreen = ({ navigation }) => {
  const shopCtx = useContext(ShopContext);
  const [isChanged, setIsChanged] = useState(false);
  const [shopName, setShopName] = useState(shopCtx.shopInfo.shopName ?? null);
  const [address, setAddress] = useState(shopCtx.shopInfo.address ?? null);
  const [description, setDescription] = useState(
    shopCtx.shopInfo.description ?? null,
  );
  const [workingTime, setWorkingTime] = useState(
    shopCtx.shopInfo.workingHours ?? null,
  );

  const changeBusinessInfo = (fieldName, value) => {
    !isChanged && setIsChanged(true);
    switch (fieldName) {
      case 'name':
        setShopName(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'workingTime':
        setWorkingTime(value);
        break;
      default:
        return;
    }
  };

  const submit = async () => {
    shopCtx.editShopInfo(
      shopName,
      description,
      address,
      workingTime,
      shopCtx.shopInfo.phoneNumber,
      shopCtx.shopInfo.instagram,
      shopCtx.shopInfo.telegram,
      shopCtx.shopInfo.whatsapp,
      shopCtx.shopInfo.twoGis,
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
  }, [isChanged, shopName, description, address, workingTime]);

  return (
    <ScrollView style={styles.root}>
      <View style={styles.content}>
        <View style={styles.formContainer}>
          <TextField
            label={'Название'}
            value={shopName}
            onUpdateValue={changeBusinessInfo.bind(this, 'name')}
          />
          <TextField
            label={'Адрес'}
            value={address}
            onUpdateValue={changeBusinessInfo.bind(this, 'address')}
          />
          <TextField
            label={'Рабочее время'}
            value={workingTime}
            onUpdateValue={changeBusinessInfo.bind(this, 'workingTime')}
          />
          <TextField
            label={'Слоган/Описание'}
            type={'multiline'}
            value={description}
            onUpdateValue={changeBusinessInfo.bind(this, 'description')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditBusinessInfoScreen;

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
