import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { Edit, Setting2 } from 'iconsax-react-native';
import React, { useEffect, useState, useCallback } from 'react';
import FastImage from '@d11/react-native-fast-image';
import { ItemSmall } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { fontType, colors } from '../../theme';
import { collection, getFirestore, onSnapshot } from '@react-native-firebase/firestore';
import { formatNumber } from '../../utils/formatNumber';

// Dummy data bookmark
const bookmarkedItems = [
  {
    id: 3,
    title: 'Motif Parang : Simbol Kekuasaan dan Keteguhan',
    category: 'Filosofi Dan Motif Batik',
    image:'https://i.pinimg.com/736x/fe/4f/54/fe4f5477b2fdd258535ecedac916e9d0.jpg',
    totalComments: 89,
  },
  {
   id: 7,
   title: 'Megamendung : Filosofi Tenang dalam Badai',
   category: 'Filosofi Dan Motif Batik',
   image:'https://i.pinimg.com/736x/c4/c7/1b/c4c71b4081436d84dea6a730faaf9f0f.jpg',
   totalComments: 89,
  },
];

const BookmarkScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const db = getFirestore();
    const blogRef = collection(db, 'blog');

    const subscriber = onSnapshot(blogRef, (snapshot) => {
      const blogs = [];
      snapshot.forEach((doc) => {
        blogs.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setBlogData(blogs);
      setLoading(false);
    });
    return () => subscriber();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      const db = getFirestore();
      const blogRef = collection(db, 'blog');
      onSnapshot(blogRef, (snapshot) => {
        const blogs = [];
        snapshot.forEach((doc) => {
          blogs.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setBlogData(blogs);
        setLoading(false);
      });

      setRefreshing(false);
    }, 1500);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Setting2 color={colors.black()} variant="Linear" size={24} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          gap: 10,
          paddingVertical: 20,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        
     <View style={{ paddingVertical: 10, gap: 10 }}>
          {loading ? (
            <ActivityIndicator size={'large'} color={colors.blue()} />
          ) : (
            blogData.map((item, index) => <ItemSmall item={item} key={index} />)
          )}
        </View>

      </ScrollView>
      
    </View>
  );

};

export default BookmarkScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#D4F6FF',
//     paddingHorizontal: 24,
//     paddingTop: 16,
//   },
//   title: {
//     fontSize: 25,
//     fontFamily: fontType['Pjs-Bold'],
//     color: colors.black(),
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   list: {
//     gap: 16,
//     paddingBottom: 20,
//   },
//   emptyText: {
//     fontSize: 14,
//     fontFamily: fontType['Pjs-Regular'],
//     color: colors.grey(),
//     textAlign: 'center',
//     marginTop: 40,
//   },
// });
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    paddingHorizontal: 24,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: {
    fontSize: 20,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.black(),
  },
  floatingButton: {
    backgroundColor: colors.blue(),
    padding: 15,
    position: 'absolute',
    bottom: 24,
    right: 24,
    borderRadius: 10,
    shadowColor: colors.blue(),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});

