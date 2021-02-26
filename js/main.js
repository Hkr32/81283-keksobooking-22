// import { generateCard } from './card.js';
// import { filterFormHandler } from './form.js';
import { disabledForm, enabledForm } from './helper.js';
import { initMap } from './map.js';

// document.querySelector('#map-canvas').appendChild(generateCard());

// filterFormHandler(document.querySelector('.ad-form'));
disabledForm(document.querySelector('.ad-form'), 'ad-form--disabled');
disabledForm(document.querySelector('.map__filters'), 'map__filters--disabled');

initMap('map-canvas');