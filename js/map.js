import { startCoordinates, mainMapPinIcon, mapPinIcon } from './data.js';
import { enabledForm } from './helper.js';
import { formAddressChangeHandler } from './form.js';
import { generateArrayFakeData } from './generate.js';
import { generateCard } from './card.js';

function initMap(idMap) {
  const map = L.map(idMap);

  map.on('load', enableForms);
  map.setView({
    lat: 28.353,
    lng: 145.020,
  }, 4);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
    },
  ).addTo(map);

  const mainPinMarker = addPinMarker(startCoordinates, mainMapPinIcon, true)

  mainPinMarker.addTo(map);

  formAddressChangeHandler(startCoordinates)

  mainPinMarker.on('moveend', (evt) => {
    formAddressChangeHandler(evt.target.getLatLng());
  });

  const points = generateArrayFakeData(5);
  points.forEach((point) => {
    const coordinates = {
      lat: point.location.x,
      lng: point.location.y,
    }
    const icon = L.icon(mapPinIcon);
    const marker = L.marker(
      coordinates,
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

function enableForms() {
  enabledForm(document.querySelector('.ad-form'), 'ad-form--disabled');
  enabledForm(document.querySelector('.map__filters'), 'map__filters--disabled');
}

export { initMap };