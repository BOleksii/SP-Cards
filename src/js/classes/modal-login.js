import * as client from "../../api/client.js";
import { userLogin } from "../../api/tokenRequest.js";

class ModalLogin {
  constructor() {
    this.body = document.querySelector('body');
    this.modalBackground = document.createElement('div');
    this.container = document.createElement('div');
    this.form = document.createElement('form');
    this.labelEmail = document.createElement('label');
    this.labelPassword = document.createElement('label');
    this.inputEmail = document.createElement('input');
    this.inputPassword = document.createElement('input');
    this.submitBtn = document.createElement('button');
    this.errorMessage = document.createElement('p');
  }

  createElement() {
    this.modalBackground.classList.add('login-modal__background');

    this.container.classList.add('login-modal');

    this.form.classList.add('login-modal__form');

    this.labelEmail.classList.add('login-modal__label');
    this.labelEmail.innerText = 'Email';

    this.labelPassword.classList.add('login-modal__label');
    this.labelPassword.innerText = 'Password';

    this.inputEmail.classList.add('login-modal__input--email');
    this.inputPassword.classList.add('login-modal__input--password');
    this.inputEmail.addEventListener('input', () => {
      document.querySelector('.login__modal--login-error').style.display = 'none';
    });
    this.inputPassword.addEventListener('input', () => {
      document.querySelector('.login__modal--login-error').style.display = 'none';
    });

    this.submitBtn.innerText = 'SUBMIT';
    this.submitBtn.classList.add('btn', 'btn-success', 'login-modal--btn');

    this.errorMessage.style.display = 'none';
    this.errorMessage.innerText = 'Incorrect email and/or password';
    this.errorMessage.classList.add('login__modal--login-error');

    this.form.append(
      this.labelEmail,
      this.inputEmail,
      this.labelPassword,
      this.inputPassword,
      this.errorMessage,
      this.submitBtn,
    );

    this.container.append(this.form);

    this.submitBtn.addEventListener('click', (e) => {
      e.preventDefault();

        userLogin(this.inputEmail.value, this.inputPassword.value);
    });

    this.modalBackground.append(this.container);

    this.modalBackground.addEventListener('click', (e) => {
      if (e.target === this.modalBackground) {
        this.modalBackground.remove();
      }
    });
  }

  render() {
    this.createElement();
    this.body.append(this.modalBackground);
  }
}

export default ModalLogin;
