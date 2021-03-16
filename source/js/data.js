const mainPin = 'img/main-pin.svg';
const secondaryPin = 'img/pin.svg';
const defaultPreviewUrl = 'img/muffin-grey.svg';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const MAP_ID = 'map-canvas';
const MAIN_URL = 'https://22.javascript.pages.academy/';
const GET_DATA_URL = MAIN_URL + 'keksobooking/data';
const SEND_DATA_URL = MAIN_URL + 'keksobooking';

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

const filterPrices = {
  low: 10000,
  high: 50000,
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

// Названия переменных из https://leafletjs.com/reference-1.7.1.html#icon
const mainMapPinIcon = {
  iconUrl: mainPin,
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};

// Названия переменных из https://leafletjs.com/reference-1.7.1.html#icon
const mapPinIcon = {
  iconUrl: secondaryPin,
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};

export {
  MAP_ID,
  FILE_TYPES,
  GET_DATA_URL,
  SEND_DATA_URL,
  defaultPreviewUrl,
  types,
  prices,
  filterPrices,
  startCoordinates,
  initCoordinates,
  mapZoom,
  mainMapPinIcon,
  mapPinIcon
};
