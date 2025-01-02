const PICTURES_COUNT = 10;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const imageFilters = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let pictures = [];

const sortFunctions = {
  [Filter.RANDOM]: () => [...pictures].sort(() => Math.random() - 0.5).slice(0, PICTURES_COUNT),
  [Filter.DISCUSSED]: () => [...pictures].sort((a, b) => b.comments.length - a.comments.length),
  [Filter.DEFAULT]: () => [...pictures]
};

const getFilterPictures = () => sortFunctions[currentFilter]();

const setOnFilterClick = (callback) => {
  imageFilters.addEventListener('click', (evt) => {
    const clickedButton = evt.target.closest('.img-filters__button');
    if (!clickedButton || clickedButton.id === currentFilter) return;

    imageFilters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    callback(getFilterPictures());
  });
};

const init = (loadedPictures, callback) => {
  imageFilters.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  setOnFilterClick(callback);
};

export { init, getFilterPictures };
