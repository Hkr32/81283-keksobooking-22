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

  return ((Math.random() * (max - min)) + min).toFixed(counter);
}

// Получение случайного элемента массива
function getRandomElementFromArray(elements) {
  return elements[getRandomIntInclusive(0, elements.length - 1)];
}

// Генератор фейковых данных
function generateFakeData() {
  const OFFER_TYPE = ['palace', 'flat', 'house', 'bungalow'];
  const OFFER_TIME = ['12:00', '13:00', '14:00'];
  const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  const LOCATION_X = getRandomIntFloatInclusive(35.65000, 35.70000, 5);
  const LOCATION_Y = getRandomIntFloatInclusive(139.70000, 139.80000, 5);

  const fakeData = {
    author: {
      avatar: 'img/avatars/user0' + getRandomIntInclusive(1, 8) + '.png',
    },
    location: {
      x: LOCATION_X,
      y: LOCATION_Y,
    },
    offer: {
      title: 'title.' + new Date().getTime() * getRandomIntInclusive(1, 1000),
      address: LOCATION_X + ', ' + LOCATION_Y,
      price: getRandomIntInclusive(100, 1000),
      type: getRandomElementFromArray(OFFER_TYPE),
      rooms: getRandomIntInclusive(1, 10),
      guests: getRandomIntInclusive(1, 5),
      checkin: getRandomElementFromArray(OFFER_TIME),
      checkout: getRandomElementFromArray(OFFER_TIME),
      features: getRandomElementFromArray(OFFER_FEATURES),
      description: 'description - ' + new Date().getTime() * getRandomIntInclusive(1, 1000) + ' - description',
      photos: getRandomElementFromArray(OFFER_PHOTOS),
    },
  };

  return fakeData;
}

function generateArrayFakeData(counter) {
  return new Array(counter).fill(null).map(() => generateFakeData());
}
