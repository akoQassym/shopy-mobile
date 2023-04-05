import { Switch } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const ToggleSwitch = ({
  value,
  onValueChange,
  activeThumbColor,
  inactiveThumbColor,
  disabled,
}) => {
  return (
    <Switch
      trackColor={{
        false: GlobalStyles.colors.darkGray,
        true: GlobalStyles.colors.lightGray,
      }}
      thumbColor={
        value
          ? activeThumbColor ?? GlobalStyles.colors.primary
          : inactiveThumbColor ?? GlobalStyles.colors.gray
      }
      onValueChange={onValueChange}
      value={value}
      disabled={disabled}
    />
  );
};

export default ToggleSwitch;
