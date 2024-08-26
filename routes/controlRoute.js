

function getFormData() 
{
    const date = document.getElementById('date').value;
    const supplier = document.getElementById('suppliername').value;
    const location = document.getElementById('location').value;
    const contact = document.getElementById('suppliercontact').value;
    const product = document.getElementById('productname').value;

    return { date, supplier, location, contact, product };
}
