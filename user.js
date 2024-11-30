// Операції для фільтрації
const operations = [
    { opid: 1, name: "give-my-money" },
    { opid: 2, name: "request-money" },
    { opid: 3, name: "transfer-money" }
    // ... інші операції ...
];

// Список даних для прикладу
let records = [
    { name: "Huesos Gitler Zighailovich", phone_number: "0666999666", operation: 1, time: new Date(), end_time: null, end_task: true },
    { name: "Huesos Gitler Zighailovich", phone_number: "0666999666", operation: 3, time: new Date(), end_time: null, end_task: false },
    { name: "Huesos Gitler Zighailovich", phone_number: "0666999666", operation: 2, time: new Date(), end_time: null, end_task: false },
    { name: "John Doe", phone_number: "0677889900", operation: 2, time: new Date(), end_time: null, end_task: false },
    { name: "Jane Smith", phone_number: "0688771122", operation: 3, time: new Date(), end_time: null, end_task: true }
];

// Для користувача
function searchUserRecords() {
    const nameFilter = document.getElementById("name-filter-user").value.trim().toLowerCase();
    const phoneFilter = document.getElementById("phone-filter-user").value.trim();
    const userResult = document.getElementById("user-result");
    let result = '';

    // Якщо хоча б одне поле не заповнене, таблиця не відображається
    if (nameFilter === '' && phoneFilter === '') {
        userResult.innerHTML = '';
        return;
    }

    // Фільтрація даних для користувача по точному співпадінню
    let filteredRecords = records.filter(record => {
        const nameMatches = record.name.toLowerCase() === nameFilter; // Точне співпадіння для імені
        const phoneMatches = record.phone_number === phoneFilter; // Точне співпадіння для телефону
        return nameMatches && phoneMatches;  // Перевіряємо, що обидва поля точно співпадають
    });

    // Якщо користувач не знайшов співпадінь, не відображаємо таблицю
    if (filteredRecords.length === 0) {
        userResult.innerHTML = '<p>No matching records found.</p>';
        return;
    }

    // Генерація таблиці для користувача
    result = generateTableUser(filteredRecords);
    userResult.innerHTML = result;
}

// Функція для генерації таблиці з відфільтрованими записами
function generateTableUser(filteredRecords) {
    let table = `
        <table>
            <thead>
                <tr>
                    <th onclick="sortTable(0)">
                        Name
                        <span id="arrow-name" class="arrow">&#8597;</span>
                    </th>
                    <th onclick="sortTable(1)">
                        Phone
                        <span id="arrow-phone" class="arrow">&#8597;</span>
                    </th>
                    <th onclick="sortTable(2)">
                        Operation
                        <span id="arrow-operation" class="arrow">&#8597;</span>
                    </th>
                    <th onclick="sortTable(3)">
                        End Task
                        <span id="arrow-end" class="arrow">&#8597;</span>
                    </th>
                </tr>
            </thead>
            <tbody>`;

    filteredRecords.forEach(record => {
        const operation = operations.find(op => op.opid === record.operation);
        table += `
            <tr>
                <td>${record.name}</td>
                <td>${record.phone_number}</td>
                <td>${operation ? operation.name : 'Unknown'}</td>
                <td>${record.end_task ? 'Completed' : 'Not Completed'}</td>
            </tr>`;
    });

    table += '</tbody></table>';
    return table;
}

// Реєстрація нового користувача
function registerUser(event) {
    event.preventDefault(); // Запобігаємо перезавантаженню сторінки при відправці форми

    const name = document.getElementById("name-user").value.trim();
    const phone = document.getElementById("phone-user").value.trim();
    const operationSelect = document.getElementById("operation-select");
    const operation = parseInt(operationSelect.value); // Отримуємо значення вибраної операції

    if (!operation) {
        alert("Please select an operation.");
        return;
    }

    // Додавання нового запису до таблиці
    const newRecord = {
        name: name,
        phone_number: phone,
        operation: operation, // Тепер тут використовується обране значення
        time: new Date(),
        end_time: null,
        end_task: false
    };

    records.push(newRecord);

    // Очищаємо форму
    document.getElementById("registration-form").reset();

    // Можна додати повідомлення про успішну реєстрацію або автоматично оновити таблицю для користувача
    alert('Registration successful!');
}

// Функція для сортування таблиці
let sortOrder = [true, true, true, true]; // Масив для збереження порядку сортування по кожному стовпцю

function sortTable(columnIndex) {
    const table = document.querySelector('table');
    const rows = Array.from(table.querySelectorAll('tbody tr')); // Вибираємо всі рядки таблиці в тілі (окрім заголовка)
    const isAscending = sortOrder[columnIndex];

    // Скидаємо всі стрілки в таблиці
    document.querySelectorAll('.arrow').forEach(arrow => arrow.textContent = '↕');

    // Змінюємо стрілку для вибраного стовпця
    const arrow = document.querySelector(`#arrow-${['name', 'phone', 'operation', 'end'][columnIndex]}`);
    arrow.textContent = isAscending ? '↑' : '↓';

    rows.sort((rowA, rowB) => {
        const cellA = rowA.children[columnIndex].textContent.trim();
        const cellB = rowB.children[columnIndex].textContent.trim();

        if (columnIndex === 3) { // Якщо сортуємо по "End Task" (булеве значення)
            return (isAscending ? (cellA === 'Completed' ? 1 : -1) : (cellA === 'Completed' ? -1 : 1));
        }

        return (isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA));
    });

    // Перемикаємо порядок сортування
    sortOrder[columnIndex] = !isAscending;

    // Переміщаємо відсортовані рядки в таблицю
    rows.forEach(row => table.querySelector('tbody').appendChild(row));
}

// Завантажити операції в селект
function loadOperations() {
    const operationSelect = document.getElementById("operation-select");
    operations.forEach(operation => {
        const option = document.createElement("option");
        option.value = operation.opid;
        option.textContent = operation.name;
        operationSelect.appendChild(option);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadOperations();
    searchUserRecords();  // Викликаємо при завантаженні сторінки для первинного відображення
});
