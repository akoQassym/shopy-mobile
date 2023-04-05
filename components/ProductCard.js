import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import IconButton from './ui/buttons/IconButton';
import PressableContainer from './ui/PressableContainer';
import Text from './ui/Text';
import OptionBadge from './OptionBadge';
import { GlobalStyles } from '../constants/styles';
import ProgressiveImage from './ui/ProgressiveImage';

const ProductCard = ({
  title,
  imageUri,
  category,
  price,
  options,
  isActive,
  onPress,
}) => {
  return (
    <PressableContainer onPress={onPress}>
      <View style={[styles.cardContainer, !isActive && { opacity: 0.5 }]}>
        <View style={[styles.imageContainer, !imageUri && styles.blankImage]}>
          {imageUri ? (
            <ProgressiveImage source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <IconButton
              icon="ionicons"
              name="image-outline"
              size={35}
              color={GlobalStyles.colors.gray}
            />
          )}
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          {category && <Text style={styles.categoryTag}>{category}</Text>}
          <Text style={styles.price}>{price}₸</Text>
          <View style={styles.badgesContainer}>
            {options.map((optionSet, optionSetKey) => (
              <View key={optionSetKey} style={{ flexDirection: 'row' }}>
                {optionSet.optionLabels.map((option, optionKey) => (
                  <OptionBadge
                    badgeTitle={option}
                    key={optionSetKey + optionKey}
                    cardStyle={optionSetKey != 0 && { marginTop: 5 }}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>
      </View>
    </PressableContainer>
  );
};

export default memo(ProductCard);

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 10,
    paddingHorizontal: 13,
    minHeight: 100,
    borderRadius: 10,
    backgroundColor: GlobalStyles.colors.white,
    flexDirection: 'row',
    marginVertical: 4,
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: 10,
    width: 85,
    height: 85,
    backgroundColor: GlobalStyles.colors.veryLightGray,
  },
  blankImage: {
    backgroundColor: GlobalStyles.colors.veryLightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 85,
    height: 85,
  },
  contentContainer: {
    paddingLeft: 13,
    flexShrink: 1,
  },
  title: {
    fontSize: 17,
    color: GlobalStyles.colors.black,
    lineHeight: 23,
  },
  categoryTag: {
    fontSize: 12,
    color: GlobalStyles.colors.darkGray,
    fontFamily: 'Roboto-light',
    lineHeight: 16,
  },
  price: {
    fontSize: 17,
    color: GlobalStyles.colors.black,
    lineHeight: 27,
    fontFamily: 'Roboto-medium',
  },
  badgesContainer: {
    flexDirection: 'column',
    paddingTop: 4,
  },
});
