import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert, Modal } from 'react-native';
import { ArrowLeft } from 'iconsax-react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { fontType, colors } from '../../theme';
import axios from 'axios';

const EditBlogForm = ({ route }) => {
    // ambil parameter blogId
    const { blogId } = route.params;

    const dataCategory = [
    {id: 1, name: 'Sejarah '},
    {id: 2, name: 'Jenis Batik'},
    {id: 3, name: 'Filosofi Dan Motif Batik'},
  ];0

    const [blogData, setBlogData] = useState({
        title: '',
        content: '',
        category: {},
        totalComments: 0,
    });

    const handleChange = (key, value) => {
        setBlogData({
            ...blogData,
            [key]: value,
        });
    };

    const [image, setImage] = useState(null);
    const navigation = useNavigation();

    // state status apakah sedang loading/tidak
    const [loading, setLoading] = useState(true);

    // fungsi untuk mengambil data blog berdasarkan id
    const getBlogById = async () => {
        setLoading(true);
        try {
            // ambil data blog berdasarkan ID dengan metode GET 
            const response = await axios.get(
                `https://683d692d199a0039e9e55a79.mockapi.io/api/Blog/${blogId}`,
            );
            // atur state blog data menjadi data blog yang di dapatkan 
            // dari response API
            setBlogData({
                title: response.data.title,
                content: response.data.content,
                category: {
                    id: response.data.category.id,
                    name: response.data.category.name
                }
            })
            // atur data gambar
            setImage(response.data.image)
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getBlogById();
    }, [blogId]);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            // update spesifik data blog (ID) menggunakan metode PUT
            const response = await axios
                .put(`https://683d692d199a0039e9e55a79.mockapi.io/api/Blog/${blogId}`, {
                    title: blogData.title,
                    category: blogData.category,
                    image,
                    content: blogData.content,
                    totalComments: blogData.totalComments,
                });
            if (response.status == 200) {
                navigation.goBack();
            }
        } catch (e) {
            Alert.alert('error', `${e.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeft color={colors.black()} variant="Linear" size={24} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.title}>Edit blog</Text>
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
                <View style={[textInput.borderDashed, { minHeight: 250 }]}>
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
                    <TextInput
                        placeholder="Image"
                        value={image}
                        onChangeText={text => setImage(text)}
                        placeholderTextColor={colors.grey(0.6)}
                        style={textInput.content}
                    />
                </View>
                <View style={[textInput.borderDashed]}>
                    <Text
                        style={{
                            fontSize: 12,
                            fontFamily: fontType['Pjs-Regular'],
                            color: colors.grey(0.6),
                        }}>
                        Category
                    </Text>
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
                                        handleChange('category', { id: item.id, name: item.name })
                                    }
                                    style={[category.item, { backgroundColor: bgColor }]}>
                                    <Text style={[category.name, { color: color }]}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                    <Text style={styles.buttonLabel}>Update</Text>
                </TouchableOpacity>
            </View>

            {/* Menampilkan status loading */}
            <Modal visible={loading} animationType='none' transparent>
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={colors.blue()} />
                </View>
            </Modal>
        </View>
    );
};

export default EditBlogForm;

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
    loadingOverlay: {
        flex: 1,
        backgroundColor: colors.black(0.4),
        justifyContent: 'center',
        alignItems: 'center',
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
