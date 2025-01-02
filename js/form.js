import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import { init, reset } from './effects.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALIS_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALIDE_PATTERN: 'Неправильный хэштег'
};

const body = document.querySelector('body');
const formImageUpload = document.querySelector('.img-upload__form');
const overlayImageUpload = formImageUpload.querySelector('.img-upload__overlay');
const buttonImageUpload = formImageUpload.querySelector('.img-upload__submit');
const textHashtags = formImageUpload.querySelector('.text__hashtags');

const pristine = new Pristine(formImageUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const toggleModal = (isVisible) => {
  overlayImageUpload.classList.toggle('hidden', !isVisible);
  body.classList.toggle('modal-open', isVisible);
  if (isVisible) {
    document.addEventListener('keydown', onDocumentKeydown);
  } else {
    document.removeEventListener('keydown', onDocumentKeydown);
    resetScale();
    reset();
  }
};

const hideModal = () => {
  formImageUpload.reset();
  pristine.reset();
  toggleModal(false);
};

const normalizeTags = (tagString) => tagString.trim().split(' ').filter(Boolean);
const isTextFieldFocused = () => [textHashtags, formImageUpload.querySelector('.text__description')].includes(document.activeElement);

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;
const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));
const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
};

const setUpValidators = () => {
  pristine.addValidator(textHashtags, hasValidCount, ErrorText.INVALID_COUNT, 3, true);
  pristine.addValidator(textHashtags, hasValidTags, ErrorText.INVALID_PATTERN, 2, true);
  pristine.addValidator(textHashtags, hasUniqueTags, ErrorText.NOT_UNIQUE, 1, true);
};

formImageUpload.querySelector('.img-upload__input').addEventListener('change', () => toggleModal(true));
formImageUpload.querySelector('.img-upload__cancel').addEventListener('click', hideModal);
setUpValidators();
init();

const setOnFormSubmit = (callback) => {
  formImageUpload.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      buttonImageUpload.disabled = true;
      await callback(new FormData(formImageUpload));
      buttonImageUpload.disabled = false;
    }
  });
};

export { hideModal, setOnFormSubmit };
