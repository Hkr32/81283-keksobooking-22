// Проверка на клавишу Esc
function isEscEvent(evt) {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

// Устранение дребезга
function debounce(callback, delay = 500) {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      callback(...args);
    }, delay);
  }
}

// Снять блокировку элементов формы
function enableForm(formData, classData) {
  formData.classList.remove(classData);
  const formElements = formData.querySelectorAll('input, select, textarea, button');

  formElements.forEach(function (formElement) {
    formElement.removeAttribute('disabled');
  });
}

// Добавить блокировку элементов формы
function disableForm(formData, classData) {
  formData.classList.add(classData);
  const formElements = formData.querySelectorAll('input, select, textarea, button');

  formElements.forEach(function (formElement) {
    formElement.setAttribute('disabled', 'disabled');
  });
}

export {
  isEscEvent,
  debounce,
  enableForm,
  disableForm
};
