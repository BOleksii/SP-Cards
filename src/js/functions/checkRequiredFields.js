export const checkFields = ({
  name,
  doctor,
  purpose,
  description,
  lastVisit,
  age,
  pressure,
  massIndex,
  diseases,
}) => {
  const commonRequiredFields = Boolean(name && description && purpose);

  if (!commonRequiredFields) {
    return false;
  }

  switch (doctor) {
    case 'Dentist':
      return Boolean(commonRequiredFields && lastVisit);

    case 'Therapist':
      return Boolean(commonRequiredFields && age);

    default:
      return Boolean(
        commonRequiredFields &&
        pressure &&
        massIndex &&
        diseases
      );
  }
};
