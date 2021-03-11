import { disableForm } from './helper.js';
import { addMarkersToMap } from './map.js';
import { pointsLimit, getPoints } from './points.js';
import { debounce } from './util.js';

// Добавляем события для формы
function mapFormHandler(form) {
  disableForm(form, 'map__filters--disabled');
  form.addEventListener('change', debounce(addMarkersToMap));
}

// Фильтрация меток
function filterPoints() {
  const points = getPoints();

  const housingForm = document.querySelector('form.map__filters');
  const housingType = housingForm.querySelector('#housing-type');
  const housingPrice = housingForm.querySelector('#housing-price');
  const housingRooms = housingForm.querySelector('#housing-rooms');
  const housingGuests = housingForm.querySelector('#housing-guests');
  const housingFeatures = housingForm.querySelector('#housing-features');

  let pointsFiltered = points;

  if (housingType.value !== 'any') {
    pointsFiltered = filterByType(pointsFiltered, housingType.value);
  }
  if (housingPrice.value !== 'any') {
    pointsFiltered = filterByPrice(pointsFiltered, housingPrice.value);
  }
  if (housingRooms.value !== 'any') {
    pointsFiltered = filterByRooms(pointsFiltered, housingRooms.value);
  }
  if (housingGuests.value !== 'any') {
    pointsFiltered = filterByGuests(pointsFiltered, housingGuests.value);
  }
  if (housingFeatures.value !== 'any') {
    pointsFiltered = filterByFeatures(pointsFiltered, housingFeatures.querySelectorAll('input'));
  }

  return pointsFiltered.length > pointsLimit
    ? pointsFiltered.slice(0, pointsLimit)
    : pointsFiltered;
}

function filterByType(points, filterValue) {
  return points.filter((point) => {
    return point.offer.type === filterValue;
  });
}

function filterByPrice(points, filterValue) {
  switch (filterValue) {
    case 'low':
      return points.filter((point) => {
        return point.offer.price < 10000;
      });
    case 'middle':
      return points.filter((point) => {
        return point.offer.price >= 10000 && point.offer.price <= 50000;
      });
    case 'high':
      return points.filter((point) => {
        return point.offer.price > 50000;
      });
    default:
      return points;
  }
}

function filterByRooms(points, filterValue) {
  return points.filter((point) => {
    return point.offer.rooms === filterValue;
  });
}

function filterByGuests(points, filterValue) {
  return points.filter((point) => {
    return point.offer.guests === filterValue;
  });
}

function filterByFeatures(points, features) {
  let selectedFeatures = [];
  features.forEach(feature => {
    if (feature.checked) {
      selectedFeatures.push(feature.value)
    }
  });

  if (selectedFeatures.length) {
    return points.filter((point) => {
      return point.offer.features.find(feature => selectedFeatures.includes(feature));
    });
  }

  return points;
}

export { mapFormHandler, filterPoints };
