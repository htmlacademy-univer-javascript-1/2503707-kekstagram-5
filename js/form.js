/* eslint-disable no-use-before-define */
import { onEscapePress } from './util.js';
import { showSuccessMessage, showErrorMessage } from './send-message.js';
import { fetchData } from './api.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const EFFECT_LEVEL_HIDDEN_CLASS = 'hidden';
const MODAL_OPEN_CLASS = 'modal-open';

const imgUploadPreview = document.querySelector('.img-upload__preview img');
const scaleControlValue = document.querySelector('.scale__control--value');
const fileInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const bodyElement = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const descriptionInput = uploadForm.querySelector('.text__description');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const submitBtn = uploadForm.querySelector('#upload-submit');
const closeBtn = document.querySelector('.img-upload__cancel');
const effectPreviews = document.querySelectorAll('.effects__preview');


const HASHTAG_REGEX = /^#[a-zA-Zа-яёА-ЯЁ0-9]{1,19}$/i;
const ErrorMessages = {
  invalidCount: 'Количество хэштегов больше пяти!',
  invalidUnique: 'Хэштеги не должны повторяться!',
  invalidReg: 'Некорректный хэштег!'
};

let currentErrorType = '';

const validate = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'form__error'
});

const handleFileInputChange = () => {
  const selectedFile = fileInput.files[0];
  if (selectedFile) {
    const objectURL = URL.createObjectURL(selectedFile);
    imgUploadPreview.src = objectURL;
    effectPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url("${objectURL}")`;
    });
    uploadOverlay.classList.remove(EFFECT_LEVEL_HIDDEN_CLASS);
    bodyElement.classList.add(MODAL_OPEN_CLASS);
    document.addEventListener('keydown', onDocumentKeydown);
  }
};

const openUploadForm = () => {
  fileInput.addEventListener('change', handleFileInputChange);
};

const closeForm = () => {
  uploadOverlay.classList.add(EFFECT_LEVEL_HIDDEN_CLASS);
  bodyElement.classList.remove(MODAL_OPEN_CLASS);
  fileInput.value = '';
  descriptionInput.value = '';
  hashtagInput.value = '';
  validate.reset();
  uploadForm.reset();
  imgUploadPreview.style.transform = 'scale(1)';
  imgUploadPreview.style.filter = '';
  document.querySelector('.img-upload__effect-level').classList.add(EFFECT_LEVEL_HIDDEN_CLASS);
  scaleControlValue.value = '100%';
  document.removeEventListener('keydown', onDocumentKeydown);
};

const validateHashtags = (value) => {
  const hashtags = value.split(/\s+/).filter(Boolean);

  if (hashtags.length > MAX_HASHTAG_COUNT) {
    currentErrorType = 'invalidCount';
    return false;
  }

  const lowerCaseHashtags = hashtags.map((el) => el.toLowerCase());
  const uniqueHashtags = new Set(lowerCaseHashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    currentErrorType = 'invalidUnique';
    return false;
  }

  for (const hashtag of hashtags) {
    if (!HASHTAG_REGEX.test(hashtag)) {
      currentErrorType = 'invalidReg';
      return false;
    }
  }

  return true;
};

const validateDescription = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

validate.addValidator(hashtagInput, validateHashtags, () => ErrorMessages[currentErrorType]);
validate.addValidator(descriptionInput, validateDescription, 'Превышена длинна комментария!');

const handleSuccess = () => {
  submitBtn.disabled = false;
  closeForm();
  showSuccessMessage();
};

const handleError = () => {
  submitBtn.disabled = false;
  document.removeEventListener('keydown', onDocumentKeydown);
  showErrorMessage();
};

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (validate.validate()) {
    submitBtn.disabled = true;
    const formData = new FormData(uploadForm);
    fetchData(formData)
      .then(handleSuccess)
      .catch(handleError);
  }
});
const onDocumentKeydown = (evt) => {
  if (document.activeElement !== descriptionInput && document.activeElement !== hashtagInput) {
    onEscapePress(evt, closeForm);
  }
};

closeBtn.addEventListener('click', closeForm);
openUploadForm();
