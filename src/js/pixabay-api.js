'use strict';

import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '48120556-fdb679f2a2804b1816b5c1c88', // Ключ API
};
// Controls the group number
import { page } from '../main';

// Функція для запиту API
export async function fetchImages(query) {
  try {
    const { data } = await axios.get('', {
      params: {
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page: page, // Контролює групу, з якої завантажувати зображення
      },
    });

    // return response.data.hits; // Повертаємо результати
    return {
      images: data.hits,
      totalHits: data.totalHits,
    };
  } catch (error) {
    console.error('Error fetching images:', error.message);
    throw error;
  }
}