import { renderPhotos } from './drawer.js';
import { debounce } from './util.js';
import { getData } from './api.js';
import { displayLoadError } from './messages.js';

const RANDOM_PHOTOS_LIMIT = 10;
const TIMEOUT = 500;

let photos;

const FilterType = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const imgFiltersElement = document.querySelector('.img-filters');
const filterButtons = imgFiltersElement.querySelectorAll('.img-filters__button');
const filterDefaultButton = imgFiltersElement.querySelector('#filter-default');
const filterRandomButton = imgFiltersElement.querySelector('#filter-random');
const filterDiscussedButton = imgFiltersElement.querySelector('#filter-discussed');

const showFilters = () => {
  imgFiltersElement.classList.remove('img-filters--inactive');
};

const getRandomPhotos = (pictures) => {
  const randomPhotos = pictures.sort(() => 0.5 - Math.random());
  return randomPhotos.slice(0, RANDOM_PHOTOS_LIMIT);
};

const getDiscussedPhotos = (pictures) => pictures.slice().sort((a, b) => b.comments.length - a.comments.length);

const onFilterChange = debounce((filter, button) => {
  let filteredPhotos;
  switch (filter) {
    case FilterType.DEFAULT:
      filteredPhotos = photos;
      break;
    case FilterType.RANDOM:
      filteredPhotos = getRandomPhotos(photos);
      break;
    case FilterType.DISCUSSED:
      filteredPhotos = getDiscussedPhotos(photos);
      break;
  }
  renderPhotos(filteredPhotos);
  filterButtons.forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });
  button.classList.add('img-filters__button--active');
}, TIMEOUT);

filterDefaultButton.addEventListener('click', () => onFilterChange(FilterType.DEFAULT, filterDefaultButton));
filterRandomButton.addEventListener('click', () => onFilterChange(FilterType.RANDOM, filterRandomButton));
filterDiscussedButton.addEventListener('click', () => onFilterChange(FilterType.DISCUSSED, filterDiscussedButton));

getData((data) => {
  photos = data;
  showFilters();
  renderPhotos(photos);
}, displayLoadError);
