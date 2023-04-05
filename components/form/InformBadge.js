import { View, StyleSheet } from 'react-native';
import Text from '../ui/Text';
import { GlobalStyles } from '../../constants/styles';

const InformBadge = ({ type, errorHighlightedText, customMessage }) => {
  return (
    <View style={[styles.badge, type === 'error' && styles.error]}>
      {customMessage ? (
        <Text style={[styles.badgeText, type === 'error' && styles.errorText]}>
          {customMessage}
        </Text>
      ) : (
        type === 'error' && (
          <Text
            style={[styles.badgeText, type === 'error' && styles.errorText]}
          >
            Пожалуйста, введите корректный{' '}
            <Text style={{ fontFamily: 'Roboto-medium' }}>
              {errorHighlightedText}
            </Text>
          </Text>
        )
      )}
    </View>
  );
};

export default InformBadge;

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: GlobalStyles.colors.gray,
    borderRadius: 10,
    marginVertical: 7,
  },
  badgeText: {
    fontSize: 15,
  },
  error: {
    backgroundColor: GlobalStyles.colors.lightError,
  },
  errorText: {
    color: GlobalStyles.colors.darkError,
  },
});
