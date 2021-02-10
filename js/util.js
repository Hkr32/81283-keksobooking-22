// Функция, возвращающая случайное целое число из переданного диапазона включительно
function getRandomIntInclusive(min = 0, max = 0) {
  if (min < 0 || max < 0) {
    alert('Значения должны быть больше или равны нулю!');

    return false;
  }

  if (min == max) {
    return Math.ceil(min);
  } else if (min > max) {
    let tmp = min;
    min = max;
    max = tmp;
  }

  min = Math.ceil(min); // Округляет аргумент до ближайшего большего целого.
  max = Math.floor(max); // Округляет аргумент до ближайшего меньшего целого.

  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
function getRandomIntFloatInclusive(min = 0, max = 0, counter = 2) {
  if (min < 0 || max < 0 || counter < 0) {
    alert('Значения должны быть больше или равны нулю!');

    return false;
  }

  if (min == max) {
    return (min).toFixed(counter);
  } else if (min > max) {
    let tmp = min;
    min = max;
    max = tmp;
  }

  min = parseFloat(min);
  max = parseFloat(max);

  return parseFloat(((Math.random() * (max - min)) + min).toFixed(counter));
}

// Получение случайного элемента массива
function getRandomElementFromArray(elements) {
  return elements[getRandomIntInclusive(0, elements.length - 1)];
}

// Получение случайного массива с уникальными(опционально) значениями
function getRandomElementsFromArray(elements, unique = false) {
  const counter = getRandomIntInclusive(1, elements.length);
  const indexes = new Array(counter).fill(null).map(() => {
    return getRandomIntInclusive(0, elements.length - 1);
  });
  const uniqueIndexes = unique ? Array.from(new Set(indexes)) : indexes;

  return uniqueIndexes.map((i) => {
    return elements[i];
  });
}

export {
  getRandomIntInclusive,
  getRandomIntFloatInclusive,
  getRandomElementFromArray,
  getRandomElementsFromArray
};