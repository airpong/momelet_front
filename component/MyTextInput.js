import * as Location from 'expo-location';
import React from 'react';
import { TextInput } from 'react-native';

import { apis } from '../api';

export default ({
  placeholder,
  onChangeText,
  onSubmitEditing,
  value,
  setRestaurant,
  userLocation,
  restaurantOrderByDistance,
  restaurantOrderByLike,
}) => {
  return (
    <TextInput
      style={{
        width: '90%',
        height: 40,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
      }}
      onChangeText={onChangeText}
      placeholder={placeholder}
      onSubmitEditing={async () => {
        const location = await Location.getLastKnownPositionAsync({});
        const userLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        // const userLocation = {
        //   latitude: 37.5447048,
        //   longitude: 127.0663154,
        // };
        const resultByDistance = await apis.searchRestaurant(
          value,
          userLocation.latitude,
          userLocation.longitude,
          'distance'
        );
        const resultByLike = await apis.searchRestaurant(
          value,
          userLocation.latitude,
          userLocation.longitude,
          'like'
        );

        if (restaurantOrderByDistance) {
          restaurantOrderByDistance.current = resultByDistance.data.data.restaurants.content;
        }

        if (restaurantOrderByLike) {
          restaurantOrderByLike.current = resultByLike.data.data.restaurants.content;
        }

        setRestaurant(resultByDistance.data.data.restaurants.content);
      }}
    />
  );
};
