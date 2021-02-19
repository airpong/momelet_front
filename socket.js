import Restart from './utils/Restart';
import { Alert } from 'react-native';
import { Platform } from 'react-native';
import io from 'socket.io-client';
import env from './env';
// 여기 서는 요청에 대한 콜백 처리는 하지 않고 브로드 캐스트 메세지 수신하는 거에 대해서만 다룸.

const socket = io(`${env.socketUrl}/`, {
  query: {
    id: null,
    email: null,
    JWT: null,
    name: null,
    imageUrl: null,
    latitude: 37.5,
    longitude: Platform.OS === 'ios' ? 127.5 : 127.49999,
  },
  reconnection: false,
  autoConnect: false,
});

socket.on('disconnect', (msg) => {
  Alert.alert(
    '서버와의 연결이 끊겼습니다',
    '앱을 재시작할까요?\n(게임 외 서비스는 계속 이용 가능합니다)',
    [
      { text: '아니요', onPress: () => {}, style: 'destructive' },
      { text: '네', onPress: () => Restart() },
    ],
    { cancelable: false }
  );
});

export default socket;
