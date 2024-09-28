const chemicals = [
    { id: 1, name: 'Ammonium Persulfate', vendor: 'LG Chem', density: '3525.92', viscosity: '60.63', packaging: 'Bag', packSize: '100.00', unit: 'kg', quantity: '6495.18' },
    { id: 2, name: 'Caustic Potash', vendor: 'Formosa', density: '3172.15', viscosity: '48.22', packaging: 'Bag', packSize: '100.00', unit: 'kg', quantity: '8751.90' },
    { id: 3, name: 'Dimethylaminopropylamino', vendor: 'LG Chem', density: '8435.37', viscosity: '12.62', packaging: 'Barrel', packSize: '75.00 ', unit: 'L', quantity: '5964.61' },
    { id: 4, name: 'Mono Ammonium Phosphate', vendor: 'Sinopec', density: '1597.65', viscosity: '76.51', packaging: 'Bag', packSize: '105.00', unit: 'kg', quantity: '8183.73' },
    { id: 5, name: 'Ferric Nitrate', vendor: 'DowDuPont', density: '364.04', viscosity: '14.90', packaging: 'Bag', packSize: '105.00', unit: 'kg', quantity: '4154.33' },
    { id: 6, name: 'n-Pentane', vendor: 'Sinopec', density: '4535.26', viscosity: '66.76', packaging: 'N/A', packSize: 'N/A', unit: 't', quantity: '6272.34' },
    { id: 7, name: 'Glycol Ether PM', vendor: 'LG Chem', density: '6495.18', viscosity: '72.12', packaging: 'Bag', packSize: '250.00', unit: 'kg', quantity: '8749.54' },
    { id: 8, name: 'Carbon monoxide', vendor: 'LG Chem', density: '3525.92', viscosity: '60.63', packaging: 'Bag', packSize: '100.00', unit: 'kg', quantity: '6495.18' },
    { id: 9, name: 'Calcium hydroxide', vendor: 'Formosa', density: '3172.15', viscosity: '48.22', packaging: 'Bag', packSize: '100.00', unit: 'kg', quantity: '8751.90' },
    { id: 10, name: 'Ethanol', vendor: 'LG Chem', density: '8435.37', viscosity: '12.62', packaging: 'Barrel', packSize: '75.00 ', unit: 'L', quantity: '5964.61' },
    { id: 11, name: 'Hydrobromic acid', vendor: 'Sinopec', density: '1597.65', viscosity: '76.51', packaging: 'Bag', packSize: '105.00', unit: 'kg', quantity: '8183.73' },
    { id: 12, name: 'Nitrous acid', vendor: 'DowDuPont', density: '364.04', viscosity: '14.90', packaging: 'Bag', packSize: '105.00', unit: 'kg', quantity: '4154.33' },
    { id: 13, name: 'Sodium chloride', vendor: 'Sinopec', density: '4535.26', viscosity: '66.76', packaging: 'N/A', packSize: 'N/A', unit: 't', quantity: '6272.34' },
    { id: 14, name: 'Nitrogen dioxide', vendor: 'LG Chem', density: '6495.18', viscosity: '72.12', packaging: 'Bag', packSize: '250.00', unit: 'kg', quantity: '8749.54' },
    { id: 15, name: 'Nitrogen Phosphate', vendor: 'DowDuPont', density: '3495.18', viscosity: '82.12', packaging: 'Bag', packSize: '280.00', unit: 'kg', quantity: '6749.54' }
];

let sortOrder = {};
let selectedRowId = null;
let editRowId

// Function to sort the array of chemicals
function sortTable(column, type) {
    const tableBody = document.getElementById('chemicalTable').getElementsByTagName('tbody')[0];
    sortOrder[column] = !sortOrder[column]; 

    chemicals.sort((a, b) => {
        if (type === 'number') {
            return sortOrder[column] ? a[column] - b[column] : b[column] - a[column];
        } else {
            return sortOrder[column]
                ? a[column].localeCompare(b[column])
                : b[column].localeCompare(a[column]);
        }
    });
    tableBody.innerHTML = '';
    loadTableData(chemicals);
}

// Function to load data into the table
function loadTableData(chemicals) {
    const tableBody = document.getElementById('chemicalTable').getElementsByTagName('tbody')[0];
    while (tableBody.rows.length > 1) {
        tableBody.deleteRow(1);
    }
    chemicals.forEach(chem => {
        let row = tableBody.insertRow();
        row.setAttribute('id', `row-${chem.id}`);
        row.setAttribute('onclick', `selectRow(${chem.id})`); 
        row.setAttribute('data-editable', 'false'); 
        row.innerHTML = `
        <tr>
            <td><i class="bi bi-check icon-large"></i></td>
            <td>${chem.id} &nbsp ${chem.name} </td>
            <td><input class="ip2" value="${chem.vendor}" disabled></td>
            <td><input class="ip3" value="${chem.density}" disabled></td>
            <td><input class="ip3" value="${chem.viscosity}"disabled ></td>
            <td><input class="ip3" value="${chem.packaging}" disabled></td>
            <td><input class="ip3" value="${chem.packSize}" disabled></td>
            <td>${chem.unit}</td>
            <td><input class="ip3" value="${chem.quantity}" disabled></td>
        </tr>
        <button id="editButton" style="display: none;" onclick="editChemicals()">Edit</button>
        `;
    });
}


function selectRow(rowId) {
    editRowId = rowId;
    document.getElementById('editButton').style.display = 'block'
    const selectedRow = document.getElementById(`row-${rowId}`);
    if (selectedRowId === rowId) {
        const currentInputs = selectedRow.getElementsByTagName('input');
        for (let input of currentInputs) {
            input.disabled = false; 
        }
        return;
    }
    if (selectedRowId !== null) {
        const previouslySelectedRow = document.getElementById(`row-${selectedRowId}`);
        previouslySelectedRow.classList.remove('selected-row'); 
        const previousInputs = previouslySelectedRow.getElementsByTagName('input');
        for (let input of previousInputs) {
            input.disabled = true; 
        }
    }
    selectedRow.classList.add('selected-row'); 
    selectedRowId = rowId; 
    const currentInputs = selectedRow.getElementsByTagName('input');
    for (let input of currentInputs) {
        input.disabled = false; 
    }
}

function deleteSelectedRow() {
    if (selectedRowId !== null) {
        const rowToDelete = document.getElementById(`row-${selectedRowId}`);
        rowToDelete.remove();
        selectedRowId = null;  
    } else {
        alert('No row selected');
    }
}

//how or hide the new chemical 
function addChemicals() {
    const newChemicalRow = document.getElementById('newChemicalRow');
    newChemicalRow.style.display = newChemicalRow.style.display === 'none' ? 'table-row' : 'none';
}

// save the new chemical
function saveChemical() {
    const name = document.getElementById('newName').value;
    const vendor = document.getElementById('newVendor').value;
    const density = document.getElementById('newDensity').value;
    const viscosity = document.getElementById('newViscosity').value;
    const packaging = document.getElementById('newPackaging').value;
    const packSize = document.getElementById('newPackSize').value;
    const unit = document.getElementById('newUnit').value;
    const quantity = document.getElementById('newQuantity').value;

    const newId = chemicals.length ? chemicals[chemicals.length - 1].id + 1 : 1;

    chemicals.unshift({ id: newId, name, vendor, density, viscosity, packaging, packSize, unit, quantity });

    const tableBody = document.getElementById('chemicalTable').getElementsByTagName('tbody')[0];

    let newRow = tableBody.insertRow(1); 
    newRow.setAttribute('id', `row-${newId}`);
    newRow.setAttribute('onclick', `selectRow(${newId})`);
    newRow.innerHTML = `
        <td><i class="bi bi-check icon-large"></i></td>
        <td>${name}</td>
        <td><input class="ip2" value="${vendor}" disabled></td>
        <td><input class="ip3" value="${density}" disabled></td>
        <td><input class="ip3" value="${viscosity}" disabled></td>
        <td><input class="ip3" value="${packaging}" disabled></td>
        <td><input class="ip3" value="${packSize}" disabled></td>
        <td>${unit}</td>
        <td><input class="ip3" value="${quantity}" disabled></td>
    `;

    // Clear input fields after saving
    document.getElementById('newName').value = '';
    document.getElementById('newVendor').value = '';
    document.getElementById('newDensity').value = '';
    document.getElementById('newViscosity').value = '';
    document.getElementById('newPackaging').value = '';
    document.getElementById('newPackSize').value = '';
    document.getElementById('newUnit').value = '';
    document.getElementById('newQuantity').value = '';

    document.getElementById('newChemicalRow').style.display = 'none';
}

function editChemicals() {
    if (selectedRowId) {
        const previouslySelectedRow = document.getElementById(`row-${selectedRowId}`);
        previouslySelectedRow.classList.remove('selected-row'); 
        const currentInputs = previouslySelectedRow.getElementsByTagName('input');
        for (let input of currentInputs) {
            input.disabled = false; 
        }
        document.getElementById('editButton').style.display = 'none';
    }
}

function scrollTable(direction) {
    const tableContainer = document.getElementById('tableContainer');
    if (direction === 'up') {
        tableContainer.scrollTop = 0;
    } else if (direction === 'down') {
        tableContainer.scrollTop = tableContainer.scrollHeight;
    }
}

function refreshPage(){
    alert("Page Refreshed")
    const previouslySelectedRow = document.getElementById(`row-${selectedRowId}`);
    previouslySelectedRow.classList.remove('selected-row'); 
    const currentInputs = previouslySelectedRow.getElementsByTagName('input');
    for (let input of currentInputs) {
        input.disabled = true; 
    }
    document.getElementById('editButton').style.display = 'none';
}

// Load data when the window finishes loading
window.onload = () => loadTableData(chemicals);



