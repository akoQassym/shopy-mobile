import { useContext, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import {
  PrimaryButton,
  IconButton,
  Text,
  LoadingOverlay,
  SectionWrapper,
  TextField,
} from '../../components';
import { CatalogContext } from '../../store';

const AddCategoryScreen = ({ navigation }) => {
  const catalogCtx = useContext(CatalogContext);
  const [isCreating, setIsCreating] = useState(false);
  const [enteredCategoryName, setEnteredCategoryName] = useState();
  const [enteredCategoryDescription, setEnteredCategoryDescription] =
    useState();

  const changeCategoryName = (value) => setEnteredCategoryName(value);
  const changeCategoryDescription = (value) =>
    setEnteredCategoryDescription(value);

  const chooseProductToCategory = () => {};

  const submit = () => {
    if (enteredCategoryName === null) {
      Alert.alert(
        'Заполните поля',
        'Название категории является обязательным полем',
      );
      return;
    }
    catalogCtx.addCategory(enteredCategoryName, enteredCategoryDescription);
    navigation.goBack();
  };

  if (isCreating) {
    return <LoadingOverlay message="Создаем новую категорию..." />;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.root}>
        <View style={styles.content}>
          <SectionWrapper>
            <TextField
              label={'Название категории'}
              placeholder={'Обувь'}
              onUpdateValue={changeCategoryName}
              required
            />
            <TextField
              label={'Описание'}
              type={'multiline'}
              onUpdateValue={changeCategoryDescription}
            />
          </SectionWrapper>
          <SectionWrapper>
            <Text style={styles.addText}>Товаров в категории: 0</Text>
            <PrimaryButton
              style={styles.addButton}
              textStyle={styles.addButtonText}
              icon={
                <IconButton
                  icon="ionicons"
                  name="md-add"
                  size={25}
                  color={GlobalStyles.colors.primary}
                />
              }
              onPress={chooseProductToCategory}
            >
              Добавить товары
            </PrimaryButton>
          </SectionWrapper>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={submit}>Создать</PrimaryButton>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default AddCategoryScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
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
});
