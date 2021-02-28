import { disabledForm } from './helper.js';
import { initMap } from './map.js';

disabledForm(document.querySelector('.ad-form'), 'ad-form--disabled');
disabledForm(document.querySelector('.map__filters'), 'map__filters--disabled');

initMap('map-canvas');
