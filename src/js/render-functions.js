'use strict';

// Функція для відображення галереї
const gallery = document.querySelector('.gallery');
// console.log('gallery :>> ', gallery);
export function renderGallery(images) {
  gallery.innerHTML = images
    .map(
      image => `
        <li class = item>
        <div class = conteiner-img>
          <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" />
        </div>
      </a>
      <div class = image-info>
          <p class = info-title>Likes <span class = info-value>${image.likes}</span></p>
          <p class = info-title>Views <span class = info-value>${image.views}</span></p>
          <p class = info-title>Comments <span class = info-value>${image.comments}</span></p>
          <p class = info-title>Downloads <span class = info-value>${image.downloads}</span></p>
      </div>
        </li>
      `
    )
    .join('');
}