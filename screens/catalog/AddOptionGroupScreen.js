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

const AddOptionGroupScreen = ({ navigation }) => {
  const catalogCtx = useContext(CatalogContext);
  const [optionGroupName, setOptionGroupName] = useState();
  const [newOptionName, setNewOptionName] = useState();
  const [optionGroupVariants, setOptionsGroupVariants] = useState([]);

  const changeOptionGroupName = (value) => setOptionGroupName(value);
  const changeNewOptionName = (value) => setNewOptionName(value);
  const addOptionToList = () => {
    setOptionsGroupVariants((prev) => [...prev, newOptionName]);
    setNewOptionName(null);
  };
  const deleteOption = (key) => {
    setOptionsGroupVariants([
      ...optionGroupVariants.slice(0, key),
      ...optionGroupVariants.slice(key + 1),
    ]);
  };

  const submit = () => {
    if (optionGroupName === null) {
      Alert.alert(
        'Заполните поля',
        'Название опции является обязательным полем',
      );
      return;
    } else if (optionGroupVariants.length === 0) {
      Alert.alert('Добавьте опции', 'Должна быть как минимум одна опция');
    }
    catalogCtx.addOptionGroup(optionGroupName, optionGroupVariants);
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.root}>
        <View style={styles.content}>
          <SectionWrapper>
            <TextField
              label={'Название опции'}
              placeholder={'Цвет/Размер/Материал и тд'}
              value={optionGroupName}
              onUpdateValue={changeOptionGroupName}
              required
            />
          </SectionWrapper>
          <SectionWrapper>
            {optionGroupVariants &&
              optionGroupVariants.length > 0 &&
              optionGroupVariants.map((option, key) => (
                <View style={styles.optionContainer} key={key}>
                  <Text style={styles.optionText}>{option.toString()}</Text>
                  <IconButton
                    icon="material"
                    name="delete-outline"
                    size={22}
                    color={GlobalStyles.colors.error}
                    style={styles.optionAddButton}
                    onPress={deleteOption.bind(this, key)}
                  />
                </View>
              ))}
            <View style={styles.optionAddContainer}>
              <TextField
                placeholder={'Опция: XL'}
                value={newOptionName}
                onUpdateValue={changeNewOptionName}
                wrapperStyle={styles.optionAddTextField}
              />
              <IconButton
                icon="material"
                name="add"
                size={22}
                color={GlobalStyles.colors.primary}
                style={styles.optionAddButton}
                disabled={
                  !newOptionName || (newOptionName && !newOptionName.length)
                }
                onPress={addOptionToList}
              />
            </View>
          </SectionWrapper>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            onPress={submit}
            disabled={!optionGroupName || !optionGroupVariants.length}
          >
            Создать
          </PrimaryButton>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default AddOptionGroupScreen;

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
  optionContainer: {
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingTop: 2,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
  },
  optionAddContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  optionAddTextField: {
    width: '90%',
  },
  optionAddButton: {
    marginLeft: 15,
  },
});
