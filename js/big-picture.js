import { isEscapeKey } from './util.js';

const COMMENTS_PER_POSITION = 5;

const bigPicture = document.querySelector('.big-picture');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentElement = commentsContainer.querySelector('.social__comment');
const commentCounter = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('#picture-cancel');
let visibleCommentsCount = COMMENTS_PER_POSITION;

const renderBigPictureDetails = ({url, description, likes, comments}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const createComment = ({avatar, message, name}) => {
  const comment = commentElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = (comments) => {
  commentsContainer.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((item)=> {
    const comment = createComment(item);
    commentsFragment.append(comment);
  });

  commentsContainer.append(commentsFragment);
};

const hideBigPicture = () => {
  visibleCommentsCount = COMMENTS_PER_POSITION;
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
};

const truncateCommentsCount = () => {
  const comments = commentsContainer.querySelectorAll('.social__comment');
  comments.forEach((comment) => comment.classList.add('hidden'));
  for (let i = 0; i < Math.min(visibleCommentsCount, comments.length); i++) {
    comments[i].classList.remove('hidden');
  }

  if (visibleCommentsCount >= comments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  commentCounter.innerHTML = `${Math.min(visibleCommentsCount, comments.length)} из <span class="comments-count">${comments.length}</span> комментариев`;
};

commentsLoader.addEventListener('click', () => {
  visibleCommentsCount += COMMENTS_PER_POSITION;
  truncateCommentsCount();
});

const showBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  renderBigPictureDetails(picture);
  renderComments(picture.comments);
  truncateCommentsCount();
};

closeButton.addEventListener('click', hideBigPicture);

export {showBigPicture};
