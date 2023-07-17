import { checkFields } from './checkRequiredFields.js';
import { create } from '../../api/client.js';

export const checkFieldAndPost = () => {
  const searchDoctor = document.querySelector('#select-doctor')?.value;
  const searchDoctorText = document.querySelector('#select-doctor');
  const doctor = searchDoctorText.querySelector('[selected]')?.textContent;
  const name = document.querySelector('.form-control')?.value;
  const purpose = document.querySelector('#input-worries-dentist')?.value;
  const description = document.querySelector(
    '#input-description-dentist'
  )?.value;
  const priority = document.querySelector('#input-priority-dentist')?.value;
  const lastVisit = document.querySelector('#input-last-visit-dentist')?.value;
  const age = document.querySelector('#input-age')?.value;
  const pressure = document.querySelector(
    '#input-pressure-cardiologist'
  )?.value;
  const massIndex = document.querySelector('#input-index-cardiologist')?.value;
  const diseases = document.querySelector(
    '#input-diseases-cardiologist'
  )?.value;
  const status = 'Open';

  const checkInputs = checkFields({
    doctor,
    name,
    purpose,
    description,
    lastVisit,
    age,
    pressure,
    massIndex,
    diseases,
  });

  if (checkInputs) {
    create({
      doctor,
      searchDoctor,
      name,
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
  } else {
    document.querySelector('.requiredFields__error')?.remove();

    const errorContainer = document.querySelector('.visit__modal').firstChild;

    errorContainer.insertAdjacentHTML(
      'beforeend',
      `
        <p class="requiredFields__error">
          Complete all fields before submitting
        </p>
      `
    );
  }
};
