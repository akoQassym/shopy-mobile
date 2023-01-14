import { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  DeviceEventEmitter,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../constants/styles';
import { useNavigation } from '@react-navigation/native';
import getDynamicTextColor from '../../utils/getDynamicTextColor';

import PressableContainer from '../ui/PressableContainer';
import ColorLabelBadge from '../ui/ColorLabelBadge';

const ColorSelect = ({ currentColor, colorList, label, bottomText }) => {
  const navigation = useNavigation();
  const [selectedColor, setSelectedColor] = useState(currentColor ?? '#202020');
  const [customColor, setCustomColor] = useState();
  const [selectedTextColor, setSelectedTextColor] = useState('#202020');

  const pressCustomColorBtn = () => {
    navigation.navigate('EditColorScreen', {
      selectedColor: selectedColor,
    });
  };

  const changeSelectedColor = (newColor) => {
    if (selectedColor !== newColor) setSelectedColor(newColor);
  };

  const chooseCustomColor = (newColor) => {
    if (customColor !== newColor) setCustomColor(newColor);
    if (selectedColor !== newColor) setSelectedColor(newColor);
  };

  useEffect(() => {
    DeviceEventEmitter.addListener('chooseCustomColor', chooseCustomColor);
    return () => {
      DeviceEventEmitter.removeAllListeners('chooseCustomColor');
    };
  }, []);

  useEffect(() => {
    const dynamicTextColor = getDynamicTextColor(selectedColor);
    setSelectedTextColor(dynamicTextColor);
  }, [selectedColor]);

  const ColorElement = ({ color, props }) => {
    return (
      <PressableContainer
        {...props}
        onPress={changeSelectedColor.bind(this, color)}
      >
        <View
          style={[
            styles.colorElement,
            { backgroundColor: color },
            selectedColor === color && styles.colorElementSelected,
          ]}
        />
      </PressableContainer>
    );
  };

  const CustomColorButton = ({ onPress }) => {
    return (
      <PressableContainer onPress={onPress}>
        <View style={[styles.colorElement, { justifyContent: 'center' }]}>
          <Ionicons
            name="color-palette"
            size={35}
            color="black"
            style={{
              position: 'absolute',
              alignSelf: 'center',
            }}
          />
          <LinearGradient
            colors={[
              'red',
              'orange',
              'yellow',
              'green',
              'blue',
              'indigo',
              'violet',
            ]}
            start={{ x: 0, y: 0 }}
            style={[styles.customColorElement]}
          />
        </View>
      </PressableContainer>
    );
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <ScrollView
        style={styles.colorSetContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {customColor && <ColorElement color={customColor} />}
        <ColorElement color={currentColor} />
        {colorList.map((color, key) => (
          <ColorElement color={color} key={key} />
        ))}
        <CustomColorButton onPress={pressCustomColorBtn} />
      </ScrollView>
      {selectedColor && (
        <ColorLabelBadge
          label={'Выбранный цвет:'}
          color={selectedColor}
          textColor={selectedTextColor}
        />
      )}
      {bottomText && <Text style={styles.bottomText}>{bottomText}</Text>}
    </View>
  );
};

export default ColorSelect;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
  error: {
    borderColor: GlobalStyles.colors.error250,
  },
  textInputLabelStyle: {
    borderColor: GlobalStyles.colors.gray200,
  },
  label: {
    fontSize: 16,
    textAlign: 'left',
    fontFamily: 'Roboto-regular',
    marginBottom: 8,
  },
  bottomText: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'left',
    color: GlobalStyles.colors.gray300,
  },
  colorSetContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 8,
  },
  colorElement: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.gray200,
  },
  customColorElement: {
    opacity: 0.3,
    width: 50,
    height: 50,
    borderRadius: 10,
    flex: 1,
  },
  colorElementSelected: {
    borderWidth: 3,
    borderColor: GlobalStyles.colors.primary500,
  },
});
