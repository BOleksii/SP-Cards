
// main.js:

// Імпортує потрібні модулі: api.js, auth.js, visit.js.

// Встановлює обробник подій для кнопки "Вхід", який викликає showLoginModal() з auth.js.

// Встановлює обробник подій для кнопки "Створити візит", який викликає handleCreateVisit() з visit.js.

// Запускає функцію isLoggedIn() з auth.js для перевірки статусу входу.

// Якщо користувач автентифікований (тобто токен є в локальному сховищі),
// викликає getVisits() з api.js та передає результат у displayVisits()
// з visit.js для відображення списку візитів на сторінці.




//
// import { showLoginModal } from './auth.js';
//
// // Додати обробник подій для кнопки "Вхід"
// const loginButton = document.getElementById("loginButton");
// loginButton.addEventListener("click", function() {
//     showLoginModal();
// });




 // import { showLoginModal, checkCredentials, isLoggedIn } from './auth';



// showLoginModal(); // Виклик функції showLoginModal з модуля auth.js

// ==============================================================

// Ваш файл, де використовуєте функції з api.js
// import { getVisits, createVisit, deleteVisit } from './api.js';

// Приклад виклику функції для отримання списку візитів
// getVisits()
//     .then(visits => {
//         // Обробка отриманого списку візитів
//         console.log(visits);
//     })
//     .catch(error => {
//         // Обробка помилки
//         console.error('Помилка:', error);
//     });



// ==========================================================
// //Функція для створення картки
// function createCard(title, description, doctor, bp, age, weight) {
//     const token = localStorage.getItem("token"); // Отримати токен з локального сховища
//     if (!token) {
//         console.error("Токен не знайдено. Будь ласка, зареєструйтесь або увійдіть.");
//         return;
//     }
//
//     fetch("https://ajax.test-danit.com/api/v2/cards", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//             title: title,
//             description: description,
//             doctor: doctor,
//             bp: bp,
//             age: age,
//             weight: weight
//         })
//     })
//         .then(response => response.json())
//         .then(response => {
//             console.log("Створена картка:", response);
//             // Додаткові дії з отриманим об'єктом картки, якщо потрібно
//         })
//         .catch(error => console.error('Create card error:', error));
// }
//
// // Приклад виклику функції для отримання токену після реєстрації або логіну
// getTokenFromServer('bernatskyioleksii@gmail.com', 'bernatskyioleksii');
//
// // Приклад виклику функції для створення картки
// createCard('Візит до кардіолога', 'Плановий візит', 'Cardiologist', '24', 23, 70);


