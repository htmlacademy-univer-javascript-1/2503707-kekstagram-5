import {getRandomInteger, getRandomArrayElement, createIdGenerator} from './util.js';

const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENTS_COUNT = 30;
const NAMES = [
  'Андрей',
  'Валерий',
  'Светлана',
  'Александра',
  'Анастасия',
  'Вячеслав'
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const DESCRIPTIONS = [
  'Я на отдыхе с семьей',
  'Люблю Сочи, езжу сюда каждый год #путешествия #summervibe',
  'посмотрел новый сериал с женой #телевизор',
  'Купила машину!!! #бойтесь',
  'Ура, я переехал в Америку. Не знаю зачем, просто случайно вышло. #жизньнепредсказуема',
  'опять не спал месяц',
  'Я пересмотрел фильм "Драйв" с Райаном Гослингом.'
];

const generateCommentId = createIdGenerator();

const createMessage = () =>
  Array.from({ length: getRandomInteger(1, 2), },
    () => getRandomArrayElement(MESSAGES),).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_MIN_COUNT,LIKE_MAX_COUNT),
  comments: Array.from({length:getRandomInteger(0,COMMENTS_COUNT)}, createComment),
});

const getPictures = () => Array.from(
  {length: PICTURE_COUNT},
  (_, pictureIndex) => createPicture(pictureIndex + 1),);

export {getPictures};
