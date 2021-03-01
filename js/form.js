import { prices } from './data.js';
import { disableForm } from './helper.js';
import { initValidationAdForm } from './validation.js';

// Добавляем события для формы
function adFormHandler(form) {
  disableForm(form, 'ad-form--disabled');
  formRoomsChangeHandler(document.querySelector('#room_number'));
  initValidationAdForm();
  form.addEventListener('change', filterChangeHandler());
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

export { adFormHandler, formAddressChangeHandler };
