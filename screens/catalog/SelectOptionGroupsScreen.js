import { useState, useLayoutEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { makeEventNotifier } from '../../utils/hooks/useEventEmitter';
import {
  Text,
  IconButton,
  MultiSelect,
  PressableContainer,
  HintBox,
} from '../../components';
import { FlashList } from '@shopify/flash-list';
import { GlobalStyles } from '../../constants/styles';
import { DEFAULT_OPTION_GROUPS } from '../../utils/constants/optionGroups';

const notifer = makeEventNotifier('OnCountrySelected');

export function useOptionGroupListener(listener, deps) {
  notifer.useEventListener(listener, deps);
}

const RenderOptionGroup = ({ item, selectedItems, onChange, disabled }) => {
  const onSelectOption = (key) => {
    onChange(item.id, item.data.name, key);
  };

  return (
    <MultiSelect
      label={item.data.name}
      items={item.data.optionGroupVariants}
      selectedItems={selectedItems}
      onSelectedItemsChange={onSelectOption}
      disabled={disabled}
    />
  );
};

const SelectOptionGroupsScreen = ({ navigation, route }) => {
  const { submittedOptionGroups } = route.params;

  const [isChanged, setIsChanged] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(
    (submittedOptionGroups?.length && [
      {
        id: submittedOptionGroups[0].id,
        items: [...submittedOptionGroups[0].items],
      },
    ]) ??
      [],
  );

  const changeSelectedOptions = (itemId, itemName, key) => {
    !isChanged && setIsChanged(true);
    setSelectedOptions((prev) => {
      if (!prev.length) return [{ id: itemId, name: itemName, items: [key] }];
      let optionGroupItems = [...prev[0].items];
      optionGroupItems.includes(key)
        ? (optionGroupItems = optionGroupItems.filter((item) => item != key))
        : optionGroupItems.push(key);
      return optionGroupItems.length
        ? [{ id: itemId, name: itemName, items: optionGroupItems }]
        : [];
    });
  };

  const submit = () => {
    notifer.notify({ value: selectedOptions });
    navigation.goBack();
  };

  const cancelChanges = () => {
    Alert.alert('Вы уверены, что хотите отменить все изменения?', undefined, [
      { text: 'Продолжить редактирование', onPress: () => {} },
      {
        text: 'Отменить',
        onPress: () => {
          setIsChanged(false);
          navigation.goBack();
        },
      },
    ]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: !isChanged,
      headerRight: () => (
        <PressableContainer onPress={submit} disabled={!isChanged}>
          <Text
            style={{
              color: GlobalStyles.colors.primary,
              opacity: isChanged ? 1 : 0.3,
            }}
          >
            Сохранить
          </Text>
        </PressableContainer>
      ),
    });
    isChanged &&
      navigation.setOptions({
        headerLeft: () => (
          <IconButton
            onPress={cancelChanges}
            label="Отмена"
            labelColor={GlobalStyles.colors.error}
          />
        ),
      });
  }, [isChanged, selectedOptions]);

  return (
    <View style={styles.root}>
      <HintBox label="Выбранные опции будут отображаться на сайте" />
      <FlashList
        data={DEFAULT_OPTION_GROUPS}
        extraData={selectedOptions}
        renderItem={({ item }) => {
          const selectedItems =
            (selectedOptions.length
              ? selectedOptions.find((elem) => elem.id === item.id)?.items
              : []) ?? [];
          return (
            <RenderOptionGroup
              item={item}
              onChange={changeSelectedOptions}
              selectedItems={selectedItems}
              disabled={
                !selectedOptions.length
                  ? false
                  : selectedOptions && !selectedItems.length
              }
            />
          );
        }}
        keyExtractor={(item) => item.id}
        estimatedItemSize={150}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default SelectOptionGroupsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 10,
  },
});
