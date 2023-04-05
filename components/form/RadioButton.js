import { View, ScrollView, StyleSheet } from 'react-native';
import Text from '../ui/Text';
import PressableContainer from '../ui/PressableContainer';
import { GlobalStyles } from '../../constants/styles';

const RadioButton = ({
  label,
  data,
  selectedId,
  onSelect,
  withCircle,
  required,
}) => {
  const selectElement = (element) => {
    if (selectedId && selectedId === element.id) {
      onSelect(null);
    } else {
      onSelect(element.id);
    }
  };

  const RadioElement = ({ element, isSelected }) => {
    return (
      <PressableContainer onPress={selectElement.bind(this, element)}>
        <View
          style={[
            styles.elemContainer,
            isSelected && styles.selectedElemContainer,
          ]}
        >
          {withCircle && (
            <View style={[styles.circle, isSelected && styles.selectedCircle]}>
              <Text style={{ color: GlobalStyles.colors.white }}></Text>
            </View>
          )}
          <Text style={styles.title}>{element.data.name}</Text>
        </View>
      </PressableContainer>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.root}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && ' *'}
        </Text>
      )}
      {data.map((item, key) => (
        <RadioElement
          key={key}
          element={item}
          isSelected={selectedId ? selectedId === item.id : false}
        />
      ))}
    </ScrollView>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  elemContainer: {
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: GlobalStyles.colors.gray,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginVertical: 5,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    textAlign: 'left',
    fontFamily: 'Roboto-regular',
    marginTop: 10,
    marginBottom: 8,
    color: GlobalStyles.colors.black,
  },
  selectedElemContainer: {
    borderWidth: 2,
    borderColor: GlobalStyles.colors.primary,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.white,
    marginRight: 10,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.gray,
  },
  selectedCircle: {
    borderWidth: 4,
    borderColor: GlobalStyles.colors.primary,
  },
  title: {
    fontSize: 14,
  },
});
