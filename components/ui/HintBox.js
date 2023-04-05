import { StyleSheet, View } from 'react-native';
import IconButton from './buttons/IconButton';
import Text from './Text';
import { GlobalStyles } from '../../constants/styles';

const HintBox = ({ style, textStyle, label }) => {
  return (
    <View style={[styles.container, style && style]}>
      <IconButton
        icon="material"
        name="info-outline"
        color={GlobalStyles.colors.darkGray}
        size={18}
      />
      <Text style={[styles.text, textStyle && textStyle]}>{label}</Text>
    </View>
  );
};

export default HintBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: GlobalStyles.colors.veryLightGray,
    borderRadius: 10,
    marginVertical: 5,
  },
  text: {
    fontSize: 12,
    paddingLeft: 12,
    color: GlobalStyles.colors.darkGray,
  },
});
