import { renderFilteredCards } from "./renderFilteredCards.js";

const container = document.querySelector('.card__container');

export const filterCards = async(
  dataArr,
  filterByValue,
  priorityValue,
  statusValue,
) => {
  const searchQuery = filterByValue.toLowerCase();
  const filteredByQuery = dataArr.filter(({ name, description, doctor }) => {
    return name?.toLowerCase().includes(searchQuery)
    || description?.toLowerCase().includes(searchQuery)
    || doctor?.toLowerCase().includes(searchQuery);
  });

  const filteredByPriority = filteredByQuery.filter(({ priority }) => {
    if (priorityValue === 'All') {
      return true;
    }

    return priority === priorityValue;
  });

  const filteredByStatus = filteredByPriority.filter(({ status }) => {
    if (statusValue === 'All') {
      return true;
    }

    return statusValue === status;
  });

  if (filteredByStatus.length !== 0) {
    container.innerHTML = '';

    renderFilteredCards(filteredByStatus);

    return filteredByStatus;
  } else {
    console.log('no results');
    container.innerHTML = '<h2>No results found</h2>';
    return filteredByStatus;
  }
}
