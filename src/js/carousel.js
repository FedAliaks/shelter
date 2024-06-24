import { pets } from './pets';
import { Card } from './CardWihPets';
export {
  createCarouselCards,
  changeCards,
  checkCardItems,
  isCountOfCardsInCarouselPart,
};

let checkCardItems = [];
let isCountOfCardsInCarouselPart;

function changeCards() {
  const CAROUSEL = document.querySelector('.carousel');
  const CAROUSEL_LEFT_CARDS = document.querySelector('.carousel__left');
  const CAROUSEL_CENTER_CARDS = document.querySelector('.carousel__center');
  const CAROUSEL_RIGHT_CARDS = document.querySelector('.carousel__right');
  if (CAROUSEL.classList.contains('carousel-left')) {
    CAROUSEL_LEFT_CARDS.innerHTML = CAROUSEL_CENTER_CARDS.innerHTML;
    CAROUSEL_CENTER_CARDS.innerHTML = CAROUSEL_RIGHT_CARDS.innerHTML;
    updateArrayCheckCardItems();
    CAROUSEL_RIGHT_CARDS.innerHTML = createCarouselCards().innerHTML;
  } else {
    CAROUSEL_RIGHT_CARDS.innerHTML = CAROUSEL_CENTER_CARDS.innerHTML;
    CAROUSEL_CENTER_CARDS.innerHTML = CAROUSEL_LEFT_CARDS.innerHTML;
    updateArrayCheckCardItems();
    CAROUSEL_LEFT_CARDS.innerHTML = createCarouselCards().innerHTML;
  }

  function updateArrayCheckCardItems() {
    checkCardItems = [];

    for (let i = 0; i < CAROUSEL_CENTER_CARDS.childNodes.length; i++) {
      checkCardItems.push(CAROUSEL_CENTER_CARDS.childNodes[i].dataset.name);
    }
  }
}

function createCarouselCards(positionBlockCards) {
  let template = document.createElement('div');

  const arrayPetsName = [];

  const lengthArray =
    window.innerWidth >= 1280 ? 3 : window.innerWidth >= 768 ? 2 : 1;

  isCountOfCardsInCarouselPart = lengthArray;

  while (arrayPetsName.length < lengthArray) {
    let randomIndex = Math.floor(Math.random() * (pets.length - 1));

    if (
      !arrayPetsName.includes(pets[randomIndex].name) &&
      !checkCardItems.includes(pets[randomIndex].name)
    ) {
      let card = new Card(pets[randomIndex].name, pets[randomIndex].img);
      template.append(card.generateCard());
      arrayPetsName.push(pets[randomIndex].name);
      if (positionBlockCards === 'center') {
        checkCardItems.push(pets[randomIndex].name);
      }
    }
  }
  return template;
}
