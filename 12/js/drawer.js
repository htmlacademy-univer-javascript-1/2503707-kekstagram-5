import generatePhotos from './data.js';
import { openBigPicture } from './big-picture.js';
const fragment = document.createDocumentFragment();
const photos = generatePhotos();
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


const createPhoto = (photo) => {
  const element = pictureTemplate.cloneNode(true);
  element.querySelector('.picture__img').src = photo.url;
  element.querySelector('.picture__img').alt = photo.description;
  element.querySelector('.picture__likes').textContent = photo.likes;
  element.querySelector('.picture__comments').textContent = photo.comments.length;
  openBigPicture(element, photo.comments);
  return element;
};

const renderPhotos = function () {
  photos.forEach((photo) => {
    const element = createPhoto(photo);
    fragment.appendChild(element);
  });
  picturesContainer.appendChild(fragment);
};

export { renderPhotos };
