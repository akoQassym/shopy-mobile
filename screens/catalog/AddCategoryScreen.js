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
  SectionWrapper,
  TextField,
} from '../../components';
import { CatalogContext } from '../../store';

const AddCategoryScreen = ({ navigation }) => {
  const catalogCtx = useContext(CatalogContext);
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
        'Fill in the blanks',
        'The category name is a required field',
      );
      return;
    }
    catalogCtx.addCategory(enteredCategoryName, enteredCategoryDescription);
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.root}>
        <View style={styles.content}>
          <SectionWrapper>
            <TextField
              label={'Category name'}
              placeholder={'Sneakers'}
              onUpdateValue={changeCategoryName}
              required
            />
            <TextField
              label={'Description'}
              type={'multiline'}
              onUpdateValue={changeCategoryDescription}
            />
          </SectionWrapper>
          <SectionWrapper>
            <Text style={styles.addText}>Products in category: 0</Text>
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
              Add products
            </PrimaryButton>
          </SectionWrapper>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={submit}>Create</PrimaryButton>
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
