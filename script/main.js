// Define an empty array to hold and store each contact information object;

let contactDataBase = [];

// Define an object constructor for contacts information;

function Contact(firstname, lastname, phonenumber, ctemail, ctcity, ctcareer) {
    this.firstName = firstname;
    this.lastName = lastname;
    this.phone = phonenumber;
    this.email = ctemail;
    this.city = ctcity;
    this.career = ctcareer;
}


// Define a function to collect contact and store contact information; collect information from form input;

function creatObj() {
    let fname = document.querySelector('#firstName').value;
    let lname = document.querySelector('#lastName').value;
    let phone = document.querySelector('#phoneNumber').value;
    let email = document.querySelector('#email').value;
    let city = document.querySelector('#city').value;
    let career = document.querySelector('#career').value;

    let contactObj = new Contact(fname, lname, phone, email, city, career);
    return contactObj;
}


// store contactList in local storage;

function storeData(contactObj) {
    // check if local storage is empty
    if (localStorage.getItem('contactsData') === null) {
        // add data to local storage
        localStorage.setItem('contactsData', JSON.stringify(contactDataBase));
    } else {
        // get data from local storage
        const contactsData = JSON.parse(localStorage.getItem('contactsData'));
        // add data to local storage
        contactsData.push(contactObj);
        localStorage.setItem('contactsData', JSON.stringify(contactsData));
    }
};

// submitting the contact form;

form.addEventListener('submit', function (event) {
    event.preventDefault();
        // store the contactInfo function in a variable;
    const newContact = creatObj();
     // add and push the newContact to the contactList array;
    contactDataBase.push(newContact);
    // store data in local storage
    storeData(newContact);
    console.log(contactDataBase);
    // function to clear form
    form.reset();
});

