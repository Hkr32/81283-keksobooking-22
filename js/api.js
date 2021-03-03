
import { isEscEvent } from './util.js';
import { showMessage, removeMessage } from './message.js';

const getData = (onSuccess, onFail) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      onSuccess(json);
    })
    .catch((err) => {
      onFail(err);
    });
}

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .catch((error) => {
      onFail(error);
    });
}

//
const errorGetData = (error) => {
  const message = showMessage('#error-fetch');
  const buttonRepeat = message.querySelector('.error__button');
  message.addEventListener('click', removeModal);
  buttonRepeat.addEventListener('click', removeModal);
  document.addEventListener('keydown', onEscKeydown);
}

// Проверка на нажатие Esc
const onEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    removeModal();
  }
}

// Удаление сообщения
const removeModal = () => {
  removeMessage(document.querySelector('main > [data-modal="message"]'));
  document.removeEventListener('keydown', onEscKeydown);
}

export { getData, sendData, errorGetData };
