import { Image, StyleSheet, View } from 'react-native';
import Text from './ui/Text';
import { GlobalStyles } from '../constants/styles';
import OptionBadge from './OptionBadge';
import PressableContainer from './ui/PressableContainer';

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
        <View style={styles.imageContainer}>
          <Image source={imageUri} style={styles.image} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.categoryTag}>{category}</Text>
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

export default ProductCard;

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
  },
  image: {
    width: 85,
    height: 85,
  },
  contentContainer: {
    paddingLeft: 13,
  },
  title: {
    fontSize: 17,
    color: GlobalStyles.colors.black,
    lineHeight: 23,
  },
  categoryTag: {
    fontSize: 12,
    color: GlobalStyles.colors.gray300,
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
