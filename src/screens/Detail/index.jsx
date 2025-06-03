import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {ArrowLeft,Message, Receipt21, Share, More} from 'iconsax-react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import FastImage from '@d11/react-native-fast-image';
import {fontType, colors} from '../../theme';
import {formatDate} from '../../utils/formatDate';
import {formatNumber} from '../../utils/formatNumber';
import axios from 'axios';
import ActionSheet from 'react-native-actions-sheet';


const DetailBlogScreen = ({route}) => {
  const {blogId} = route.params;
  const navigation = useNavigation();
  const actionSheetRef = useRef(null);

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [iconStates, setIconStates] = useState({
    liked: {variant: 'Linear', color: colors.grey(0.6)},
    bookmarked: {variant: 'Linear', color: colors.grey(0.6)},
  });

  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 52);
  const headerY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, -52],
  });
  const bottomBarY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, 52],
  });

  const toggleIcon = icon => {
    setIconStates(prev => ({
      ...prev,
      [icon]: {
        variant: prev[icon].variant === 'Linear' ? 'Bold' : 'Linear',
        color: prev[icon].variant === 'Linear' ? colors.blue() : colors.grey(0.6),
      },
    }));
  };

  const getBlogById = async () => {
    try {
      const res = await axios.get(`https://683d692d199a0039e9e55a79.mockapi.io/api/Blog/${blogId}`);
      setSelectedBlog(res.data);
      setLoading(false);
    } catch (error) {
      Alert.alert('Gagal memuat data', error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://683d692d199a0039e9e55a79.mockapi.io/api/Blog/${blogId}`);
      actionSheetRef.current?.hide();
      navigation.goBack();
    } catch (error) {
      Alert.alert('Gagal menghapus', error.message);
    }
  };

  const navigateEdit = () => {
    navigation.navigate('EditBlog', {blogId});
    actionSheetRef.current?.hide();
  };

  useFocusEffect(
    useCallback(() => {
      getBlogById();
    }, [blogId])
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, {transform: [{translateY: headerY}]}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={colors.grey(0.6)} variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', gap: 20}}>
          <Share color={colors.grey(0.6)} variant="Linear" size={24} />
          <TouchableOpacity onPress={() => actionSheetRef.current?.show()}>
            <More color={colors.grey(0.6)} variant="Linear" style={{transform: [{rotate: '90deg'}]}} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.blue()} />
        </View>
      ) : (
        <Animated.ScrollView
          onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
            useNativeDriver: true,
          })}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 24, paddingTop: 62, paddingBottom: 54}}>
          <FastImage
            style={styles.image}
            source={{uri: selectedBlog?.image}}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.metaInfo}>
            <Text style={styles.category}>{selectedBlog?.category.name}</Text>
            <Text style={styles.date}>{formatDate(selectedBlog?.createdAt)}</Text>
          </View>
          <Text style={styles.title}>{selectedBlog?.title}</Text>
          <Text style={styles.content}>{selectedBlog?.content}</Text>
        </Animated.ScrollView>
      )}

      <Animated.View style={[styles.bottomBar, {transform: [{translateY: bottomBarY}]}]}>
        <View style={styles.iconRow}>
          <Message color={colors.grey(0.6)} variant="Linear" size={24} />
          <Text style={styles.info}>{formatNumber(selectedBlog?.totalComments)}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleIcon('bookmarked')}>
          <Receipt21
            color={iconStates.bookmarked.color}
            variant={iconStates.bookmarked.variant}
            size={24}
          />
        </TouchableOpacity>
      </Animated.View>

      <ActionSheet ref={actionSheetRef}>a
        <TouchableOpacity style={styles.sheetBtn} onPress={navigateEdit}>
          <Text style={styles.sheetText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sheetBtn} onPress={handleDelete}>
          <Text style={styles.sheetText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sheetBtn} onPress={() => actionSheetRef.current?.hide()}>
          <Text style={[styles.sheetText, {color: 'red'}]}>Cancel</Text>
        </TouchableOpacity>
      </ActionSheet>
    </View>
  );
};

export default DetailBlogScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white()},
  header: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    backgroundColor: colors.white(),
    zIndex: 10,
    height: 52,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    height: 200,
    width: '100%',
    borderRadius: 15,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  category: {
    color: colors.blue(),
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 12,
  },
  date: {
    fontSize: 10,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.grey(0.6),
  },
  title: {
    marginTop: 12,
    fontSize: 18,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
  },
  content: {
    marginTop: 10,
    fontSize: 12,
    lineHeight: 22,
    color: colors.grey(),
    fontFamily: fontType['Pjs-Medium'],
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.white(),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 60,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  info: {
    fontSize: 12,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.grey(0.6),
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetBtn: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  sheetText: {
    fontSize: 18,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.black(),
  },
});
