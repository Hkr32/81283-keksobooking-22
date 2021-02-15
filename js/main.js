import { generateArrayFakeData } from './generate.js';
const template = document.querySelector('#card').content.querySelector('article');
const fragment = document.createDocumentFragment();

const cards = generateArrayFakeData(1);

cards.forEach((item) => {
  const cardElement = template.cloneNode(true);

  cardElement.querySelector('.popup__avatar').setAttribute('src', item.author.avatar);
  cardElement.querySelector('.popup__avatar').setAttribute('alt', item.offer.title);
  cardElement.querySelector('.popup__title').textContent = item.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = item.offer.address;
  cardElement.querySelector('.popup__text--price').innerHTML = item.offer.price + '<span>₽/ночь</span>';
  cardElement.querySelector('.popup__type').textContent = item.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = item.offer.description;

  const features = cardElement.querySelector('.popup__features').children;
  for (let i = features.length - 1; i >= 0; i--) {
    if (!item.offer.features.find((searchItem) => 'popup__feature--' + searchItem === features[i].classList[1])) {
      features[i].remove();
    }
  }

  const photos = cardElement.querySelector('.popup__photos');
  const imageTemplate = photos.querySelector('img');

  item.offer.photos.forEach((photoSrc) => {
    const photoElement = imageTemplate.cloneNode();
    photoElement.setAttribute('src', photoSrc);
    photoElement.setAttribute('alt', item.offer.title);
    photos.appendChild(photoElement);
  });

  fragment.appendChild(cardElement);
});

document.querySelector('#map-canvas').appendChild(fragment);