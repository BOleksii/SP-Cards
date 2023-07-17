import { visitsArray } from '../index.js';
import {
  VisitCardCardiologist,
  VisitCardDentist,
  VisitCardTherapist,
} from '../classes/visit-cards.js';

export const createNewVisitCard = (cardData) => {
  switch (cardData.doctor) {
    case 'Dentist':
      return new VisitCardDentist(cardData);

    case 'Therapist':
      return new VisitCardTherapist(cardData);

    default:
      return new VisitCardCardiologist(cardData);
  }
};

export const renderNewVisitCard = ({
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
  lastVisit,
}) => {
  const newCardData = {
    id,
    name,
    doctor,
    description,
    priority,
    purpose,
    status,
  };

  switch (doctor) {
    case 'Dentist':
      newCardData.lastVisit = lastVisit;
      break;

    case 'Therapist':
      newCardData.age = age;
      break;

    default:
      newCardData.age = age;
      newCardData.pressure = pressure;
      newCardData.massIndex = massIndex;
      newCardData.diseases = diseases;
  }

  const newCard = createNewVisitCard(newCardData);
  newCard.render();
};
