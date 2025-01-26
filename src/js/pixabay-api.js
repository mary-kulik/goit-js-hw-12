'use strict';

const API_KEY = '48120556-fdb679f2a2804b1816b5c1c88';
const BASE_URL = 'https://pixabay.com/api/';

// Функція для запиту до API
export function fetchImages(query) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query
    .split(' ')
    .join('%20')}&image_type=photo&orientation=horizontal&safesearch=true`;
  // console.log('query :>> ', query);
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => data.hits);
}