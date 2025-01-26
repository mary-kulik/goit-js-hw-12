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
const loadMoreBtn = document.querySelector('.load-more-btn');

export let page = 1;
let query = '';
let loadedImagesCount = 0;
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

form.addEventListener('submit', async event => {
  event.preventDefault();

  query = input.value.trim();

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
  page = 1;
  loadedImagesCount = 0;
  loadMoreBtn.style.display = 'none'; // Ховати кнопку перед новим пошуком

  showLoader();

  // Виконання запиту
  try {
    const { images, totalHits } = await fetchImages(query);
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

    // Показуємо кнопку завантаження, якщо є ще зображення
    // if (images.length === 15) {
    //   loadMoreBtn.style.display = 'block';
    // }
    loadedImagesCount += images.length;
    if (images.length < totalHits) {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
});

// Завантаження наступної групи зображень
loadMoreBtn.addEventListener('click', async () => {
  page += 1; // Збільшуємо номер сторінки

  showLoader();
  try {
    const { images, totalHits } = await fetchImages(query);
    renderGallery(images);
    lightbox.refresh();

    // loadedImagesCount += images.length;

    // Плавне прокручування після додавання нових зображень
    scrollToNextGroup();

    // Якщо на наступній сторінці є ще зображення, залишаємо кнопку активною
    if (images.length < 15 || loadedImagesCount >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.show({
        messageColor: '#fff',
        color: '#FFA500',
        position: 'topRight',
        maxWidth: 432,
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
});

// Функція для плавного прокручування
function scrollToNextGroup() {
  if (gallery.firstElementChild) {
    const { height: cardHeight } =
      gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth', // Плавне прокручування
    });
  }
}