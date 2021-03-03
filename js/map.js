/* global L:readonly */

import { startCoordinates, mainMapPinIcon, mapPinIcon } from './data.js';
import { enableForm } from './helper.js';
import { formAddressChangeHandler } from './form.js';
// import { generateArrayFakeData } from './generate.js';
import { generateCard } from './card.js';
import { getData, errorGetData } from './api.js';

const ID_MAP = 'map-canvas';
const map = L.map(ID_MAP);
const mainPinMarker = addPinMarker(startCoordinates, mainMapPinIcon, true);

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

  //
  getData(
    (points) => {
      addMarkersToMap(points);
    },
    (error) => {
      errorGetData(error);
    },
  );
}

const changeMainMarkerCoordinates = (coordinates) => {
  mainPinMarker.setLatLng(coordinates);
}

function addPinMarker(coordinates, icon, draggable) {
  const marker = L.marker(
    coordinates,
    {
      draggable,
      icon: L.icon(icon),
    },
  );

  return marker;
}

const addMarkersToMap = (points) => {
  points.forEach((point) => {
    const icon = L.icon(mapPinIcon);
    const marker = L.marker(
      point.location,
      {
        icon,
      },
    );

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

function enableForms() {
  enableForm(document.querySelector('.ad-form'), 'ad-form--disabled');
  enableForm(document.querySelector('.map__filters'), 'map__filters--disabled');
}

export { initMap, changeMainMarkerCoordinates };
