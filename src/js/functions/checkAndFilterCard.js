import {
  VisitCardDentist,
  VisitCardTherapist,
  VisitCardCardiologist,
} from '../classes/visit-cards.js';

export const checkAndFilterCard = ({
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
  let newElement;

  switch (doctor) {
    case 'Dentist':
      newElement = new VisitCardDentist({
        name,
        doctor,
        description,
        priority,
        purpose,
        status,
        id,
        lastVisit,
      });
      break;

    case 'Therapist':
      newElement = new VisitCardTherapist({
        id,
        name,
        doctor,
        description,
        priority,
        purpose,
        status,
        age,
      });
      break;

    default:
      newElement = new VisitCardCardiologist({
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
      });
    }

    newElement.render();
};
