import { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Feather, FontAwesome5, Entypo } from '@expo/vector-icons';
import { GlobalStyles } from '../../constants/styles';
import Text from '../ui/Text';

const RenderIcon = ({ iconType }) => {
  return iconType === 'tenge' ? (
    <FontAwesome5
      name="tenge"
      size={16}
      color={GlobalStyles.colors.darkGray}
      style={[styles.icon]}
    />
  ) : iconType === 'user' ? (
    <FontAwesome5
      name="user"
      size={16}
      color={GlobalStyles.colors.darkGray}
      style={[styles.icon]}
    />
  ) : iconType === 'password' ? (
    <Feather
      name="lock"
      size={16}
      color={GlobalStyles.colors.darkGray}
      style={[styles.icon]}
    />
  ) : iconType === 'phone' ? (
    <Feather
      name="phone"
      size={16}
      color={GlobalStyles.colors.darkGray}
      style={[styles.icon]}
    />
  ) : iconType === 'email' ? (
    <Feather
      name="mail"
      size={16}
      color={GlobalStyles.colors.darkGray}
      style={[styles.icon]}
    />
  ) : iconType === 'shop' ? (
    <Entypo
      name="shop"
      size={16}
      color={GlobalStyles.colors.darkGray}
      style={[styles.icon]}
    />
  ) : (
    ''
  );
};

const TextField = ({
  type,
  placeholder,
  style,
  wrapperStyle,
  error,
  label,
  helperText,
  iconType,
  customIcon,
  required,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  props,
}) => {
  const [isSecure, setIsSecure] = useState(type === 'password' || secure);
  const invertIsSecure = () => {
    setIsSecure((prev) => !prev);
  };

  return (
    <View style={[styles.container, wrapperStyle && wrapperStyle]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && ' *'}
        </Text>
      )}
      <View style={styles.inputContainer}>
        {iconType ? (
          <RenderIcon iconType={iconType} />
        ) : (
          customIcon && customIcon
        )}
        <TextInput
          secureTextEntry={isSecure}
          multiline={type === 'multiline' ? true : false}
          placeholder={placeholder}
          keyboardType={keyboardType}
          onChangeText={onUpdateValue}
          value={value}
          style={[
            styles.textInput,
            label && styles.textInputLabelStyle,
            type === 'multiline' && styles.multiline,
            style && style,
            error && styles.error,
          ]}
          {...props}
        />
        {type === 'password' && (
          <Feather
            name={isSecure ? 'eye-off' : 'eye'}
            size={16}
            color={GlobalStyles.colors.darkGray}
            style={[styles.rightEndIcon]}
            onPress={invertIsSecure}
          />
        )}
      </View>
      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: GlobalStyles.colors.darkGray,
  },
  icon: {
    marginLeft: 15,
  },
  rightEndIcon: {
    marginRight: 15,
  },
  textInput: {
    flex: 1,
    width: '100%',
    fontSize: 16,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
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
    color: GlobalStyles.colors.black,
  },
  multiline: {
    minHeight: 100,
  },
  helperText: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'left',
    color: GlobalStyles.colors.darkGray,
  },
});
