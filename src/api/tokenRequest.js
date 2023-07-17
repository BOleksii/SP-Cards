import { loadAndRenderVisitCards } from "../js/index.js";
import * as client from "./client.js"

export const userLogin = async (email, password) => {
  const errorMessage = document.querySelector('.login__modal--login-error');

  fetch(`${client.BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  .then(res => {
    console.log(res);
    if (!res.ok) {
      throw new Error("Wrong username and/or password");
    }

    return res.text();
  })
    .then(token => {
      localStorage.setItem('authorization', `Bearer ${token}`);
      document.querySelector('.login-modal__background').remove();

      document.querySelector('.header__btn--login').style.display = 'none';
      document.querySelector('.header__btn--visit').style.display = 'block';
  })
  .then(() => {
    loadAndRenderVisitCards();
  })
  .catch(error => {
    errorMessage.style.display = 'block';
    errorMessage.innerHTML = error;
  });
};
