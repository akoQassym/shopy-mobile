import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, DeviceEventEmitter } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Text from '../../ui/Text';
import PressableContainer from '../../ui/PressableContainer';
import ColorLabelBadge from '../../ui/ColorLabelBadge';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../../constants/styles';
import getDynamicTextColor from '../../../utils/getDynamicTextColor';

const ColorSelect = ({
  colorList,
  label,
  helperText,
  currentColor,
  onSelect,
  style,
}) => {
  const navigation = useNavigation();
  const [customColor, setCustomColor] = useState();
  const [selectedTextColor, setSelectedTextColor] = useState('#202020');

  const pressCustomColorBtn = () => {
    navigation.navigate('EditColorScreen', {
      selectedColor: currentColor,
    });
  };

  const changeSelectedColor = (value) => {
    if (currentColor !== value) onSelect(value);
  };

  const chooseCustomColor = (value) => {
    if (customColor !== value) setCustomColor(value);
    if (currentColor !== value) onSelect(value);
  };

  useEffect(() => {
    DeviceEventEmitter.addListener('chooseCustomColor', chooseCustomColor);
    return () => {
      DeviceEventEmitter.removeAllListeners('chooseCustomColor');
    };
  }, []);

  useEffect(() => {
    const dynamicTextColor = getDynamicTextColor(currentColor);
    setSelectedTextColor(dynamicTextColor);
  }, [currentColor]);

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
            currentColor === color && styles.colorElementSelected,
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
    <View style={[styles.container, style && style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <ScrollView
        style={styles.colorSetContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {customColor && <ColorElement color={customColor} />}
        {colorList.map((color, key) => (
          <ColorElement color={color} key={key} />
        ))}
        <CustomColorButton onPress={pressCustomColorBtn} />
      </ScrollView>
      {currentColor && (
        <ColorLabelBadge
          label={'Выбранный цвет:'}
          color={currentColor}
          textColor={selectedTextColor}
        />
      )}
      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
};

export default ColorSelect;

const styles = StyleSheet.create({
  container: {},
  error: {
    borderColor: GlobalStyles.colors.error,
  },
  textInputLabelStyle: {
    borderColor: GlobalStyles.colors.gray,
  },
  label: {
    fontSize: 16,
    textAlign: 'left',
    fontFamily: 'Roboto-regular',
    marginBottom: 8,
  },
  helperText: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'left',
    color: GlobalStyles.colors.darkGray,
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
    borderColor: GlobalStyles.colors.gray,
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
    borderColor: GlobalStyles.colors.primary,
  },
});
