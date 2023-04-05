import { useContext, useLayoutEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { IconButton, SectionWrapper, TextField } from '../../components';
import { ShopContext } from '../../store';

const EditSubdomainScreen = ({ navigation }) => {
  const shopCtx = useContext(ShopContext);
  const [isChanged, setIsChanged] = useState(false);
  const [subdomain, setSubdomain] = useState(
    (shopCtx.shopInfo && shopCtx.shopInfo.subdomain) ?? null,
  );

  const changeSubdomain = (value) => {
    !isChanged && setIsChanged(true);
    setSubdomain(value.replace(/\s+/g, '-').toLowerCase());
  };

  const submit = () => {
    shopCtx.editSubdomain(subdomain);
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
  }, [isChanged, subdomain]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.root}>
        <View style={styles.content}>
          <SectionWrapper>
            <TextField
              label={'Домен сайта'}
              value={subdomain}
              autoCapitalize="none"
              onUpdateValue={changeSubdomain}
              placeholder="vash-magazin"
              helperText={`Ссылка на ваш сайт будет выглядеть вот так:\nhttps://${
                subdomain ?? 'vash-magazin'
              }.shopy.ws/`}
            />
          </SectionWrapper>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default EditSubdomainScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  addText: {
    fontSize: 14,
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: GlobalStyles.colors.veryLightPrimary,
    paddingVertical: 12,
  },
  addButtonText: {
    color: GlobalStyles.colors.primary,
    fontFamily: 'Roboto-regular',
  },
  buttonIcon: {
    marginHorizontal: 2,
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
