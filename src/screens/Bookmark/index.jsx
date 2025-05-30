import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {ItemSmall} from '../../components';
import {fontType, colors} from '../../theme';

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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookmark</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.list}>
          {bookmarkedItems.length > 0 ? (
            bookmarkedItems.map((item, index) => (
              <ItemSmall key={index} item={item} />
            ))
          ) : (
            <Text style={styles.emptyText}>Belum ada bookmark yang disimpan.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D4F6FF',
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 25,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    gap: 16,
    paddingBottom: 20,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(),
    textAlign: 'center',
    marginTop: 40,
  },
});
