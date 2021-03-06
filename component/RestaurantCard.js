// import { AntDesign } from '@expo/vector-icons';
// import * as FontAwesome from '@expo/vector-icon';
// import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  Animated,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { set } from 'react-native-reanimated';

import { apis } from '../api';
import { calculateDistance } from '../utils/calculateDistance';
// import logging from '../utils/logging';
import Card from './Card';
import CardBack from './CardBack';
import PresentMenu from './PresentMenu';
import RestaurantBasicInfo from './RestaurantBasicInfo';
import SeeMenuButton from './SeeMenuButton';

export default ({
  restaurant,
  header,
  cover,
  userLocation,
  BookmarkArrayId,
  isSelected,
  fromHome = true,
  cardStyle,
  from,
  onPressReportButton,
}) => {
  const navigation = useNavigation();

  const [isBookmark, setIsBookmark] = useState('');

  const baseUrl = 'https://cdn.pixabay.com/photo/2020/06/29/10/55/pizza-5352320__480.png';

  const [isFront, setIsFront] = useState(true);
  let changeValue = 0;
  const rotation = useRef(new Animated.Value(0)).current;

  rotation.addListener(({ value }) => {
    changeValue = value;
  });

  useEffect(() => {
    rotation.setValue(0);
    // setIsFront("false");
    setIsFront(true);
    setIsBookmark(() => {
      if (BookmarkArrayId != undefined) {
        return BookmarkArrayId?.current.includes(restaurant.id);
      } else {
        return isSelected;
      }
    });
  }, [restaurant]);

  const frontInterpolate = rotation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = rotation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  // const isFlipping = useRef(false);
  let isFlipping = false;

  const flipCard = async () => {
    // if (isFlipping) {
    //   return;
    // }

    // isFlipping = true;
    // await logging({
    //   eventName: 'BTN_SEEMENU',
    //   config: {
    //     name: 'seeMenuButton',
    //     screen: 'Home',
    //     purpose: 'Viewing importance of menu in restaurant',
    //   },import { FontAwesome } from '@expo/vector-icons';
    // import { TouchableOpacity } from 'react-native';

    // });

    if (changeValue >= 90) {
      Animated.timing(rotation, {
        toValue: 0,
        useNativeDriver: true,
      }).start();

      setIsFront(true);
    } else {
      Animated.timing(rotation, {
        toValue: 180,
        useNativeDriver: true,
      }).start();

      setIsFront(false);
    }

    setTimeout(() => {
      isFlipping = false;
    }, 1000);
  };

  const CardImage = React.useCallback(() => {
    return (
      <Image
        // source={{ uri: restaurant.thumUrl }} // @FIXME restaurant.thumbUrl
        source={
          restaurant.thumUrl == baseUrl
            ? { uri: baseUrl }
            : {
                uri:
                  'https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&quality=90&src=' +
                  restaurant.thumUrl,
              }
        } // @FIXME restaurant.thumbUrl
        // source={{
        //   uri: "https://d22j25xnhsuyth.cloudfront.net/profile-image/test7.jpg",
        // }}
        style={{
          height: '100%',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      />
    );
  }, [restaurant.thumUrl]);

  // const CardBackCallBack = React.useCallback(() => {
  //   return (
  //     <Animated.View
  //       style={{
  //         width: "100%",
  //         height: "100%",
  //         transform: [{ rotateY: backInterpolate }],
  //         backfaceVisibility: "hidden",
  //         position: "absolute",
  //       }}
  //     >
  //       <CardBack
  //         menus={restaurant.menu}
  //         name={restaurant.name}
  //         phoneNumber={restaurant.phoneNumber}
  //         address={restaurant.roadAddress}
  //       />
  //     </Animated.View>
  //   );
  // }, [restaurant]);
  // const CardFront = React.useCallback(() => {
  //   return ()
  // })
  const distance = calculateDistance(userLocation, {
    latitude: restaurant.latitude,
    longitude: restaurant.longitude,
  });

  return (
    <Card style={cardStyle}>
      <View style={{ width: '100%', height: '100%' }}>
        <View style={{ height: '65%' }}>
          <Animated.View
            style={{
              transform: [{ rotateY: frontInterpolate }],
              backfaceVisibility: 'hidden',
            }}>
            {/* {header} */}

            <CardImage />
            <View
              style={{
                width: '100%',
                // backgroundColor: 'red',
                position: 'absolute',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                style={{ width: 30, height: 30 }}
                onPress={() => {
                  navigation.navigate('Report', { restaurantId: restaurant.id });
                }}>
                <MaterialCommunityIcons
                  name="comment-alert"
                  size={30}
                  color="grey"
                  style={{ right: 10, top: 10 }}
                />

                {/* <AntDesign name="heart" size={30} color="black" /> */}
              </TouchableOpacity>
            </View>
            {isBookmark !== undefined ? (
              <TouchableOpacity
                style={{ position: 'absolute', alignSelf: 'flex-end', bottom: 10, right: 10 }}
                onPress={async () => {
                  if (isBookmark) {
                    const result = await apis.deleteBookmark(restaurant.id);

                    setIsBookmark(false);
                  } else {
                    const result = await apis.addBookmark(restaurant.id);

                    BookmarkArrayId?.current.push(restaurant.id);
                    setIsBookmark(true);
                  }
                }}>
                {from != 'bookmark' ? (
                  isBookmark ? (
                    <AntDesign name="heart" size={30} color="pink" />
                  ) : (
                    <AntDesign
                      name="heart"
                      size={30}
                      color="grey"
                      style={{ alignSelf: 'flex-end' }}
                    />
                  )
                ) : (
                  <View />
                )}
              </TouchableOpacity>
            ) : (
              <View />
            )}
            {/* <TouchableOpacity
              style={{
                width: '100%',
                flexDirection: 'row',
                position: 'absolute',
                // backgroundColor: 'blue',
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  height: 10,
                  width: 10,
                  backgroundColor: 'red',
                  // position: 'absolute',
                  // alignItems: 'flex-end',
                }}
              />
            </TouchableOpacity> */}
            {cover}
          </Animated.View>
          <Animated.View
            style={{
              width: '100%',
              height: '100%',
              transform: [{ rotateY: backInterpolate }],
              backfaceVisibility: 'hidden',
              position: 'absolute',
            }}
            pointerEvents={isFront ? 'none' : 'auto'}>
            <CardBack
              menus={restaurant.menu}
              name={restaurant.name}
              phoneNumber={restaurant.phoneNumber}
              address={restaurant.roadAddress}
              lng={restaurant.longitude}
              lat={restaurant.latitude}
              userLocation={userLocation}
            />
          </Animated.View>
        </View>

        <View style={{ height: '35%', paddingHorizontal: 15 }}>
          <View
            style={{
              height: '45%',
              // backgroundColor: 'black',
            }}>
            <View
              style={{
                height: '100%',
                borderColor: '#e4e4e4',
                borderBottomWidth: 0.7,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                // backgroundColor: 'black',
              }}>
              <RestaurantBasicInfo
                title={restaurant.name}
                distance={distance}
                point={restaurant.like}
              />
              <TouchableOpacity style={{ width: '20%', height: '40%' }} onPress={flipCard}>
                <SeeMenuButton />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: '55%',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>대표메뉴</Text>
            {restaurant.menu[0] && (
              <PresentMenu menu={restaurant.menu[0].name} price={restaurant.menu[0].price} />
            )}
            {restaurant.menu[1] && (
              <PresentMenu menu={restaurant.menu[1].name} price={restaurant.menu[1].price} />
            )}
          </View>
        </View>
      </View>
    </Card>
  );
};
