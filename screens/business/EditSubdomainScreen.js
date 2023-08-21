import { useContext, useLayoutEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { IconButton, SectionWrapper, TextField } from '../../components';
import { ShopContext } from '../../store';

const EditSubdomainScreen = ({ navigation }) => {
  const shopCtx = useContext(ShopContext);
  const [isChanged, setIsChanged] = useState(false);
  const [subdomain, setSubdomain] = useState(
    (shopCtx.shopInfo && shopCtx.shopInfo.subdomain) ?? null,
  );

  const changeSubdomain = (value) => {
    !isChanged && setIsChanged(true);
    setSubdomain(value.replace(/\s+/g, '-').toLowerCase());
  };

  const submit = () => {
    shopCtx.editSubdomain(subdomain);
    navigation.goBack();
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
  }, [isChanged, subdomain]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.root}>
        <View style={styles.content}>
          <SectionWrapper>
            <TextField
              label={'Website domain'}
              value={subdomain}
              autoCapitalize="none"
              onUpdateValue={changeSubdomain}
              placeholder="your-store"
              helperText={`The link to your site will look like this:\nhttps://${
                subdomain ?? 'your-store'
              }.shopy.ws/`}
            />
          </SectionWrapper>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default EditSubdomainScreen;

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
