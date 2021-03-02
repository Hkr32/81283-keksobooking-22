// Показываем сообщение
function showMessage(selector) {
  const template = document.querySelector(selector).content.querySelector('div');
  const message = template.cloneNode(true);

  document.querySelector('main').appendChild(message);
}

// Удаляем сообщение из разметки
function removeMessage(elementForRemove) {
  elementForRemove.remove();
}

export { showMessage, removeMessage };
