import { View, StyleSheet, ScrollView } from 'react-native';
import TextField from '../../components/form/TextField';
import PrimaryButton from '../../components/ui/buttons/PrimaryButton';
import { GlobalStyles } from '../../constants/styles';

const EditBusinessInfoScreen = () => {
  return (
    <ScrollView style={styles.root}>
      <View style={styles.content}>
        <View style={styles.formContainer}>
          <TextField label={'Название'} />
          <TextField label={'Адрес'} />
          <TextField label={'Рабочее время'} />
          <TextField label={'Описание'} type={'multiline'} />
          <TextField
            label={'Домен сайта'}
            helperText={
              'Ссылка на ваш сайт будет выглядеть вот так:\nhttps://iris.shopy.ws/'
            }
          />
          <TextField
            label={'Номер телефона'}
            placeholder={'+7(___)___-__-__'}
          />
          <TextField
            label={'Instagram'}
            placeholder={'https://instagram.com/vash_magazin'}
          />
          <TextField
            label={'Whatsapp'}
            placeholder={'https://wa.me/7XXXXXXXXXX'}
          />
          <TextField
            label={'Telegram'}
            placeholder={'https://t.me/vash_magazin'}
          />
          <TextField label={'2ГИС'} />
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton>Сохранить</PrimaryButton>
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
