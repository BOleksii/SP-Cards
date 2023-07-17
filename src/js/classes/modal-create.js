import { checkFieldAndPost } from '../functions/checkFieldsAndPost.js';
import { selectDoctorListener } from '../functions/selectDoctorListener.js';

export class ModalCreate {
  constructor() {
    this.body = document.querySelector('body');
    this.modalBackground = document.createElement('div');
    this.container = document.createElement('div');
    this.divButton = document.createElement('div');
    this.closeButton = document.createElement('button');
    this.submitButton = document.createElement('button');
    this.papagraph = document.createElement('p');
    this.select = document.createElement('select');
    this.optionDefault = document.createElement('option');
    this.optionDentist = document.createElement('option');
    this.optionTherapist = document.createElement('option');
    this.optionCardiologist = document.createElement('option');
    this.wrapper = document.createElement('div');
    this.chooseDoctorParagraph = document.createElement('p');
  }

  deleteModal() {
    this.modalBackground.remove();
  }

  createElement() {
    this.chooseDoctorParagraph.innerText =
      "Select the doctor you'd like to visit:";
    this.chooseDoctorParagraph.classList.add('choose-doctor');
    this.optionDefault.innerText = 'Choose a doctor';
    this.select.id = 'select-doctor';
    this.select.classList.add('form-select');

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

    this.select.addEventListener('change', (e) => {
      selectDoctorListener(e.target.value, this);
    });

    this.modalBackground.classList.add('visit__modal-background');
    this.container.classList.add('visit__modal');
    this.modalBackground.append(this.container);

    this.closeButton.innerText = 'CANCEL';
    this.closeButton.classList.add('btn', 'btn-outline-danger');

    this.submitButton.type = 'submit';
    this.submitButton.classList.add('btn', 'btn-success');
    this.submitButton.disabled = true;

    this.modalBackground.addEventListener('click', (e) => {
      if (e.target === this.modalBackground) {
        this.modalBackground.remove();
      }
    });

    this.closeButton.addEventListener('click', (e) => {
      this.container.innerHTML = '';
      this.container.classList.remove('visit__modal');
      this.modalBackground.classList.remove('visit__modal-background');
    });

    this.submitButton.addEventListener('click', () => {
      checkFieldAndPost();
    });

    this.submitButton.innerText = 'CREATE VISIT';
    this.wrapper.append(this.chooseDoctorParagraph, this.select);
    this.wrapper.insertAdjacentHTML(
      'beforeend',
      `
        <form class="visit__modal--form ">
          <div>
            <label
              for="input-name-dentist"
              class="form-label"
            >
              Name
            </label>
            <input
              type="email"
              class="form-control"
              id="input-name-dentist"
              placeholder="Enter your name here"
            >
          </div>
          <div>
            <label
              for="input-worries-dentist"
              class="form-label"
            >
              Purpose of visit
            </label>
            <input
              type="text"
              class="form-control"
              id="input-worries-dentist"
              placeholder="What worries you?"
            >
          </div>
          <div>
            <label
              for="input-description-dentist"
              class="form-label"
            >
              Description of the visit</label>
            <input
              type="text"
              class="form-control"
              id="input-description-dentist"
              placeholder="Briefly describe your complaints"
            >
          </div>
          <div>
            <label
              for="input-priority-dentist"
              class="form-label"
            >
              priority
            </label>
            <select
              id="input-priority-dentist"
              class="form-select"
            >
              <option selected>Choose...</option>
              <option>Low</option>
              <option>Normal</option>
              <option>High</option>
            </select>
          </div>
        </form>
      `
    );

    this.divButton.classList.add('div-button');
    this.divButton.append(this.submitButton);
    this.divButton.append(this.closeButton);
    this.container.append(this.wrapper);
    this.container.append(this.divButton);
  }

  render() {
    this.createElement();
    document.querySelector('body').append(this.modalBackground);
  }
}

export class VisitDentist extends ModalCreate {
  constructor() {
    super();
    this.dentistContainer = document.createElement('div');
  }

  deleteModal() {
    super.deleteModal();
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
            placeholder="01.01.2023"
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

export class VisitCardiologist extends ModalCreate {
  constructor() {
    super();
    this.cardiologistContainer = document.createElement('div');
  }

  deleteModal() {
    super.deleteModal();
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
              placeholder="120/80"
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
              placeholder="26,64 kg/m²"
            >
          </div>

          <div>
            <label
              for="input-diseases-cardiologist"
              class="form-label"
            >
              Describe your previous diseases (if applicable):
            </label>
            <input
              type="text"
              class="form-control"
              id="input-diseases-cardiologist"
            >
          </div>

          <div>
            <label
              for="input-age"
              class="form-label"
            >
              Your Age
            </label>
            <input
              type="text"
              class="form-control"
              id="input-age"
            >
          </div>

      `
    );

    this.wrapper.append(this.cardiologistContainer);
  }

  render() {
    super.render();
  }
}

export class VisitTherapist extends ModalCreate {
  constructor() {
    super();
  }

  deleteModal() {
    super.deleteModal();
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
