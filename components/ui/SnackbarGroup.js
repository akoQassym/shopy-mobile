import { useContext, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated';
import { GlobalStyles } from '../../constants/styles';
import IconButton from './buttons/IconButton';
import Text from './Text';
import { SnackbarContext } from '../../store';

const Snackbar = memo(({ title, text = '', type = 'info', onPress }) => {
  const color =
    type === 'info'
      ? GlobalStyles.colors.primary
      : type === 'success'
      ? GlobalStyles.colors.success
      : type === 'error'
      ? GlobalStyles.colors.error
      : type === 'warning'
      ? GlobalStyles.colors.warning
      : GlobalStyles.colors.darkGray;
  return (
    <Animated.View
      entering={SlideInRight}
      exiting={SlideOutRight}
      style={[styles.snackbarContainer]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <IconButton
          icon="material"
          name={
            type === 'success'
              ? 'done'
              : type === 'info'
              ? 'info-outline'
              : type
          }
          color={color}
          style={styles.icon}
          size={24}
        />
        <View style={styles.contentContainer}>
          {title && <Text style={styles.title}>{title}</Text>}
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
      <IconButton
        icon="ionicons"
        name="close"
        size={18}
        color={color}
        onPress={onPress}
        style={styles.btnContainer}
      />
    </Animated.View>
  );
});

const SnackbarGroup = ({ data }) => {
  const snackbarCtx = useContext(SnackbarContext);
  return (
    <View style={styles.groupContainer}>
      {data &&
        data.map((element, key) => (
          <Snackbar
            key={key}
            title={element.title}
            text={element.text}
            type={element.type}
            onPress={snackbarCtx.deleteSnackbar.bind(this, key)}
          />
        ))}
    </View>
  );
};

export default SnackbarGroup;

const styles = StyleSheet.create({
  groupContainer: {
    position: 'absolute',
    top: 100,
    right: 10,
    flexDirection: 'column',
    elevation: 5,
    zIndex: 15,
  },
  snackbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 3,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: GlobalStyles.colors.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.darkGray,
    elevation: 5,
    zIndex: 15,
  },
  icon: {
    marginRight: 10,
  },
  contentContainer: {
    width: 150,
  },
  title: {
    fontFamily: 'Roboto-medium',
    fontSize: 16,
  },
  text: {
    color: GlobalStyles.colors.black,
    fontSize: 16,
  },
  btnContainer: {
    marginLeft: 20,
  },
  info: {
    borderLeftWidth: 5,
    borderLeftColor: GlobalStyles.colors.primary,
  },
  success: {
    borderLeftWidth: 5,
    borderLeftColor: GlobalStyles.colors.success,
  },
  error: {
    borderLeftWidth: 5,
    borderLeftColor: GlobalStyles.colors.error,
  },
  warning: {
    borderLeftWidth: 5,
    borderLeftColor: GlobalStyles.colors.warning,
  },
});
