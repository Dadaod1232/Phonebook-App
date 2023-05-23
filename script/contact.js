let contactDataBase = JSON.parse(localStorage.getItem('contactsData')) || [];
console.log('My Student Database', contactDataBase);

const contactItem = document.querySelector('#Contact-list');
const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
let filteredContacts = [];

function renderContacts(contacts) {
    contactItem.innerHTML = ''; // Clear previous contacts

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        
        const card = document.createElement('div');
        card.style.border = '1px solid #72C3F0';
        card.style.fontFamily = 'Montserrat'
        card.style.background = '#72C3F0';
        card.style.borderRadius = '20px';
        card.style.paddingTop = '20px';
        card.style.margin = '20px';
        card.style.width = '350px';
        card.style.height = '90px';
        card.style.boxShadow = "2px 2px 4px rgba(0, 0, 0, 0.4)";
        
        const para = document.createElement('p');
        para.textContent = `Name: ${contact.firstName} ${contact.lastName} ${contact.phone}`;

        let removeBtn = document.createElement('button');
        removeBtn.textContent = "Delete";
        removeBtn.setAttribute('data-id', contact.id);
        removeBtn.style.border = '1px solid #9166FC';
        removeBtn.style.background = "#9166FC";
        removeBtn.style.marginRight = "10px";
        removeBtn.style.marginTop = "10px";
        removeBtn.style.borderRadius = "10px";
        removeBtn.style.width = "60px";
        
        let editContact = document.createElement('button');
        editContact.textContent = "Edit";
        editContact.style.border = '1px solid #9166FC';
        editContact.style.background = "#9166FC";
        editContact.style.marginRight = "10px";
        editContact.style.borderRadius = "10px";
        editContact.style.width = "60px";

        editContact.addEventListener('click', () => {
            editContacts(i);
        });

        let viewcontact = document.createElement('button');
        viewcontact.textContent = "View Contact";
        viewcontact.style.border = '1px solid #9166FC';
        viewcontact.style.background = "#9166FC";
        viewcontact.style.borderRadius = "10px";
        viewcontact.style.width = "100px";

        removeBtn.addEventListener('click', () => {
            removeContact(i);
            card.remove();
        });

        card.appendChild(para);
        card.appendChild(removeBtn);
        card.appendChild(editContact);
        card.appendChild(viewcontact);
        contactItem.appendChild(card);
    }
}

function editContacts(contactIndex) {
    const contact = contactDataBase[contactIndex];
  
    const updatedFirstName = prompt('Enter the updated first name:', contact.firstName);
    const updatedLastName = prompt('Enter the updated last name:', contact.lastName);
    const updatedPhone = prompt('Enter the updated phone number:', contact.phone);
  
    // Update the contact's properties
    contact.firstName = updatedFirstName;
    contact.lastName = updatedLastName;
    contact.phone = updatedPhone;
  
    // Update the contact in the database
    contactDataBase[contactIndex] = contact;
  
    // Update the localStorage
    localStorage.setItem('contactsData', JSON.stringify(contactDataBase));
  
    // Render the updated contact list
    renderContacts(contactDataBase);
}

function removeContact(contactIndex) {
    contactDataBase.splice(contactIndex, 1);
    localStorage.setItem('contactsData', JSON.stringify(contactDataBase));
}

function searchContacts() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        renderContacts(contactDataBase);
        return;
    }

    filteredContacts = contactDataBase.filter((contact) => {
        const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
        const phone = contact.phone.toLowerCase();
        return fullName.includes(searchTerm) || phone.includes(searchTerm);
    });

    renderContacts(filteredContacts);
    
    if (filteredContacts.length === 0) {
        alert('Contact not found.');
    }
}

searchInput.addEventListener('input', searchContacts);

renderContacts(contactDataBase);
