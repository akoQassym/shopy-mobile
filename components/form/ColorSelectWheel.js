import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, DeviceEventEmitter } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import getDynamicTextColor from '../../utils/getDynamicTextColor';
import PrimaryButton from '../ui/buttons/PrimaryButton';

const ColorSelectWheel = ({ currentColor }) => {
  const navigation = useNavigation();
  const [selectedColor, setSelectedColor] = useState(currentColor ?? '#000000');
  const [textColor, setTextColor] = useState('#202020');

  const onColorChange = (newColor) => {
    setSelectedColor(newColor);
  };

  const onSubmitColor = () => {
    DeviceEventEmitter.emit('onSetCustomColor', selectedColor);
    navigation.goBack();
  };

  useEffect(() => {
    const dynamicTextColor = getDynamicTextColor(selectedColor);
    setTextColor(dynamicTextColor);
  }, [selectedColor]);

  return (
    <View>
      <Text style={styles.text}>
        Выбранный цвет:{' '}
        <Text
          style={[
            styles.selectedColorText,
            {
              backgroundColor: selectedColor,
              color: textColor,
            },
          ]}
        >
          {selectedColor}
        </Text>
      </Text>
      <ColorPicker
        color={selectedColor}
        swatchesOnly={false}
        onColorChange={onColorChange}
        thumbSize={40}
        sliderSize={40}
        noSnap={false}
        row={false}
        shadeWheelThumb
        autoResetSlider
      />
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={onSubmitColor}>Выбрать</PrimaryButton>
      </View>
    </View>
  );
};

export default ColorSelectWheel;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 30,
  },
  selectedColorText: {
    fontFamily: 'Roboto-medium',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    marginTop: 320,
  },
});
