export class Card {
  constructor(name, image, ...rest) {
    this.name = name;
    this.image = image;
  }

  generateCard() {
    let template = '';

    const divElement = document.createElement('div');
    divElement.dataset.name = `${this.name}`;
    divElement.className = 'card';

    this.image && (template += `<img src=${this.image} alt="image">`);
    this.name && (template += `<h4 class="card__title">${this.name}</h4>`);
    template += `<div class="card__buttons-block"><button class="button card__button">Learn more</button></div>`;

    divElement.innerHTML = template;

    return divElement;
  }
}
