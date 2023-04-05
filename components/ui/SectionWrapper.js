import { View, StyleSheet } from 'react-native';
import Text from './Text';
import { GlobalStyles } from '../../constants/styles';

const SectionWrapper = ({ label, children, style, labelStyle, button }) => {
  return (
    <View style={[styles.container, style && style]}>
      <View style={styles.headerContainer}>
        {label && (
          <Text style={[styles.label, labelStyle && labelStyle]}>{label}</Text>
        )}
        {button && button}
      </View>
      {children}
    </View>
  );
};

export default SectionWrapper;

const styles = StyleSheet.create({
  container: {
    marginVertical: 7,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: GlobalStyles.colors.white,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    textAlign: 'left',
    fontFamily: 'Roboto-regular',
    marginTop: 10,
    marginBottom: 8,
    color: GlobalStyles.colors.black,
  },
});
