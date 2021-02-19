# Momelet

Momelet은 다수와 식당 및 메뉴를 고민할 때 1분 30초 이내에 식당 및 메뉴 결정을 도와주는 서비스입니다.

## FOR TEST - mac 기준
### installation
- Home Brew 가 설치되어있다는 가정하에 따라하시면 됩니다. Brew가 없을시 다음 링크를 참조하여 설치해주세요. https://brew.sh/index_ko
1. npm/node 설치
```
brew install node
```
2. yarn 설치
```
npm install yarn
```
3. pakage 설치
```
yarn
```
### running
- IOS 시뮬레이터에서 구동시 Xcode 와 시뮬레이터가 설치되어 있어야 합니다.
- Android 시뮬레이터 구동시 android studio 를 통한 시뮬레이터가 설치되어 있어야 합니다.
- IOS / Android 로 테스트시 핸드폰에 expo 어플 다운로드 및 로그인이 되어있어야 합니다.
- 원할한 사용을 위해 어플에서 물어보는 권한 (위치 / 저장소)에 대해서 승인해주세요.


1. IOS 시뮬레이터
```
yarn ios
```
2. Android 시뮬레이터
```
yarn android
```
3. IOS / Android 핸드폰
```
yarn start
```
- 화면에 나오는 QR 코드 스캔
