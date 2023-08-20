import { useContext, useState, useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, Linking } from 'react-native';
import {
  IconButton,
  PrimaryButton,
  TextField,
  Text,
  PressableContainer,
} from '../../components';
import { ShopContext } from '../../store';
import { GlobalStyles } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';

const EditLinksScreen = ({ navigation }) => {
  const shopCtx = useContext(ShopContext);
  const [isChanged, setIsChanged] = useState(false);
  const [links, setLinks] = useState(shopCtx.shopInfo.links ?? []);

  const [newLink, setNewLink] = useState({
    title: '',
    subtitle: '',
    link: '',
  });

  const confirmNewLink = () => {
    !isChanged && setIsChanged(true);
    setLinks((links) => [newLink, ...links]);
    setNewLink({
      title: '',
      subtitle: '',
      link: '',
    });
  };

  const openLink = (linkVal) => {
    Linking.openURL(linkVal);
  };

  const deleteLink = (key) => {
    Alert.alert('Вы уверены?', undefined, [
      {
        text: 'Да',
        onPress: () => {
          !isChanged && setIsChanged(true);
          setLinks((links) => [
            ...links.slice(0, key),
            ...links.slice(key + 1),
          ]);
        },
      },
      {
        text: 'Нет',
        onPress: () => {},
      },
    ]);
  };

  const changeNewLink = (fieldName, value) => {
    switch (fieldName) {
      case 'title':
        setNewLink({ ...newLink, title: value });
        break;
      case 'subtitle':
        setNewLink({ ...newLink, subtitle: value });
        break;
      case 'link':
        setNewLink({ ...newLink, link: value });
        break;
      default:
        return;
    }
  };

  const submit = async () => {
    shopCtx.editLinks(links);
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
  }, [isChanged, links]);

  return (
    <ScrollView style={styles.root}>
      <View style={styles.content}>
        <View style={styles.formContainer}>
          <TextField
            placeholder={'Заголовок'}
            value={newLink.title}
            onUpdateValue={changeNewLink.bind(this, 'title')}
          />
          <TextField
            placeholder={'Краткое описание'}
            value={newLink.subtitle}
            onUpdateValue={changeNewLink.bind(this, 'subtitle')}
          />
          <TextField
            placeholder={'Ссылка'}
            value={newLink.link}
            onUpdateValue={changeNewLink.bind(this, 'link')}
          />
          <PrimaryButton onPress={confirmNewLink}>Добавить</PrimaryButton>
        </View>
        <Text style={[styles.title, { fontSize: 22, marginVertical: 10 }]}>
          Ссылки
        </Text>
        <View style={styles.links}>
          {links?.length > 0 ? (
            links?.map((linkElement, key) => (
              <View style={styles.linkContainer} key={key}>
                {linkElement.title && (
                  <Text style={styles.title}>{linkElement.title}</Text>
                )}
                {linkElement.subtitle && (
                  <Text style={styles.subtitle}>{linkElement.subtitle}</Text>
                )}
                {linkElement.link && (
                  <PressableContainer
                    onPress={openLink.bind(this, linkElement.link)}
                  >
                    <Text style={styles.link}>{linkElement.link}</Text>
                  </PressableContainer>
                )}
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <PrimaryButton
                    color="transparent"
                    textColor={GlobalStyles.colors.darkError}
                    iconBefore={
                      <MaterialIcons
                        name="delete-outline"
                        size={24}
                        color={GlobalStyles.colors.darkError}
                      />
                    }
                    style={styles.deleteBtn}
                    textStyle={styles.deleteBtnText}
                    onPress={deleteLink.bind(this, key)}
                  >
                    Удалить ссылку
                  </PrimaryButton>
                </View>
              </View>
            ))
          ) : (
            <Text>-</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default EditLinksScreen;

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
  links: {},
  linkContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 5,
    backgroundColor: GlobalStyles.colors.lightGray,
    borderRadius: 10,
  },
  title: {
    fontFamily: 'Roboto-medium',
    fontSize: 16,
    marginVertical: 1,
  },
  subtitle: {
    marginVertical: 1,
    fontSize: 16,
  },
  link: {
    color: GlobalStyles.colors.darkGray,
    fontSize: 16,
    marginVertical: 1,
    textDecorationLine: 'underline',
  },
  deleteBtn: {
    marginTop: 10,
    paddingVertical: 0,
    width: 200,
  },
  deleteBtnText: {
    fontFamily: 'Roboto-regular',
    fontSize: 14,
  },
});
