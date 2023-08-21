import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import IconButton from './buttons/IconButton';
import PressableContainer from './PressableContainer';
import Text from './Text';

const MultiSelect = ({
  label,
  items,
  selectedItems,
  onSelectedItemsChange,
  disabled,
  actionButtons,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const toggleOptionGroupVariants = () => {
    setIsOpened(!isOpened);
  };

  return (
    <View style={[styles.root, disabled && styles.disabled]}>
      <PressableContainer
        style={[styles.labelContainer]}
        onPress={toggleOptionGroupVariants}
        pressedStyle={{ opacity: 1 }}
        disabled={disabled}
      >
        <View>
          <Text style={styles.labelText}>{label}</Text>
          <Text style={styles.labelHelperText}>
            {selectedItems?.length ?? '0'} selected
          </Text>
        </View>
        <View>
          <IconButton
            icon="material"
            name={isOpened ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={20}
            color={GlobalStyles.colors.gray}
            style={styles.labelIcon}
          />
        </View>
      </PressableContainer>
      {isOpened && (
        <ScrollView>
          {items?.map((item, key) => (
            <PressableContainer
              key={key}
              style={styles.selectItemContainer}
              pressedStyle={styles.selectItemPressed}
              onPress={onSelectedItemsChange.bind(this, key)}
            >
              <Text style={styles.selectItemText}>{item}</Text>
              {selectedItems?.includes(key) && (
                <IconButton
                  icon="material"
                  name="done"
                  size={15}
                  color={GlobalStyles.colors.primary}
                />
              )}
            </PressableContainer>
          ))}
          {actionButtons && (
            <View style={styles.actionButtonsContainer}>{actionButtons}</View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default MultiSelect;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginVertical: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: GlobalStyles.colors.white,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  labelText: {
    marginVertical: 2,
    fontSize: 16,
    paddingRight: 10,
  },
  labelHelperText: {
    marginVertical: 2,
    fontSize: 14,
    color: GlobalStyles.colors.darkGray,
  },
  labelIcon: {
    padding: 8,
  },
  selectItemContainer: {
    paddingVertical: 15,
    paddingHorizontal: 7,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectItemText: {},
  selectItemPressed: {
    backgroundColor: GlobalStyles.colors.veryLightGray,
  },
  disabled: {
    opacity: 0.4,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 25,
  },
});
