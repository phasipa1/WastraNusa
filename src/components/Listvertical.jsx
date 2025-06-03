// ListVertical.js
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Receipt21 } from 'iconsax-react-native';
import FastImage from '@d11/react-native-fast-image';
import { fontType, colors } from '../theme';
import { useNavigation } from '@react-navigation/native';

const ItemVertical = ({ item, variant, onPress }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={itemVertical.cardItem}
      onPress={() => navigation.navigate('Detail', { blogId: item.id })}>
      <FastImage
        style={itemVertical.cardImage}
        source={{
          uri: item.image,
          headers: { Authorization: 'someAuthToken' },
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}>
        <View style={itemVertical.cardContent}>
          <View style={itemVertical.cardInfo}>
            <Text style={itemVertical.cardTitle}>{item.title}</Text>
            <Text style={itemVertical.cardText}>{item.createdAt}</Text>
          </View>
          <View style={itemVertical.cardIcon}>
            <TouchableOpacity onPress={onPress}>
              <Receipt21 color={colors.white()} variant={variant} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </FastImage>
    </TouchableOpacity>
  );
};

const ListVertical = ({ data }) => {
  const [bookmark, setBookmark] = useState([]);

  const toggleBookmark = (itemId) => {
    if (bookmark.includes(itemId)) {
      setBookmark(bookmark.filter(id => id !== itemId));
    } else {
      setBookmark([...bookmark, itemId]);
    }
  };

  const filteredData = data.filter(item => item.id >= 4);

  const renderItem = ({ item }) => {
    const variant = bookmark.includes(item.id) ? 'Bold' : 'Linear';
    return (
      <ItemVertical
        item={item}
        variant={variant}
        onPress={() => toggleBookmark(item.id)}
      />
    );
  };

  return (
    <FlatList
      data={filteredData}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
      contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 10 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ListVertical;

const itemVertical = StyleSheet.create({
  cardItem: {
    marginBottom: 15,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  cardInfo: {
    maxWidth: '70%',
  },
  cardTitle: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 16,
    color: colors.white(),
  },
  cardText: {
    fontSize: 12,
    color: colors.white(),
    fontFamily: fontType['Pjs-Medium'],
  },
  cardIcon: {
    backgroundColor: colors.black(0.33),
    padding: 5,
    borderColor: colors.white(),
    borderWidth: 0.5,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
});
