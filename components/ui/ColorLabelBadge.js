import { StyleSheet } from 'react-native';
import Text from './Text';
import { GlobalStyles } from '../../constants/styles';

const ColorLabelBadge = ({ label, color, textColor }) => {
  return (
    <Text style={styles.colorText}>
      {label && label + ' '}
      <Text
        style={[
          styles.selectedColorText,
          {
            backgroundColor: color,
            color: textColor,
          },
        ]}
      >
        {color}
      </Text>
    </Text>
  );
};

export default ColorLabelBadge;

const styles = StyleSheet.create({
  colorText: {
    color: GlobalStyles.colors.darkGray,
  },
  selectedColorText: {
    fontFamily: 'Roboto-medium',
  },
});
