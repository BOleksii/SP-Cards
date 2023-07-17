import { renderNewVisitCard } from '../js/functions/renderNewVisitCard.js';
import { visitsArray } from '../js/index.js';

export const BASE_URL = 'https://ajax.test-danit.com/api/v2/cards';
const options = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('authorization'),
  },
  body: {},
};

export const getAllVisits = () => {
  const Authorization = localStorage.getItem('authorization');
  options.headers.Authorization = Authorization;

  const data = fetch(BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('authorization'),
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return data;
};

export const put = async ({
  id,
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
}) => {
  options.body.name = name;
  options.body.purpose = purpose;
  options.body.description = description;
  options.body.priority = priority;
  options.body.status = status;

  switch (doctor) {
    case 'Dentist':
      options.body.doctor = 'Dentist';
      options.body.lastVisit = lastVisit;
      break;

    case 'Therapist':
      options.body.doctor = 'Therapist';
      options.body.age = age;
      break;

    default:
      options.body.doctor = 'Cardiologist';
      options.body.age = age;
      options.body.pressure = pressure;
      options.body.massIndex = massIndex;
      options.body.diseases = diseases;
  }

  return fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: options.headers,
    body: JSON.stringify(options.body),
  });
};

export const create = async ({
  doctor,
  name,
  purpose,
  description,
  priority,
  lastVisit,
  age,
  pressure,
  massIndex,
  diseases,
}) => {
  options.body.doctor = doctor;
  options.body.name = name;
  options.body.purpose = purpose;
  options.body.description = description;
  options.body.priority = priority;
  options.body.status = 'Open';

  switch (doctor) {
    case 'Dentist':
      options.body.lastVisit = lastVisit;
      break;

    case 'Therapist':
      options.body.age = age;
      break;

    default:
      options.body.age = age;
      options.body.pressure = pressure;
      options.body.massIndex = massIndex;
      options.body.diseases = diseases;
  }

  const cardData = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('authorization'),
    },
    body: JSON.stringify(options.body),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status} - ${res.statusText}`);
    }

    document.querySelector('.empty-card')?.remove();
    return res.json();
  });

  document.querySelector('.visit__modal-background').remove();

  renderNewVisitCard(cardData);
  visitsArray.push(cardData);
};

export const remove = (cardId) => {
  return fetch(`${BASE_URL}/${cardId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('authorization'),
    },
  });
};
