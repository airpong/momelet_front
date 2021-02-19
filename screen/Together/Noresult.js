import { StackActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image, Text } from 'react-native';

import Basic from '../../component/Basic';
import Card from '../../component/Card';
import Footer from '../../component/Footer';
import socket from '../../socket';
import printSocketEvent from '../../utils/printEvent';

export default ({ roomName, userId }) => {
  let isSendMsg = false;
  const navigation = useNavigation();
  const footerClick = () => {
    if (isSendMsg) return;

    isSendMsg = true;

    const sendMsg = {
      id: userId,
      roomName,
    };

    socket.emit('gameRoomJoinAgain', JSON.stringify(sendMsg), (msg) => {
      printSocketEvent('gameROmmJoinAgain', msg);

      const newMsg = {
        ...JSON.parse(msg).data,
        roomName,
      };

      navigation.dispatch(
        StackActions.replace('WaitingRoomForStart', {
          msg: newMsg,
          myId: userId,
        })
      );
    });
  };
  const footer = (
    <Footer text="다시하기" style={{ backgroundColor: 'white' }} onClick={footerClick} />
  );

  return (
    <Basic footer={footer}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Card>
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/momulet.png')}
              style={{ height: '30%', resizeMode: 'contain' }}
            />
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>아무도 좋아요를</Text>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>누르지 않았어요 ㅠㅠ</Text>
          </View>
        </Card>
      </View>
    </Basic>
  );
};
