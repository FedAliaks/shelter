import './style.scss';

import { pets } from './js/pets';
import { Card } from './js/CardWihPets';
import { Modal } from './js/Modal';

//carousel

let isCountOfCardsInCarouselPart;

const CAROUSEL_LEFT = document.querySelector('.carousel-left-arrow');
const CAROUSEL_RIGHT = document.querySelector('.carousel-right-arrow');
const CAROUSEL = document.querySelector('.carousel');

// FOR INDEX PAGE
if (CAROUSEL) {
  let checkCardItems = [];

  CAROUSEL_LEFT.addEventListener('click', carouselMoveToLeft);
  CAROUSEL_RIGHT.addEventListener('click', carouselMoveToRight);

  function carouselMoveToLeft() {
    CAROUSEL.classList.add('carousel-right');
  }

  function carouselMoveToRight() {
    CAROUSEL.classList.add('carousel-left');
  }

  CAROUSEL.addEventListener('animationend', () => {
    changeCards();
    CAROUSEL.classList.remove('carousel-left');
    CAROUSEL.classList.remove('carousel-right');
  });

  const CAROUSEL_LEFT_CARDS = document.querySelector('.carousel__left');
  const CAROUSEL_CENTER_CARDS = document.querySelector('.carousel__center');
  const CAROUSEL_RIGHT_CARDS = document.querySelector('.carousel__right');

  CAROUSEL_CENTER_CARDS.innerHTML = createCarouselCards('center').innerHTML;
  CAROUSEL_LEFT_CARDS.innerHTML = createCarouselCards().innerHTML;
  CAROUSEL_RIGHT_CARDS.innerHTML = createCarouselCards().innerHTML;

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

  function changeCards() {
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

  window.addEventListener('resize', () => {
    const temp =
      window.innerWidth >= 1280 ? 3 : window.innerWidth >= 768 ? 2 : 1;

    if (isCountOfCardsInCarouselPart != temp) {
      isCountOfCardsInCarouselPart = temp;

      const CAROUSEL_LEFT_CARDS = document.querySelector('.carousel__left');
      const CAROUSEL_CENTER_CARDS = document.querySelector('.carousel__center');
      const CAROUSEL_RIGHT_CARDS = document.querySelector('.carousel__right');
      checkCardItems = [];

      CAROUSEL_CENTER_CARDS.innerHTML = createCarouselCards('center').innerHTML;
      CAROUSEL_LEFT_CARDS.innerHTML = createCarouselCards().innerHTML;
      CAROUSEL_RIGHT_CARDS.innerHTML = createCarouselCards().innerHTML;
    }

    closePopUpWindow();
  });

  //modal menu on index page for CAROUSEL
  const CAROUSEL_CARDS = document.querySelector('.carousel-container');

  CAROUSEL_CARDS.addEventListener('click', (e) => {
    if (e.target.closest('.card')) {
      openPopUpWindow(e.target.closest('.card'));
      const OVERLAY_MAIN = document.querySelector('.overlay-open');

      OVERLAY_MAIN.addEventListener('click', (e) => {
        if (
          e.target.classList.contains('overlay') ||
          e.target.classList.contains('overlay__close-svg') ||
          e.target.classList.contains('overlay__close-button')
        ) {
          closePopUpWindow();
        }
      });
    }
  });
}

// END FOR INDEX PAGE

//start mobile menu

const HAMBURGER = document.querySelector('.hamburger');
document.querySelector('.mobile-menu').addEventListener('click', (e) => {
  if (e.target.classList.contains('mobile-menu')) {
    toggleMobileMenu();
  }
});

const MOBILE_NAVIGATION = document.querySelector('.mobile-navigation');

MOBILE_NAVIGATION.addEventListener('click', (e) => {
  if (e.target.classList.contains('mobile-link')) {
    toggleMobileMenu();
  }
});

window.addEventListener('resize', (e) => {
  if (window.innerWidth > 768) {
    document.querySelector('.mobile-menu').classList.remove('mobile-menu_open');
    document.querySelector('.hamburger').classList.remove('hamburger-rotate');
    document
      .querySelector('.mobile-navigation')
      .classList.remove('mobile-navigation_open');
    document.querySelector('html').classList.remove('scroll-stop');
    document
      .querySelector('.hamburger')
      .classList.remove('hamburger-main_colored');
    document
      .querySelector('.hamburger-line')
      .classList.toggle('hamburger-line_colored');
  }
});

HAMBURGER.addEventListener('click', toggleMobileMenu);

function toggleMobileMenu() {
  document.querySelector('.mobile-menu').classList.toggle('mobile-menu_open');
  document.querySelector('.hamburger').classList.toggle('hamburger-rotate');
  document
    .querySelector('.hamburger')
    .classList.toggle('hamburger-main_colored');
  document
    .querySelector('.hamburger-line')
    .classList.toggle('hamburger-line_colored');
  document
    .querySelector('.mobile-navigation')
    .classList.toggle('mobile-navigation_open');
  document.querySelector('html').classList.toggle('scroll-stop');
}

function openPopUpWindow(card) {
  pets.forEach((item) => {
    if (item.name === card.getAttribute('data-name')) {
      const OVERLAY_CONTENT = document.querySelector('.overlay');
      const modal = new Modal(item).createModalWindow();
      OVERLAY_CONTENT.innerHTML = '';
      OVERLAY_CONTENT.append(modal);
    }
  });

  const OVERLAY = document.querySelector('.overlay');
  const HTML = document.querySelector('html');
  OVERLAY.classList.add('overlay-open');
  HTML.classList.add('scroll-stop');
}

function closePopUpWindow() {
  const OVERLAY = document.querySelector('.overlay');
  const HTML = document.querySelector('html');
  OVERLAY.classList.remove('overlay-open');
  HTML.classList.remove('scroll-stop');
}

//pagination

//create our-pets-list
const OUR_PETS_LIST = document.querySelector('.our-pets__pets-list');

//START OUR PETS LIST

if (OUR_PETS_LIST) {
  //create start Array for 3 screen width and mix
  let startArray = createStartArray();
  let countCardsInPetsList;

  const arrayFor6CardSection = divideArray(startArray, 6);
  const arrayFor8CardSection = divideArray(startArray, 8);
  const arrayFor2CardSection = divideArray(startArray, 3);

  function createStartArray() {
    let answer = [];
    let temp = [0, 1, 2, 3, 4, 5, 6, 7].sort(() => Math.random() - 0.5);

    for (let i = 0; i < 6; i++) {
      let arrayFinal = [];

      let arr1 = temp.slice(0, 3).sort(() => Math.random() - 0.5);
      arrayFinal.push(arr1);

      let arr2 = temp.slice(3, 6).sort(() => Math.random() - 0.5);
      arrayFinal.push(arr2);

      let arr3 = temp.slice(6).sort(() => Math.random() - 0.5);
      arrayFinal.push(arr3);

      answer.push(arrayFinal.flat());
    }

    return answer.flat();
  }

  function divideArray(array, size) {
    let answer = [];
    for (let i = 0; i < array.length; i += size) {
      answer.push(array.slice(i, i + size));
    }

    return answer;
  }

  createOurPetsSectionContent();

  function createOurPetsSectionContent() {
    const cardSection = document.querySelector('.our-pets__pets-list');

    const numberOfPage = document.querySelector('.page-number').innerText - 1;

    let array =
      window.innerWidth >= 1280
        ? arrayFor8CardSection
        : window.innerWidth >= 768
          ? arrayFor6CardSection
          : arrayFor2CardSection;

    cardSection.innerHTML = '';

    array[numberOfPage].forEach((item) => {
      let card = new Card(pets[item].name, pets[item].img);
      cardSection.append(card.generateCard());
    });

    countCardsInPetsList = array[numberOfPage].length;
  }

  window.addEventListener('resize', () => {
    const count =
      window.innerWidth >= 1280 ? 8 : window.innerWidth >= 768 ? 6 : 3;

    if (count != countCardsInPetsList) {
      let maxPage =
        window.innerWidth >= 1280 ? 6 : window.innerWidth >= 768 ? 8 : 16;
      const currentPage = +document.querySelector('.page-number').innerText;

      if (maxPage < currentPage) {
        document.querySelector('.page-number').innerText = maxPage;
      }

      createOurPetsSectionContent();
      const currentNewPage = +document.querySelector('.page-number').innerText;

      checkPaginationButtonColored(currentNewPage, maxPage);
    }
  });

  //add modal menu for pets page

  const PETS_LIST = document.querySelector('.our-pets__pets-list');

  PETS_LIST.addEventListener('click', (e) => {
    if (e.target.closest('.card')) {
      openPopUpWindow(e.target.closest('.card'));
      const OVERLAY_MAIN = document.querySelector('.overlay-open');

      OVERLAY_MAIN.addEventListener('click', (e) => {
        if (
          e.target.classList.contains('overlay') ||
          e.target.classList.contains('overlay__close-svg') ||
          e.target.classList.contains('overlay__close-button')
        ) {
          closePopUpWindow();
        }
      });
    }
  });

  //pagination

  const PAGINATION = document.querySelector('.our-pets__pagination');
  PAGINATION.addEventListener('click', (e) => paginationClick(e));

  function paginationClick(e) {
    const PAGE_NUMBER = document.querySelector('.page-number');
    const number = Number(PAGE_NUMBER.innerText);
    const target = e.target;

    const max =
      window.innerWidth >= 1280 ? 6 : window.innerWidth >= 768 ? 8 : 16;

    if (
      target.classList.contains('1-page-right') ||
      target.parentNode.classList.contains('1-page-right')
    ) {
      if (number < max) {
        PAGE_NUMBER.innerText = number + 1;
      }
    }

    if (
      target.classList.contains('max-page-right') ||
      target.parentNode.classList.contains('max-page-right')
    ) {
      PAGE_NUMBER.innerText = max;
    }

    if (
      target.classList.contains('1-page-left') ||
      target.parentNode.classList.contains('1-page-left')
    ) {
      if (number > 1) {
        PAGE_NUMBER.innerText = Number(number) - 1;
      }
    }

    if (
      target.classList.contains('min-page-left') ||
      target.parentNode.classList.contains('min-page-left')
    ) {
      if (number > 1) {
        PAGE_NUMBER.innerText = 1;
      }
    }

    checkPaginationButtonColored(Number(PAGE_NUMBER.innerText), max);

    createOurPetsSectionContent();
  }

  function checkPaginationButtonColored(numberPage, max) {
    const paginationButtons = document.querySelectorAll('.pagination');

    paginationButtons.forEach((item) => {
      item.classList.remove('pagination_border');
      document.querySelector('.icon-2-arrow-left').style.backgroundImage =
        `url('./public/svg/pets-page/2-arrow-left-inactive.svg')`;
      document.querySelector('.icon-arrow-left').style.backgroundImage =
        `url('./public/svg/pets-page/arrow-left-inactive.svg')`;
      document.querySelector('.icon-arrow-right').style.backgroundImage =
        `url('./public/svg/pets-page/arrow-right-inactive.svg')`;
      document.querySelector('.icon-2-arrow-right').style.backgroundImage =
        `url('./public/svg/pets-page/2-arrow-right-inactive.svg')`;

      if (numberPage > 1) {
        document.querySelector('.icon-2-arrow-left').style.backgroundImage =
          `url('./public/svg/pets-page/2-arrow-left-active.svg')`;
        document.querySelector('.icon-arrow-left').style.backgroundImage =
          `url('./public/svg/pets-page/arrow-left-active.svg')`;
        if (
          item.classList.contains('min-page-left') ||
          item.classList.contains('1-page-left')
        ) {
          item.classList.add('pagination_border');
        }
      }

      if (numberPage < max) {
        document.querySelector('.icon-arrow-right').style.backgroundImage =
          `url('./public/svg/pets-page/arrow-right-active.svg')`;
        document.querySelector('.icon-2-arrow-right').style.backgroundImage =
          `url('./public/svg/pets-page/2-arrow-right-active.svg')`;
        if (
          item.classList.contains('max-page-right') ||
          item.classList.contains('1-page-right')
        ) {
          item.classList.add('pagination_border');
        }
      }
    });
  }
}
