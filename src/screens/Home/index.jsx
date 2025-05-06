import React from 'react';
import {View, Text, TextInput, Pressable, ScrollView, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {SearchNormal, Element3, Clock, Message, Receipt21} from 'iconsax-react-native';
import {colors, fontType} from '../../theme';
import {ListHorizontal, ItemSmall} from '../../components';
import {CategoryList, BlogList} from '../../data';

export default function Home() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}>
      <Text style={styles.title}>WastraNusa</Text>
      </View>
      
      {/* Search Bar */}
      <View style={searchBar.container}>
        <TextInput
          style={searchBar.input}
          placeholder="Search"
          placeholderTextColor={colors.grey()}
        />
        <Pressable style={searchBar.button}>
          <SearchNormal size={20} color={colors.white()} />
        </Pressable>
      </View>

      {/* List Category */}
      <View style={styles.listCategory}>
        <FlatListCategory />
      </View>

      {/* List Blog */}
      <ListBlog />
    </View>
  );
}

const ListBlog = () => {
  const horizontalData = BlogList.slice(0, 3);
  const verticalData = BlogList.slice(3);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.listBlog}>
        <ListHorizontal data={horizontalData} />
        <View style={itemVertical.listCard}>
          {verticalData.map((item, index) => (
            <ItemSmall item={item} key={index} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const FlatListCategory = () => {
  const [selected, setSelected] = React.useState(1);

  const renderItem = ({item}) => {
    const color = item.id === selected ? colors.blue() : colors.grey();
    return (
      <TouchableOpacity onPress={() => setSelected(item.id)}>
        <View style={category.item}>
          <Text style={[category.title, {color}]}>{item.categoryName}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={CategoryList}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal: 24}}
      ItemSeparatorComponent={() => <View style={{width: 10}} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D4F6FF',
  },
  header: {
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    paddingTop: 8,
    paddingBottom: 4,
    elevation: 8,
  },
  title: {
    fontSize: 25,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.black(),
  },
  listCategory: {
    paddingVertical: 10,
  },
  listBlog: {
    paddingVertical: -5,
    gap: 10,
  },
});

const searchBar = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginVertical: 10,
    backgroundColor: colors.white(80),
    borderColor: colors.grey(0.2),
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
  },
  input: {
    height: 40,
    padding: 10,
    width: '90%',
    fontFamily: fontType['Pjs-Regular'],
  },
  button: {
    backgroundColor: colors.grey(),
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});

const itemVertical = StyleSheet.create({
  listCard: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 15,
  },
});

const category = StyleSheet.create({
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: colors.grey(0.08),
  },
  title: {
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 14,
    lineHeight: 18,
  },
});
