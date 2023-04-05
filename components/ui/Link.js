import { StyleSheet } from 'react-native';
import { Link as NativeLink, StackActions } from '@react-navigation/native';
import { GlobalStyles } from '../../constants/styles';

const Link = ({ to, replace, children, style }) => {
  return (
    <NativeLink
      style={[styles.link, style]}
      to={to}
      action={replace && StackActions.replace(to.screen, to.params)}
    >
      {children}
    </NativeLink>
  );
};

export default Link;

const styles = StyleSheet.create({
  link: {
    color: GlobalStyles.colors.primary,
    textDecorationLine: 'underline',
  },
});
