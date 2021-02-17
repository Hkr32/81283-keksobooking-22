import { offer } from './data.js';
import {
  getRandomIntInclusive,
  getRandomIntFloatInclusive,
  getRandomElementFromArray,
  getRandomElementsFromArray
} from './util.js';

// Генератор фейковых данных
function generateFakeData() {
  const location = {
    x: getRandomIntFloatInclusive(35.65000, 35.70000, 5),
    y: getRandomIntFloatInclusive(139.70000, 139.80000, 5),
  }

  const fakeData = {
    author: {
      avatar: 'img/avatars/user0' + getRandomIntInclusive(1, 8) + '.png',
    },
    location: {
      x: location.x,
      y: location.y,
    },
    offer: {
      title: 'title.' + new Date().getTime() * getRandomIntInclusive(1, 1000),
      address: location.x + ', ' + location.y,
      price: getRandomIntInclusive(100, 1000),
      type: getRandomElementFromArray(offer.types),
      rooms: getRandomIntInclusive(1, 10),
      guests: getRandomIntInclusive(1, 5),
      checkin: getRandomElementFromArray(offer.times),
      checkout: getRandomElementFromArray(offer.times),
      features: getRandomElementsFromArray(offer.features, true),
      description: 'description - ' + new Date().getTime() * getRandomIntInclusive(1, 1000) + ' - description',
      photos: getRandomElementsFromArray(offer.photos, true),
    },
  };

  return fakeData;
}

function generateArrayFakeData(counter = 1) {
  return new Array(counter).fill(null).map(() => generateFakeData());
}

export { generateFakeData, generateArrayFakeData };
