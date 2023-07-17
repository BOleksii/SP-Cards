// const loginButton = document.getElementById('loginButton');
//
// loginButton.addEventListener('click', function() {
//     loginButton.style.backgroundColor = 'red';
// });



    //auth.js:

// showLoginModal(): Функція для відображення модального вікна з формою входу.

// checkCredentials(email, password): Функція для перевірки введених даних. Викликає API-запит для автентифікації,
// отримує токен та зберігає його у локальному сховищі.

// isLoggedIn(): Функція для перевірки статусу входу. Перевіряє наявність токену у локальному сховищі та його дійсність.

//-------------------------------------------------------------------------------------------------------------------------


const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", function() {
    showLoginModal();
});

function showLoginModal() {
    const modal = document.getElementById("loginModal");

    // Очистити поля вводу "name" та "password" перед показом модального вікна
    const nameInput = document.getElementById("name");
    const passwordInput = document.getElementById("password");
    nameInput.value = "";
    passwordInput.value = "";

    // Показати модальне вікно
    modal.style.display = "block";

    // Додати обробник подій до кнопки "Закрити" у модальному вікні
    const closeButton = modal.querySelector(".btn-close");
    closeButton.addEventListener("click", function() {
        closeModal();
    });

    // Додати обробник подій до кнопки "Закрити" у футері модального вікна
    const footerCloseButton = modal.querySelector("#close-modal-button");
    footerCloseButton.addEventListener("click", function() {
        closeModal();
    });

    // Додати обробник події до кнопки "Увійти"
    const loginButton = modal.querySelector("#login-submit");
    loginButton.addEventListener("click", function() {
        const nameInput = document.getElementById("name").value;
        const passwordInput = document.getElementById("password").value;
        getTokenFromServer(nameInput, passwordInput);
    });
}

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

// Функція для збереження токену в локальному сховищі
function saveTokenToLocal(token) {
    localStorage.setItem("token", token);
}



function getTokenFromServer(email, password) {
    fetch("https://ajax.test-danit.com/api/v2/cards/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
        .then(response => response.text())
        .then(token => {
            console.log("Отриманий токен:", token);
            saveTokenToLocal(token); // Зберегти токен у локальному сховищі
            closeModal(); // Закрити модальне вікно після успішного отримання токену

            // Змінити стиль кнопок після успішного отримання токену
            loginButton.style.display = "none"; // Зробити кнопку "Вхід" невидимою
            createVisitButton.style.display = "block"; // Зробити кнопку "Створити візит" видимою
        })
        .catch(error => console.error('Authentication error:', error));
}

function closeModal() {
    const modal = document.getElementById("loginModal");
    modal.style.display = "none";
}

// Визначення функції isLoggedIn()
// async function isLoggedIn() {
//     const token = localStorage.getItem("token");
//     if (!token) {
//         return Promise.resolve(false); // Токен не існує, користувач не увійшов
//     }
//
//     // Виклик серверного ендпоінта для перевірки токену
//     try {
//         const response = await fetch("https://ajax.test-danit.com/api/v2/cards/isLoggedIn", {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//         const data = await response.json();
//         return data.isLoggedIn; // Повернути статус входу (true або false)
//     } catch (error) {
//         console.error('Помилка перевірки токену:', error);
//         return false;
//     }
// }
//
// // Виклик функції для перевірки, чи користувач увійшов
// isLoggedIn().then(isLoggedIn => {
//     if (isLoggedIn) {
//         console.log("Користувач увійшов.");
//     } else {
//         console.log("Користувач не увійшов.");
//     }
// });
