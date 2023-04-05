import { ActivityIndicator, StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress';
import Text from './Text';
import { GlobalStyles } from '../../constants/styles';

function LoadingOverlay({ message, progressBar }) {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.message}>{message}</Text>
      {progressBar ? (
        <Progress.Bar
          progress={progressBar}
          width={200}
          color={GlobalStyles.colors.primary}
        />
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});
