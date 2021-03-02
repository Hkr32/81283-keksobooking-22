import { startCoordinates, prices } from './data.js';
import { isEscEvent } from './util.js';
import { disableForm } from './helper.js';
import { initValidationAdForm } from './validation.js';
import { getData, sendData } from './api.js';
import { showMessage, removeMessage } from './message.js';

//
const getDataFromApi = getData(
  (points) => {
    onSuccessData(points)
    // return points
  },
  (error) => {
    errorData(error)
  },
);

const onSuccessData = (points) => {
  console.log(points)
  return points
}

//
const errorData = (error) => {
  console.log(error)
  const message = showMessage('#error-fetch');
  const buttonRepeat = message.querySelector('.error__button');
  message.addEventListener('click', removeModal);
  buttonRepeat.addEventListener('click', removeModal);
  document.addEventListener('keydown', onEscKeydown);
}

// Добавляем события для формы
const adFormHandler = (form) => {
  disableForm(form, 'ad-form--disabled');
  formRoomsChangeHandler(document.querySelector('#room_number'));
  initValidationAdForm();
  form.addEventListener('change', filterChangeHandler());
  setAdFormSubmit();
  setAdFormReset();
}

// Проверяем что изменилось
const filterChangeHandler = () => {
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
const formRoomsChangeHandler = (roomNumberSelect) => {
  const roomNumber = roomNumberSelect.options[roomNumberSelect.selectedIndex].value;
  const capacitySelect = document.querySelector('#capacity');
  const capacitySelectOptions = capacitySelect.querySelectorAll('option');

  capacitySelectOptions.forEach((formElement) => {
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
const formHousingTypeChangeHandler = (housingTypeSelect) => {
  const price = prices[housingTypeSelect.options[housingTypeSelect.selectedIndex].value];
  const priceInput = document.querySelector('#price');
  priceInput.setAttribute('placeholder', price);
  priceInput.setAttribute('min', price);
}

// Действия на изменения времени заезда и выезда
const formHousingTimeChangeHandler = (timeSelect) => {
  const timeValue = timeSelect.options[timeSelect.selectedIndex].value;
  document.querySelector('#timein').value = timeValue;
  document.querySelector('#timeout').value = timeValue;
}

// Действия на изменения координат адреса
const formAddressChangeHandler = (coordinates) => {
  const address = document.querySelector('#address');
  address.value = coordinates.lat.toFixed(5) + ', ' + coordinates.lng.toFixed(5);
}

// Сброс данных формы
const setAdFormReset = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.addEventListener('reset', () => {
    setTimeout(() => {
      formAddressChangeHandler(startCoordinates);
    },0)
  });
}

// Отправка формы с новым объявлением
const setAdFormSubmit = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onError(),
      new FormData(evt.target),
    );
  });
}

// Действия на успешную отправку формы
const onSuccess = () => {
  const message = showMessage('#success');
  message.addEventListener('click', removeModal);
  document.addEventListener('keydown', onEscKeydown);
  document.querySelector('.ad-form').reset();
}

// Действия на случай ошибки
const onError = () => {
  const message = showMessage('#error');
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

export { adFormHandler, formAddressChangeHandler, getDataFromApi };
