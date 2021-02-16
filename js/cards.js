import { generateArrayFakeData } from './generate.js';
import { types } from './data.js';

// Создаем карточку предложения
function generateCard(cardItem, item) {
  cardItem.querySelector('.popup__avatar').setAttribute('src', item.author.avatar);
  cardItem.querySelector('.popup__avatar').setAttribute('alt', item.offer.title);
  cardItem.querySelector('.popup__title').textContent = item.offer.title;
  cardItem.querySelector('.popup__text--address').textContent = item.offer.address;
  cardItem.querySelector('.popup__text--price').innerHTML = item.offer.price + '<span>₽/ночь</span>';
  cardItem.querySelector('.popup__type').textContent = types[item.offer.type];
  cardItem.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
  cardItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
  cardItem.querySelector('.popup__description').textContent = item.offer.description;

  const features = cardItem.querySelector('.popup__features').children;
  for (let i = features.length - 1; i >= 0; i--) {
    if (!item.offer.features.find((searchItem) => 'popup__feature--' + searchItem === features[i].classList[1])) {
      features[i].remove();
    }
  }

  const photos = cardItem.querySelector('.popup__photos');
  const imageTemplate = photos.querySelector('img');
  photos.querySelector('img').remove();

  item.offer.photos.forEach((photoSrc) => {
    const photoElement = imageTemplate.cloneNode(true);
    photoElement.setAttribute('src', photoSrc);
    photoElement.setAttribute('alt', item.offer.title);
    photos.appendChild(photoElement);
  });

  return cardItem;
}

// Генерируем нужно количество карточек предложений
function generateCards(counter = 1) {
  const template = document.querySelector('#card').content.querySelector('article');
  const fragment = document.createDocumentFragment();

  const cards = generateArrayFakeData(counter);

  cards.forEach((item) => {
    const cardElement = generateCard(template.cloneNode(true), item);

    fragment.appendChild(cardElement);
  });

  return fragment;
}

export { generateCards };
