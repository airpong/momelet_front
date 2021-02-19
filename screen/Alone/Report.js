import { EvilIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Buffer } from 'buffer';
import Basic from '../../component/Basic';
import Footer from '../../component/Footer';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { apis } from '../../api';

export default ({ navigation, route: { params: restaurantId } }) => {
  const [value, setValue] = useState('수정 사항을 입력해주세요');
  const [imageUrl, setImageUrl] = useState(null);
  const footer = (
    <Footer
      text="수정 요청"
      onClick={async () => {
        const result = await apis.editMenu(restaurantId.restaurantId, imageUrl, value);

        navigation.goBack();
      }}
    />
  );
  const imageEditButtonEvent = async () => {
    const permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (permission.status !== 'granted') {
      alert(
        '카메라 앨범 권한이 없어 실행할 수 없습니다. 설정에서 카메라 앨범 권한을 허용해주세요.'
      );
    } else {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
          base64: true,
          exif: true,
        });

        if (!result.cancelled) {
          if (Buffer.byteLength(result.base64) >= 18000000) {
            alert('이미지 용량이 너무 큽니다.');
          } else {
            setImageUrl(result.uri);
          }
        }
      } catch (E) {
        console.log(E);
      }
    }
  };
  return (
    <Basic footer={footer}>
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white', padding: 20 }}>
        <TouchableOpacity onPress={imageEditButtonEvent}>
          {imageUrl == null ? (
            <View
              style={{
                width: 100,
                height: 100,
                // backgroundColor: 'red',
                borderWidth: 3,
                borderRadius: 10,
                borderColor: '#f0f0f0',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <EvilIcons name="plus" size={50} color="grey" />
            </View>
          ) : (
            <Image
              source={{ uri: imageUrl }}
              style={{ width: 100, height: 100, marginBottom: 15, borderRadius: 10 }}></Image>
          )}
        </TouchableOpacity>
        <Text>메뉴사진을 올려주세요</Text>
        <TextInput
          value={value}
          multiline={false}
          // maxLength={100}
          // numberOfLines={20}
          editable
          style={{ marginTop: 30, backgroundColor: '#f3f3f3', width: '100%', height: 200 }}
          onChangeText={(text) => setValue(text)}
          clearTextOnFocus
        />
      </View>
    </Basic>
  );
};
