import { types } from './data.js';

// Создаем карточку предложения
function prepareCard(cardItem, item) {
  // @todo проверка на существование данных, если их нет, то не добавлять
  cardItem.querySelector('.popup__avatar').setAttribute('src', item.author.avatar);
  cardItem.querySelector('.popup__avatar').setAttribute('alt', item.offer.title);
  cardItem.querySelector('.popup__title').textContent = item.offer.title;
  cardItem.querySelector('.popup__text--address').textContent = item.offer.address;
  cardItem.querySelector('.popup__text--price').innerHTML = item.offer.price + '<span>₽/ночь</span>';
  cardItem.querySelector('.popup__type').textContent = types[item.offer.type];
  if (item.offer.rooms || item.offer.guests) {
    let prepareString = '';
    if (item.offer.rooms) {
      prepareString += 'Комнат: ' + item.offer.rooms + ';'
    }
    if (item.offer.guests) {
      prepareString += ' Кол-во гостей: ' + item.offer.guests + ';'
    }
    cardItem.querySelector('.popup__text--capacity').textContent = prepareString;
  } else {
    cardItem.querySelector('.popup__text--capacity').remove();
  }
  cardItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
  cardItem.querySelector('.popup__description').textContent = item.offer.description;

  const features = cardItem.querySelector('.popup__features').children;
  for (let i = features.length - 1; i >= 0; i--) {
    if (!item.offer.features.find((searchItem) => 'popup__feature--' + searchItem === features[i].classList[1])) {
      features[i].remove();
    }
  }
  if (!features.length) {
    cardItem.querySelector('.popup__features').remove();
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
function generateCard(card) {
  const template = document.querySelector('#card').content.querySelector('article');
  const cardElement = prepareCard(template.cloneNode(true), card);

  return cardElement;
}

export { generateCard };
