
// visit.js:

// displayVisits(visits): Функція для відображення візитів на сторінці.
// Приймає масив візитів visits та оновлює відповідні елементи HTML.

// handleCreateVisit(): Функція для обробки створення візиту.
// Зчитує дані форми створення візиту, викликає функцію createVisit() з api.js та оновлює список візитів на сторінці.

// handleDeleteVisit(visitId): Функція для обробки видалення візиту.
// Викликає функцію deleteVisit() з api.js та оновлює список візитів на сторінці.

//---------------------------------------------------------------

// Обробник події для кнопки "Фільтрувати"
const filterButton = document.getElementById("filterButton");
filterButton.addEventListener("click", function() {
    applyFilters();
});

// Функція для застосування фільтрів
function applyFilters() {
    const searchInput = document.getElementById("search").value;
    const statusInput = document.getElementById("status").value;
    const priorityInput = document.getElementById("priority").value;

    // Виконуємо фільтрацію тут з використанням значень searchInput, statusInput та priorityInput
    // Ви можете використовувати ці значення для фільтрації списку візитів на вашій сторінці
}

//-----------------------------------------------------------------------------

function renderVisitList(visits) {
    const visitListContainer = document.getElementById("visitList");

    // Очищаємо контейнер перед відображенням нового списку
    visitListContainer.innerHTML = "";

    // Перевіряємо, чи маємо хоча б один візит для відображення
    if (visits.length === 0) {
        visitListContainer.innerHTML = "<p>Список візитів порожній</p>";
        return;
    }

    // Створюємо таблицю для відображення списку візитів
    const table = document.createElement("table");
    table.innerHTML = `
    <thead>
      <tr>
        <th>Заголовок</th>
        <th>Вміст</th>
        <th>Статус</th>
        <th>Терміновість</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  `;

    // Додаємо кожен візит до таблиці
    const tbody = table.querySelector("tbody");
    visits.forEach((visit) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${visit.title}</td>
      <td>${visit.content}</td>
      <td>${visit.status}</td>
      <td>${visit.priority}</td>
    `;
        tbody.appendChild(row);
    });

    // Додаємо таблицю зі списком візитів до контейнера
    visitListContainer.appendChild(table);
}

// Перевіряємо, чи є картки для відображення
if (visits.length === 0) {
    const dashboard = document.getElementById("dashboard");
    dashboard.style.display = "block"; // Показуємо дошку, якщо карток немає
} else {
    const dashboard = document.getElementById("dashboard");
    dashboard.style.display = "none"; // Ховаємо дошку, якщо є картки
}

//-------------------------------------------------------------

// Приклад функції для отримання списку візитів з сервера
async function getVisitsFromServer() {
    // Викликаємо API-запит для отримання списку візитів
    const response = await fetch("https://api.example.com/visits");
    const data = await response.json();
    return data;
}

// Викликаємо функцію для отримання списку візитів з сервера
getVisitsFromServer()
    .then((visits) => {
        // Викликаємо функцію для відображення списку візитів
        renderVisitList(visits);
    })
    .catch((error) => {
        console.error("Помилка отримання списку візитів:", error);
    });

//------------------------------------------------------------------

async function getAllVisits() {
    const token = localStorage.getItem("token");
    const response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data;
}

async function renderAllVisits() {
    try {
        const visits = await getAllVisits();
        const visitListContainer = document.getElementById("visitList");

        // Очищаємо контейнер перед відображенням нового списку
        visitListContainer.innerHTML = "";

        // Перевіряємо, чи маємо хоча б один візит для відображення
        if (visits.length === 0) {
            visitListContainer.innerHTML = "<p>Список візитів порожній</p>";
            return;
        }

        // Створюємо картку для кожного візиту та додаємо їх до контейнера
        visits.forEach((visit) => {
            const visitCard = new Visit(visit.doctor, visit.purpose, visit.description, visit.urgency, visit.patientName);

            const visitElement = document.createElement("div");
            visitElement.innerHTML = visitCard.render();

            // Додаємо кнопки "Edit" та "Delete" до кожної картки візиту
            const editButton = document.createElement("button");
            editButton.innerText = "Edit";
            editButton.addEventListener("click", function () {
                // Тут можна додати логіку для редагування візиту
            });

            const deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete";
            deleteButton.addEventListener("click", function () {
                handleDeleteVisit(visit.id);
            });

            visitElement.appendChild(editButton);
            visitElement.appendChild(deleteButton);

            visitListContainer.appendChild(visitElement);
        });
    } catch (error) {
        console.error("Помилка отримання списку візитів:", error);
    }
}


//-----------------------------------------------------------------------

// visit.js
class Visit {
    constructor(doctor, purpose, description, urgency, patientName, extraData = {}) {
        this.doctor = doctor;
        this.purpose = purpose;
        this.description = description;
        this.urgency = urgency;
        this.patientName = patientName;
        this.extraData = extraData;
    }

    render() {
        return `
            <div class="col">
                <div class="card">
                    <div class="card-header">Visit Cards
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <!-- Add your SVG content here -->
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <!-- Add your SVG content here -->
                        </svg>
                    </div>
                    <div class="card-body text-center">
                        <h5 class="card-title">${this.patientName}</h5>
                        <p class="card-text">${this.description}</p>
                        <h6 class="card-subtitle mb-2 text-muted">${this.doctor}</h6>
                        <p class="card-text">${this.purpose}</p>
                        <a href="#" class="btn btn-primary">показати більше</a>
                    </div>
                </div>
            </div>
        `;
    }
}


