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

// Сообщение после успешного добавления объявления
function messageForSuccessSendData() {
  const message = showMessage('#success');
  message.addEventListener('click', removeModal);
  document.addEventListener('keydown', onEscKeydown);
  document.querySelector('.ad-form').reset();
}

// Сообщение в случае ошибки добавления объявления
function messageForErrorSendData() {
  const message = showMessage('#error');
  message.addEventListener('click', removeModal);
  document.addEventListener('keydown', onEscKeydown);
}

// Сообщение об ошибки при получении данных
function messageForErrorGetData() {
  const message = showMessage('#error-fetch');
  message.addEventListener('click', removeModal);
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

export {
  showMessage,
  removeMessage,
  messageForErrorGetData,
  messageForSuccessSendData,
  messageForErrorSendData
};
