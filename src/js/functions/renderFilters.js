import { filterCards } from './filterCards.js';
import { visitsArray } from '../index.js';

export const renderSearchFilters = () => {
  const logInBtn = document.querySelector('.header__btn--login');
  const visitBtn = document.querySelector('.header__btn--visit');
  logInBtn.style.display = 'none';
  visitBtn.style.display = 'block';

  const headersMain = document.querySelector('.header__filters-container');
  const filterContainer = document.createElement('div');
  filterContainer.classList.add('container', 'filter-container');

  const searchInput = document.createElement('input');
  searchInput.id = 'filter__search-input';

  const formStatus = document.createElement('form');

  const formPriority = document.createElement('form');

  formPriority.insertAdjacentHTML(
    'afterbegin',
    `
      <label for="filter__priority-select">Choose a visit priority</label>
      <select id="filter__priority-select">
        <option selected>All</option>
        <option>High</option>
        <option>Normal</option>
        <option>Low</option>
      </select>
    `
  );

  formStatus.insertAdjacentHTML(
    'afterbegin',
    `
      <label for="filter__status-select">Choose a status</label>
      <select id="filter__status-select">
        <option selected>All</option>
        <option>Open</option>
        <option>Done</option>
      </select>
    `
  );

  searchInput.addEventListener('input', (e) => {
    filterCards(
      visitsArray,
      e.target.value,
      e.target.nextSibling.children[1].value,
      e.target.nextSibling.nextSibling.children[1].value
    );
  });

  formPriority.addEventListener('change', (e) => {
    filterCards(
      visitsArray,
      e.target.parentNode.previousSibling.value,
      e.target.value,
      e.target.parentNode.nextSibling.children[1].value
    );
  });

  formStatus.addEventListener('change', (e) => {
    filterCards(
      visitsArray,
      e.target.closest('.filter-container').children[1].value,
      e.target.closest('.filter-container').children[2].children[1].value,
      e.target.value
    );
  });

  const header = document.createElement('label');
  header.htmlFor = 'filter__search-input';
  header.innerText = 'Find card:';
  filterContainer.prepend(header, searchInput, formPriority, formStatus);

  headersMain.after(filterContainer);
};
