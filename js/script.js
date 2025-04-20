//Saves an item on sessionStorage
function setSessionStorageItem(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

//Retrieves an item from sessionStorage
function getSessionStorageItem(key) {
    var item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

function sendForm() {
    //Retrieves form elements
    var fullName = document.getElementById("fullName").value;
    var cpf = document.getElementById("cpf").value;
    var creditCardNumber = document.getElementById("creditCardNumber").value;
    var expirationDate = document.getElementById("expirationDate").value;
    var cvcCode = document.getElementById("cvcCode").value;

    //Validation to prevent sending a blank form
    if (!fullName || !cpf || !creditCardNumber || !expirationDate || !cvcCode) {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    //CPF regex, I didn't include the authetucation of a valid CPF number
    var cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(cpf)) {
        alert("Por favor, insira um CPF válido.");
        return false;
    }

    //Credit card number regex, I didn't include authentication
    var creditCardRegex = /^\d{4}\-\d{4}\-\d{4}\-\d{4}$/;
    if (!creditCardRegex.test(creditCardNumber)) {
        alert("Por favor, insira um número de cartão válido.");
        return false;
    }

    //Expiration date regex for manual input as well as type=month picker.
    //I didn't include authentication for a valid day
    var dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    var dateRegexAlt = /^(19|20)\d\d[- /.](0[1-9]|1[012])$/;
    if (!dateRegex.test(expirationDate) && !dateRegexAlt.test(expirationDate)) {
        alert("Por favor, insira uma data de validade válida (MM/AA).");
        return false;
    }

    //CVC Code regex
    var cvcCodeRegex = /^\d{3}$/;
    if (!cvcCodeRegex.test(cvcCode)) {
        alert("Por favor, insira um código de segurança válido.");
        return false;
    }

    //Parse yyyy-mm format into mm/yy
    if (!dateRegex.test(expirationDate) && dateRegexAlt.test(expirationDate)) {
    
        //Splits string into year and month
        var [year, month] = expirationDate.split("-");
    
        //Returns data in mm/yy
        expirationDate = `${month}/${year.slice(2)}`;
    
    }

    //Success message
    alert("Formulário enviado com sucesso!\n\nNome: " + fullName + "\nCPF: " + cpf +
        "\nNúmero do Cartão: " + creditCardNumber + "\nData de Validade: " + expirationDate +
        "\nCódigo de Segurança: " + cvcCode);

    //Stores filled data into sessionStorage
    setSessionStorageItem('fullName', fullName);
    setSessionStorageItem('cpf', cpf);
    setSessionStorageItem('creditCardNumber', creditCardNumber);
    setSessionStorageItem('expirationDate', expirationDate);
    setSessionStorageItem('cvcCode', cvcCode);

    return true; //Allow form to be sent

}

function cpfMask(i){

    var v = i.value;
    
    if(isNaN(v[v.length-1])){ //Prevents input of non-numerical values
        i.value = v.substring(0, v.length-1);
        return;
    }
    
    i.setAttribute("maxlength", "14");  //Set a maximum lenght for the field
    if (v.length == 3 || v.length == 7) i.value += "."; //Adds the mask character to the filled data at a certain breakpoint
    if (v.length == 11) i.value += "-";

}

function creditCardNumberMask(i){

    var v = i.value;

    if(isNaN(v[v.length-1])){
        i.value = v.substring(0, v.length-1);
        return;
    }
    
    i.setAttribute("maxlength", "19");
    if (v.length == 4 || v.length == 9 || v.length == 14) i.value += "-";

}

/*Couldn't customize the JQuery date selector how I wanted so I opted for the HTML type=month attribute.
I know it's not supported by Firefox, so the field will still has a pattern and placeholder can default to if needed.*/

function dateMask(i){

    var v = i.value;

     if(isNaN(v[v.length-1])){
        i.value = v.substring(0, v.length-1);
        return;
    }
    
    i.setAttribute("maxlength", "5");
    if (v.length == 2) i.value += "/";

}

function cvcCodeMask(i){

    var v = i.value;

    if(isNaN(v[v.length-1])){
        i.value = v.substring(0, v.length-1);
        return;
    }
    
    i.setAttribute("maxlength", "3");

}

function retrieveData() {

    /*//Data retrieval simulation
    var retrievedData = {
        fullName: "John Doe",
        cpf: "123.456.789-01",
        creditCardNumber: "1234-5678-9012-3456",
        expirationDate: "12/23",
        cvcCode: "123"
    };*/

    //Retrieves data stored on sessionStorage
    var fullNameStorage = getSessionStorageItem('fullName');
    var cpfStorage = getSessionStorageItem('cpf');
    var creditCardNumberStorage = getSessionStorageItem('creditCardNumber');
    var expirationDateStorage = getSessionStorageItem('expirationDate');
    var cvcCodeStorage = getSessionStorageItem('cvcCode');

    //Display the data retrieved
    var result = document.getElementById('result');
    result.innerHTML += '<p><strong>Nome Completo:</strong> ' + fullNameStorage + '</p>';
    result.innerHTML += '<p><strong>CPF:</strong> ' + cpfStorage + '</p>';
    result.innerHTML += '<p><strong>Número do Cartão:</strong> ' + creditCardNumberStorage + '</p>';
    result.innerHTML += '<p><strong>Data de Validade:</strong> ' + expirationDateStorage + '</p>';
    result.innerHTML += '<p><strong>Código de Segurança:</strong> ' + cvcCodeStorage + '</p>';

}

//Executes funcions on page load
window.onload = function () {
    retrieveData();
};