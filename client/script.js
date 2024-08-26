const apiUrl = 'http://localhost:3000/control';

function fetchSuppliers() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`error no responce: ${response.status}`);
            }
            return response.json();
        })
        .then(suppliers => {
            console.log('Suppliers:', suppliers); 
            const tableBody = document.getElementById('supplierTableBody');
            if (!tableBody) {
                console.error('Table body element not found');
                return;
            }
            tableBody.innerHTML = '';
          
            suppliers.forEach(supplier => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${supplier.date }</td>
                    <td>${supplier.suppliername}</td>
                    <td>${supplier.location }</td>
                    <td>${supplier.suppliercontact}</td>
                    <td>${supplier.productname}</td>
                    <td>
                        <button onclick="editSupplier('${supplier.code}', '${supplier.date}', '${supplier.suppliername}', '${supplier.location}', '${supplier.suppliercontact}', '${supplier.productname}')">Edit</button>
                        <button onclick="deleteSupplier('${supplier.code}')">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching suppliers:', error);
            alert('There was an error fetching suppliers.');
        });
}

function submitForm(event) {
    event.preventDefault();

    const date = document.getElementById('date').value.trim();
    const suppliername = document.getElementById('suppliername').value.trim();
    const location = document.getElementById('location').value.trim();
    const suppliercontact = document.getElementById('suppliercontact').value.trim();
    const productname = document.getElementById('productname').value.trim();

    if (!date || !suppliername || !location || !suppliercontact || !productname) {
        alert('Please fill in all required fields.');
        return;
    }
  

    const supplierData = { date, suppliername, location, suppliercontact, productname };
    console.log('Supplier Data:', supplierData); 

    const id = document.getElementById('supplierId') ? document.getElementById('supplierId').value : null;
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(supplierData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        return response.text();
    })
    .then(() => {
        fetchSuppliers();
        resetForm();
    })
    .catch(error => {
        console.error('Error submitting supplier:', error);
        alert('There was an error processing your request.');
    });
}

function deleteSupplier(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        return response.text();
    })
    .then(() => fetchSuppliers())
    .catch(error => {
        console.error('Error deleting supplier:', error);
        alert('There was an error deleting the supplier.');
    });
}

function editSupplier(id, date, suppliername, location, suppliercontact, productname) {
    document.getElementById('date').value = date || '';
    document.getElementById('suppliername').value = suppliername || '';
    document.getElementById('location').value = location || '';
    document.getElementById('suppliercontact').value = suppliercontact || '';
    document.getElementById('productname').value = productname || '';

    let hiddenInput = document.getElementById('supplierId');
    if (!hiddenInput) {
        hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.id = 'supplierId';
        hiddenInput.name = 'id';
        document.getElementById('supplierForm').appendChild(hiddenInput);
    }
    hiddenInput.value = id;
}


function resetForm() {
    document.getElementById('supplierForm').reset();
    const hiddenInput = document.getElementById('supplierId');
    if (hiddenInput) {
        hiddenInput.remove();
    }
}

const displayAllStockBtn = document.getElementById('displayAllStockBtn');
if (displayAllStockBtn) {
    displayAllStockBtn.addEventListener('click', fetchSuppliers);
} else {
    console.error('Display all stock button not found');
}

document.addEventListener('DOMContentLoaded', fetchSuppliers);

