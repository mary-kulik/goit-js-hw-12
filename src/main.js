import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
// console.log('form :>> ', form);
const input = document.querySelector('.search-input');
// console.log('input :>> ', input);
const gallery = document.querySelector('.gallery');
// console.log('gallery :>> ', gallery);

const loaderWrapper = document.querySelector('.loader-wrapper');

function showLoader() {
  loaderWrapper.style.display = 'flex';
}

function hideLoader() {
  loaderWrapper.style.display = 'none';
}

// Ініціалізація SimpleLightbox
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const query = input.value.trim();

  // Перевірка на порожнє поле
  if (query === '') {
    iziToast.show({
      messageColor: '#fff',
      color: '#EF4040',
      position: 'topRight',
      message: 'Please enter a search term!',
    });

    return;
  }
  // Очищення галереї перед новим пошуком
  gallery.innerHTML = '';

  showLoader();

  // Виконання запиту
  fetchImages(query)
    .then(images => {
      if (images.length === 0) {
        iziToast.show({
          messageColor: '#fff',
          color: '#EF4040',
          position: 'topRight',
          maxWidth: 432,
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }
      renderGallery(images);
      // Оновлення SimpleLightbox після додавання нових зображень
      lightbox.refresh();
    })

    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      hideLoader(); // Ховаємо завантажувач після завершення запиту
    });
});