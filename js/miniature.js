const miniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createMiniature = ({url, description, likes, comments, id}) => {
  const miniature = miniatureTemplate.cloneNode(true);

  miniature.querySelector('.picture__img').src = url;
  miniature.querySelector('.picture__img').alt = description ;
  miniature.querySelector('.picture__likes').textContent = likes;
  miniature.querySelector('.picture__comments').textContent = comments.length;
  miniature.dataset.miniatureId = id;

  return miniature;
};

const renderMiniatures = (pictures, container) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const miniature = createMiniature(picture);
    fragment.append(miniature);
  });

  container.append(fragment);
};

export { renderMiniatures };
