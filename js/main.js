import { renderGallery } from './gallery.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { hideModal, setOnFormSubmit } from './form.js';
import { getData, sendData } from './api.js';
import { showAlert, debounce } from './util.js';
import { init, getFilterPictures } from './filter.js';
import './load.js';

try {
  init(await getData(), debounce(renderGallery));
  renderGallery(getFilterPictures());
} catch (err) {
  showAlert(err.message);
}

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});
