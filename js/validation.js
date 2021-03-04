const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_LENGTH = 1000000;

const adForm = {
  title: document.querySelector('#title'),
  price: document.querySelector('#price'),
  room: document.querySelector('#room_number'),
  capacity: document.querySelector('#capacity'),
};

function addRequireEvent(form) {
  for (let input in form) {
    form[input].addEventListener('invalid', () => {
      if (form[input].validity.valueMissing) {
        form[input].setCustomValidity('Обязательное поле!');
      } else {
        form[input].setCustomValidity('');
      }
    });
  }
}

function initValidationAdForm() {
  addRequireEvent(adForm);

  adForm.title.addEventListener('input', () => {
    const valueLength = adForm.title.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      adForm.title.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_TITLE_LENGTH) {
      adForm.title.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
    } else {
      adForm.title.setCustomValidity('');
    }
  });

  adForm.price.addEventListener('input', () => {
    const price = Number(adForm.price.value);
    const min = Number(adForm.price.getAttribute('min'));

    if (price < min) {
      adForm.price.setCustomValidity('Введенное число МЕНЬШЕ минимального значения: ' + min);
    } else if (price > MAX_PRICE_LENGTH) {
      adForm.price.setCustomValidity('Введенное число БОЛЬШЕ максимального значения: ' + MAX_PRICE_LENGTH);
    } else {
      adForm.price.setCustomValidity('');
    }
  });

  adForm.room.addEventListener('change', checkRooms);
  adForm.capacity.addEventListener('change', checkRooms);
}

function checkRooms() {
  const rooms = adForm.room.value;
  const places = adForm.capacity.value;

  if (rooms == 100 && places != 0) {
    adForm.room.setCustomValidity('Нужно выбрать 100 комнат');
    adForm.capacity.setCustomValidity('Нужно выбрать количество мест: не для гостей');
  } else if (rooms < places && places != 0) {
    adForm.room.setCustomValidity('Нужно выбрать меньше комнат чем мест');
    adForm.capacity.setCustomValidity('Нужно выбрать количество мест в соответствии количеству комнат');
  }
}

export { initValidationAdForm };
