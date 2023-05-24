let contactDataBase = JSON.parse(localStorage.getItem("contactsData")) || [];
console.log("My Student Database", contactDataBase);

const contactItem = document.querySelector("#Contact-list");
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
let filteredContacts = [];

function renderContacts(contacts) {
  contactItem.innerHTML = ""; // Clear previous contacts

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];

    const card = document.createElement("div");
    card.style.border = "1px solid #72C3F0";
    card.style.fontFamily = "Montserrat";
    card.style.background = "#72C3F0";
    card.style.borderRadius = "20px";
    card.style.padding = "20px";
    card.style.margin = "20px";
    card.style.width = "350px";
    card.style.height = "auto";
    card.style.boxShadow = "2px 2px 4px rgba(0, 0, 0, 0.4)";

    const para = document.createElement("h6");
    const paraNo = document.createElement("p");
    para.textContent = ` ${contact.firstName} ${contact.lastName}`;
    paraNo.textContent = `${contact.phone}`;
    para.style.fontSize = "22px";
    paraNo.style.fontSize = "19px";
    paraNo.style.letterSpacing = "1px";
    paraNo.style.marginTop = "7px";
    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Delete";
    removeBtn.setAttribute("data-id", contact.id);
    removeBtn.style.border = "1px solid #5098EA";
    removeBtn.style.background = "#5098EA";
    removeBtn.style.color = "#ffffff";
    removeBtn.style.fontSize = "14px";
    removeBtn.style.fontWeight = "600";
    removeBtn.style.marginRight = "10px";
    removeBtn.style.marginTop = "15px";
    removeBtn.style.borderRadius = "10px";
    removeBtn.style.width = "60px";
    removeBtn.style.height = "20px";
    removeBtn.style.cursor = "pointer";
    removeBtn.style.boxShadow = "2px 2px 2px rgba(0, 0, 0, 0.2)";

    let editContact = document.createElement("button");
    editContact.textContent = "Edit";
    editContact.style.fontSize = "14px";
    editContact.style.fontWeight = "600";
    editContact.style.border = "1px solid #5098EA";
    editContact.style.background = "#5098EA";
    editContact.style.color = "#ffffff";
    editContact.style.marginRight = "10px";
    editContact.style.marginTop = "15px";
    editContact.style.borderRadius = "10px";
    editContact.style.width = "60px";
    editContact.style.height = "20px";
    editContact.style.cursor = "pointer";
    editContact.style.boxShadow = "2px 2px 2px rgba(0, 0, 0, 0.2)";

    editContact.addEventListener("click", () => {
      editContacts(i);
    });

    let viewcontact = document.createElement("button");
    viewcontact.textContent = "View Contact";
    viewcontact.style.border = "1px solid #5098EA";
    viewcontact.style.background = "#5098EA";
    viewcontact.style.color = "#ffffff";
    viewcontact.style.borderRadius = "10px";
    viewcontact.style.width = "110px";
    viewcontact.style.height = "20px";
    viewcontact.style.fontSize = "14px";
    viewcontact.style.fontWeight = "600";
    viewcontact.style.marginTop = "15px";
    viewcontact.style.cursor = "pointer";
    viewcontact.style.boxShadow = "2px 2px 2px rgba(0, 0, 0, 0.2)";

    viewcontact.addEventListener("click", function () {
      // Store contact data in local storage
      localStorage.setItem("selectedContact", JSON.stringify(contact));

      // Redirect to the contact-page.html
      window.location.href = "../pages/contact-page.html";
    });

    removeBtn.addEventListener("click", () => {
      removeContact(i);
      card.remove();
    });

    card.appendChild(para);
    card.appendChild(paraNo);
    card.appendChild(removeBtn);
    card.appendChild(editContact);
    card.appendChild(viewcontact);
    contactItem.appendChild(card);
  }
}

function editContacts(contactIndex) {
  const contact = contactDataBase[contactIndex];

  const updatedFirstName = prompt(
    "Enter the updated first name:",
    contact.firstName
  );
  const updatedLastName = prompt(
    "Enter the updated last name:",
    contact.lastName
  );
  const updatedPhone = prompt("Enter the updated phone number:", contact.phone);

  // Update the contact's properties
  contact.firstName = updatedFirstName;
  contact.lastName = updatedLastName;
  contact.phone = updatedPhone;

  // Update the contact in the database
  contactDataBase[contactIndex] = contact;

  // Update the localStorage
  localStorage.setItem("contactsData", JSON.stringify(contactDataBase));

  // Render the updated contact list
  renderContacts(contactDataBase);
}

function removeContact(contactIndex) {
  contactDataBase.splice(contactIndex, 1);
  localStorage.setItem("contactsData", JSON.stringify(contactDataBase));
}

function searchContacts() {
  const searchTerm = searchInput.value.toLowerCase();

  if (searchTerm.trim() === "") {
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
    alert("Contact not found.");
  }
}

searchInput.addEventListener("input", searchContacts);

renderContacts(contactDataBase);
