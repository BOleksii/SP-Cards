import {
  VisitDentist,
  VisitTherapist,
  VisitCardiologist,
} from '../classes/modal-create.js';

export const selectDoctorListener = (target, currentModal) => {
  currentModal.deleteModal();
  switch (target) {
    case 'Dentist':
      new VisitDentist().render();
      break;

      case 'Therapist':
      new VisitTherapist().render();
      break;

      default:
      new VisitCardiologist().render();
  }
};
