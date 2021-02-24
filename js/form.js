import { prices } from './data.js';

// Добавляем события для формы
function filterFormHandler(form) {
  form.addEventListener('change', filterChangeHandler);
}

// Проверяем что изменилось
const filterChangeHandler = function (evt) {
  if (evt.target) {
    switch (evt.target.id) {
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

export { filterFormHandler };