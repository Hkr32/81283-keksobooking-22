import { addMarkersToMap } from './map.js';
import { pointsLimit, getPoints } from './points.js';
import { disableForm, debounce } from './util.js';
import { filterPrices } from './data.js';

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
    pointsFiltered = filterByRooms(pointsFiltered, Number(housingRooms.value));
  }
  if (housingGuests.value !== 'any') {
    pointsFiltered = filterByGuests(pointsFiltered, Number(housingGuests.value));
  }
  pointsFiltered = filterByFeatures(pointsFiltered, housingFeatures.querySelectorAll('input'));

  return pointsFiltered.length > pointsLimit
    ? pointsFiltered.slice(0, pointsLimit)
    : pointsFiltered;
}

function filterByType(points, filterValue) {
  return points.filter(function(point) {
    return point.offer.type === filterValue;
  });
}

function filterByPrice(points, filterValue) {
  switch (filterValue) {
    case 'low':
      return points.filter(function(point) {
        return point.offer.price < filterPrices.low;
      });
    case 'middle':
      return points.filter(function(point) {
        return point.offer.price >= filterPrices.low && point.offer.price <= filterPrices.high;
      });
    case 'high':
      return points.filter(function(point) {
        return point.offer.price > filterPrices.high;
      });
    default:
      return points;
  }
}

function filterByRooms(points, filterValue) {
  return points.filter(function(point) {
    return point.offer.rooms === filterValue;
  });
}

function filterByGuests(points, filterValue) {
  return points.filter(function(point) {
    return point.offer.guests === filterValue;
  });
}

function filterByFeatures(points, features) {
  let selectedFeatures = [];
  features.forEach(function(feature) {
    if (feature.checked) {
      selectedFeatures.push(feature.value)
    }
  });

  if (selectedFeatures.length) {
    return points.filter(function(point) {
      return point.offer.features.find(function (feature) {
        selectedFeatures.includes(feature);
      });
    });
  }

  return points;
}

export { mapFormHandler, filterPoints };
