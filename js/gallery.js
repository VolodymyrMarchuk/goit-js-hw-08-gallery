import galleryItems from './data/gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
};
function makeImagesFromArray({ preview, original, description }) {
  //   console.log(elem);
  return `
    <li class='gallery__item'>
        <a class='gallery__link' href ='{original}'> 
            <img class ='gallery__image'
             src='${preview}' 
             data-source='${original}'
             alt='${description}'/>
        </a>
    </li>`;
}
const elem = galleryItems.map(makeImagesFromArray).join('');
refs.gallery.insertAdjacentHTML('afterbegin', elem);

refs.gallery.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(e) {
  if (e.target.nodeName !== 'A') {
    return;
  }
  refs.lightbox.classList.add('is-open');
}
