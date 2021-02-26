import { enabledForm } from './helper.js';

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
}

function enableForms() {
  enabledForm(document.querySelector('.ad-form'), 'ad-form--disabled');
  enabledForm(document.querySelector('.map__filters'), 'map__filters--disabled');
}

export { initMap };