import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import { resetEffect } from './slider.js';
import { sendData} from './api.js';
import { showErrorMessage, showSuccessMessage, displayFormError } from './messages.js';
import './load.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const ErrorMessages = {
  INVALID_HASHTAG: 'Содержит недопустимые символы или неверный формат',
  REPEATED_HASHTAG: 'Хэш-теги не должны повторяться',
  HASHTAG_LIMIT: `Максимальное количество хэш-тегов - ${MAX_HASHTAG_COUNT}`,
  COMMENT_LENGTH: `Максимальная длина ${MAX_COMMENT_LENGTH} символов`
};

const bodyElement = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const fileInput = document.querySelector('.img-upload__input');
const closeButton = document.querySelector('.img-upload__cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const getHashtags = (input) => input.toLowerCase().trim().split(/\s+/).filter(Boolean);
const validateHashtag = (input) => getHashtags(input).every((tag) => HASHTAG_REGEX.test(tag));
const validateUniqueHashtags = (input) => getHashtags(input).length === new Set(getHashtags(input)).size;
const validateHashtagLimit = (input) => getHashtags(input).length <= MAX_HASHTAG_COUNT;

pristine.addValidator(hashtagInput, validateHashtag, ErrorMessages.INVALID_HASHTAG);
pristine.addValidator(hashtagInput, validateUniqueHashtags, ErrorMessages.REPEATED_HASHTAG);
pristine.addValidator(hashtagInput, validateHashtagLimit, ErrorMessages.HASHTAG_LIMIT);
pristine.addValidator(commentInput, (value) => value.length <= MAX_COMMENT_LENGTH, ErrorMessages.COMMENT_LENGTH);

const validateForm = () => pristine.validate();

const openUploadModal = () => {
  uploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  resetScale();
  resetEffect();
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUploadModal = () => {
  uploadForm.reset();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  submitButton.disabled = true;

  if (pristine.validate()) {
    sendData(
      () => {
        showSuccessMessage();
        closeUploadModal();
        submitButton.disabled = false;
      },
      () => {
        showErrorMessage();
        submitButton.disabled = false;
      },
      new FormData(uploadForm)
    );
  } else {
    displayFormError();
    submitButton.disabled = false;
  }
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !(document.activeElement === hashtagInput || document.activeElement === commentInput)) {
    evt.preventDefault();
    closeUploadModal();
  }
}

hashtagInput.addEventListener('change', validateForm);
commentInput.addEventListener('change', validateForm);
fileInput.addEventListener('change', openUploadModal);
submitButton.addEventListener('click', handleFormSubmit);
closeButton.addEventListener('click', closeUploadModal);
