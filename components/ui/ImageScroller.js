import { View, ScrollView, StyleSheet } from 'react-native';
import Text from './Text';
import { GlobalStyles } from '../../constants/styles';
import ProgressiveImage from './ProgressiveImage';

const ImageScroller = ({ images, label }) => {
  return (
    <View style={styles.root}>
      {label && (
        <Text style={styles.label}>
          {label} ({(images && images.length) ?? '0'})
        </Text>
      )}
      <ScrollView
        showsHorizontalScrollIndicator
        horizontal
        contentContainerStyle={styles.content}
      >
        {images &&
          images.length > 0 &&
          images.map((image, key) => (
            <View key={key} style={styles.imageContainer}>
              <ProgressiveImage
                source={{ uri: image.uri }}
                style={styles.previewImage}
                containterStyle={styles.previewImageContainer}
              />
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default ImageScroller;

const styles = StyleSheet.create({
  root: {
    marginVertical: 10,
  },
  content: {
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    textAlign: 'left',
    fontFamily: 'Roboto-regular',
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
  },
  previewImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginVertical: 8,
    marginRight: 10,
    zIndex: 10,
  },
});
