import { TextInput, Text, View, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const RenderIcon = ({ iconType }) => {
  return iconType === 'tenge' ? (
    <FontAwesome5
      name="tenge"
      size={16}
      color={GlobalStyles.colors.gray300}
      style={[styles.icon]}
    />
  ) : iconType === 'user' ? (
    <FontAwesome5
      name="user"
      size={16}
      color={GlobalStyles.colors.gray300}
      style={[styles.icon]}
    />
  ) : iconType === 'password' ? (
    <Feather
      name="lock"
      size={16}
      color={GlobalStyles.colors.gray300}
      style={[styles.icon]}
    />
  ) : iconType === 'phone' ? (
    <Feather
      name="phone"
      size={16}
      color={GlobalStyles.colors.gray300}
      style={[styles.icon]}
    />
  ) : iconType === 'email' ? (
    <Feather
      name="mail"
      size={16}
      color={GlobalStyles.colors.gray300}
      style={[styles.icon]}
    />
  ) : iconType === 'shop' ? (
    <Entypo
      name="shop"
      size={16}
      color={GlobalStyles.colors.gray300}
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
  return (
    <View style={styles.container}>
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
          secureTextEntry={type === 'password' || secure}
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
      </View>
      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: GlobalStyles.colors.gray300,
  },
  icon: {
    marginLeft: 15,
  },
  textInput: {
    flex: 1,
    width: '100%',
    fontSize: 16,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  error: {
    borderColor: GlobalStyles.colors.error250,
  },
  textInputLabelStyle: {
    borderColor: GlobalStyles.colors.gray200,
  },
  label: {
    fontSize: 14,
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
    color: GlobalStyles.colors.gray300,
  },
});
