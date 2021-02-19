import { generateCard } from './card.js';
import { filterFormHandler } from './form.js';

document.querySelector('#map-canvas').appendChild(generateCard());

filterFormHandler(document.querySelector('.ad-form'));
