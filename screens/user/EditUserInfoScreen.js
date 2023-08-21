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
  }, [isChanged, fullName]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.root}>
        <View style={styles.content}>
          <SectionWrapper>
            <TextField
              label={'Full name'}
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
