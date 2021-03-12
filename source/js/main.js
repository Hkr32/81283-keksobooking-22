import '../css/normalize.css';
import '../css/style.css';
import { adFormHandler } from './form.js';
import { mapFormHandler } from './filter.js';
import { initPage } from './page.js';

adFormHandler(document.querySelector('.ad-form'));
mapFormHandler(document.querySelector('.map__filters'));

initPage();
