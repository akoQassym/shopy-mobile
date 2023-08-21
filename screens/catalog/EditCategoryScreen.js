import { useContext, useLayoutEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { GlobalStyles } from '../../constants/styles';

import {
  PrimaryButton,
  IconButton,
  Text,
  ToggleSwitch,
  SectionWrapper,
  TextField,
} from '../../components';
import { CatalogContext } from '../../store';

const EditCategoryScreen = ({ route, navigation }) => {
  const catalogCtx = useContext(CatalogContext);
  const { categoryId, categoryData } = route.params;
  const [isChanged, setIsChanged] = useState(false);

  const [categoryName, setCategoryName] = useState(categoryData.name ?? null);
  const [description, setDescription] = useState(
    categoryData.description ?? null,
  );
  const [activityStatus, setActivityStatus] = useState(
    categoryData.active ?? null,
  );

  const changeCategoryInfo = (fieldName, value) => {
    !isChanged && setIsChanged(true);
    switch (fieldName) {
      case 'name':
        setCategoryName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'active':
        setActivityStatus(!activityStatus);
        break;
      default:
        return;
    }
  };

  const submit = () => {
    catalogCtx.editCategory(
      categoryId,
      categoryName,
      description,
      activityStatus,
    );
    navigation.pop(2);
  };

  const cancelChanges = () => {
    Alert.alert('Are you sure you want to undo all the changes?', undefined, [
      { text: 'Continue editing', onPress: () => {} },
      {
        text: 'Cancel',
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
          label="Save"
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
            label="Cancel"
            labelColor={GlobalStyles.colors.error}
          />
        ),
      });
  }, [categoryId, isChanged, categoryName, description, activityStatus]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.root}>
        <View style={styles.content}>
          <SectionWrapper>
            <TextField
              label={'Category name'}
              placeholder={'Sneakers'}
              onUpdateValue={changeCategoryInfo.bind(this, 'name')}
              value={categoryName}
              required
            />
            <TextField
              label={'Description'}
              type={'multiline'}
              value={description}
              onUpdateValue={changeCategoryInfo.bind(this, 'description')}
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
                  style={styles.buttonIcon}
                  color={GlobalStyles.colors.primary}
                />
              }
              onPress={() => {}}
            >
              Add products
            </PrimaryButton>
          </SectionWrapper>
          <SectionWrapper>
            <View style={styles.fieldContainer}>
              <Text>Display on website</Text>
              <ToggleSwitch
                value={activityStatus}
                onValueChange={changeCategoryInfo.bind(this, 'active')}
              />
            </View>
          </SectionWrapper>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default EditCategoryScreen;

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
