import { remove } from '../../api/client.js';
import { loadAndRenderVisitCards, visitsArray } from '../index.js';
import { CardiologistEdit, DentistEdit, TherapistEdit } from './modal-edit.js';

class VisitCard {
  constructor({ id, name, doctor, description, priority, purpose, status }) {
    this.id = id;
    this.name = name;
    this.doctor = doctor;
    this.description = description;
    this.priority = priority;
    this.purpose = purpose;
    this.status = status;

    this.display = 'none';

    this.cardWrapper = document.createElement('div');
    this.cardWrapper.classList.add('card__unit', 'col-3');
    this.moreInfo = document.createElement('div');
  }

  createElement() {
    this.cardWrapper.classList.add(`card-id__${this.id}`);

    this.moreInfo.style.display = 'none';

    this.showMoreBtn = document.createElement('button');
    this.showMoreBtn.classList.add('btn', 'btn-dark', 'btn-show-more');
    this.showMoreBtn.innerText = 'Show more';

    this.deleteBtn = document.createElement('button');
    this.deleteBtn.classList.add('btn', 'btn-danger', 'btn-delete-card');
    this.deleteBtn.innerText = 'X';

    this.editBtn = document.createElement('button');
    this.editBtn.classList.add('btn', 'btn-dark', 'btn-edit-card');
    this.editBtn.innerText = 'Edit';

    this.editBtn.addEventListener('click', () => {
      switch (this.doctor) {
        case 'Dentist':
          new DentistEdit(this).render();
          break;

        case 'Therapist':
          new TherapistEdit(this).render();
          break;

        default:
          new CardiologistEdit(this).render();
      }
    });

    this.showMoreBtn.addEventListener('click', () => {
      if (this.display === 'none') {
        this.moreInfo.style.display = 'block';
        this.showMoreBtn.innerText = 'Show less';
        this.cardWrapper.classList.add('open');
        this.display = 'block';

        visitsArray.find((el) => {
          if (el.id === this.id) {
            el.display = 'block';
            this.showMoreBtn.innerText = 'Show less';
          }
        });
      } else {
        this.moreInfo.style.display = 'none';
        this.showMoreBtn.innerText = 'Show more';
        this.cardWrapper.classList.remove('open');
        this.display = 'none';

        visitsArray.find((el) => {
          if (el.id === this.id) {
            el.display = 'none';
            this.showMoreBtn.innerText = 'Show more';
          }
        });
      }
    });

    this.cardWrapper.insertAdjacentHTML(
      'beforeend',
      `
        <h2><span>NAME</span>: ${this.name}</h2>
        <h3><span>DOCTOR</span>: ${this.doctor}</h3>
      `
    );

    this.moreInfo.insertAdjacentHTML(
      'afterbegin',
      `
        <p><span>PRIORITY</span>: ${this.priority}</p>
      <p><span>STATUS</span>: ${this.status}</p>
        <p><span>DESCRIPTION</span>: ${this.description}</p>
        <p><span>VISIT PURPOSE</span>:${this.purpose}</p>
      `
    );

    this.deleteBtn.addEventListener('click', async (e) => {
      e.preventDefault();

      const currentCard = e.target.closest('.card__unit');

      const indexOfCardInVisitsArray = visitsArray.findIndex(
        (visit) => visit.id === this.id
      );

      visitsArray.splice(indexOfCardInVisitsArray, 1);

      if (visitsArray.length === 0) {
        document.querySelector('.card__container').innerHTML =
          '<h2 class="empty-card">No visits yet</h2>';
      }

      remove(this.id)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`${res.status} - ${res.statusText}`);
          }

          currentCard.remove();
        })
        .catch(console.log);
    });

    this.cardWrapper.append(
      this.moreInfo,
      this.showMoreBtn,
      this.editBtn,
      this.deleteBtn
    );
  }

  render(selector = document.querySelector('.card__container')) {
    this.createElement();
    selector.append(this.cardWrapper);
    return this;
  }
}

export class VisitCardCardiologist extends VisitCard {
  constructor({
    id,
    name,
    doctor,
    description,
    priority,
    purpose,
    status,
    age,
    pressure,
    massIndex,
    diseases,
  }) {
    super({ name, doctor, description, priority, purpose, status, id });
    this.age = age;
    this.pressure = pressure;
    this.massIndex = massIndex;
    this.diseases = diseases;
  }

  createElement() {
    super.createElement();

    this.moreInfo.insertAdjacentHTML(
      'afterbegin',
      `
        <p>AGE: ${this.age}</p>
        <p>PRESSURE: ${this.pressure}</p>
        <p>MASS INDEX: ${this.massIndex}</p>
        <p>DISEASES: ${this.diseases}</p>
      `
    );
  }

  render() {
    super.render();
  }
}

export class VisitCardDentist extends VisitCard {
  constructor({
    id,
    name,
    doctor,
    description,
    priority,
    purpose,
    status,
    lastVisit,
  }) {
    super({ name, doctor, description, priority, purpose, status, id });
    this.lastVisit = lastVisit;
  }

  createElement() {
    super.createElement();
    this.moreInfo.insertAdjacentHTML(
      'afterbegin',
      `
        <p>LAST VISIT DATE: ${this.lastVisit}</p>
      `
    );
  }

  render() {
    super.render();
  }
}

export class VisitCardTherapist extends VisitCard {
  constructor({
    id,
    name,
    doctor,
    description,
    priority,
    purpose,
    status,
    age,
  }) {
    super({ id, name, doctor, description, priority, purpose, status });
    this.age = age;
  }

  createElement() {
    super.createElement();
    this.moreInfo.insertAdjacentHTML(
      'afterbegin',
      `
        <p>AGE: ${this.age}</p>
      `
    );
  }

  render() {
    super.render();
  }
}
