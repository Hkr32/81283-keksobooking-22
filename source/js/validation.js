const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_LENGTH = 1000000;

const adFormData = {
  title: document.querySelector('#title'),
  price: document.querySelector('#price'),
  room: document.querySelector('#room_number'),
  capacity: document.querySelector('#capacity'),
};

function addRequireEvent(input) {
  input.addEventListener('invalid', function() {
    if (input.validity.valueMissing) {
      input.setCustomValidity('Обязательное поле!');
    } else {
      input.setCustomValidity('');
    }
  });
}

function initValidationAdForm() {
  addRequireEvent(adFormData.price);
  addRequireEvent(adFormData.title);
  adFormData.title.addEventListener('input', checkTitle);
  adFormData.price.addEventListener('input', checkPrice);
  adFormData.room.addEventListener('input', checkRooms);
  adFormData.capacity.addEventListener('input', checkRooms);
}

function validateAdForm() {
  return (
    adFormData.title.checkValidity()
      && adFormData.price.checkValidity()
      && adFormData.room.checkValidity()
      && adFormData.capacity.checkValidity()
  );
}

function checkRooms() {
  const rooms = Number(adFormData.room.value);
  const places = Number(adFormData.capacity.value);

  if (rooms === 100 && places !== 0) {
    adFormData.capacity.setCustomValidity('Нужно выбрать количество мест: не для гостей');
  } else if (rooms !== 100 && places === 0) {
    adFormData.capacity.setCustomValidity('Нужно выбрать количество мест в соответствии количеству комнат');
  } else if (rooms < places && places !== 0) {
    adFormData.capacity.setCustomValidity('Нужно выбрать количество мест в соответствии количеству комнат');
  } else {
    adFormData.capacity.setCustomValidity('');
  }
}

function checkPrice() {
  const price = Number(adFormData.price.value);
  const min = Number(adFormData.price.getAttribute('min'));

  if (price < min) {
    adFormData.price.setCustomValidity('Введенное число МЕНЬШЕ минимального значения: ' + min);
  } else if (price > MAX_PRICE_LENGTH) {
    adFormData.price.setCustomValidity('Введенное число БОЛЬШЕ максимального значения: ' + MAX_PRICE_LENGTH);
  } else {
    adFormData.price.setCustomValidity('');
  }
}

function checkTitle() {
  const valueLength = adFormData.title.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    adFormData.title.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    adFormData.title.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    adFormData.title.setCustomValidity('');
  }
}

export { initValidationAdForm, validateAdForm };
