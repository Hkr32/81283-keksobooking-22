/* global L:readonly */

import { startCoordinates, mainMapPinIcon, mapPinIcon } from './data.js';
import { enableForm } from './helper.js';
import { formAddressChangeHandler } from './form.js';
import { messageForErrorGetData } from './message.js';
import { generateCard } from './card.js';
import { getData } from './api.js';
import { filterPoints } from './filter.js';
import { setPoints } from './points.js';

const ID_MAP = 'map-canvas';
const map = L.map(ID_MAP);
const mainPinMarker = generatePinMarker(startCoordinates, mainMapPinIcon, true);
const markers = [];

function initMap() {
  map.on('load', enableForms);
  map.setView({
    lat: 35.6836,
    lng: 139.7588,
  }, 13);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
    },
  ).addTo(map);

  mainPinMarker.addTo(map);

  formAddressChangeHandler(startCoordinates);
  mainPinMarker.on('moveend', (evt) => {
    formAddressChangeHandler(evt.target.getLatLng());
  });

  // Получение списка точек
  getData(
    (points) => {
      setPoints(points);
      addMarkersToMap();
    },
    (error) => {
      messageForErrorGetData(error);
    },
  );
}

// Изменение координат главного маркера
function changeMainMarkerCoordinates(coordinates) {
  mainPinMarker.setLatLng(coordinates);
}

// Создание маркера
function generatePinMarker(coordinates, icon, draggable) {
  const marker = L.marker(
    coordinates,
    {
      draggable,
      icon: L.icon(icon),
    },
  );

  return marker;
}

// Удаление маркеров с карты
function removeMakersFromMap() {
  markers.forEach((marker) => {
    map.removeLayer(marker);
  });
}

// Добавление маркеров на карту
function addMarkersToMap() {
  const points = filterPoints();

  removeMakersFromMap();

  points.forEach((point) => {
    const marker = generatePinMarker(point.location, mapPinIcon, false);
    markers.push(marker);
    marker
      .addTo(map)
      .bindPopup(
        generateCard(point),
        {
          keepInView: true,
        },
      );
  });
}

// Активация форм
function enableForms() {
  enableForm(document.querySelector('.ad-form'), 'ad-form--disabled');
  enableForm(document.querySelector('.map__filters'), 'map__filters--disabled');
}

export { initMap, changeMainMarkerCoordinates, addMarkersToMap };
