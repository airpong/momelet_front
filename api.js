import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import env from './env';
import getInvalidToken from './utils/getInvalidToken';

const makeRequest = async (method, path, config, data = '') => {
  let tmpToken;

  if (path === 'v1/auth/refresh') {
    tmpToken = JSON.parse(await SecureStore.getItemAsync('refresh_TokenInfo')).refreshToken;
  } else {
    tmpToken = await getInvalidToken();
  }
  try {
    const result = await axios({
      url: `${env.springUrl}/api/${path}`,
      method,
      headers: {
        Authorization: `Bearer ${tmpToken}`,
      },
      ...config,
      data,
    });

    return result;
  } catch (error) {
    return error.response;
  }
};

export const apis = {
  getRestaurantById: (restaurantId) => makeRequest('get', `v1/restaurants/${restaurantId}`),
  addBookmark: (restaurantId) => makeRequest('post', `v1/bookmarks/restaurants/${restaurantId}`),
  deleteBookmark: (restaurantId) =>
    makeRequest('delete', `v1/bookmarks/restaurants/${restaurantId}`),
  getBookmark: (queryParams) =>
    makeRequest('get', `v1/bookmarks?page=0&size=20&&filter=${queryParams}`),
  searchRestaurant: (restaurantName, latitude, longitude, queryParams) =>
    makeRequest('get', `v1/restaurants/search?page=0&&size=20&&filter=${queryParams}`, {
      params: { latitude, longitude, name: restaurantName, radius: 0.01 },
    }),
  getRestaurant: (latitude, longitude, id) =>
    makeRequest('get', `v1/restaurants/users/${id}/categories`, {
      params: { latitude, longitude, radius: 0.01 },
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    }),
  getUserMe: () => makeRequest('get', 'v1/users/me', {}),
  editMenu: (id, imageUrl, claim) => {
    const body = new FormData();
    let photo;
    if (imageUrl) {
      photo = {
        name: `profileImage${id}.jpg`,
        type: 'image/jpeg',

        uri: imageUrl.replace('file://', ''),
      };
    } else {
      photo = null;
    }
    body.append('imageFile', photo);
    body.append('claim', claim);
    return makeRequest('post', `v1/posts/restaurants/${id}`, {}, body);
  },
  editUser: (id, categories, imageUrl, name, token) => {
    const body = new FormData();

    let photo;

    if (imageUrl) {
      photo = {
        name: `profileImage${id}.jpg`,
        type: 'image/jpeg',

        uri: imageUrl.replace('file://', ''),
      };
    } else {
      photo = null;
    }

    const categoryToString = categories.join();

    body.append('categories', categoryToString);
    body.append('name', name);

    body.append('imageFile', photo);
    // body.append("imageFile", null);

    return makeRequest('post', `v1/users/${id}`, {}, body);
  },
  refreshToken: async () => {
    const refreshToken = JSON.parse(await SecureStore.getItemAsync('refresh_TokenInfo'))
      .refreshToken;

    return makeRequest(
      'post',
      'v1/auth/refresh-token',
      {},
      {
        jwt: refreshToken,
      }
    );
  },
};
