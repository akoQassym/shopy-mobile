import { useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import {
  IconButton,
  ToggleSwitch,
  SectionWrapper,
  Text,
} from '../../components';

const CategoryInfoScreen = ({ route, navigation }) => {
  const { categoryId, categoryData } = route.params;

  const openEditCategory = () => {
    navigation.navigate('EditCategoryScreen', {
      categoryId: categoryId,
      categoryData: categoryData,
    });
  };

  useEffect(() => {
    navigation.setOptions({ title: categoryData.name });
  }, [categoryData]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="feather"
          name="edit"
          size={22}
          onPress={openEditCategory}
        />
      ),
    });
  }, [categoryId]);

  return (
    <ScrollView style={styles.root}>
      <SectionWrapper label="Name">
        {categoryData.name && (
          <Text style={styles.text}>{categoryData.name}</Text>
        )}
      </SectionWrapper>
      <SectionWrapper label="Description">
        <Text style={styles.text}>
          {!categoryData.description || categoryData.description === ''
            ? '-'
            : categoryData.description}
        </Text>
      </SectionWrapper>
      <SectionWrapper>
        <View style={styles.fieldContainer}>
          <Text>Display on website</Text>
          <ToggleSwitch value={categoryData.active} disabled />
        </View>
      </SectionWrapper>
    </ScrollView>
  );
};

export default CategoryInfoScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginVertical: 2,
  },
});
