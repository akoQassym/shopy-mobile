import { View, StyleSheet, ScrollView } from 'react-native';
import ColorSelect from '../../components/form/ColorSelect';
import TextField from '../../components/form/TextField';
import PrimaryButton from '../../components/ui/buttons/PrimaryButton';
import { GlobalStyles } from '../../constants/styles';

const EditDesignScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.root}>
      <View style={styles.content}>
        <View style={styles.formContainer}>
          <ColorSelect
            label={'Акцентирующий цвет'}
            colorList={[
              '#ffffff',
              '#000000',
              '#4287f5',
              '#f0e80c',
              '#18c40c',
              '#c40cb5',
              '#c40c25',
            ]}
            currentColor={'#ecaff3'}
          />
          <TextField label={'Лого'} />
          <TextField label={'Фоновое фото'} />
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton>Сохранить</PrimaryButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditDesignScreen;

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
