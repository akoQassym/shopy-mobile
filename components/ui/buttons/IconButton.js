import { StyleSheet, View } from 'react-native';
import PressableContainer from '../PressableContainer';
import Text from '../Text';
import { GlobalStyles } from '../../../constants/styles';
import {
  Ionicons,
  Feather,
  MaterialIcons,
  FontAwesome5,
  Foundation,
} from '@expo/vector-icons';

const IconButton = ({
  icon = 'ionicons',
  color = GlobalStyles.colors.black,
  size = 24,
  onPress,
  name,
  label,
  labelColor,
  labelStyle,
  disabled,
  style,
}) => {
  return (
    <PressableContainer onPress={onPress}>
      <View
        style={[styles.container, style && style, disabled && styles.disabled]}
      >
        {label && (
          <Text
            style={[
              styles.label,
              labelColor && { color: labelColor },
              labelStyle && labelStyle,
            ]}
          >
            {label}
          </Text>
        )}
        {icon === 'feather' ? (
          <Feather name={name} size={size} color={color} />
        ) : icon === 'ionicons' ? (
          <Ionicons name={name} size={size} color={color} />
        ) : icon === 'material' ? (
          <MaterialIcons name={name} size={size} color={color} />
        ) : icon === 'fontAwesome5' ? (
          <FontAwesome5 name={name} size={size} color={color} />
        ) : icon === 'foundation' ? (
          <Foundation name={name} size={size} color={color} />
        ) : (
          ''
        )}
      </View>
    </PressableContainer>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginRight: 7,
  },
  disabled: {
    opacity: 0.3,
  },
});
