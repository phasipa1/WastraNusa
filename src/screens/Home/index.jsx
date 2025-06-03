import React, {useRef, useState, useCallback} from 'react';
import {
  Animated, View, Text, TextInput, Pressable,
  StyleSheet, FlatList, TouchableOpacity,
  ActivityIndicator, ScrollView, RefreshControl
} from 'react-native';
import {SearchNormal, Edit} from 'iconsax-react-native';
import {colors, fontType} from '../../theme';
import {ListHorizontal, ItemSmall} from '../../components';
import {CategoryList} from '../../data';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import axios from 'axios';

export default function Home() {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 52);
  const headerY = diffClampY.interpolate({inputRange: [0, 52], outputRange: [0, -52]});

  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getDataBlog = async () => {
    try {
      const res = await axios.get('https://683d692d199a0039e9e55a79.mockapi.io/api/Blog');
      setBlogData(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch blog data:', err);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getDataBlog().finally(() => setRefreshing(false));
  }, []);

  useFocusEffect(
    useCallback(() => {
      getDataBlog();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, {transform: [{translateY: headerY}]}]}>
        <Text style={styles.title}>WastraNusa</Text>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true}
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{paddingTop: 62, paddingBottom: 54}}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
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

        <View style={styles.listBlog}>
          {loading ? (
            <ActivityIndicator size="large" color={colors.blue()} />
          ) : (
            <>
              <ListHorizontal data={blogData.slice(0, 3)} />
              <View style={itemVertical.listCard}>
                {blogData.slice(3).map((item, index) => (
                  <ItemSmall key={index} item={item} />
                ))}
              </View>
            </>
          )}
        </View>
        </Animated.ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('AddBlog')}>
        <Edit color="white" variant="Linear" size={20} />
      </TouchableOpacity>
    </View>
  );
}

const FlatListCategory = () => {
  const [selected, setSelected] = useState(1);

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
      horizontal
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
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
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
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
