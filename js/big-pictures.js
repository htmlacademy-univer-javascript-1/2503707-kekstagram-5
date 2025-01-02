import { isEscapeKey } from './util.js';

const COMMENTS_STEP = 5;

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsShownCount = bigPicture.querySelector('.comments-shown-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentFragment = document.createDocumentFragment();
const canselButtonBigPicture = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const socialFooterText = bigPicture.querySelector('.social__footer-text');

let commentsShown = COMMENTS_STEP;
let currentComments = [];

const createComment = (comment) => {
  const newComment = document.createElement('li');
  const imgComment = document.createElement('img');
  const textComment = document.createElement('p');

  newComment.classList.add('social__comment');
  imgComment.classList.add('social__picture');
  textComment.classList.add('social__text');

  imgComment.src = comment.avatar;
  imgComment.alt = comment.name;
  textComment.textContent = comment.message;

  newComment.appendChild(imgComment);
  newComment.appendChild(textComment);
  commentFragment.appendChild(newComment);
};

const renderComments = () => {
  socialComments.innerHTML = '';
  commentsShown = (commentsShown > currentComments.length) ? currentComments.length : commentsShown;

  if (currentComments.length <= COMMENTS_STEP || commentsShown >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  commentsShownCount.textContent = commentsShown;
  commentsCount.textContent = currentComments.length;
  currentComments.slice(0, commentsShown).forEach(createComment);
  socialComments.appendChild(commentFragment);
};

const onLoadCommentsButtonClick = () => {
  commentsShown += COMMENTS_STEP;
  renderComments();
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsShown = COMMENTS_STEP;
  currentComments = [];
  socialFooterText.value = '';

  commentsLoader.removeEventListener('click', onLoadCommentsButtonClick);
  canselButtonBigPicture.removeEventListener('click', onCanselbuttonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
}

function onCanselbuttonClick() {
  hideBigPicture();
}

const showBigPicture = (data) => {
  const {url, comments, likes, description} = data;

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureImage.src = url;
  likesCount.textContent = likes;
  socialCaption.textContent = description;

  currentComments = comments.slice();
  renderComments();

  commentsLoader.addEventListener('click', onLoadCommentsButtonClick);
  canselButtonBigPicture.addEventListener('click', onCanselbuttonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export { showBigPicture };
