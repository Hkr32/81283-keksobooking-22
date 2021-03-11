const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_LENGTH = 1000000;

const adForm = {
  title: document.querySelector('#title'),
  price: document.querySelector('#price'),
  room: document.querySelector('#room_number'),
  capacity: document.querySelector('#capacity'),
};

function addRequireEvent(input) {
  input.addEventListener('invalid', () => {
    if (input.validity.valueMissing) {
      input.setCustomValidity('Обязательное поле!');
    } else {
      input.setCustomValidity('');
    }
  });
}

function initValidationAdForm() {
  addRequireEvent(adForm.price);
  addRequireEvent(adForm.title);

  adForm.title.addEventListener('input', checkTitle);
  adForm.price.addEventListener('input', checkPrice);
  adForm.room.addEventListener('input', checkRooms);
  adForm.capacity.addEventListener('input', checkRooms);
}

function validateAdForm() {
  return (
    adForm.title.checkValidity()
    && adForm.price.checkValidity()
    && adForm.room.checkValidity()
    && adForm.capacity.checkValidity()
  );
}

function checkRooms() {
  const rooms = adForm.room.value;
  const places = adForm.capacity.value;

  if (rooms === 100 && places !== 0) {
    adForm.capacity.setCustomValidity('Нужно выбрать количество мест: не для гостей');
  } else if (rooms !== 100 && places === 0) {
    adForm.capacity.setCustomValidity('Нужно выбрать количество мест в соответствии количеству комнат');
  } else if (rooms < places && places !== 0) {
    adForm.capacity.setCustomValidity('Нужно выбрать количество мест в соответствии количеству комнат');
  } else {
    adForm.capacity.setCustomValidity('');
  }
}

function checkPrice() {
  const price = Number(adForm.price.value);
  const min = Number(adForm.price.getAttribute('min'));

  if (price < min) {
    adForm.price.setCustomValidity('Введенное число МЕНЬШЕ минимального значения: ' + min);
  } else if (price > MAX_PRICE_LENGTH) {
    adForm.price.setCustomValidity('Введенное число БОЛЬШЕ максимального значения: ' + MAX_PRICE_LENGTH);
  } else {
    adForm.price.setCustomValidity('');
  }
}

function checkTitle() {
  const valueLength = adForm.title.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    adForm.title.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    adForm.title.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    adForm.title.setCustomValidity('');
  }
}

export { initValidationAdForm, validateAdForm };
