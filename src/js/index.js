import ModalLogin from "./classes/modal-login.js";
import { ModalCreate } from "./classes/modal-create.js";
import { getAllVisits } from "../api/client.js";
import { renderNewVisitCard } from "./functions/renderNewVisitCard.js";
import { renderSearchFilters } from "./functions/renderFilters.js";

const loginBtn = document.querySelector('.header__btn--login');
const visitBtn = document.querySelector('.header__btn--visit');

export let visitsArray = [];

export const loadAndRenderVisitCards = async () => {
  document.querySelector('.card__container')
  .innerHTML = '';
  visitsArray = [];

  document.querySelector('.card__container')
    .innerHTML = '<h2 class="empty-card">Loading, please wait</h2>';

  visitsArray = await getAllVisits();

  if (!visitsArray.length) {
    document.querySelector(
      '.card__container'
    ).innerHTML = '<h2 class="empty-card">No items have been added</h2>';
  } else {
    document.querySelector('.card__container')
    .innerHTML = '';
    visitsArray.forEach(visit => {
      renderNewVisitCard(visit);
    });
  }
}

document.addEventListener('DOMContentLoaded', async (e) => {
  e.preventDefault();

  renderSearchFilters();
  if (localStorage.authorization) {
    loginBtn.style.display = 'none';
    visitBtn.style.display = 'block';

    await loadAndRenderVisitCards();

  } else {
    loginBtn.style.display = 'block';
    visitBtn.style.display = 'none';

    document.querySelector(
      '.card__container'
    ).innerHTML = '<h2 class="empty-card">Log in to view existing visits</h2>';
  }



});

loginBtn.addEventListener('click', () => {
  new ModalLogin().render();
});

visitBtn.addEventListener('click', () => {
  new ModalCreate().render();
});
