import { StyleSheet, View } from 'react-native';
import { ColorSelectWheel } from '../../components';
import { GlobalStyles } from '../../constants/styles';

const EditColorScreen = ({ route }) => {
  const { selectedColor } = route.params;
  return (
    <View style={styles.root}>
      <View style={styles.formContainer}>
        <ColorSelectWheel currentColor={selectedColor ?? '#ffffff'} />
      </View>
    </View>
  );
};

export default EditColorScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
    backgroundColor: GlobalStyles.colors.white,
  },
  formContainer: {
    paddingVertical: 10,
  },
});
