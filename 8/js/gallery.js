import {renderMiniatures} from './miniature.js';
import {showBigPicture} from './big-picture.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const miniature = evt.target.closest('[data-miniature-id]');
    if (!miniature) {
      return;
    }

    evt.preventDefault();
    const picture = pictures.find (
      (item) => item.id === +miniature.dataset.miniatureId
    );
    showBigPicture(picture);
  });

  renderMiniatures(pictures, container);
};

export {renderGallery};
