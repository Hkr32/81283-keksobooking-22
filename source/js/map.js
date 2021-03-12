import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { startCoordinates, initCoordinates, mapZoom, mainMapPinIcon, mapPinIcon } from './data.js';
import { enableForm } from './helper.js';
import { formAddressChangeHandler } from './form.js';
import { generateCard } from './card.js';
import { filterPoints } from './filter.js';

const ID_MAP = 'map-canvas';
const map = L.map(ID_MAP);
const mainPinMarker = generatePinMarker(startCoordinates, mainMapPinIcon, true);
const markers = [];
const adForm = document.querySelector('.ad-form');

// Инициализация карты
function initMap() {
  map.on('load', () => {
    enableForm(adForm, 'ad-form--disabled');
  });
  map.setView(initCoordinates, mapZoom);

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

export { initMap, changeMainMarkerCoordinates, addMarkersToMap };
