import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  ScrollView,
} from 'react-native';
import {Clock, Message} from 'iconsax-react-native';
import {colors, fontType} from '../../theme';

const DetailBlogScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 52);
  const headerY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, -52],
  });

  // Dummy data blog
  const item = {
    title: 'Perjalanan Batik dari Keraton ke Dunia Internasional',
    category: 'Sejarah Batik',
    image:
      'https://i.pinimg.com/736x/22/a7/4e/22a74e2417761a3e24bea91fc273244b.jpg',
    createdAt: '12 April 2025',
    totalComments: 89,
    description: `🏯 1. Batik di Lingkungan Keraton (Abad ke-17 hingga 19)
              Batik pertama kali berkembang di lingkungan keraton, terutama di Keraton Yogyakarta dan Surakarta (Solo). Pada masa ini, batik merupakan simbol status sosial dan spiritual. Hanya kalangan bangsawan dan keluarga kerajaan yang mengenakan batik dengan motif tertentu, seperti Parang, Kawung, dan Semen. Pembuatan batik dilakukan secara manual menggunakan teknik batik tulis, dengan proses yang rumit dan bernilai seni tinggi.
🧑‍🌾 2. Penyebaran ke Masyarakat (Abad ke-19)
              Seiring waktu, batik mulai dikenal di luar keraton. Rakyat mulai mengadopsi teknik dan membuat batik dengan gaya sendiri. Muncullah sentra-sentra batik rakyat di daerah seperti Pekalongan, Lasem, dan Cirebon, yang memperkenalkan motif yang lebih bebas, penuh warna, dan terpengaruh budaya Tionghoa, Arab, dan Belanda.

⚙️ 3. Era Kolonial dan Industri (Awal Abad ke-20)
              Pada masa penjajahan Belanda, batik menjadi komoditas dagang yang penting. Orang Belanda dan peranakan Tionghoa ikut terlibat dalam produksi dan pengembangan motif batik. Pada masa ini juga dikenalkan teknik batik cap, yang memungkinkan produksi massal dan lebih cepat.

🌍 4. Mendunia : Batik di Panggung Internasional (Abad ke-21)
              Batik mulai dikenal dunia secara luas saat tokoh-tokoh Indonesia, seperti Presiden Soekarno dan Presiden Susilo Bambang Yudhoyono, mengenakan batik dalam forum internasional. Pada tahun 2009, UNESCO menetapkan batik sebagai Warisan Budaya Takbenda Dunia asal Indonesia. Sejak itu, batik semakin dikenal secara global dan sering tampil dalam pagelaran busana internasional.
`,
  };

  return (
    <View style={styles.container}>
      {/* Animated Header */}
      <Animated.View style={[styles.header, {transform: [{translateY: headerY}]}]}>
        <Text style={styles.headerText}>Detail Artikel</Text>
      </Animated.View>

      {/* Scrollable Content */}
      <Animated.ScrollView
        style={{paddingTop: 52}}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true}
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.title}>{item.title}</Text>

          <View style={styles.info}>
            <Clock size={14} variant="Linear" color={colors.grey(0.6)} />
            <Text style={styles.metaText}>{item.createdAt}</Text>
            <Message size={14} variant="Linear" color={colors.grey(0.6)} />
            <Text style={styles.metaText}>{item.totalComments}</Text>
          </View>

          <Text style={styles.description}>{item.description}</Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default DetailBlogScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D4F6FF',
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 52,
    backgroundColor: colors.white(),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 8,
  },
  headerText: {
    fontSize: 18,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
  },
  image: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  category: {
    fontSize: 12,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.blue(),
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    marginBottom: 12,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  metaText: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.8),
  },
  description: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.black(),
    lineHeight: 22,
  },
});
