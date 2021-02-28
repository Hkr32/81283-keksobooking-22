// Добавить блокировку элементов формы
function disabledForm(formData, classData) {
  formData.classList.add(classData);
  const formElements = formData.querySelectorAll('input, select, textarea, button');

  formElements.forEach(function(formElement) {
    formElement.setAttribute('disabled', 'disabled');
  });
}

// Снять блокировку элементов формы
function enabledForm(formData, classData) {
  formData.classList.remove(classData);
  const formElements = formData.querySelectorAll('input, select, textarea, button');

  formElements.forEach(function(formElement) {
    formElement.removeAttribute('disabled');
  });
}

export { disabledForm, enabledForm };
