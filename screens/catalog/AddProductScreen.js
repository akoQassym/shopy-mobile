import { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import {
  Text,
  PrimaryButton,
  LoadingOverlay,
  SectionWrapper,
  TextField,
  ImagePicker,
  RadioButton,
  PressableContainer,
  HintBox,
  Card,
} from '../../components';
import { ShopContext, CatalogContext } from '../../store';
import { GlobalStyles } from '../../constants/styles';
import { useOptionGroupListener } from './SelectOptionGroupsScreen';

const AddProductScreen = ({ navigation }) => {
  const shopCtx = useContext(ShopContext);
  const catalogCtx = useContext(CatalogContext);

  const [isUploading, setIsUploading] = useState(false);
  const [transferred, setTransferred] = useState();

  const [uploadTask, setUploadTask] = useState();
  const [enteredProductInfo, setEnteredProductInfo] = useState({
    name: null,
    description: null,
    price: null,
    currency: 'KZT',
    categoryId: null,
    content: [],
    active: true,
  });
  const [selectedPhotos, setSelectedPhotos] = useState();
  const [selectedOptionGroups, setSelectedOptionGroups] = useState([]);

  const changeProductInfo = (fieldname, value) => {
    switch (fieldname) {
      case 'name':
        setEnteredProductInfo({ ...enteredProductInfo, name: value });
        break;
      case 'description':
        setEnteredProductInfo({ ...enteredProductInfo, description: value });
        break;
      case 'price':
        setEnteredProductInfo({ ...enteredProductInfo, price: value });
        break;
      case 'categoryId':
        setEnteredProductInfo({ ...enteredProductInfo, categoryId: value });
        break;
      case 'optionGroups':
        setSelectedOptionGroups(value);
        break;
      default:
        return;
    }
  };

  useOptionGroupListener(({ value }) => {
    changeProductInfo('optionGroups', value);
  }, []);

  const openSelectOptionGroupsScreen = () => {
    navigation.navigate('SelectOptionGroupsScreen', {
      submittedOptionGroups: selectedOptionGroups,
    });
  };

  const uploadImage = async (image) => {
    const { uri } = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const file = `${shopCtx.shopInfo.shopId}/${filename}`;
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setTransferred(0);
    const task = storage().ref(file).putFile(uploadUri);
    setUploadTask(task);
    try {
      await task;
      const url = await storage().ref(file).getDownloadURL();
      return url;
    } catch (error) {
      Alert('Error when uploading a photo!', error.message);
    }
  };

  const submit = async () => {
    let uploadedPhotosArr = [];
    if (selectedPhotos) {
      setIsUploading(true);
      uploadedPhotosArr = await Promise.all(
        selectedPhotos.map(async (selectedPhoto) => {
          const url = await uploadImage(selectedPhoto).catch((error) => {
            Alert.alert('Error when uploading a photo!', error.message);
          });
          return { type: 'photo', uri: url };
        }),
      );
      setIsUploading(false);
    }
    catalogCtx.addProduct(
      enteredProductInfo.name,
      enteredProductInfo.description,
      enteredProductInfo.price,
      enteredProductInfo.categoryId,
      uploadedPhotosArr,
      selectedOptionGroups,
    );
    navigation.goBack();
  };

  const clear = (variable) => {
    Alert.alert('Are you sure?', undefined, [
      {
        text: 'Yes',
        onPress: () => {
          if (variable === 'optionGroups') setSelectedOptionGroups([]);
        },
      },
      {
        text: 'No',
        onPress: () => {},
      },
    ]);
  };

  useEffect(() => {
    if (!uploadTask) return;
    uploadTask.on('state_changed', (snapshot) => {
      setTransferred(snapshot.bytesTransferred / snapshot.totalBytes);
    });
  }, [uploadTask]);

  if (isUploading) {
    return (
      <LoadingOverlay
        message={'Uploading images...'}
        progressBar={transferred}
      />
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.root}>
        <View style={styles.content}>
          <SectionWrapper>
            <TextField
              label={'Product name'}
              required
              onUpdateValue={changeProductInfo.bind(this, 'name')}
            />
            <TextField
              label={'Description'}
              type={'multiline'}
              required
              onUpdateValue={changeProductInfo.bind(this, 'description')}
            />
            <TextField
              label={'Price'}
              iconType="tenge"
              required
              keyboardType={'decimal-pad'}
              onUpdateValue={changeProductInfo.bind(this, 'price')}
            />
          </SectionWrapper>
          <SectionWrapper label={'Photo'}>
            <ImagePicker
              images={selectedPhotos}
              setImages={setSelectedPhotos}
            />
          </SectionWrapper>
          <SectionWrapper label={'Category'}>
            <RadioButton
              data={catalogCtx.categories ?? []}
              selectedId={enteredProductInfo.categoryId}
              onSelect={changeProductInfo.bind(this, 'categoryId')}
            />
          </SectionWrapper>
          <SectionWrapper
            label={'Product Options'}
            button={
              selectedOptionGroups?.length ? (
                <PressableContainer onPress={clear.bind(this, 'optionGroups')}>
                  <Text
                    style={{
                      color: GlobalStyles.colors.darkError,
                      fontSize: 12,
                    }}
                  >
                    Clear
                  </Text>
                </PressableContainer>
              ) : null
            }
          >
            <HintBox label="For example: Clothing size (S, M, L, XL)" />
            {selectedOptionGroups?.length ? (
              <Card onPress={openSelectOptionGroupsScreen} withArrow>
                <View>
                  <Text style={styles.cardTitle}>
                    {selectedOptionGroups[0].name}
                  </Text>
                  <Text style={styles.cardSubtitle}>
                    {selectedOptionGroups[0].items?.length} selected
                  </Text>
                </View>
              </Card>
            ) : (
              <PrimaryButton
                type="outlined"
                onPress={openSelectOptionGroupsScreen}
              >
                Select options
              </PrimaryButton>
            )}
          </SectionWrapper>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={submit}
              disabled={
                !enteredProductInfo.name ||
                !enteredProductInfo.description ||
                !enteredProductInfo.price
              }
            >
              Save
            </PrimaryButton>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
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
  buttonContainer: {
    justifyContent: 'flex-end',
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  cardSubtitle: {
    color: GlobalStyles.colors.darkGray,
  },
});
