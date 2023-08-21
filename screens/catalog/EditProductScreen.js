import { useContext, useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import {
  IconButton,
  Text,
  SectionWrapper,
  ToggleSwitch,
  LoadingOverlay,
  TextField,
  PrimaryButton,
  PressableContainer,
  ImagePicker,
  RadioButton,
  HintBox,
  Card,
} from '../../components';
import { MaterialIcons } from '@expo/vector-icons';
import { useOptionGroupListener } from './SelectOptionGroupsScreen';
import { CatalogContext, ShopContext } from '../../store';
import { GlobalStyles } from '../../constants/styles';

const EditProductScreen = ({ navigation, route }) => {
  const catalogCtx = useContext(CatalogContext);
  const shopCtx = useContext(ShopContext);
  const { productId, productData } = route.params;

  const [isChanged, setIsChanged] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [transferred, setTransferred] = useState();
  const [uploadTask, setUploadTask] = useState();

  const [productName, setProductName] = useState(productData.name ?? '');
  const [description, setDescription] = useState(productData.description ?? '');
  const [price, setPrice] = useState(productData.price ?? '');
  const [oldPrice, setOldPrice] = useState(productData.oldPrice ?? '');
  const [categoryId, setCategoryId] = useState(productData.categoryId ?? '');
  const [activityStatus, setActivityStatus] = useState(
    productData.active ?? null,
  );
  const [inStockStatus, setInStockStatus] = useState(
    productData.inStock ?? null,
  );
  const [selectedPhotos, setSelectedPhotos] = useState(
    productData.content ?? [],
  );
  const [selectedOptionGroups, setSelectedOptionGroups] = useState(
    productData.optionVariants ?? [],
  );

  const changeProductInfo = (fieldName, value) => {
    !isChanged && setIsChanged(true);
    switch (fieldName) {
      case 'name':
        setProductName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'oldPrice':
        setOldPrice(value);
        break;
      case 'category':
        setCategoryId(value);
        break;
      case 'active':
        setActivityStatus(!activityStatus);
        break;
      case 'inStock':
        setInStockStatus(!inStockStatus);
        break;
      case 'content':
        setSelectedPhotos(value);
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

  useEffect(() => {
    if (!uploadTask) return;
    uploadTask.on('state_changed', (snapshot) => {
      setTransferred(snapshot.bytesTransferred / snapshot.totalBytes);
    });
  }, [uploadTask]);

  const submit = async () => {
    let uploadedPhotosArr = [];
    if (selectedPhotos.length > 0) {
      setIsUploading(true);
      uploadedPhotosArr = await Promise.all(
        selectedPhotos.map(async (selectedPhoto) => {
          if (!selectedPhoto.assetId) {
            return selectedPhoto;
          }
          const url = await uploadImage(selectedPhoto).catch((error) => {
            Alert.alert('Error when loading an image!', error.message);
          });
          return { type: 'photo', uri: url };
        }),
      );
      setIsUploading(false);
    }
    catalogCtx.editProduct(
      productId,
      productName,
      description,
      price,
      oldPrice,
      categoryId,
      uploadedPhotosArr,
      selectedOptionGroups,
      inStockStatus,
      activityStatus,
      selectedOptionGroups,
      100000,
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

  const deleteProduct = () => {
    Alert.alert('Are you sure, что хотите удалить товар?', undefined, [
      {
        text: 'Yes',
        onPress: () => {
          catalogCtx.deleteProduct(productId);
          navigation.pop(2);
        },
      },
      {
        text: 'No',
        onPress: () => {},
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
          disabled={!isChanged || isUploading}
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
            disabled={isUploading}
          />
        ),
      });
  }, [
    productId,
    isChanged,
    isUploading,
    productName,
    description,
    price,
    activityStatus,
    categoryId,
    selectedPhotos,
    oldPrice,
  ]);

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
            <View style={styles.fieldContainer}>
              <Text
                style={[
                  styles.fieldContainerText,
                  {
                    fontFamily: 'Roboto-medium',
                    color: inStockStatus
                      ? GlobalStyles.colors.success
                      : GlobalStyles.colors.darkError,
                  },
                ]}
              >
                In stock
              </Text>
              <ToggleSwitch
                value={inStockStatus}
                onValueChange={changeProductInfo.bind(this, 'inStock')}
                activeThumbColor={inStockStatus && GlobalStyles.colors.success}
                inactiveThumbColor={
                  !inStockStatus && GlobalStyles.colors.darkError
                }
              />
            </View>
          </SectionWrapper>
          <SectionWrapper>
            <TextField
              label={'Product name'}
              value={productName}
              onUpdateValue={changeProductInfo.bind(this, 'name')}
              required
            />
            <TextField
              label={'Description'}
              type={'multiline'}
              value={description}
              onUpdateValue={changeProductInfo.bind(this, 'description')}
              required
            />
            <TextField
              label={'Price'}
              iconType="tenge"
              keyboardType={'decimal-pad'}
              value={price}
              onUpdateValue={changeProductInfo.bind(this, 'price')}
              required
            />
            <TextField
              label={'Old Price (optional)'}
              iconType="tenge"
              required
              keyboardType={'decimal-pad'}
              value={oldPrice}
              onUpdateValue={changeProductInfo.bind(this, 'oldPrice')}
            />
          </SectionWrapper>
          <SectionWrapper label={'Photo'}>
            <ImagePicker
              images={selectedPhotos}
              setImages={changeProductInfo.bind(this, 'content')}
            />
          </SectionWrapper>
          <SectionWrapper label={'Category'}>
            <RadioButton
              data={catalogCtx.categories}
              selectedId={categoryId}
              onSelect={changeProductInfo.bind(this, 'category')}
            />
          </SectionWrapper>
          <SectionWrapper
            label={'Product options'}
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
                    {selectedOptionGroups[0].items?.length} выбрано
                  </Text>
                </View>
              </Card>
            ) : (
              <PrimaryButton
                type="outlined"
                onPress={openSelectOptionGroupsScreen}
              >
                Select option
              </PrimaryButton>
            )}
          </SectionWrapper>
          <SectionWrapper>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldContainerText}>Display on website</Text>
              <ToggleSwitch
                value={activityStatus}
                onValueChange={changeProductInfo.bind(this, 'active')}
              />
            </View>
          </SectionWrapper>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <PrimaryButton
              color="transparent"
              textColor={GlobalStyles.colors.darkError}
              iconBefore={
                <MaterialIcons
                  name="delete-outline"
                  size={24}
                  color={GlobalStyles.colors.darkError}
                />
              }
              style={styles.deleteBtn}
              textStyle={styles.deleteBtnText}
              onPress={deleteProduct}
            >
              Delete the product
            </PrimaryButton>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default EditProductScreen;

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
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldContainerText: {
    fontSize: 16,
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
  deleteBtn: {
    marginVertical: 20,
    paddingVertical: 0,
    width: 200,
  },
  deleteBtnText: {
    fontFamily: 'Roboto-regular',
  },
});
