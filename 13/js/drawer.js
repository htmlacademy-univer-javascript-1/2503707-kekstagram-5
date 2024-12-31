import { openBigPicture } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPhoto = (photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const pictureImg = pictureElement.querySelector('.picture__img');
  const pictureLikes = pictureElement.querySelector('.picture__likes');
  const pictureComments = pictureElement.querySelector('.picture__comments');

  pictureImg.src = photo.url;
  pictureImg.alt = photo.description;
  pictureLikes.textContent = photo.likes;
  pictureComments.textContent = photo.comments.length;

  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(pictureElement, photo.comments);
  });

  return pictureElement;
};

const renderPhotos = function (photos) {
  const photoElements = picturesContainer.querySelectorAll('.picture');
  photoElements.forEach((element) => element.remove());

  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const photoElement = createPhoto(photo);
    fragment.appendChild(photoElement);
  });
  picturesContainer.appendChild(fragment);
};

export { renderPhotos };
