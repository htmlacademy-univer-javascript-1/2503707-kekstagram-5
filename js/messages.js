import { isEscapeKey } from './util.js';

const bodyElement = document.body;

const removeMessage = (evt, messageSelector) => {
  const messageElement = document.querySelector(messageSelector);
  if (messageElement) {
    const isClickOnButton = evt.target.classList.contains(`${messageSelector.slice(1)}__button`);
    const isClickOutsideInner = !evt.target.classList.contains(`${messageSelector.slice(1)}__inner`);

    if (isEscapeKey(evt) || (evt.type === 'click' && (isClickOnButton || isClickOutsideInner))) {
      bodyElement.removeEventListener('click', removeMessage);
      bodyElement.removeEventListener('keydown', removeMessage);
      messageElement.remove();
    }
  }
};


const displayMessage = (templateId) => {
  const messageTemplate = document.querySelector(templateId).content;
  const messageElement = messageTemplate.cloneNode(true);
  bodyElement.appendChild(messageElement);
};


const displayLoadError = () => {
  const alertElement = document.createElement('div');
  alertElement.classList.add('load-error');
  alertElement.textContent = 'Не удалось загрузить данные. Пожалуйста, обновите страницу.';
  document.body.appendChild(alertElement);
};

const displayFormError = () => {
  const alertElement = document.createElement('div');
  alertElement.classList.add('load-error');
  alertElement.textContent = 'Не удалось отправить форму. Пожалуйста, исправьте неверные поля и повторите попытку.';
  document.body.appendChild(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, 5000);
};

const showErrorMessage = () => {
  bodyElement.addEventListener('keydown', (evt) => removeMessage(evt, '.error'));
  bodyElement.addEventListener('click', (evt) => removeMessage(evt, '.error'));
  displayMessage('#error');
};

const showSuccessMessage = () => {
  bodyElement.addEventListener('keydown', (evt) => removeMessage(evt, '.success'));
  bodyElement.addEventListener('click', (evt) => removeMessage(evt, '.success'));
  displayMessage('#success');
};

export { displayLoadError, displayFormError, showSuccessMessage, showErrorMessage };
