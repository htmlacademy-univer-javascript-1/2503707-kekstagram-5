import { onEscapePress } from './util.js';

const successMsgTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMsgTemplate = document.querySelector('#error').content.querySelector('.error');
const bodyElement = document.body;

const createMessage = (template) => () => {
  const messageElement = template.cloneNode(true);
  const closeBtn = messageElement.querySelector('button');

  const onEscKeydown = (evt) => onEscapePress(evt, removeMessage);
  const onOutsideClick = (evt) => {
    if (evt.target === messageElement) {
      removeMessage();
    }
  };

  function removeMessage() {
    messageElement.remove();
    document.removeEventListener('keydown', onEscKeydown);
    document.removeEventListener('click', onOutsideClick);
  }

  closeBtn.addEventListener('click', removeMessage);
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onOutsideClick);

  bodyElement.appendChild(messageElement);
};

const showSuccessMessage = createMessage(successMsgTemplate);
const showErrorMessage = createMessage(errorMsgTemplate);

export { showSuccessMessage, showErrorMessage };
