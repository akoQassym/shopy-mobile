import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { GlobalStyles } from '../../constants/styles';

const ProgressiveImage = ({ style, source, containterStyle }) => {
  const opacity = useSharedValue(0);
  opacity.value = withRepeat(
    withTiming(1, { duration: 1000, easing: Easing.ease }),
    -1,
    true,
  );
  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <View
      style={[
        {
          backgroundColor: GlobalStyles.colors.veryLightGray,
          position: 'relative',
        },
        containterStyle && containterStyle,
      ]}
    >
      <Animated.View style={animatedStyle} />
      <FastImage
        source={source}
        style={[{ position: 'absolute', zIndex: 5 }, style && style]}
      />
    </View>
  );
};

export default ProgressiveImage;
