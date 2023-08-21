import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, StyleSheet, DeviceEventEmitter } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import Text from '../../ui/Text';
import PrimaryButton from '../../ui/buttons/PrimaryButton';
import getDynamicTextColor from '../../../utils/getDynamicTextColor';

const ColorSelectWheel = ({ currentColor }) => {
  const navigation = useNavigation();
  const [selectedColor, setSelectedColor] = useState(currentColor ?? '#000000');
  const [textColor, setTextColor] = useState('#202020');

  const changeColor = (value) => {
    setSelectedColor(value);
  };

  const submitColor = () => {
    DeviceEventEmitter.emit('chooseCustomColor', selectedColor);
    navigation.goBack();
  };

  useEffect(() => {
    const dynamicTextColor = getDynamicTextColor(selectedColor);
    setTextColor(dynamicTextColor);
  }, [selectedColor]);

  return (
    <View>
      <Text style={styles.text}>
        Selected color:{' '}
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
        onColorChange={changeColor}
        thumbSize={20}
        sliderSize={30}
        noSnap={false}
        row={false}
        shadeWheelThumb
        autoResetSlider
      />
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={submitColor}>Choose</PrimaryButton>
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
