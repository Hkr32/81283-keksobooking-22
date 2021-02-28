const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_LENGTH = 1000000;

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

const adForm = {
  title: document.querySelector('#title'),
  price: document.querySelector('#price'),
};

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
  const value = adForm.price.value;
  const min = adForm.price.getAttribute('min');

  if (value < min) {
    adForm.price.setCustomValidity('Введенное число МЕНЬШЕ минимального значения: ' + min);
  } else if (adForm.price.value > MAX_PRICE_LENGTH) {
    adForm.price.setCustomValidity('Введенное число БОЛЬШЕ максимального значения: ' + MAX_PRICE_LENGTH);
  } else {
    adForm.price.setCustomValidity('');
  }
});
