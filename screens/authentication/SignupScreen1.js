import { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { Text, PrimaryButton, Link, TextField } from '../../components';

const windowWidth = Dimensions.get('window').width;
const loaderWidth = windowWidth * 0.4;

const SignupScreen1 = ({ navigation }) => {
  const [shopName, setShopName] = useState(null);

  const changeShopName = (value) => {
    setShopName(value);
  };

  const submit = () => {
    navigation.navigate('Signup2', {
      enteredShopName: shopName,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        <View style={styles.content}>
          <View style={styles.loadingSlider} />
          <View>
            <Text style={styles.title}>What is the name of your store?</Text>
            <TextField
              placeholder="Store name"
              iconType="shop"
              value={shopName}
              onUpdateValue={changeShopName}
            />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.supplementaryTextContainer}>
              <Text style={styles.supplementaryText}>
                Do you already have an account?{' '}
              </Text>
              <Link to={{ screen: 'Login' }} replace>
                Login
              </Link>
            </View>
            <PrimaryButton onPress={submit} disabled={!shopName}>
              Continue
            </PrimaryButton>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignupScreen1;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
    backgroundColor: GlobalStyles.colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  loadingSlider: {
    position: 'absolute',
    left: -18,
    top: 0,
    width: loaderWidth,
    height: 5,
    backgroundColor: GlobalStyles.colors.primary,
  },
  title: {
    fontSize: 25,
    fontFamily: 'Roboto-semi-bold',
    textAlign: 'left',
    marginTop: 100,
    marginBottom: 40,
    width: 320,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  supplementaryTextContainer: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  supplementaryText: {
    textAlign: 'center',
    color: GlobalStyles.colors.darkGray,
  },
});
