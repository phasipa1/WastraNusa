import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import {ArrowLeft, AddSquare, Add} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {fontType, colors} from '../../theme';
import ImagePicker from 'react-native-image-crop-picker';
import { addDoc, collection, getFirestore } from '@react-native-firebase/firestore';
import notifee, {AndroidImportance} from '@notifee/react-native';

const AddBlogForm = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const dataUploadOption = [
    {id: 1, name: 'Immediate'},
    {id: 2, name: 'After 10 Seconds'},
    {id: 3, name: 'After 30 Seconds'},
];	
 
const [uploadOption, setUploadOption] = useState({id: 1, name: 'Immediate'});

const handleDelayedPost = async jeda => {
const hasil = await notifee.requestPermission();
    if (hasil.authorizationStatus == 0) {
      await notifee.openNotificationSettings();
      return;
    }

    // tambahkan notifikasi channel
    const channelId = await notifee.createChannel({
      id: 'post',
      name: 'Upload Blog',
      importance: AndroidImportance.HIGH,
    });

    // tambahkan Foreground Service
    notifee.registerForegroundService(notification => {
      return new Promise(async () => {
        // tunda upload blog, sesuai dengan parameter jeda
        await new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, jeda * 1000);
        });

        // setelah jeda terjadi baru upload blog
        let filename = image.substring(image.lastIndexOf('/') + 1);
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        try {
          const imageFormData = new FormData();
          imageFormData.append('file', {
            uri: image,
            type: `image/${extension}`, // or 'image/png'
            name: filename,
          });

          const result = await fetch(
            'https://backend-file-praktikum.vercel.app/upload/',
            {
              method: 'POST',
              body: imageFormData,
            },
          );
          if (result.status !== 200) {
            throw new Error('failed to upload image');
          }

          const {url} = await result.json();

          const db = getFirestore();
          const blogRef = collection(db, 'blog');
          addDoc(blogRef, {
            title: blogData.title,
            category: blogData.category,
            image: url,
            content: blogData.content,
            totalComments: blogData.totalComments,
            createdAt: new Date(),
          });

          console.log('Blog added!');

          // tampilkan notifikasi blog sukses di upload
          notifee.displayNotification({
            title: 'Blog DiUpload 👋👋',
            body: `Blog Sukses di Upload`,
            android: {
              channelId: channelId,
            },
          });
        } catch (error) {
          console.log(error);
          // tampilkan notifikasi blog gagal di upload
          notifee.displayNotification({
            title: 'Blog Gagal DiUpload ❗❗',
            body: `Blog Gagal di Upload`,
            android: {
              channelId: channelId,
            },
          });
        }

        notifee.stopForegroundService();
      });
    });

    // tampilkan notifikasi blog di upload dengan di jadwalkan
    notifee.displayNotification({
      title: 'Upload Blog DiJawadkan',
      body: `Blog akan di Upload dalam ${jeda} detik ⬆️⬆️`,
      android: {
        channelId: channelId,
        asForegroundService: true,
      },
    });
  };

    const handleImagePick = async () => {
    ImagePicker.openPicker({
      width: 1920,
      height: 1080,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setImage(image.path);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const dataCategory = [
    {id: 1, name: 'Sejarah'},
    {id: 2, name: 'Jenis Batik'},
    {id: 3, name: 'Filosofi Dan Motif Batik'},
  ];

  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    category: {},
    totalComments: 0,
  });

  const [image, setImage] = useState('');

  const handleChange = (key, value) => {
    setBlogData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

const handleUpload = async () => {
    if (uploadOption.id == 1) {
      let filename = image.substring(image.lastIndexOf('/') + 1);
      const extension = filename.split('.').pop();
      const name = filename.split('.').slice(0, -1).join('.');
      filename = name + Date.now() + '.' + extension;

      setLoading(true);
      try {
        const imageFormData = new FormData();
        imageFormData.append('file', {
          uri: image,
          type: `image/${extension}`, // or 'image/png'
          name: filename,
        });

        const result = await fetch(
          'https://backend-file-praktikum.vercel.app/upload/',
          {
            method: 'POST',
            body: imageFormData,
          },
        );
        if (result.status !== 200) {
          throw new Error('failed to upload image');
        }

        const {url} = await result.json();

        const db = getFirestore();
        const blogRef = collection(db, 'blog');
        addDoc(blogRef, {
          title: blogData.title,
          category: blogData.category,
          image: url,
          content: blogData.content,
          totalComments: blogData.totalComments,
          createdAt: new Date(),
        });

        setLoading(false);
        console.log('Blog added!');
        navigation.goBack();
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else if (uploadOption.id == 2) { // jadwalkan selama 10 detik baru upload
      navigation.goBack();
      handleDelayedPost(10);
    } else if (uploadOption.id == 3) { // jadwalkan selama 30 detik baru upload
      navigation.goBack();
      handleDelayedPost(30);
    }
  };

  return (
<View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={colors.black()} variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.title}>Write blog</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 10,
          gap: 10,
        }}>
        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="Title"
            value={blogData.title}
            onChangeText={text => handleChange('title', text)}
            placeholderTextColor={colors.grey(0.6)}
            multiline
            style={textInput.title}
          />
        </View>
        <View style={[textInput.borderDashed, {minHeight: 250}]}>
          <TextInput
            placeholder="Content"
            value={blogData.content}
            onChangeText={text => handleChange('content', text)}
            placeholderTextColor={colors.grey(0.6)}
            multiline
            style={textInput.content}
          />
        </View>
        <View style={[textInput.borderDashed]}>
          <Text style={category.title}>Category</Text>
          <View style={category.container}>
            {dataCategory.map((item, index) => {
              const bgColor =
                item.id === blogData.category.id
                  ? colors.black()
                  : colors.grey(0.08);
              const color =
                item.id === blogData.category.id
                  ? colors.white()
                  : colors.grey();
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    handleChange('category', {id: item.id, name: item.name})
                  }
                  style={[category.item, {backgroundColor: bgColor}]}>
                  <Text style={[category.name, {color: color}]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {image ? (
          <View style={{position: 'relative'}}>
            <FastImage
              style={{width: '100%', height: 127, borderRadius: 5}}
              source={{
                uri: image,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: -5,
                right: -5,
                backgroundColor: colors.blue(),
                borderRadius: 25,
              }}
              onPress={() => setImage(null)}>
              <Add
                size={20}
                variant="Linear"
                color={colors.white()}
                style={{transform: [{rotate: '45deg'}]}}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={handleImagePick}>
            <View
              style={[
                textInput.borderDashed,
                {
                  gap: 10,
                  paddingVertical: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <AddSquare color={colors.grey(0.6)} variant="Linear" size={42} />
              <Text
                style={{
                  fontFamily: fontType['Pjs-Regular'],
                  fontSize: 12,
                  color: colors.grey(0.6),
                }}>
                Upload Thumbnail
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Opsi Upload Blog */}
        <View style={[textInput.borderDashed]}>
          <Text style={uploadOptionStyle.title}>Upload Option</Text>
          <View style={uploadOptionStyle.container}>
            {dataUploadOption.map((item, index) => {
              const bgColor =
                item.id === uploadOption.id
                  ? colors.black()
                  : colors.grey(0.08);
              const color =
                item.id === uploadOption.id ? colors.white() : colors.grey();
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    setUploadOption({id: item.id, name: item.name})
                  }
                  style={[uploadOptionStyle.item, {backgroundColor: bgColor}]}>
                  <Text style={[uploadOptionStyle.name, {color: color}]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonLabel}>Upload</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.blue()} />
        </View>
      )}
    </View>


  );
};

export default AddBlogForm;

const uploadOptionStyle = StyleSheet.create({
  title: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.6),
  },
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
  },
  name: {
    fontSize: 10,
    fontFamily: fontType['Pjs-Medium'],
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 16,
    color: colors.black(),
  },
  bottomBar: {
    backgroundColor: colors.white(),
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 10,
    shadowColor: colors.black(),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  loadingOverlay: {
      flex: 1,
      backgroundColor: colors.black(0.4),
      justifyContent: 'center',
      alignItems: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.blue(),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 14,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.white(),
  },
});
const textInput = StyleSheet.create({
  borderDashed: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: colors.grey(0.4),
  },
  title: {
    fontSize: 16,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.black(),
    padding: 0,
  },
  content: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.black(),
    padding: 0,
  },
});
const category = StyleSheet.create({
  title: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.6),
  },
  container:{
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  item:{
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
  },
  name:{
    fontSize: 10,
    fontFamily: fontType['Pjs-Medium'],
  }
})
