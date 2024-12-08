import { form, pristine, hashtagsInput, descriptionInput } from './validator.js';
import { isEscapeKey } from './util.js';

const body = document.body;
const fileInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');

export const closeUploadForm = () => {
  form.reset();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDoEscape);
  cancelButton.removeEventListener('click', closeUploadForm);
};

export const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDoEscape);
  cancelButton.addEventListener('click', closeUploadForm);
};

function onDoEscape(evt) {
  const isFocus = [hashtagsInput, descriptionInput].some((x) => x === evt.target);
  if (isEscapeKey(evt) && !isFocus) {
    evt.preventDefault();
    closeUploadForm();
  }
}

fileInput.addEventListener('change', openUploadForm);
