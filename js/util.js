export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const isEscapeKey = (evt) => evt.key === 'Escape';

export const getRandomArray = (elements) => elements[getRandomInt(0, elements.length - 1)];

const showError = () => {
  const error = document.createElement('div');
  error.style.color = 'red';
  error.style.position = 'fixed';
  error.style.fontWeight = 'bold';
  error.style.top = '0';
  error.style.left = '0';
  error.style.width = '100%';
  error.style.backgroundColor = 'white';
  error.style.borderBottom = '2px solid red';
  error.style.zIndex = '1000';
  error.innerText = 'Упс, ошибка со стороны сервера, попробуйте перезагрузить страницу или зайти попозже :(';
  error.style.textAlign = 'center';
  document.body.appendChild(error);
};


export default {isEscapeKey,showError};
