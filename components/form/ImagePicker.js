import { Alert, StyleSheet, View, ScrollView } from 'react-native';
import Text from '../ui/Text';
import CloseButton from '../ui/buttons/CloseButton';
import SecondaryButton from '../ui/buttons/SecondaryButton';
import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
  useMediaLibraryPermissions,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../constants/styles';
import FastImage from 'react-native-fast-image';

const ImagePicker = ({
  label,
  images,
  setImages,
  maxLength,
  style,
  quality,
  aspect,
}) => {
  const [cameraPermissionStatus, requestCameraPermission] =
    useCameraPermissions();
  const [mediaPermissionStatus, requestMediaPermission] =
    useMediaLibraryPermissions();

  const verifyCameraPermissions = async () => {
    if (cameraPermissionStatus.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestCameraPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionStatus.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Not enough rights!',
        'To use this function, you must provide access to the camera.',
      );
      return false;
    }
    return true;
  };

  const takeImage = async () => {
    const hasPermission = await verifyCameraPermissions();
    if (!hasPermission) return;

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: aspect ?? [1, 1],
      quality: quality ?? 1,
    });

    if (!image.canceled) {
      const data = {
        assetId: image.assets[0].assetId,
        fileSize: image.assets[0].fileSize,
        uri: image.assets[0].uri,
      };
      setImages((prevImages) =>
        prevImages != null ? [...prevImages, data] : [data],
      );
    }
  };

  const verifyMediaPermissions = async () => {
    if (mediaPermissionStatus.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestMediaPermission();
      return permissionResponse.granted;
    }
    if (mediaPermissionStatus.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Not enough rights!',
        'To use this feature, you must grant access to the gallery.',
      );
      return false;
    }

    return true;
  };

  const pickImageFromMedia = async () => {
    const hasPermission = await verifyMediaPermissions();
    if (!hasPermission) return;
    let image = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: aspect ?? [1, 1],
      quality: quality ?? 1,
    });

    if (!image.canceled) {
      const data = {
        assetId: image.assets[0].assetId,
        fileSize: image.assets[0].fileSize,
        uri: image.assets[0].uri,
      };
      setImages((prevImages) =>
        prevImages != null ? [...prevImages, data] : [data],
      );
    }
  };

  const deleteImage = (key) => {
    Alert.alert('Are you sure, что хотите удалить изображение?', undefined, [
      {
        text: 'Delete',
        onPress: () =>
          setImages([...images.slice(0, key), ...images.slice(key + 1)]),
      },
      {
        text: 'Cancel',
        onPress: () => {},
      },
    ]);
  };

  return (
    <View style={[styles.root, style && style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <ScrollView
        showsHorizontalScrollIndicator
        horizontal
        contentContainerStyle={styles.content}
      >
        {images &&
          images.length > 0 &&
          images.map((image, key) => (
            <View key={key} style={styles.imageContainer}>
              <CloseButton
                style={styles.closeButton}
                onPress={deleteImage.bind(this, key)}
              />
              <View>
                <FastImage
                  source={{ uri: image.uri }}
                  style={styles.previewImage}
                />
              </View>
            </View>
          ))}
        {(!maxLength || (images && images.length < maxLength)) && (
          <View style={styles.buttonsContainer}>
            <SecondaryButton
              icon={
                <Ionicons
                  name="camera"
                  size={20}
                  color={GlobalStyles.colors.black}
                />
              }
              form="rectangle"
              onPress={takeImage}
            >
              Take a photo
            </SecondaryButton>
            <SecondaryButton
              icon={
                <Ionicons
                  name="image"
                  size={20}
                  color={GlobalStyles.colors.black}
                />
              }
              form="rectangle"
              onPress={pickImageFromMedia}
              style={{ marginTop: 5 }}
            >
              Chose a photo
            </SecondaryButton>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  root: {},
  content: {
    alignItems: 'center',
  },
  buttonsContainer: {
    width: 130,
    flexDirection: 'column',
  },
  label: {
    fontSize: 16,
    textAlign: 'left',
    fontFamily: 'Roboto-regular',
    marginTop: 10,
    marginBottom: 8,
    color: GlobalStyles.colors.black,
  },
  imageContainer: {
    position: 'relative',
  },
  previewImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginVertical: 8,
    marginRight: 10,
    zIndex: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 3,
    zIndex: 3,
    elevation: 3,
  },
});
