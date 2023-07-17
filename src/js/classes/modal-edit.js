import { put } from '../../api/client.js';
import { checkFields } from '../functions/checkRequiredFields.js';
import { createNewVisitCard } from '../functions/renderNewVisitCard.js';
import { loadAndRenderVisitCards, visitsArray } from '../index.js';

export class ModalEdit {
  constructor({
    id,
    name,
    doctor,
    purpose,
    description,
    priority,
    status,
    lastVisit,
    age,
    pressure,
    massIndex,
    diseases,
  }) {
    this.id = id;
    this.name = name;
    this.doctor = doctor;
    this.purpose = purpose;
    this.description = description;
    this.priority = priority;
    this.status = status;
    this.lastVisit = lastVisit;
    this.age = age;
    this.pressure = pressure;
    this.massIndex = massIndex;
    this.diseases = diseases;

    this.modalBackground = document.createElement('div');
    this.container = document.createElement('div');
    this.divButton = document.createElement('div');
    this.closeButton = document.createElement('div');
    this.submitButton = document.createElement('div');
    this.paragraph = document.createElement('p');
    this.select = document.createElement('select');
    this.optionDefault = document.createElement('option');
    this.optionDentist = document.createElement('option');
    this.optionTherapist = document.createElement('option');
    this.optionCardiologist = document.createElement('option');
    this.wrapper = document.createElement('div');
    this.chooseDoctorParagraph = document.createElement('p');
    this.optionDoctorSelect = document.createElement('option');
    this.optionSelectLow = document.createElement('Low');
    this.optionSelectNormal = document.createElement('Normal');
    this.optionSelectHigh = document.createElement('High');

    this.options = this.checkForDoubleSelect(
      this.priority,
      'Low',
      'Normal',
      'High'
    );

    this.optionsStatus = this.checkForPrioritySelect(
      this.status,
      'Open',
      'Done'
    );
  }

  deleteModal() {
    this.modalBackground.remove();
  }

  checkForDoubleSelect(currentSelector, ...args) {
    return [...args].filter((el) => el !== currentSelector);
  }

  checkForPrioritySelect(currentStatus, ...args) {
    return [...args].filter((el) => el !== currentStatus);
  }

  createElement() {
    this.optionDoctorSelect.id = 'input-priority-dentist';
    this.optionDoctorSelect.classList.add('form-select');

    this.chooseDoctorParagraph.innerText =
      "Select the doctor you'd like to visit";
    this.chooseDoctorParagraph.classList.add('choose-doctor');

    this.optionDefault.innerText = 'Choose a doctor';
    this.optionDefault.setAttribute('selected', 'selected');

    this.select.id = 'select-doctor';
    this.select.classList.add('form-select');
    this.select.disabled = true;

    this.optionDentist.innerText = 'Dentist';
    this.optionTherapist.innerText = 'Therapist';
    this.optionCardiologist.innerText = 'Cardiologist';

    this.optionDentist.value = 'Dentist';
    this.optionTherapist.value = 'Therapist';
    this.optionCardiologist.value = 'Cardiologist';

    this.select.append(
      this.optionDefault,
      this.optionDentist,
      this.optionTherapist,
      this.optionCardiologist
    );

    this.modalBackground.classList.add('visit__modal-background');
    this.modalBackground.append(this.container);
    this.container.classList.add('visit__modal');

    this.closeButton.classList.add('btn', 'btn-outline-danger');
    this.closeButton.innerText = 'CANCEL';

    this.closeButton.addEventListener('click', (e) => {
      this.container.innerHTML = '';
      this.container.classList.remove('visit__modal');
      this.modalBackground.classList.remove('visit__modal-background');
    });

    this.submitButton.type = 'submit';
    this.submitButton.classList.add('btn', 'btn-success');
    this.submitButton.disabled = true;

    this.submitButton.addEventListener('click', (e) => {
      const name = document.querySelector('#input-name-dentist')?.value;
      const doctor = document.querySelector('#select-doctor')?.value;
      const purpose = document.querySelector('#input-worries-dentist').value;
      const description = document.querySelector(
        '#input-description-dentist'
      ).value;
      const priority = document.querySelector('#input-priority-dentist')?.value;
      const lastVisit = document.querySelector(
        '#input-last-visit-dentist'
      )?.value;
      const age = document.querySelector('#input-age')?.value;
      const pressure = document.querySelector(
        '#input-pressure-cardiologist'
      )?.value;
      const massIndex = document.querySelector(
        '#input-index-cardiologist'
      )?.value;
      const diseases = document.querySelector(
        '#input-diseases-cardiologist'
      )?.value;
      const status = document.querySelector('#visit-status')?.value;

      const checkRequiredFields = checkFields({
        name,
        doctor,
        purpose,
        description,
        priority,
        lastVisit,
        age,
        pressure,
        massIndex,
        diseases,
        status,
      });

      if (checkRequiredFields) {
        put({
          id: this.id,
          name,
          doctor,
          purpose,
          description,
          priority,
          lastVisit,
          age,
          pressure,
          massIndex,
          diseases,
          status,
        })
          .then((res) => res.json())
          .then(() => {
            this.deleteModal();
            loadAndRenderVisitCards();
          });
      } else {
        document.querySelector('.requiredFields__error')?.remove();

        const errorContainer =
          document.querySelector('.visit__modal').firstChild;
        errorContainer.insertAdjacentHTML(
          'beforeend',
          `
            <div class="requiredFields__error">Complete all fields before submitting</div>
          `
        );
      }
    });

    this.submitButton.innerText = 'SUBMIT';
    this.wrapper.append(this.chooseDoctorParagraph, this.select);
    this.wrapper.insertAdjacentHTML(
      'beforeend',
      `
        <form class="">
          <div class="">
            <label for="input-name-dentist" class="form-label">Name</label>
            <input type="email" class="form-control" id="input-name-dentist" value="${
              this.name
            }">
          </div>
          <div class="">
            <label for="input-worries-dentist" class="form-label">
              Purpose of visit
            </label>
            <input
              type="text"
              class="form-control"
              id="input-worries-dentist"
              value="${this.purpose}"
            >
          </div>
          <div class="">
            <label for="input-description-dentist" class="form-label">Description of visit</label>
            <input type="text" class="form-control" id="input-description-dentist" value="${
              this.description
            }">
          </div>
          <div class="">
            <label for="input-priority-dentist" class="form-label">priority</label>
            <select id="input-priority-dentist" class="form-select">
              <option selected>${this.priority}</option>
              ${this.options
                .map((option) => `<option>${option}</option>`)
                .join('')}
            </select>
          </div>
          <div class="">
            <label class="">Status</label>
            <select id="visit-status" class="form-select">
              <option selected>${this.status}</option>
              <option>${this.optionsStatus}</option>
            </select>
          </div>
        </form>
      `
    );

    this.modalBackground.addEventListener('click', (e) => {
      if (e.target === this.modalBackground) {
        this.modalBackground.remove();
      }
    });

    this.divButton.classList.add('div-button');

    this.divButton.append(this.submitButton, this.closeButton, this.wrapper);

    this.container.append(this.wrapper, this.divButton);
  }

  render() {
    this.createElement();
    document.querySelector('body').append(this.modalBackground);
  }
}

export class CardiologistEdit extends ModalEdit {
  constructor({
    id,
    name,
    doctor,
    purpose,
    description,
    priority,
    status,
    pressure,
    massIndex,
    diseases,
    age,
  }) {
    super({
      id,
      name,
      doctor,
      purpose,
      description,
      priority,
      status,
      pressure,
      massIndex,
      diseases,
      age,
    });

    this.cardiologistContainer = document.createElement('div');
  }

  createElement() {
    super.createElement();

    this.submitButton.removeAttribute('disabled');
    this.optionCardiologist.setAttribute('selected', 'selected');
    this.cardiologistContainer.classList.add('cardiologist-container');

    this.cardiologistContainer.insertAdjacentHTML(
      'afterbegin',
      `
          <div>
            <div>
              <label
                for="input-pressure-cardiologist"
                class="form-label"
              >
                Normal pressure
              </label>
              <input
                type="text"
                class="form-control"
                id="input-pressure-cardiologist"
                value="${this.pressure}"
              >
            </div>
            <div>
              <label
                for="input-index-cardiologist"
                class="form-label"
              >
                Body mass index
              </label>
              <input
                type="text"
                class="form-control"
                id="input-index-cardiologist"
                value="${this.massIndex}"
              >
            </div>
            <div>
              <label
                for="input-diseases-cardiologist"
                class="form-label"
              >
                Previous diseases of the cardiovascular system:
              </label>
              <input
                type="text"
                class="form-control"
                id="input-diseases-cardiologist"
                value="${this.diseases}"
              >
            </div>
            <div>
              <label
                for="input-age"
                class="form-label"
              >
                Your age:
              </label>
              <input
                type="text"
                class="form-control"
                id="input-age"
                value="${this.age}"
              >
            </div>
          </div>
        `
    );

    this.wrapper.append(this.cardiologistContainer);
  }

  render() {
    super.render();
  }
}

export class TherapistEdit extends ModalEdit {
  constructor({
    name,
    doctor,
    purpose,
    description,
    priority,
    status,
    age,
    id,
  }) {
    super({
      name,
      doctor,
      purpose,
      description,
      priority,
      status,
      age,
      id,
    });
  }

  createElement() {
    super.createElement();

    this.submitButton.removeAttribute('disabled');
    this.therapistContainer = document.createElement('div');
    this.optionTherapist.setAttribute('selected', 'selected');
    this.therapistContainer.classList.add('therapist-container');
    this.therapistContainer.insertAdjacentHTML(
      'afterbegin',
      `
        <div>
          <label
            for="input-age"
            class="form-label"
          >
            Your age:
          </label>
          <input
            type="text"
            class="form-control"
            id="input-age"
            value="${this.age}"
          >
        </div>
      `
    );

    this.wrapper.append(this.therapistContainer);
  }

  render() {
    super.render();
  }
}

export class DentistEdit extends ModalEdit {
  constructor({
    name,
    doctor,
    purpose,
    description,
    priority,
    status,
    lastVisit,
    id,
  }) {
    super({
      name,
      doctor,
      purpose,
      description,
      priority,
      status,
      lastVisit,
      id,
    });

    this.dentistContainer = document.createElement('div');
  }

  createElement() {
    super.createElement();
    this.submitButton.removeAttribute('disabled');
    this.optionDentist.setAttribute('selected', 'selected');
    this.dentistContainer.classList.add('dentist-container');

    this.dentistContainer.insertAdjacentHTML(
      'beforeend',
      `
      <div id="dentist">
        <label
          for="input-last-visit-dentist"
          class="form-label"
        >
          Date of last visit to doctor:
        </label>
        <input
          type="text"
          class="form-control"
          id="input-last-visit-dentist"
          value="${this.lastVisit}"
        >
      </div>
    `
    );

    this.wrapper.append(this.dentistContainer);
  }

  render() {
    super.render();
  }
}

export default ModalEdit;
