/* eslint-disable curly */
const MAX_COMMENT_LENGTH = 140;
const MAX_HASH_COUNT = 5;
const HASH_PATTERN = /^#[A-Za-z0-9А-Яа-я]{1,19}$/;

export const form = document.querySelector('.img-upload__form');
export const hashtagsInput = document.querySelector('.text__hashtags');
export const descriptionInput = document.querySelector('.text__description');


export const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const validateDescription = (value) => value.length <= MAX_COMMENT_LENGTH;

const validateHashtagsParts = (value) => {
  const hashtags = value.split(' ');
  const isCorrectCount = hashtags.length <= MAX_HASH_COUNT;
  const isUniqueHash = new Set(hashtags).size === hashtags.length;
  const isTrueHash = hashtags.every((hashtag) => HASH_PATTERN.test(hashtag));

  return { isCorrectCount, isUniqueHash, isTrueHash };
};

const validateHashtags = (value) => {
  const {isCorrectCount, isUniqueHash, isTrueHash} = validateHashtagsParts(value);
  return isCorrectCount && isUniqueHash && isTrueHash;
};

const getHashMessage = (value) => {
  const { isCorrectCount, isUniqueHash, isTrueHash } = validateHashtagsParts(value);

  if (!isCorrectCount) return 'Больше 5 хеш-тегов указывать нельзя';
  else if (!isUniqueHash) return 'Нельзя писать одинаковые хэш-теги';
  else if (!isTrueHash) return 'Неправильный хэш-тег';
};


pristine.addValidator(hashtagsInput, validateHashtags, getHashMessage);
pristine.addValidator(descriptionInput, validateDescription, 'Комментарий не может быть длиннее 140 символов');

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
