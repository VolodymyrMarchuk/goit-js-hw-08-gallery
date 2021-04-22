import galleryItems from './data/gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  btnIsCloseModal: document.querySelector('[data-action="close-lightbox"]'),
  bigModalImage: document.querySelector('.lightbox__image'),
};

function makeImagesFromArray(gallery) {
  return gallery
    .map(
      ({ preview, original, description }) => `
    <li class='gallery__item'>
        <a class='gallery__link' href ='${original}'> 
            <img
             class ='gallery__image'
             src='${preview}' 
             data-source='${original}'
             alt='${description}'/>
        </a>
    </li>`
    )
    .join('');
}
const elem = makeImagesFromArray(galleryItems);
refs.gallery.insertAdjacentHTML('afterbegin', elem);

/****/

refs.gallery.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const bigImg = e.target.dataset.source;
  refs.bigModalImage.src = bigImg;

  onOpenModalClick();
}

function onOpenModalClick(e) {
  refs.lightbox.classList.add('is-open');
  refs.btnIsCloseModal.addEventListener('click', onCloseModalClick);
  const overlay = document.querySelector('.lightbox__overlay');

  overlay.addEventListener('click', onCloseModalClick);
  window.addEventListener('keydown', onEscapeKeyPress);
}

function onCloseModalClick(e) {
  window.removeEventListener('keydown', onEscapeKeyPress);
  refs.lightbox.classList.remove('is-open');
  refs.bigModalImage.src = '';
}
const collection = document.querySelectorAll('.gallery__image');

function onEscapeKeyPress(e) {
  if (e.code === 'Escape') onCloseModalClick();
  if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') onKeyPress(e);
}

function onKeyPress(e) {
  const img = refs.bigModalImage.src;
  let index = 0;
  collection.forEach((x, i) => {
    if (x.dataset.source === img) index = i;
  });

  if (e.code === 'ArrowLeft') {
    index--;
    if (index < 0) {
      index = collection.length - 1;
    }
    show(index);
  }
  if (e.code === 'ArrowRight') {
    index++;
    if (index > collection.length - 1) {
      index = 0;
    }
    show(index);
  }
}

function show(i) {
  refs.bigModalImage.src = collection[i].dataset.source;
}
