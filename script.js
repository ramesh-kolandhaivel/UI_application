var selectedRow = null

// Form Submit Function
function onFormSubmit() {
    let isValid = validate();
    // check validity
    if (isValid == true) {
        // store user data
        var formData = readFormData();
        // check empty row
        if (selectedRow == null)
        {
            // Insert New User Record
            insertNewRecord(formData);
        }
        else
        {
            // Update New User Record
            updateRecord(formData);
        }
        // Reset Input Values
        resetForm();
    }
}
// Get Values From Form
function readFormData() {
    var formData = {};
    // Get Values From  Input
    formData["name"] = document.getElementById("name").value;
    formData["mail"] = document.getElementById("mail").value;
    formData["message"] = document.getElementById("message").value;
    // return Form Data
    return formData;
}
// Insert New User Record
function insertNewRecord(data) {
    var table = document.getElementById("studentList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.mail;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.message;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
    <a onClick="onDelete(this)">Delete</a>`;
}
// Reset Function
function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("mail").value = "";
    document.getElementById("message").value = "";
    selectedRow = null;
}
// Edit Function
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("mail").value = selectedRow.cells[1].innerHTML;
    document.getElementById("message").value = selectedRow.cells[2].innerHTML;
}
// Update Record
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.mail;
    selectedRow.cells[2].innerHTML = formData.message;
}
// Delete Function
function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("studentList").deleteRow(row.rowIndex);
        resetForm();
    }
}
// Check User validation
function validate() {
    // name validation
    if (document.getElementById("name").value == "") {
        isNameValid = false;
        document.getElementById("nameValidationError").classList.remove("hide");
    } else {
        isNameValid = true;
        if (!document.getElementById("nameValidationError").classList.contains("hide"))
        {
            document.getElementById("nameValidationError").classList.add("hide");
        }
    }
    // Mail validation
    if (document.getElementById("mail").value == "") {
        isMailValid = false;
        document.getElementById("mailValidationError").classList.remove("hide");
    }else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("mail").value))){
        isMailValid = false;
        document.getElementById("mailRegexValidationError").classList.remove("hide");
    } else {
        isMailValid = true;
        if (!document.getElementById("mailValidationError").classList.contains("hide"))
        {
            document.getElementById("mailValidationError").classList.add("hide");
        }
        if (!document.getElementById("mailRegexValidationError").classList.contains("hide"))
        {
            document.getElementById("mailRegexValidationError").classList.add("hide");
        }
    }
    // Message validation
    if (document.getElementById("message").value == "") {
        isMessageValid = false;
        document.getElementById("messageValidationError").classList.remove("hide");
    } else {
        isMessageValid = true;
        if (!document.getElementById("messageValidationError").classList.contains("hide"))
        {
            document.getElementById("messageValidationError").classList.add("hide");
        }
    }

    return (isNameValid && isMailValid && isMessageValid);
}