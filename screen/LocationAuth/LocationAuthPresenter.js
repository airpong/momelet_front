import React from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import Svg, { Image } from 'react-native-svg';
import Restart from '../../utils/Restart';

const { width, height } = Dimensions.get('window');

export default function App() {
  const onPress = () => {
    Restart();
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'flex-end' }}>
      <View
        style={{
          ...StyleSheet.absoluteFill,
          backgroundColor: '#FEEE7D',
        }}>
        <Svg width={width} height={height + 15}>
          <Image
            href={require('../../assets/logo.png')}
            width={width}
            height={height + 15}
            preserveAspectRatio="xMidYMid"
            clipPath="url(#clip)"
          />
        </Svg>
      </View>

      <View style={{ height: height / 2, justifyContent: 'center' }}>
        <View
          style={{
            ...styles.button,
            height: 30,
            marginHorizontal: 50,
            borderRadius: 0,
            backgroundColor: '#FEEE7D',
            shadowOpacity: 0,
          }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            위치권한이 없어서 앱을 실행할 수 없습니다
          </Text>
        </View>
        <View
          style={{
            ...styles.button,
          }}>
          <TouchableOpacity onPress={onPress}>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>앱 재시작</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'white',
    height: 50,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 8, height: 8 },
    top: 30,
  },
  textInput: {
    backgroundColor: 'white',
    height: 50,
    width: width / 1.2,
    marginHorizontal: 20,
    borderRadius: 25,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    padding: 20,
  },
});
