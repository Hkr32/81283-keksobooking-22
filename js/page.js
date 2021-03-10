import { initMap, addMarkersToMap } from './map.js';
import { getData } from './api.js';
import { setPoints } from './points.js';
import { enableForm } from './helper.js';
import { messageForErrorGetData } from './message.js';

const mapFilters = document.querySelector('.map__filters');

// Инициализация страницы
function initPage() {
  // Инициализация карты
  initMap();
  // Получение данных
  getData(
    (points) => {
      setPoints(points);
      addMarkersToMap();
      enableForm(mapFilters, 'map__filters--disabled');
    },
    (error) => {
      messageForErrorGetData(error);
    },
  );
}

export { initPage };
