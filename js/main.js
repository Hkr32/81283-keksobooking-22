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

  return ((Math.random() * (max - min + 1)) + min).toFixed(counter);
}