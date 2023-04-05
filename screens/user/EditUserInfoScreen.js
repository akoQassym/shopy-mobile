import { useContext, useLayoutEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { IconButton, SectionWrapper, TextField } from '../../components';
import { AuthContext } from '../../store';

const EditUserInfoScreen = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const [isChanged, setIsChanged] = useState(false);
  const [fullName, setFullName] = useState(authCtx.user.fullName ?? null);

  const changeUserInfo = (fieldName, value) => {
    !isChanged && setIsChanged(true);
    switch (fieldName) {
      case 'fullName':
        setFullName(value);
        break;
      default:
        return;
    }
  };

  const submit = () => {
    authCtx.editUserInfo(fullName);
    navigation.pop(2);
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
  }, [isChanged, fullName]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.root}>
        <View style={styles.content}>
          <SectionWrapper>
            <TextField
              label={'Имя и Фамилия'}
              onUpdateValue={changeUserInfo.bind(this, 'fullName')}
              value={fullName}
              required
            />
          </SectionWrapper>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default EditUserInfoScreen;

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
