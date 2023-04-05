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
      Alert('Ошибка при загрузке фотографии!', error.message);
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
            Alert.alert('Ошибка при загрузке изображения!', error.message);
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
      categoryId,
      uploadedPhotosArr,
      selectedOptionGroups,
      inStockStatus,
      activityStatus,
      selectedOptionGroups,
    );
    navigation.pop(2);
  };

  const cancelChanges = () => {
    Alert.alert('Вы уверены, что хотите отменить все изменения?', undefined, [
      { text: 'Продолжить редактирование', onPress: () => {} },
      {
        text: 'Отменить',
        onPress: () => {
          setIsChanged(false);
          navigation.goBack();
        },
      },
    ]);
  };

  const clear = (variable) => {
    Alert.alert('Вы уверены?', undefined, [
      {
        text: 'Да',
        onPress: () => {
          if (variable === 'optionGroups') setSelectedOptionGroups([]);
        },
      },
      {
        text: 'Нет',
        onPress: () => {},
      },
    ]);
  };

  const deleteProduct = () => {
    Alert.alert('Вы уверены, что хотите удалить товар?', undefined, [
      {
        text: 'Да',
        onPress: () => {
          catalogCtx.deleteProduct(productId);
          navigation.pop(2);
        },
      },
      {
        text: 'Нет',
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
          label="Сохранить"
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
            label="Отмена"
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
  ]);

  if (isUploading) {
    return (
      <LoadingOverlay
        message={'Загрузка изображений...'}
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
                Есть в наличии
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
              label={'Название товара'}
              value={productName}
              onUpdateValue={changeProductInfo.bind(this, 'name')}
              required
            />
            <TextField
              label={'Описание'}
              type={'multiline'}
              value={description}
              onUpdateValue={changeProductInfo.bind(this, 'description')}
              required
            />
            <TextField
              label={'Цена'}
              iconType="tenge"
              keyboardType={'decimal-pad'}
              value={price}
              onUpdateValue={changeProductInfo.bind(this, 'price')}
              required
            />
          </SectionWrapper>
          <SectionWrapper label={'Фото'}>
            <ImagePicker
              images={selectedPhotos}
              setImages={changeProductInfo.bind(this, 'content')}
            />
          </SectionWrapper>
          <SectionWrapper label={'Категория'}>
            <RadioButton
              data={catalogCtx.categories}
              selectedId={categoryId}
              onSelect={changeProductInfo.bind(this, 'category')}
            />
          </SectionWrapper>
          <SectionWrapper
            label={'Опции товара'}
            button={
              selectedOptionGroups?.length ? (
                <PressableContainer onPress={clear.bind(this, 'optionGroups')}>
                  <Text
                    style={{
                      color: GlobalStyles.colors.darkError,
                      fontSize: 12,
                    }}
                  >
                    Очистить
                  </Text>
                </PressableContainer>
              ) : null
            }
          >
            <HintBox label="Например: Размер одежды (S, M, L, XL)" />
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
                Выбрать опции
              </PrimaryButton>
            )}
          </SectionWrapper>
          <SectionWrapper>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldContainerText}>Показывать на сайте</Text>
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
              Удалить товар
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
