import { disableForm } from './helper.js';
import { addMarkersToMap } from './map.js';
import { pointsLimit, getPoints } from './points.js';

// Добавляем события для формы
function mapFormHandler(form) {
  disableForm(form, 'map__filters--disabled');
  form.addEventListener('change', filterChangeHandler());
}

// Проверяем что изменилось
function filterChangeHandler() {
  return (evt) => {
    console.log(evt)
    // document.querySelector('.leaflet-popup').remove();

    addMarkersToMap(false);
  }
}

// 
function filterPoints() {
  const points = getPoints();

  const housingForm = document.querySelector('form.map__filters');
  const housingType = housingForm.querySelector('#housing-type');
  const housingPrice = housingForm.querySelector('#housing-price');
  const housingRooms = housingForm.querySelector('#housing-rooms');
  const housingGuests = housingForm.querySelector('#housing-guests');
  const housingFeatures = housingForm.querySelector('#housing-features');

  
  let pointsFiltered = points;
  
  if (housingType.value != 'any') {
    pointsFiltered = filterByType(pointsFiltered, housingType.value);
  }

  return pointsFiltered.slice(0, pointsLimit);
}

function filterByType(points, filterValue) {
  return points.filter((point) => {
    return point.offer.type == filterValue;
  });
}

export { mapFormHandler, filterPoints };
