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

export {
  isEscEvent,
  debounce
};
