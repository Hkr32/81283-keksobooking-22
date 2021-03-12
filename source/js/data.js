const mainPin = '../img/main-pin.svg';
const secondaryPin = '../img/pin.svg';
const defaultPreviewUrl = 'img/muffin-grey.svg';

const offer = {
  types: ['palace', 'flat', 'house', 'bungalow'],
  times: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  photos: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ],
};

const types = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  house: 'Дом',
  palace: 'Дворец',
};

const prices = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const startCoordinates = {
  lat: 35.67514743608467,
  lng: 139.76806640625003,
};

const initCoordinates = {
  lat: 35.6836,
  lng: 139.7588,
};

const mapZoom = 13;

const mainMapPinIcon = {
  iconUrl: mainPin,
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};

const mapPinIcon = {
  iconUrl: secondaryPin,
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};

export {
  defaultPreviewUrl,
  offer,
  types,
  prices,
  startCoordinates,
  initCoordinates,
  mapZoom,
  mainMapPinIcon,
  mapPinIcon
};
