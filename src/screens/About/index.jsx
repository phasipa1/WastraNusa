import React from 'react';
import {Viev, Text, StyleSheet, ScrollView} from 'react-native';
import {colors, fontType} from '../../theme';

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tentang WastraNusa</Text>
      <Text style={styles.content}>
      WestraNusa adalah aplikasi yang bertujuan untuk mengenalkan dan melestarikan warisan budaya batik Indonesia. 
      Aplikasi ini menyajikan informasi mengenai Sejarah Batik, Jenis Batik, Filosofi Dan Motif Batik sehingga 
      dapat lebih dikenal dan diapresiasi oleh generasi muda dan masyarakat luas.
      </Text>
      <Text style={styles.content}>
        Kami percaya bahwa Budaya adalah Identitas dan Wastra adalah bagian dari
        warisan bangsa yang perlu dijaga dan dikenalkan dengan cara yang menarik
        dan informatif.
      </Text>
      <Text style={styles.footer}>Versi 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D4F6FF',
    padding: 24,
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.9),
    marginBottom: 14,
    lineHeight: 22,
  },
  footer: {
    marginTop: 40,
    textAlign: 'center',
    color: colors.grey(),
    fontSize: 14,
  },
});
