import { FILE_TYPES, startCoordinates, prices, defaultPreviewUrl } from './data.js';
import { disableForm } from './util.js';
import { initValidationAdForm, validateAdForm } from './validation.js';
import { sendData } from './api.js';
import { showMessageForSuccessSendData, showMessageForErrorSendData } from './message.js';
import { setMainMarkerCoordinates } from './map.js';

// Добавляем события для формы
function adFormHandler(form) {
  disableForm(form, 'ad-form--disabled');
  initValidationAdForm();
  formRoomsChangeHandler(document.querySelector('#room_number'));
  form.addEventListener('change', filterChangeHandler());
  setAdFormReset();
  setAdFormSubmit();
}

// Проверяем что изменилось
function filterChangeHandler() {
  return (evt) => {
    if (evt.target) {
      switch (evt.target.id) {
        case 'avatar':
          formAvatarChangeHandler();
          break;
        case 'images':
          formImagesChangeHandler();
          break;
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

// Загрузка в предпросмотр выбранного аватара
function formAvatarChangeHandler() {
  const file = document.querySelector('#avatar').files[0];
  const preview = document.querySelector('.ad-form-header__preview img');
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
}

// Загрузка в предпросмотр выбранного изображения жилья
function formImagesChangeHandler() {
  const img = new Image(64, 64);
  const file = document.querySelector('#images').files[0];
  const previewContainer = document.querySelector('.ad-form__photo');
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const preview = previewContainer.querySelector('img');
      if (preview) {
        preview.src = reader.result;
      } else {
        img.src = reader.result;
        previewContainer.appendChild(img);
      }
    });

    reader.readAsDataURL(file);
  }
}

// Действия на изменения количества комнат
function formRoomsChangeHandler(selectedRoomNumber) {
  const roomNumber = Number(selectedRoomNumber.options[selectedRoomNumber.selectedIndex].value);
  const capacitySelect = document.querySelector('#capacity');
  const capacitySelectOptions = capacitySelect.querySelectorAll('option');

  capacitySelectOptions.forEach((formElement) => {
    const formElementValue = Number(formElement.value);
    if (formElementValue === 0 && roomNumber === 100) {
      formElement.removeAttribute('disabled');
    } else if (formElementValue <= roomNumber && formElementValue !== 0 && roomNumber !== 100) {
      formElement.removeAttribute('disabled');
    } else {
      formElement.setAttribute('disabled', 'disabled');
    }
  });
}

// Действия на изменения типа жилья
function formHousingTypeChangeHandler(selectedHousingTypes) {
  const price = prices[selectedHousingTypes.options[selectedHousingTypes.selectedIndex].value];
  const priceInput = document.querySelector('#price');
  priceInput.setAttribute('placeholder', price);
  priceInput.setAttribute('min', price);
}

// Действия на изменения времени заезда и выезда
function formHousingTimeChangeHandler(selectedTime) {
  const timeValue = selectedTime.options[selectedTime.selectedIndex].value;
  document.querySelector('#timein').value = timeValue;
  document.querySelector('#timeout').value = timeValue;
}

// Действия на изменения координат адреса
function formAddressChangeHandler(coordinates) {
  const address = document.querySelector('#address');
  address.value = coordinates.lat.toFixed(5) + ', ' + coordinates.lng.toFixed(5);
}

// Сброс данных формы
function setAdFormReset() {
  const adForm = document.querySelector('.ad-form');
  adForm.addEventListener('reset', () => {
    setTimeout(() => {
      formAddressChangeHandler(startCoordinates);
      setMainMarkerCoordinates(startCoordinates);
      formHousingTypeChangeHandler(document.querySelector('#type'));
      resetPreview();
    },0)
  });
}

// Отправка формы с новым объявлением
function setAdFormSubmit() {
  const adForm = document.querySelector('.ad-form');
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (validateAdForm()) {
      sendData(
        () => showMessageForSuccessSendData(),
        () => showMessageForErrorSendData(),
        new FormData(evt.target),
      );
    }
  });
}

// Сброс превью изображений
function resetPreview() {
  const previewAvatar = document.querySelector('.ad-form-header__preview img');
  const previewPhoto = document.querySelector('.ad-form__photo img');

  previewAvatar.src = defaultPreviewUrl;
  if (previewPhoto) {
    previewPhoto.remove();
  }
}

export { adFormHandler, formAddressChangeHandler };
