import { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import storage from '@react-native-firebase/storage';
import { GlobalStyles } from '../../constants/styles';
import {
  IconButton,
  ImagePicker,
  ColorSelect,
  LoadingOverlay,
} from '../../components';
import { ShopContext } from '../../store';

const EditDesignScreen = ({ navigation }) => {
  const shopCtx = useContext(ShopContext);
  const [isChanged, setIsChanged] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [transferred, setTransferred] = useState();
  const [uploadTask, setUploadTask] = useState();

  const [colorAccent, setColorAccent] = useState(
    (shopCtx.shopInfo?.colorAccent && shopCtx.shopInfo.colorAccent) ?? '',
  );
  const [selectedLogo, setSelectedLogo] = useState(
    (shopCtx.shopInfo?.logo && [shopCtx.shopInfo.logo]) ?? [],
  );
  const [selectedBackgroundBanner, setSelectedBackgroundBanner] = useState(
    (shopCtx.shopInfo?.backgroundBanner && [
      shopCtx.shopInfo.backgroundBanner,
    ]) ??
      [],
  );

  const changeDesignInfo = (fieldName, value) => {
    !isChanged && setIsChanged(true);
    switch (fieldName) {
      case 'colorAccent':
        setColorAccent(value);
        break;
      case 'logo':
        setSelectedLogo(value);
        break;
      case 'backgroundBanner':
        setSelectedBackgroundBanner(value);
        break;
      default:
        return;
    }
  };

  const uploadImage = async (image) => {
    const { uri } = image;
    if (!image.assetId) return uri;
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
    setIsUploading(true);
    const uploadLogo = uploadImage(selectedLogo[0]).catch((error) => {
      Alert.alert('Ошибка при загрузке логотипа!', error.message);
    });
    const uploadBackgroundBanner = uploadImage(
      selectedBackgroundBanner[0],
    ).catch((error) => {
      Alert.alert('Ошибка при загрузке фонового фото!', error.message);
    });
    const uploadedPhotosArr = await Promise.all([
      uploadLogo,
      uploadBackgroundBanner,
    ]);
    setIsUploading(false);
    shopCtx.editShopDesign(
      colorAccent,
      { type: 'photo', uri: uploadedPhotosArr[0] },
      { type: 'photo', uri: uploadedPhotosArr[1] },
    );
    navigation.goBack();
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
    isChanged,
    isUploading,
    colorAccent,
    selectedLogo,
    selectedBackgroundBanner,
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
    <ScrollView style={styles.root}>
      <View style={styles.content}>
        <View style={styles.formContainer}>
          <ImagePicker
            images={selectedLogo}
            setImages={changeDesignInfo.bind(this, 'logo')}
            maxLength={1}
            quality={0.6}
            label="Логотип"
          />
        </View>
        <View style={styles.formContainer}>
          <ImagePicker
            images={selectedBackgroundBanner}
            setImages={changeDesignInfo.bind(this, 'backgroundBanner')}
            maxLength={1}
            aspect={[16, 9]}
            quality={0.85}
            label="Фоновое фото"
          />
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
    paddingTop: 10,
  },
  formContainer: {
    paddingVertical: 10,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
  },
});
