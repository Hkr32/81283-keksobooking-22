import { isEscEvent } from './util.js';

// Показываем сообщение
function showMessage(selector) {
  const template = document.querySelector(selector).content.querySelector('div');
  const message = template.cloneNode(true);

  document.querySelector('main').appendChild(message);

  return message;
}

// Удаляем сообщение из разметки
function removeMessage(elementForRemove) {
  elementForRemove.remove();
}

// Сообщение об ошибки при получении данных
function messageForErrorGetData() {
  const message = showMessage('#error-fetch');
  const buttonRepeat = message.querySelector('.error__button');
  message.addEventListener('click', removeModal);
  buttonRepeat.addEventListener('click', removeModal);
  document.addEventListener('keydown', onEscKeydown);
}

// Удаление сообщения
function removeModal() {
  removeMessage(document.querySelector('main > [data-modal="message"]'));
  document.removeEventListener('keydown', onEscKeydown);
}

// Проверка на нажатие Esc
function onEscKeydown(evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    removeModal();
  }
}

export { showMessage, removeMessage, messageForErrorGetData };
