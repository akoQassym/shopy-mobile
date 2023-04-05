import { View, StyleSheet } from 'react-native';
import Text from './ui/Text';
import { GlobalStyles } from '../constants/styles';

const OptionBadge = ({ badgeTitle, cardStyle, textStyle }) => {
  return (
    <View style={[styles.badgeContainer, cardStyle]}>
      <Text style={[styles.badgeTitle, textStyle]}>{badgeTitle}</Text>
    </View>
  );
};

export default OptionBadge;

const styles = StyleSheet.create({
  badgeContainer: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: GlobalStyles.colors.veryLightGray,
    borderRadius: 5,
    marginRight: 10,
  },
  badgeTitle: {
    color: GlobalStyles.colors.black,
    fontSize: 12,
    fontWeight: '300',
  },
});
