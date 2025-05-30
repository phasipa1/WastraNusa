import React, {useRef} from 'react';
import {Animated,View,Text,TextInput,Pressable,StyleSheet, FlatList,TouchableOpacity,} from 'react-native';
import {SearchNormal, Edit} from 'iconsax-react-native';
import {colors, fontType} from '../../theme';
import {ListHorizontal, ItemSmall} from '../../components';
import {CategoryList, BlogList} from '../../data';
import {useNavigation} from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  // === ANIMATION SETUP ===
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 52);
  const headerY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, -52],
  });

  return (
  <View style={styles.container}>
    <Animated.View style={[styles.header, {transform: [{translateY: headerY}]}]}>
      <Text style={styles.title}>WastraNusa</Text>
    </Animated.View>

    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={Animated.event(
        [{nativeEvent: {contentOffset: {y: scrollY}}}],
        {useNativeDriver: true},
      )}
      scrollEventThrottle={16}
      contentContainerStyle={{
        paddingTop: 62,
        paddingBottom: 54,
      }}>
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

      <View style={styles.listCategory}>
        <FlatListCategory />
      </View>

      <ListBlog />
    </Animated.ScrollView>

    <TouchableOpacity
      style={styles.floatingButton}
      onPress={() => navigation.navigate('AddBlog')}>
      <Edit color="white" variant="Linear" size={20} />
    </TouchableOpacity>
  </View>
);

}

const ListBlog = () => {
  const horizontalData = BlogList.slice(0, 3);
  const verticalData = BlogList.slice(3);

  return (
    <View style={styles.listBlog}>
      <ListHorizontal data={horizontalData} />
      <View style={itemVertical.listCard}>
        {verticalData.map((item, index) => (
          <ItemSmall item={item} key={index} />
        ))}
      </View>
    </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 52,
    paddingTop: 8,
    paddingBottom: 4,
    elevation: 8,
    backgroundColor: colors.white(),
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
  floatingButton: {
    backgroundColor: '#FFC1DA',
    padding: 15,
    position: 'absolute',
    bottom: 24,
    right: 24,
    borderRadius: 10,
    shadowColor: '#FFC1DA',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 52,
    backgroundColor: colors.white(),
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
    backgroundColor:'#FFC1DA',
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
    paddingHorizontal: 20,
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

