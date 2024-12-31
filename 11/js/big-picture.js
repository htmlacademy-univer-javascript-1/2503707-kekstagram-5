import onEscapePress from './util.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPicImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentTemplate = bigPicture.querySelector('.social__comment').cloneNode(true);
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentListStep = 5;
let currentComments = [];
let currentCommentsCount = 0;


function fillBigPicture(picture, comments) {
  bigPicImg.src = picture.querySelector('.picture__img').src;
  likesCount.textContent = picture.querySelector('.picture__likes').textContent;
  socialCaption.textContent = picture.description;
  commentsCount.textContent = comments.length;
  currentComments = comments;
  currentCommentsCount = 0;
  fillComments();
  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.toggle('hidden', comments.length <= commentListStep);
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', (evt) => onEscapePress(evt, closeBigPicture));
}

function fillComments() {
  const shownComments = currentComments.slice(currentCommentsCount, currentCommentsCount + commentListStep);
  const fragment = document.createDocumentFragment();
  shownComments.forEach((commentData) => {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = commentData.avatar;
    comment.querySelector('.social__picture').alt = commentData.name;
    comment.querySelector('.social__text').textContent = commentData.message;
    fragment.appendChild(comment);
  });
  socialComments.appendChild(fragment);
  currentCommentsCount += shownComments.length;
  commentsLoader.classList.toggle('hidden', currentCommentsCount >= currentComments.length);
  newCommentCount();
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', (evt) => onEscapePress(evt, closeBigPicture));
  socialComments.innerHTML = '';
  currentComments = [];
  currentCommentsCount = 0;
}

function newCommentCount() {
  commentCountBlock.textContent = `${currentCommentsCount} из ${currentComments.length} комментариев`;
}

commentsLoader.addEventListener('click', fillComments);

function openBigPicture(picture, comments) {
  picture.addEventListener('click', () => fillBigPicture(picture, comments));
}

closeButton.addEventListener('click', () => {
  closeBigPicture();
});

export { openBigPicture };
