import { adFormHandler } from './form.js';
import { disableForm } from './helper.js';
import { initMap } from './map.js';

adFormHandler(document.querySelector('.ad-form'));

disableForm(document.querySelector('.map__filters'), 'map__filters--disabled');

initMap('map-canvas');
