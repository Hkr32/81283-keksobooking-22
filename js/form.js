import { prices, startCoordinates } from './data.js';
import { isEscEvent } from './util.js';
import { disableForm } from './helper.js';
import { initValidationAdForm } from './validation.js';
import { sendData } from './api.js';
import { showMessage, removeMessage } from './message.js';

// Добавляем события для формы
function adFormHandler(form) {
  disableForm(form, 'ad-form--disabled');
  formRoomsChangeHandler(document.querySelector('#room_number'));
  initValidationAdForm();
  form.addEventListener('change', filterChangeHandler());
  setAdFormSubmit();
  setAdFormReset();
}

// Проверяем что изменилось
function filterChangeHandler() {
  return (evt) => {
    if (evt.target) {
      switch (evt.target.id) {
        case 'room_number':
          formRoomsChangeHandler(evt.target);
          break;
        case 'type':
          formHousingTypeChangeHandler(evt.target);
          break;
        case 'timein':
        case 'timeout':
          formHousingTimeChangeHandler(evt.target);
          break;
        default:
          break;
      }
    }
  }
}

// Действия на изменения количества комнат
function formRoomsChangeHandler(roomNumberSelect) {
  const roomNumber = roomNumberSelect.options[roomNumberSelect.selectedIndex].value;
  const capacitySelect = document.querySelector('#capacity');
  const capacitySelectOptions = capacitySelect.querySelectorAll('option');

  capacitySelectOptions.forEach(function (formElement) {
    if (formElement.value == 0 && roomNumber == 100) {
      formElement.removeAttribute('disabled');
    } else if (formElement.value <= roomNumber && formElement.value != 0 && roomNumber != 100) {
      formElement.removeAttribute('disabled');
    } else {
      formElement.setAttribute('disabled', 'disabled');
    }
  });
}

// Действия на изменения типа жилья
function formHousingTypeChangeHandler(housingTypeSelect) {
  const price = prices[housingTypeSelect.options[housingTypeSelect.selectedIndex].value];
  const priceInput = document.querySelector('#price');
  priceInput.setAttribute('placeholder', price);
  priceInput.setAttribute('min', price);
}

// Действия на изменения времени заезда и выезда
function formHousingTimeChangeHandler(timeSelect) {
  const timeValue = timeSelect.options[timeSelect.selectedIndex].value;
  document.querySelector('#timein').value = timeValue;
  document.querySelector('#timeout').value = timeValue;
}

// Действия на изменения координат адреса
function formAddressChangeHandler(coordinates) {
  const address = document.querySelector('#address');
  address.value = coordinates.lat.toFixed(5) + ', ' + coordinates.lng.toFixed(5);
}

function setAdFormReset() {
  const wizardForm = document.querySelector('.ad-form');
  wizardForm.addEventListener('reset', (evt) => {

    console.log('reset');
    formAddressChangeHandler(startCoordinates);
  });
}

function setAdFormSubmit() {
  const wizardForm = document.querySelector('.ad-form');
  wizardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      onSuccess,
      onError,
      new FormData(evt.target),
    );
  });
}

function onSuccess() {
  const message = showMessage('#success');
  document.addEventListener('keydown', (evt) => {
    onEscKeydown(evt, message);
  });
  message.addEventListener('click', () => {
    removeMessage(message);
  });
  document.querySelector('.ad-form').reset();
}

function onError() {
  const message = showMessage('#error');
  document.addEventListener('keydown', (evt) => {
    onEscKeydown(evt, document.querySelector('main > .error'));
  });
  message.addEventListener('click', () => {
    removeMessage(document.querySelector('main > .error'));
  });
  document.querySelector('main > .error error__button').addEventListener('click', () => {
    removeMessage(document.querySelector('main > .error'));
  });
}

function onEscKeydown(evt, el) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    // removeMessage(document.querySelector('main > .success'));
    // removeMessage(document.querySelector('main > .error'));
    removeMessage(el);
    // document.querySelector('main > .success').remove();
  }
}

export { adFormHandler, formAddressChangeHandler };
