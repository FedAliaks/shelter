export class Modal {
  constructor({
    name,
    img,
    type,
    breed,
    description,
    age,
    inoculations,
    diseases,
    parasites,
    ...rest
  }) {
    this.name = name;
    this.img = img;
    this.type = type;
    this.breed = breed;
    this.description = description;
    this.age = age;
    this.inoculations = inoculations;
    this.diseases = diseases;
    this.parasites = parasites;
  }

  createModalWindow() {
    let template =
      '<div class="overlay__close-button"><span class="overlay__close-svg"></span></div>';

    const divElement = document.createElement('div');
    divElement.className = 'overlay__pets';
    this.img &&
      (template += `<img class="overlay__image" src="${this.img}" alt="image">`);

    let content = '';

    const contentModal = document.createElement('div');
    contentModal.className = `overlay__content-block`;

    this.name && (content += `<h3 class="overlay__title">${this.name}</h3>`);
    content += `<p class="overlay__subtitle">${this.type} - ${this.breed}</p>`;
    content += ` <p class="overlay__description">${this.description}</p>`;
    contentModal.innerHTML = content;

    let list = '';
    const listElement = document.createElement('ul');
    listElement.className = 'overlay__pets-parametrs';
    this.age &&
      (list += `<li class="overlay__li"><span class="overlay__parameter-item"><span class='text-bold'>Age: </span>${this.age}</span></li>`);
    this.inoculations &&
      (list += `<li class="overlay__li"><span class="overlay__parameter-item"><span class='text-bold'>Inoculations: </span>${this.flatArray(this.inoculations)}</span></li>`);
    this.inoculations &&
      (list += `<li class="overlay__li"><span class="overlay__parameter-item"><span class='text-bold'>Diseases: </span>${this.flatArray(this.diseases)}</span></li>`);
    this.inoculations &&
      (list += `<li class="overlay__li"><span class="overlay__parameter-item"><span class='text-bold'>Parasites: </span>${this.flatArray(this.parasites)}</span></li>`);

    contentModal.innerHTML = contentModal.innerHTML + list;

    divElement.innerHTML = template;
    divElement.append(contentModal);

    return divElement;
  }

  flatArray(array) {
    if (array.length === 1) {
      return array[0];
    } else {
      return array.join(', ');
    }
  }
}
