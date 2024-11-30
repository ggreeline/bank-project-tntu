const operations = [
    {opid: 1, name: "give-my-money"},
    {opid: 2, name: "request-money"},
    {opid: 3, name: "transfer-money"}
];

let records = [
    { name: "Huesos Gitler Zighailovich", phone_number: "0666999666", operation: 1, time: new Date(), end_time: null, end_task: false },
    { name: "John Doe", phone_number: "0677889900", operation: 2, time: new Date(), end_time: null, end_task: false },
    { name: "Jane Smith", phone_number: "0688771122", operation: 3, time: new Date(), end_time: null, end_task: true }
];

let sortOrder = {
    name: null,
    phone_number: null,
    operation: null,
    time: null,
    end_time: null,
    end_task: null
};

function searchAdminRecords() {
    const nameFilter = document.getElementById("name-filter-admin").value.trim().toLowerCase();
    const phoneFilter = document.getElementById("phone-filter-admin").value.trim();
    const operationFilter = document.getElementById("operation-filter").value.trim().toLowerCase();
    const endTaskFilter = document.getElementById("end-task-filter").value;
    const adminResult = document.getElementById("admin-result");
    let result = '';

    let filteredRecords = records;

    if (nameFilter !== '') {
        filteredRecords = filteredRecords.filter(record => record.name.toLowerCase().includes(nameFilter));
    }

    if (phoneFilter !== '') {
        filteredRecords = filteredRecords.filter(record => record.phone_number.includes(phoneFilter));
    }

    if (operationFilter !== '') {
        filteredRecords = filteredRecords.filter(record => operations.find(op => op.name.toLowerCase().includes(operationFilter)));
    }

    if (endTaskFilter !== '') {
        filteredRecords = filteredRecords.filter(record => String(record.end_task) === endTaskFilter);
    }

    // Генерація таблиці для адміністратора
    result = generateTableAdmin(filteredRecords);
    adminResult.innerHTML = result;
}

function generateTableAdmin(data) {
    let tableHTML = '<table>';
    tableHTML += `
        <thead>
            <tr>
                <th onclick="sortTable(0, 'name')">Name <span id="arrow-name" class="arrow">↕</span></th>
                <th onclick="sortTable(1, 'phone_number')">Phone Number <span id="arrow-phone" class="arrow">↕</span></th>
                <th onclick="sortTable(2, 'operation')">Operation <span id="arrow-operation" class="arrow">↕</span></th>
                <th onclick="sortTable(3, 'time')">Time <span id="arrow-time" class="arrow">↕</span></th>
                <th onclick="sortTable(4, 'end_time')">End Time <span id="arrow-end-time" class="arrow">↕</span></th>
                <th onclick="sortTable(5, 'end_task')">End Task <span id="arrow-end-task" class="arrow">↕</span></th>
            </tr>
        </thead>
        <tbody>
    `;
    data.forEach((record, index) => {
        const currentTime = new Date();
        const operationTime = (record.operation === 1 ? 20 : 10) * 1; 
        const endTime = new Date(currentTime.getTime() + operationTime * 1000);
        record.end_time = endTime;

        tableHTML += `
            <tr>
                <td>${record.name}</td>
                <td>${record.phone_number}</td>
                <td>${operations.find(op => op.opid === record.operation).name}</td>
                <td>${currentTime.toLocaleString()}</td>
                <td>${endTime.toLocaleString()}</td>
                <td><input type="checkbox" id="end-task-${index}" ${record.end_task ? 'checked' : ''} onchange="toggleEndTask(${index})"></td> 
            </tr>
        `;
    });
    tableHTML += '</tbody></table>';
    return tableHTML;
}

function toggleEndTask(index) {
    const checkbox = document.getElementById(`end-task-${index}`);
    records[index].end_task = checkbox.checked;
    // Можна додати код для оновлення даних на сервері, якщо потрібно
}

// Сортування таблиці
function sortTable(columnIndex, columnName) {
    const direction = sortOrder[columnName] === 'asc' ? 'desc' : 'asc';
    sortOrder = { name: null, phone_number: null, operation: null, time: null, end_time: null, end_task: null };
    sortOrder[columnName] = direction;

    records.sort((a, b) => {
        let cellA = a[columnName];
        let cellB = b[columnName];

        // Якщо дані мають бути порівняні як дата
        if (columnName === 'time' || columnName === 'end_time') {
            cellA = new Date(a[columnName]).getTime();
            cellB = new Date(b[columnName]).getTime();
        }

        if (typeof cellA === 'boolean') {
            return direction === 'asc' ? (cellA === true ? 1 : -1) : (cellA === true ? -1 : 1);
        }

        return direction === 'asc' ? (cellA > cellB ? 1 : -1) : (cellA < cellB ? 1 : -1);
    });

    searchAdminRecords();
}

window.onload = function() {
    searchAdminRecords();
};
