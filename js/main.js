import { adFormHandler } from './form.js';
import { mapFormHandler } from './filter.js';
import { initMap } from './map.js';

adFormHandler(document.querySelector('.ad-form'));
mapFormHandler(document.querySelector('.map__filters'));

initMap();
