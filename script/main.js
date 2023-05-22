// Define an empty array to hold and store each contact information object;

let contactList = [];

// Define an object constructor for contacts information;

class Contact {
    constructor(firstName, lastName, phoneNumber, email, city, career) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.city = city;
        this.career = career;
    }
}


// Define a function to collect contact and store contact information; collect information from form input;

function contactInfo() {
    let fName = document.getElementById("firstName").value;
    let lName = document.getElementById("lastName").value;
    let phone = document.getElementById("phoneNumber").value;
    let email = document.getElementById("email").value;
    let city = document.getElementById("city").value;
    let career = document.getElementById("career").value;

    // Define myContact to store the value from form;
    const myContactObj = new Contact (fName, lName, phone, email, city, career);

    return myContactObj;
}


// store contactList in local storage;

function storeData(myContactObj) {

    // check if local storage is empty

    if (localStorage.getItem('contactData') === null) {

        // add data to local storage
        localStorage.setItem('contactData', JSON.stringify(contactList));

    } else {

        // get data from local storage

        const contactData = JSON.parse(localStorage.getItem('contactData'));

        // add data to local storage

        contactData.push(myContactObj);

        localStorage.setItem('contactData', JSON.stringify(contactData));
    }
};

// submitting the contact form;

function submitForm (event) {

    event.preventDefault();

    // store the contactInfo function in a variable;

    const newContact = contactInfo();
    
    // add and push the newContact to the contactList array;

    contactList.push(newContact);

    // store data in local storage

    storeData(newContact);

    console.log(contactList);
    
    // function to clear form
    form.reset();
}

form.addEventListener('submit', submitForm);

