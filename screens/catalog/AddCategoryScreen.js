import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../constants/styles';
import TextField from '../../components/form/TextField';
import PrimaryButton from '../../components/ui/buttons/PrimaryButton';

const AddCategoryScreen = () => {
  const onAddProduct = () => {};

  return (
    <ScrollView style={styles.root}>
      <View style={styles.content}>
        <View style={styles.formContainer}>
          <TextField label={'Фото'} />
          <TextField label={'Название категории'} placeholder={'Обувь'} />
          <TextField label={'Описание'} type={'multiline'} />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.addText}>Товаров в категории: 0</Text>
          <PrimaryButton
            style={styles.addButton}
            textStyle={styles.addButtonText}
            icon={
              <Ionicons name="md-add" size={25} style={styles.buttonIcon} />
            }
            onPress={onAddProduct}
          >
            Добавить товары
          </PrimaryButton>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton>Создать</PrimaryButton>
      </View>
    </ScrollView>
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
  formContainer: {
    marginVertical: 5,
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: GlobalStyles.colors.white,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
  },
  addText: {
    fontSize: 16,
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: GlobalStyles.colors.primary100,
    paddingVertical: 12,
  },
  addButtonText: {
    color: GlobalStyles.colors.primary500,
    fontFamily: 'Roboto-regular',
  },
  buttonIcon: {
    color: GlobalStyles.colors.primary500,
    marginHorizontal: 2,
  },
});
