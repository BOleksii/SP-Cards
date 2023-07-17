
// api.js:

// getVisits(): Функція для отримання списку візитів з сервера.

// createVisit(visitData): Функція для створення нового візиту на сервері. Приймає об'єкт visitData з даними нового візиту.

// deleteVisit(visitId): Функція для видалення візиту за його унікальним id на сервері.

//------------------------------------------------------------------------------------------

function createVisit(newVisitData) {
    const url = "https://ajax.test-danit.com/api/v2/cards";

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newVisitData)
    })
        .then(response => response.json())
        .catch(error => {
            console.error('Помилка при створенні нового візиту:', error);
            return null; // Повернення значення null в разі помилки
        });
}                                                                                                                                                                                                                         function handleCreateVisit() {
    const doctorInput = document.getElementById("doctor").value;
    const purposeInput = document.getElementById("purpose").value;
    const descriptionInput = document.getElementById("description").value;
    const urgencyInput = document.getElementById("urgency").value;
    const patientNameInput = document.getElementById("patientName").value;

    // Створюємо об'єкт для створення візиту
    const visitData = {
        doctor: doctorInput,
        purpose: purposeInput,
        description: descriptionInput,
        urgency: urgencyInput,
        patientName: patientNameInput,
    };

    // Викликаємо функцію для створення візиту з використанням отриманого токену
    createVisit(visitData)
        .then((response) => {
            // Виводимо в консоль відповідь сервера (створений візит)
            console.log("Створений візит:", response);

            // Після створення візиту можна оновити список візитів на сторінці, викликавши функцію renderAllVisits()
            renderAllVisits();
        })
        .catch((error) => {
            console.error("Помилка створення візиту:", error);
        });

    // Закрити модальне вікно після успішного створення візиту
    closeModal();
}

// Функція для видалення візиту за ідентифікатором
function deleteVisit(visitId) {
    const url = `https://ajax.test-danit.com/api/v2/cards/${visitId}`;
    return fetch(url, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .catch(error => {
            console.error('Помилка при видаленні візиту:', error);
            return null; // Повернення значення null в разі помилки
        });
}

function handleDeleteVisit(visitId) {
    // Викликаємо функцію для видалення візиту з використанням отриманого токену та ідентифікатора візиту
    deleteVisit(visitId)
        .then(() => {
            // Візит успішно видалений, оновлюємо список візитів на сторінці
            renderAllVisits();
        })
        .catch((error) => {
            console.error("Помилка видалення візиту:", error);
        });
}
















// -----------------------------------------------------------------------------------------




// api.js

// Функція для отримання списку візитів
// export function getVisits() {
//     const url = "https://example.com/api/visits"; // Замініть URL на реальний ендпоінт для отримання візитів
//     return fetch(url)
//         .then(response => response.json())
//         .catch(error => {
//             console.error('Помилка при отриманні списку візитів:', error);
//             return []; // Повернення порожнього масиву в разі помилки
//         });
// }
//
// Функція для створення нового візиту
// function createVisit(newVisitData) {
//     const url = "https://example.com/api/visits"; // Замініть URL на реальний ендпоінт для створення візиту
//     return fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newVisitData)
//     })
//         .then(response => response.json())
//         .catch(error => {
//             console.error('Помилка при створенні нового візиту:', error);
//             return null; // Повернення значення null в разі помилки
//         });
// }
//
// // Функція для видалення візиту за ідентифікатором
// export function deleteVisit(visitId) {
//     const url = `https://example.com/api/visits/${visitId}`; // Замініть URL на реальний ендпоінт для видалення візиту
//     return fetch(url, {
//         method: 'DELETE'
//     })
//         .then(response => response.json())
//         .catch(error => {
//             console.error('Помилка при видаленні візиту:', error);
//             return null; // Повернення значення null в разі помилки
//         });
// }

// Інші необхідні функції можна додати аналогічним чином
//
// const loginButton = document.getElementById("loginButton");
// const createVisitButton = document.getElementById("createVisitButton");
//
// loginButton.addEventListener("click", function() {
//     showLoginModal();
// });
//
// function showLoginModal() {
//     const modal = document.getElementById("loginModal");
//     modal.style.display = "block";
// }
//
// // Додати обробник подій до кнопки "Закрити" у модальному вікні
// const closeButton = document.querySelector("#loginModal .btn-close");
// closeButton.addEventListener("click", function() {
//     closeModal();
// });
//
// // Додати обробник подій до кнопки "Увійти"
// const loginButtonModal = document.querySelector("#loginModal #login-submit");
// loginButtonModal.addEventListener("click", function () {
//     const nameInput = document.getElementById("name").value;
//     const passwordInput = document.getElementById("password").value;
//     checkCredentials(nameInput, passwordInput).then(isLoggedIn => {
//         if (isLoggedIn) {
//             createVisitButton.style.display = "block"; // Показати кнопку "Створити візит"
//             closeModal(); // Закрити модальне вікно після успішного входу
//         }
//     });
// });
//
// // Функція для збереження токену в локальному сховищі
// function saveTokenToLocal(token) {
//     localStorage.setItem("token", token);
// }
//
// function checkCredentials(email, password) {
//     // Виклик серверного ендпоінта для перевірки автентифікації
//     return fetch("https://ajax.test-danit.com/api/v2/cards/login", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email: email, password: password })
//     })
//         .then(response => response.text())
//         .then(token => {
//             console.log("Отриманий токен:", token);
//             saveTokenToLocal(token); // Зберегти токен у локальному сховищі
//             return true; // Повернути true, що автентифікація пройшла успішно
//         })
//         .catch(error => {
//             console.error('Authentication error:', error);
//             return false; // Повернути false, якщо автентифікація не вдалась
//         });
// }
//
// function closeModal() {
//     const modal = document.getElementById("loginModal");
//     modal.style.display = "none";
// }
//
// // Виклик функції для перевірки, чи користувач увійшов
// isLoggedIn().then(isLoggedIn => {
//     if (isLoggedIn) {
//         console.log("Користувач увійшов.");
//         createVisitButton.style.display = "block"; // Показати кнопку "Створити візит"
//     } else {
//         console.log("Користувач не увійшов.");
//     }
// });

