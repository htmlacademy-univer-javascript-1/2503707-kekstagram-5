import './form.js';
import './filter.js';

import { renderPhotos } from './drawer.js';
import { getData } from './api.js';

const onPhotosLoad = (photos) => {
  renderPhotos(photos);
};

getData(onPhotosLoad);
