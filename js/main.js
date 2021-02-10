import { generateFakeData } from './generate.js';

function generateArrayFakeData(counter) {
  return new Array(counter).fill(null).map(() => generateFakeData());
}