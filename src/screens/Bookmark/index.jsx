import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {ItemSmall} from '../../components';
import {fontType, colors} from '../../theme';

// Dummy data bookmark
const bookmarkedItems = [
  {
    id: '1',
    image: 'https://example.com/tenun1.jpg',
    category: 'Budaya',
    title: 'Eksplorasi Tenun Ikat Sumba',
    createdAt: '10 Mei 2025',
    totalComments: 12,
  },
  {
    id: '2',
    image: 'https://example.com/tenun2.jpg',
    category: 'Sejarah',
    title: 'Jejak Wastra Nusa di Masa Kolonial',
    createdAt: '3 Mei 2025',
    totalComments: 8,
  },
];

const BookmarkScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookmark Saya</Text>
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
    backgroundColor: colors.white(),
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    marginBottom: 16,
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
