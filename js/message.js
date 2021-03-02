// Показываем сообщение
function showMessage(selector) {
  const template = document.querySelector(selector).content.querySelector('div');
  const message = template.cloneNode(true);

  document.querySelector('main').appendChild(message);

  return message;
}

// Удаляем сообщение из разметки
function removeMessage(elementForRemove) {
  console.log(elementForRemove)
  elementForRemove.remove();
}

export { showMessage, removeMessage };
