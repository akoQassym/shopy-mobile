import { View, StyleSheet, ScrollView } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

import TextField from '../../components/form/TextField';
import PrimaryButton from '../../components/ui/buttons/PrimaryButton';
import ImagePicker from '../../components/ui/ImagePicker';

const AddProductScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.root}>
      <View style={styles.content}>
        <View style={styles.formContainer}>
          <TextField label={'Название товара'} required />
          <TextField label={'Описание'} type={'multiline'} required />
          <TextField label={'Цена'} iconType="tenge" required />
        </View>
        <View style={styles.formContainer}>
          <ImagePicker label={'Фото'} />
        </View>
        <View style={styles.formContainer}>
          <TextField label={'Категория'} />
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton>Сохранить</PrimaryButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddProductScreen;

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
    marginVertical: 7,
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: GlobalStyles.colors.white,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
  },
});
